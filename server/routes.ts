import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { openai } from "./lib/openai";
import { z } from "zod";

// Seed content for the portfolio
const SEED_CONTENT = [
  {
    title: "About Aditya Deshpande",
    source: "about.md",
    category: "bio",
    content: "Aditya Deshpande is an expert full-stack engineer and product designer. He specializes in building high-performance web applications using Next.js, React, and Node.js. He has a passion for AI and has built several RAG-based applications. He focuses on premium design, clean typography, and micro-interactions."
  },
  {
    title: "Project: AI Portfolio",
    source: "projects/portfolio.md",
    category: "project",
    content: "Built a personal portfolio website with a RAG chatbot and Voice AI agent. Stack: React, Tailwind CSS, Express, OpenAI, PostgreSQL. The project features a custom 'gooey' cursor, magnetic buttons, and a fully functional vector search engine built from scratch."
  },
  {
    title: "Project: E-commerce Dashboard",
    source: "projects/dashboard.md",
    category: "project",
    content: "Developed a comprehensive analytics dashboard for e-commerce stores. Features real-time sales tracking, inventory management, and AI-powered sales forecasting. Stack: Vue.js, D3.js, Python/Django."
  },
  {
    title: "Experience: Senior Engineer at TechCorp",
    source: "experience.md",
    category: "experience",
    content: "2021-Present: Senior Full Stack Engineer at TechCorp. Led the migration of the legacy monolith to microservices. improved system uptime by 99.9%. Mentored junior developers and introduced automated testing pipelines."
  },
  {
    title: "Blog: The Future of AI in Web Dev",
    source: "blog/ai-future.md",
    category: "blog",
    content: "Artificial Intelligence is transforming how we build for the web. From code generation to dynamic UI generation, AI is becoming a co-pilot. In this post, I explore how LLMs can be used to create personalized user experiences on the fly."
  }
];

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Chat Endpoint
  app.post(api.chat.sendMessage.path, async (req, res) => {
    try {
      const { message, history } = api.chat.sendMessage.input.parse(req.body);

      // 1. Get embedding for query
      let embedding: number[];
      try {
        embedding = await openai.getEmbedding(message);
      } catch (error) {
        console.error("OpenAI Embedding Error:", error);
        return res.status(500).json({ message: "Failed to generate embedding. Check API Key." });
      }

      // 2. Search for relevant context
      const results = await storage.searchDocuments(embedding, 3);
      const context = results.map(r => `[Source: ${r.document.title}]\n${r.document.content}`).join("\n\n");

      // 3. Construct prompt
      const systemPrompt = `You are an AI assistant for Aditya Deshpande's portfolio website. 
      Your goal is to answer questions about Aditya's work, experience, and skills based ONLY on the provided context.
      
      If the answer is not in the context, say "I don't have that information in my knowledge base, but I can tell you about Aditya's known projects and experience."
      
      Be professional, enthusiastic, and concise.
      
      Context:
      ${context}
      `;

      const messages: { role: "system" | "user" | "assistant"; content: string }[] = [
        { role: "system", content: systemPrompt },
        ...history.map(h => ({ role: h.role, content: h.content })),
        { role: "user", content: message }
      ];

      // 4. Call LLM
      const answer = await openai.chat(messages);

      // 5. Return response with sources
      res.json({
        answer,
        sources: results.map(r => ({ title: r.document.title, source: r.document.source }))
      });

    } catch (error) {
      console.error("Chat Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Ingest Endpoint (Simple protection or dev-only)
  app.post(api.ingest.run.path, async (req, res) => {
    try {
      // In a real app, protect this. Here we just run it.
      await storage.clearDocuments();

      let count = 0;
      for (const item of SEED_CONTENT) {
        try {
          const embedding = await openai.getEmbedding(item.content);
          await storage.insertDocument({
            ...item,
            embedding,
            metadata: {}
          });
          count++;
        } catch (e) {
          console.error(`Failed to ingest ${item.title}:`, e);
        }
      }

      res.json({ processed: count, message: "Ingestion complete" });
    } catch (error) {
      console.error("Ingest Error:", error);
      res.status(500).json({ message: "Ingestion failed" });
    }
  });

  // Contact Endpoint
  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      const contact = await storage.createContact(input);
      res.json(contact);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });

  // Voice Endpoint (Proxy to Chat essentially, but handles the specific voice response logic if needed)
  // For now, the frontend uses STT and then calls /api/chat. 
  // We can add a specific voice endpoint if we were doing server-side STT/TTS, but the requirement allowed Web Speech API.
  // The user asked for "Option 1 (preferred): Web Speech API...". So no special backend needed beyond chat.

  return httpServer;
}
