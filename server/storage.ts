import { db } from "./db";
import {
  documents, contacts, messages,
  type InsertDocument, type InsertContact, type InsertMessage,
  type Document, type Contact, type Message
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // RAG
  insertDocument(doc: InsertDocument): Promise<Document>;
  searchDocuments(embedding: number[], limit?: number): Promise<{ document: Document; score: number }[]>;
  getAllDocuments(): Promise<Document[]>; // For rebuilding cache if needed
  clearDocuments(): Promise<void>;

  // Contact
  createContact(contact: InsertContact): Promise<Contact>;

  // Chat History (Optional)
  addMessage(msg: InsertMessage): Promise<Message>;
  getMessages(limit?: number): Promise<Message[]>;
}

export class DatabaseStorage implements IStorage {
  async insertDocument(doc: InsertDocument): Promise<Document> {
    const [document] = await db.insert(documents).values(doc).returning();
    return document;
  }

  async getAllDocuments(): Promise<Document[]> {
    return await db.select().from(documents);
  }

  async clearDocuments(): Promise<void> {
    await db.delete(documents);
  }

  // Naive in-memory cosine similarity (robust for <10k docs)
  async searchDocuments(queryEmbedding: number[], limit = 3): Promise<{ document: Document; score: number }[]> {
    const docs = await this.getAllDocuments();
    
    const scored = docs.map(doc => {
      const embedding = doc.embedding as number[];
      const score = this.cosineSimilarity(queryEmbedding, embedding);
      return { document: doc, score };
    });

    // Sort descending by score
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, limit);
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const [newContact] = await db.insert(contacts).values(contact).returning();
    return newContact;
  }

  async addMessage(msg: InsertMessage): Promise<Message> {
    const [message] = await db.insert(messages).values(msg).returning();
    return message;
  }

  async getMessages(limit = 50): Promise<Message[]> {
    return await db.select()
      .from(messages)
      .orderBy(desc(messages.createdAt))
      .limit(limit);
  }

  private cosineSimilarity(vecA: number[], vecB: number[]): number {
    if (vecA.length !== vecB.length) return 0;
    let dot = 0.0;
    let normA = 0.0;
    let normB = 0.0;
    for (let i = 0; i < vecA.length; i++) {
      dot += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }
    if (normA === 0 || normB === 0) return 0;
    return dot / (Math.sqrt(normA) * Math.sqrt(normB));
  }
}

export const storage = new DatabaseStorage();
