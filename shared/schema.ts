import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

// RAG Documents Store
export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  source: text("source").notNull(), // e.g. "projects/project1.md"
  title: text("title").notNull(),
  content: text("content").notNull(), // The text chunk
  category: text("category").notNull(), // 'resume', 'project', 'blog', etc.
  metadata: jsonb("metadata").$type<Record<string, any>>().default({}),
  embedding: jsonb("embedding").$type<number[]>().notNull(), // 1536-dim vector stored as JSON array
  createdAt: timestamp("created_at").defaultNow(),
});

// Contact Form Submissions
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Chat History (Optional persistence)
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  role: text("role").notNull(), // 'user' | 'assistant'
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// === SCHEMAS ===
export const insertDocumentSchema = createInsertSchema(documents).omit({ id: true, createdAt: true });
export const insertContactSchema = createInsertSchema(contacts).omit({ id: true, createdAt: true });
export const insertMessageSchema = createInsertSchema(messages).omit({ id: true, createdAt: true });

// === TYPES ===
export type Document = typeof documents.$inferSelect;
export type InsertDocument = z.infer<typeof insertDocumentSchema>;

export type Contact = typeof contacts.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;

export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;

// API Types
export interface SearchResult {
  document: Document;
  score: number;
}

export interface ChatRequest {
  message: string;
  history?: { role: 'user' | 'assistant'; content: string }[];
}

export interface ChatResponse {
  answer: string;
  sources: { title: string; source: string }[];
}

export interface IngestResponse {
  processed: number;
  message: string;
}
