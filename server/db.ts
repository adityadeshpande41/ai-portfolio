import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "@shared/schema";
import { join } from "path";

// SQLite database file location
// In production, use process.cwd() which points to the project root
const dbPath = process.env.DATABASE_PATH || join(process.cwd(), "data/portfolio.db");

// Create database connection
const sqlite = new Database(dbPath);
sqlite.pragma("journal_mode = WAL"); // Better performance

export const db = drizzle(sqlite, { schema });
