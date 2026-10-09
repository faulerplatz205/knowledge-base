---
name: translate
description: Translate new or changed English entries into all machine-translated locales (es, fr, pt-BR, zh-Hans, ja, ar), validate and review them
argument-hint: "[locale ...]"
---

# Translate

Bring every machine-translated locale up to date with the English source. German is translated by hand and is not
part of this workflow.

## Steps

1. Run `npm run translate -- $ARGUMENTS`. It queues every changed source as `.translation-queue/<locale>/<file>.in`
   and prints how many files are waiting. If nothing is waiting, report that and stop.
2. Translate every queued file. For each `<file>.in`, read the rules in the same locale folder (`_prompt-docs.txt`
   for `.md`/`.mdx`, `_prompt-yaml.txt` for `.yml`, `_prompt-strings.txt` for `.json`) and write only the
   translation to `<file>.out` next to it. With more than about ten files, split them across subagents by locale.
3. Run `npm run translate -- $ARGUMENTS` again. It validates every `.out` file and imports it into `i18n/<locale>/`.
   Files listed as failed stay in the queue: fix their `.out` file and run the command again until no file fails
   and none is waiting.
4. Review each newly imported file against its English source in `docs/`: grammar, spelling, mistranslations,
   missing content, leftover English prose, terminology consistent with the other files of the locale. Fix errors
   directly in `i18n/<locale>/`. Never change code blocks, inline code, link targets, heading IDs `{/* #id */}`,
   frontmatter keys, the `tags:` block or `machine_translated: true`.
5. Run `npm run markdownlint` and `TYPESENSE_READONLY_API_KEY=dummy npm run build`. Both must pass.

## Report

List the translated files per locale, the review fixes and any errors found in the English source. Do not edit
`docs/` or `i18n/de/` and do not commit.
