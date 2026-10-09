// Machine translation of the English docs and UI strings into MACHINE_TRANSLATED_LOCALES.
// German is translated by hand and never touched. Only content whose English source changed since
// the last run is translated; the source hashes live in i18n/<locale>/translation-state.json.
//
// Two ways to translate:
// - Default: changed files are queued as .translation-queue/<locale>/<file>.in together with the
//   rules in _prompt-*.txt. A coding agent writes the translation to <file>.out, the next run
//   validates and imports it.
// - --libretranslate[=<url>]: translates directly through a LibreTranslate server
//   (default http://localhost:5000).
//
// Usage: node scripts/translate.mjs [--libretranslate[=<url>]] [locale ...]

import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import docusaurusUtils from "@docusaurus/utils";
import { compile } from "@mdx-js/mdx";
import yaml from "js-yaml";
import { MACHINE_TRANSLATED_LOCALES } from "../src/utils/locales.mjs";

const { writeMarkdownHeadingId } = docusaurusUtils;

// Bump to re-translate everything after changing the prompts
const PROMPT_VERSION = 1;

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DOCS_DIR = join(ROOT, "docs");
const I18N_DIR = join(ROOT, "i18n");
const QUEUE_DIR = join(ROOT, ".translation-queue");
const DOCUSAURUS_BIN = join(ROOT, "node_modules", "@docusaurus", "core", "bin", "docusaurus.mjs");

class ValidationError extends Error {}
class PendingError extends Error {}

let libreTranslateUrl = null;
const libreTranslateCodes = new Map();

// ---------------------------------------------------------------------------------------------
// Queue

function complete(system, user, locale, label) {
    const base = join(QUEUE_DIR, locale, label);
    const kind = label.endsWith(".json") ? "strings" : label.endsWith(".yml") ? "yaml" : "docs";
    writeFile(join(QUEUE_DIR, locale, `_prompt-${kind}.txt`), `${system}\n`);
    if (existsSync(`${base}.in`) && readFileSync(`${base}.in`, "utf8") === user && existsSync(`${base}.out`)) {
        const answer = readFileSync(`${base}.out`, "utf8").replace(/\r\n/g, "\n");
        if (answer.trim() === "") throw new ValidationError("empty answer file");
        return answer;
    }
    writeFile(`${base}.in`, user);
    if (existsSync(`${base}.out`)) unlinkSync(`${base}.out`);
    throw new PendingError(`waiting for ${relative(ROOT, base)}.out`);
}

function dequeue(locale, label) {
    for (const extension of [ ".in", ".out" ]) rmSync(join(QUEUE_DIR, locale, `${label}${extension}`), { force: true });
}

// Agents sometimes wrap the whole answer in a code fence although told not to
function unwrapFence(text) {
    const trimmed = text.trim();
    if (!/^(```|~~~)/.test(trimmed)) return trimmed;
    const lines = trimmed.split("\n");
    if (!/^(```|~~~)\s*$/.test(lines.at(-1))) return trimmed;
    return lines.slice(1, -1).join("\n");
}

// ---------------------------------------------------------------------------------------------
// LibreTranslate

async function connectLibreTranslate(locales) {
    let languages;
    try {
        languages = await (await fetch(`${libreTranslateUrl}/languages`)).json();
    } catch {
        throw new Error(`LibreTranslate is not reachable at ${libreTranslateUrl} (see "Machine Translation" in CLAUDE.md)`);
    }
    const available = new Set(languages.map((language) => language.code));
    for (const locale of locales) {
        const code = [ locale, locale.split("-")[0] ].find((candidate) => available.has(candidate));
        if (!code) throw new Error(`LibreTranslate at ${libreTranslateUrl} has no model for ${locale}`);
        libreTranslateCodes.set(locale, code);
    }
}

async function requestLibreTranslate(texts, locale) {
    const response = await fetch(`${libreTranslateUrl}/translate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: texts, source: "en", target: libreTranslateCodes.get(locale), format: "text" }),
    });
    if (!response.ok) throw new Error(`LibreTranslate error ${response.status}: ${(await response.text()).slice(0, 300)}`);
    return (await response.json()).translatedText;
}

const placeholdersIn = (text) => (text.match(/@@P\d+@@/g) ?? []).sort().join();

// Segments whose placeholders did not survive are translated again piece by piece between them
async function libreTranslate(texts, locale) {
    if (texts.length === 0) return [];
    const translated = [];
    for (let start = 0; start < texts.length; start += 50) translated.push(...await requestLibreTranslate(texts.slice(start, start + 50), locale));

    for (const [ index, text ] of texts.entries()) {
        if (placeholdersIn(translated[index]) === placeholdersIn(text)) continue;
        const pieces = text.split(/(@@P\d+@@)/);
        const words = pieces.filter((piece, position) => position % 2 === 0 && /\p{L}/u.test(piece));
        const wordTranslations = await requestLibreTranslate(words, locale);
        translated[index] = pieces.map((piece, position) => (position % 2 === 0 && /\p{L}/u.test(piece) ? piece.replace(/\S(.*\S)?/s, wordTranslations.shift().trim()) : piece)).join("");
    }
    return translated;
}

const TRANSLATED_FRONTMATTER_KEYS = new Set([ "title", "description", "sidebar_label" ]);

// Collects every translatable text of a (protected) Markdown/MDX file, translates them in one go and
// puts them back, so the Markdown structure itself never passes through the translator
async function libreTranslateMarkdown(content, locale) {
    const lines = content.split("\n");
    const segments = [];
    const setters = [];
    const collect = (text, set) => {
        if (!/\p{L}/u.test(text)) return;
        segments.push(text);
        setters.push(set);
    };
    const quoted = (value) => value.replace(/^(["'])(.*)\1$/, "$2");

    let inFrontmatter = lines[0] === "---";
    let frontmatterKey = null;
    for (const [ index, line ] of lines.entries()) {
        if (inFrontmatter) {
            if (index > 0 && line === "---") {
                inFrontmatter = false;
                continue;
            }
            const keyMatch = /^([\w-]+):\s*(.*)$/.exec(line);
            if (keyMatch) {
                const [ , key, value ] = keyMatch;
                frontmatterKey = key;
                if (TRANSLATED_FRONTMATTER_KEYS.has(key) && value) collect(quoted(value), (text) => (lines[index] = `${key}: ${JSON.stringify(text)}`));
                continue;
            }
            const itemMatch = /^(\s+-\s+)(.+)$/.exec(line);
            if (itemMatch && frontmatterKey === "keywords") collect(quoted(itemMatch[2]), (text) => (lines[index] = `${itemMatch[1]}${JSON.stringify(text)}`));
            continue;
        }

        if (/^\s*(@@P\d+@@\s*)*$|^\s*(import|export) |^\s*:::|^\s*</.test(line)) continue;
        if (/^\s*\|/.test(line)) {
            if (/^[\s|:-]+$/.test(line)) continue;
            const cells = line.split("|");
            cells.forEach((cell, cellIndex) => collect(cell.trim(), (text) => {
                cells[cellIndex] = ` ${text} `;
                lines[index] = cells.join("|");
            }));
            continue;
        }
        const [ , prefix, text, suffix ] = /^(\s*(?:#{1,6} |>\s?|[-*+] |\d+\. )*)(.*?)(\s*)$/.exec(line);
        collect(text, (translation) => (lines[index] = `${prefix}${translation}${suffix}`));
    }

    const translations = await libreTranslate(segments, locale);
    setters.forEach((set, index) => set(translations[index]));
    return lines.join("\n");
}

async function libreTranslateYaml(content, locale) {
    const lines = content.split("\n");
    const targets = lines.map((line, index) => [ index, /^(\s+(?:label|description):\s*)(.+)$/.exec(line) ]).filter(([ , match ]) => match);
    const translations = await libreTranslate(targets.map(([ , match ]) => match[2].replace(/^(["'])(.*)\1$/, "$2")), locale);
    targets.forEach(([ index, match ], position) => (lines[index] = `${match[1]}${JSON.stringify(translations[position])}`));
    return lines.join("\n");
}

async function libreTranslateStrings(entries, locale) {
    const keys = Object.keys(entries);
    const forms = keys.map((key) => entries[key].message.split("|"));
    const protectedForms = forms.flat().map((form) => protect(form, [ /\{\w+\}/g ]));
    const translations = await libreTranslate(protectedForms.map(({ protectedContent }) => protectedContent), locale);
    const restored = translations.map((translation, index) => restore(translation, protectedForms[index].values));
    return Object.fromEntries(keys.map((key, index) => [ key, restored.splice(0, forms[index].length).join("|") ]));
}

// ---------------------------------------------------------------------------------------------
// Docs

function systemPromptForDocs(language) {
    return `You translate a file of a technical knowledge base (Docusaurus, Markdown/MDX) from English into ${language}.

Rules:
- Output only the translated file. No explanations, no code fence around the output.
- Tokens of the form @@P<number>@@ are placeholders for code, links, tags and heading IDs. Copy every placeholder unchanged and exactly once, at the matching position.
- Keep the Markdown/MDX structure exactly: frontmatter delimiters, headings, lists, tables, admonitions (:::note etc.), HTML/JSX tags, import and export lines, blank lines, two trailing spaces that mark a line break.
- Frontmatter: translate the values of title, description, keywords and sidebar_label. Copy all other keys and their values unchanged (e.g. tags, slug, sidebar_position).
- Translate the visible text of links.
- Bold markers (**) directly between punctuation and a letter are not rendered. Put colons, brackets and quotes outside the markers ("**术语**：" instead of "**术语：**", "**名称**（ABC）" instead of "**名称（ABC）**") and bold the text of a bold link ("[**text**](target)").
- Keep technical terms, product names and abbreviations that are customarily left in English in ${language}.
- Use the decimal separator customary in ${language}. Keep "x" as multiplication sign and "=>" as arrow.
- Write in an impersonal, neutral style that does not address the reader directly.`;
}

function systemPromptForYaml(language) {
    return `You translate a YAML file of a Docusaurus website from English into ${language}.
Translate only the values of the keys label and description. Copy everything else unchanged, including keys, permalinks, indentation and quotes.
Output only the translated YAML, without a code fence.`;
}

const DOC_PROTECTED_PATTERNS = [
    /^([ \t]*)(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\1\2[ \t]*$/gm,
    /\{\/\* #[^*]+\*\/\}/g,
    /(`+)(?:(?!\1)[^\n])+?\1/g,
    /\]\([^)\n]*\)/g,
    /<\/?[A-Za-z][^>\n]*>/g,
];

// Replaces everything that must not be translated with placeholders
function protect(content, patterns) {
    const values = [];
    const placeholder = (match) => {
        values.push(match);
        return `@@P${values.length - 1}@@`;
    };
    const protectedContent = patterns.reduce((text, pattern) => text.replace(pattern, placeholder), content);
    return { protectedContent, values };
}

function restore(text, values) {
    const expected = values.map((_, index) => `@@P${index}@@`).sort().join();
    if (placeholdersIn(text) !== expected) throw new ValidationError(`placeholders changed (expected ${values.length}, got ${(text.match(/@@P\d+@@/g) ?? []).length})`);
    // Placeholders inside other placeholders' values are restored in later passes
    let restored = text;
    while (/@@P\d+@@/.test(restored)) restored = restored.replace(/@@P(\d+)@@/g, (_, index) => values[Number(index)]);
    return restored;
}

const linkTargets = (content) => [ ...content.matchAll(/\]\(([^)\s]+)[^)]*\)|href="([^"]+)"/g) ].map((match) => match[1] ?? match[2]).sort();

function frontmatterKeys(content) {
    const match = /^---\n([\s\S]*?)\n---/.exec(content);
    return match ? match[1].split("\n").filter((line) => /^[\w-]+:/.test(line)).map((line) => line.split(":")[0]).join() : null;
}

function frontmatterBlock(content, key) {
    const match = new RegExp(`^${key}:[^\\n]*(\\n[ \\t]+-[^\\n]*)*`, "m").exec(/^---\n([\s\S]*?)\n---/.exec(content)?.[1] ?? "");
    return match?.[0] ?? null;
}

function parseYaml(text) {
    try {
        return yaml.load(text);
    } catch (error) {
        throw new ValidationError(`invalid YAML: ${error.message.split("\n")[0]}`);
    }
}

async function validateDoc(source, translation) {
    if (linkTargets(source).join() !== linkTargets(translation).join()) throw new ValidationError("link targets changed");
    if (frontmatterKeys(source) !== frontmatterKeys(translation)) throw new ValidationError("frontmatter keys changed");
    if (frontmatterBlock(source, "tags") !== frontmatterBlock(translation, "tags")) throw new ValidationError("tags changed");

    const match = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(translation);
    const frontmatter = match ? parseYaml(match[1]) ?? {} : {};
    for (const key of TRANSLATED_FRONTMATTER_KEYS) {
        if (key in frontmatter && typeof frontmatter[key] !== "string") throw new ValidationError(`frontmatter ${key} is not a string`);
    }
    if ("keywords" in frontmatter && !(Array.isArray(frontmatter.keywords) && frontmatter.keywords.every((keyword) => typeof keyword === "string"))) {
        throw new ValidationError("frontmatter keywords are not a list of strings");
    }

    try {
        await compile(match ? match[2] : translation, { remarkPlugins: [ rejectUnparsedEmphasis ] });
    } catch (error) {
        if (error instanceof ValidationError) throw error;
        throw new ValidationError(`MDX does not compile: ${String(error.message).split("\n")[0]}`);
    }
}

// Emphasis markers next to punctuation without a space (e.g. "**term：**text" in Chinese or Japanese) are not
// parsed as emphasis and would show up as literal asterisks
function rejectUnparsedEmphasis() {
    const visit = (node) => {
        if (node.type === "text" && /\*\*|__/.test(node.value)) {
            throw new ValidationError(`emphasis markers not parsed near "${node.value.trim().slice(0, 40)}"`);
        }
        node.children?.forEach(visit);
    };
    return visit;
}

function markMachineTranslated(content) {
    if (!content.startsWith("---\n")) return `---\nmachine_translated: true\n---\n\n${content}`;
    return content.replace(/^---\n([\s\S]*?)\n---/, (_, body) => `---\n${body}\nmachine_translated: true\n---`);
}

async function translateDoc(source, relativePath, locale, language) {
    if (relativePath.endsWith(".yml")) {
        const translation = libreTranslateUrl
            ? await libreTranslateYaml(source, locale)
            : unwrapFence(await complete(systemPromptForYaml(language), source, locale, relativePath));
        const fixedLines = (text) => text.split("\n").filter((line) => !/^\s+(label|description):/.test(line) && line.trim() !== "").join("\n");
        if (fixedLines(source) !== fixedLines(translation)) throw new ValidationError("YAML structure changed");
        parseYaml(translation);
        return `${translation.trimEnd()}\n`;
    }

    // English heading IDs keep anchor links (#some-heading) working after the headings are translated
    const withIds = writeMarkdownHeadingId(source, { syntax: "mdx-comment" });
    const { protectedContent, values } = protect(withIds, DOC_PROTECTED_PATTERNS);
    const answer = libreTranslateUrl
        ? await libreTranslateMarkdown(protectedContent, locale)
        : unwrapFence(await complete(systemPromptForDocs(language), protectedContent, locale, relativePath));
    const translation = restore(answer, values);
    await validateDoc(withIds, translation);
    return `${markMachineTranslated(translation).trimEnd()}\n`;
}

function listDocs(dir = DOCS_DIR) {
    return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const path = join(dir, entry.name);
        if (entry.isDirectory()) return listDocs(path);
        return /\.(md|mdx)$/.test(entry.name) || entry.name === "tags.yml" ? [ relative(DOCS_DIR, path).replaceAll("\\", "/") ] : [];
    });
}

// ---------------------------------------------------------------------------------------------
// UI strings (code.json, navbar.json, footer.json, current.json)

function writeTranslations(locale) {
    execFileSync(process.execPath, [ DOCUSAURUS_BIN, "write-translations", "--locale", locale ], {
        cwd: ROOT,
        stdio: "ignore",
        env: { ...process.env, INCLUDE_ALL_LOCALES: "true" },
    });
}

function listJsonFiles(dir) {
    if (!existsSync(dir)) return [];
    return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const path = join(dir, entry.name);
        if (entry.isDirectory()) return listJsonFiles(path);
        return entry.name.endsWith(".json") && entry.name !== "translation-state.json" ? [ path ] : [];
    });
}

// English messages keyed by "<file>::<key>"
function readEnglishStrings() {
    const englishDir = join(I18N_DIR, "en");
    const existed = existsSync(englishDir);
    writeTranslations("en");
    const strings = {};
    for (const file of listJsonFiles(englishDir)) {
        const name = relative(englishDir, file).replaceAll("\\", "/");
        for (const [ key, { message }] of Object.entries(JSON.parse(readFileSync(file, "utf8")))) strings[`${name}::${key}`] = message;
    }
    if (!existed) rmSync(englishDir, { recursive: true, force: true });
    return strings;
}

// Unique set: plural forms ("One document|{count} documents") may use a placeholder in only some forms
const placeholdersOf = (message) => [ ...new Set(message.match(/\{\w+\}/g)) ].sort().join();

async function translateStrings(entries, locale, name, language) {
    let result;
    if (libreTranslateUrl) {
        result = await libreTranslateStrings(entries, locale);
    } else {
        const system = `You translate UI strings of a documentation website from English into ${language}.
The input is a JSON object mapping keys to { message, description }. The description only gives context.
Return a JSON object mapping the same keys to the translated message strings. Keep placeholders in curly braces such as {count} unchanged and keep "|" plural separators.
Output only the JSON object, without a code fence.`;
        try {
            result = JSON.parse(unwrapFence(await complete(system, JSON.stringify(entries, null, 2), locale, name)));
        } catch (error) {
            if (!(error instanceof SyntaxError)) throw error;
            throw new ValidationError("answer is not valid JSON");
        }
    }
    for (const [ key, { message }] of Object.entries(entries)) {
        if (typeof result[key] !== "string") throw new ValidationError(`missing key ${key}`);
        if (placeholdersOf(result[key]) !== placeholdersOf(message)) throw new ValidationError(`placeholders changed in ${key}`);
    }
    return result;
}

// ---------------------------------------------------------------------------------------------

const hash = (text) => createHash("sha256").update(`${PROMPT_VERSION}\n${text}`).digest("hex").slice(0, 16);

function writeFile(path, content) {
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, content);
}

function recordFailure(error, summary, label) {
    if (error instanceof PendingError) {
        summary.pending++;
        return;
    }
    if (!(error instanceof ValidationError)) throw error;
    summary.failed.push(`${label}: ${error.message}`);
    console.warn(`  ✗ ${label}: ${error.message}`);
}

async function translateLocale(locale, englishStrings, summary) {
    const language = new Intl.DisplayNames([ "en" ], { type: "language" }).of(locale);
    const localeDir = join(I18N_DIR, locale);
    const statePath = join(localeDir, "translation-state.json");
    const state = existsSync(statePath) ? JSON.parse(readFileSync(statePath, "utf8")) : { docs: {}, strings: {} };
    const saveState = () => writeFile(statePath, `${JSON.stringify(state, null, 2)}\n`);
    const docsTarget = join(localeDir, "docusaurus-plugin-content-docs", "current");

    const pendingBefore = summary.pending;

    console.log(`\n${locale} (${language})`);

    writeTranslations(locale);
    for (const file of listJsonFiles(localeDir)) {
        const name = relative(localeDir, file).replaceAll("\\", "/");
        const json = JSON.parse(readFileSync(file, "utf8"));
        const pending = {};
        for (const [ key, entry ] of Object.entries(json)) {
            const english = englishStrings[`${name}::${key}`];
            const stateKey = `${name}::${key}`;
            if (english === undefined || state.strings[stateKey] === hash(english)) continue;
            // Docusaurus ships its own translations for theme strings
            if (entry.message !== english && state.strings[stateKey] === undefined) {
                state.strings[stateKey] = hash(english);
                continue;
            }
            pending[key] = { message: english, description: entry.description };
        }
        if (Object.keys(pending).length === 0) continue;

        try {
            const translated = await translateStrings(pending, locale, name, language);
            for (const key of Object.keys(pending)) {
                json[key].message = translated[key];
                state.strings[`${name}::${key}`] = hash(pending[key].message);
            }
            writeFile(file, `${JSON.stringify(json, null, 2)}\n`);
            saveState();
            dequeue(locale, name);
            summary.translated++;
            console.log(`  ✓ ${name} (${Object.keys(pending).length} strings)`);
        } catch (error) {
            recordFailure(error, summary, `${locale}/${name}`);
        }
    }
    saveState();

    const docs = listDocs();
    for (const relativePath of docs) {
        // Normalised line endings keep the hashes identical on every platform
        const source = readFileSync(join(DOCS_DIR, relativePath), "utf8").replace(/\r\n/g, "\n");
        const target = join(docsTarget, relativePath);
        if (state.docs[relativePath] === hash(source) && existsSync(target)) continue;

        try {
            writeFile(target, await translateDoc(source, relativePath, locale, language));
            state.docs[relativePath] = hash(source);
            saveState();
            dequeue(locale, relativePath);
            summary.translated++;
            console.log(`  ✓ ${relativePath}`);
        } catch (error) {
            recordFailure(error, summary, `${locale}/${relativePath}`);
        }
    }

    for (const relativePath of Object.keys(state.docs)) {
        if (docs.includes(relativePath)) continue;
        const target = join(docsTarget, relativePath);
        if (existsSync(target)) unlinkSync(target);
        delete state.docs[relativePath];
        console.log(`  - ${relativePath} (source removed)`);
    }

    // docusaurus.config.ts publishes a locale once it was complete; later gaps fall back to English
    if (!state.complete && docs.every((relativePath) => state.docs[relativePath] !== undefined)) {
        state.complete = true;
        console.log(`  ${locale} is complete and will be published`);
    }
    saveState();
    if (summary.pending === pendingBefore) rmSync(join(QUEUE_DIR, locale), { recursive: true, force: true });
}

async function main() {
    const args = process.argv.slice(2);
    const libreTranslateArg = args.find((arg) => arg.startsWith("--libretranslate"));
    if (libreTranslateArg) libreTranslateUrl = (libreTranslateArg.split("=")[1] || "http://localhost:5000").replace(/\/$/, "");

    const requested = args.filter((arg) => !arg.startsWith("--"));
    const unknown = requested.filter((locale) => !MACHINE_TRANSLATED_LOCALES.includes(locale));
    if (unknown.length > 0) {
        console.error(`Not a machine-translated locale: ${unknown.join(", ")}. Available: ${MACHINE_TRANSLATED_LOCALES.join(", ")}`);
        process.exit(1);
    }
    const locales = requested.length > 0 ? requested : MACHINE_TRANSLATED_LOCALES;
    if (libreTranslateUrl) await connectLibreTranslate(locales);

    const summary = { translated: 0, pending: 0, failed: [] };
    const englishStrings = readEnglishStrings();
    for (const locale of locales) await translateLocale(locale, englishStrings, summary);

    console.log(`\n${summary.translated} file(s) translated.`);
    if (summary.pending > 0) console.log(`${summary.pending} file(s) waiting for a translation in ${relative(ROOT, QUEUE_DIR)}/ (<file>.in => <file>.out).`);
    if (summary.failed.length > 0) {
        console.warn(`${summary.failed.length} file(s) failed validation and kept their previous state:`);
        for (const failure of summary.failed) console.warn(`  ${failure}`);
    }
}

await main();
