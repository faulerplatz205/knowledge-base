import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync(process.env.DB_PATH ?? "./data/feedback.db", { readOnly: true });
const limit = Number(process.argv[2] ?? 50);

const rows = db.prepare("SELECT id, created_at, rating, locale, path, contact, comment FROM feedback ORDER BY id DESC LIMIT ?").all(limit);
for (const row of rows) {
    const icon = row.rating === "up" ? "+" : "-";
    console.log(`#${row.id} [${icon}] ${row.created_at} ${row.locale} ${row.path}${row.contact ? ` (${row.contact})` : ""}`);
    console.log(`    ${row.comment.replaceAll("\n", "\n    ")}\n`);
}
console.log(`${rows.length} entr${rows.length === 1 ? "y" : "ies"} shown`);
