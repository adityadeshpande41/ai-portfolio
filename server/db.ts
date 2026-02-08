import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "@shared/schema";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// SQLite database file location
const dbPath = process.env.DATABASE_PATH || join(__dirname, "../data/portfolio.db");

// Create database connection
const sqlite = new Database(dbPath);
sqlite.pragma("journal_mode = WAL"); // Better performance

export const db = drizzle(sqlite, { schema });
