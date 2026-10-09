import { createServer } from "node:http";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { DatabaseSync } from "node:sqlite";

const PORT = Number(process.env.PORT ?? 8787);
const HOST = process.env.HOST ?? "127.0.0.1";
const DB_PATH = process.env.DB_PATH ?? "./data/feedback.db";
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS ?? "http://localhost:3000,https://knowledge.moritz-grimm.dev")
    .split(",")
    .map((origin) => origin.trim());
// Only enable behind a reverse proxy that sets X-Forwarded-For.
const TRUST_PROXY = process.env.TRUST_PROXY === "1";

const MAX_BODY_BYTES = 8 * 1024;
const MAX_COMMENT = 500;
const MAX_CONTACT = 200;
const MAX_PATH = 300;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const LOCALES = new Set([ "en", "de" ]);

mkdirSync(dirname(DB_PATH), { recursive: true });
const db = new DatabaseSync(DB_PATH);
db.exec(`
    CREATE TABLE IF NOT EXISTS feedback (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
        rating TEXT NOT NULL CHECK (rating IN ('up', 'down')),
        comment TEXT NOT NULL,
        contact TEXT,
        path TEXT NOT NULL,
        locale TEXT NOT NULL
    )
`);
const insert = db.prepare("INSERT INTO feedback (rating, comment, contact, path, locale) VALUES (?, ?, ?, ?, ?)");

/** @type {Map<string, number[]>} */
const hits = new Map();

function isRateLimited(ip) {
    const now = Date.now();
    const recent = (hits.get(ip) ?? []).filter((time) => now - time < RATE_WINDOW_MS);
    if (recent.length >= RATE_MAX) {
        hits.set(ip, recent);
        return true;
    }
    recent.push(now);
    hits.set(ip, recent);
    return false;
}

setInterval(() => {
    const now = Date.now();
    for (const [ ip, times ] of hits) {
        if (times.every((time) => now - time >= RATE_WINDOW_MS)) hits.delete(ip);
    }
}, RATE_WINDOW_MS).unref();

function clientIp(req) {
    if (TRUST_PROXY) {
        const forwarded = req.headers["x-forwarded-for"];
        if (typeof forwarded === "string") return forwarded.split(",")[0].trim();
    }
    return req.socket.remoteAddress ?? "unknown";
}

function send(res, status, headers, body) {
    res.writeHead(status, { "Content-Type": "application/json", ...headers });
    res.end(body === undefined ? undefined : JSON.stringify(body));
}

function readBody(req) {
    return new Promise((resolve, reject) => {
        let size = 0;
        const chunks = [];
        req.on("data", (chunk) => {
            size += chunk.length;
            if (size > MAX_BODY_BYTES) {
                reject(new Error("too large"));
                req.destroy();
                return;
            }
            chunks.push(chunk);
        });
        req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
        req.on("error", reject);
    });
}

const server = createServer(async(req, res) => {
    const origin = req.headers.origin;
    const cors = {};
    if (origin && ALLOWED_ORIGINS.includes(origin)) {
        cors["Access-Control-Allow-Origin"] = origin;
        cors["Vary"] = "Origin";
    }

    const { pathname } = new URL(req.url ?? "/", "http://localhost");

    if (pathname === "/health" && req.method === "GET") {
        send(res, 200, {}, { status: "ok" });
        return;
    }

    if (pathname !== "/feedback") {
        send(res, 404, cors, { error: "not found" });
        return;
    }

    if (req.method === "OPTIONS") {
        send(res, 204, {
            ...cors,
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Max-Age": "86400",
        });
        return;
    }

    if (req.method !== "POST") {
        send(res, 405, { ...cors, Allow: "POST, OPTIONS" }, { error: "method not allowed" });
        return;
    }

    if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
        send(res, 403, cors, { error: "origin not allowed" });
        return;
    }

    let data;
    try {
        data = JSON.parse(await readBody(req));
    } catch {
        send(res, 400, cors, { error: "invalid body" });
        return;
    }

    // Honeypot: bots fill the hidden field. Pretend success, store nothing.
    if (typeof data.website === "string" && data.website !== "") {
        send(res, 201, cors, { ok: true });
        return;
    }

    const rating = data.rating;
    const comment = typeof data.comment === "string" ? data.comment.trim() : "";
    const contact = typeof data.contact === "string" ? data.contact.trim() : "";
    const path = typeof data.path === "string" ? data.path : "";
    const locale = data.locale;

    if (
        (rating !== "up" && rating !== "down")
        || comment.length > MAX_COMMENT
        || contact.length > MAX_CONTACT
        || path.length === 0 || path.length > MAX_PATH || !path.startsWith("/")
        || !LOCALES.has(locale)
    ) {
        send(res, 400, cors, { error: "invalid input" });
        return;
    }

    if (isRateLimited(clientIp(req))) {
        send(res, 429, cors, { error: "too many requests" });
        return;
    }

    insert.run(rating, comment, contact === "" ? null : contact, path, locale);
    send(res, 201, cors, { ok: true });
});

server.listen(PORT, HOST, () => {
    console.log(`Feedback server listening on http://${HOST}:${PORT} (db: ${DB_PATH})`);
});
