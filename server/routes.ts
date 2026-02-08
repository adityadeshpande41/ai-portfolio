import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { openai } from "./lib/openai";
import { z } from "zod";
import { resumeData } from "./data/resume";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Rate limiting map (in-memory, for production use Redis)
  const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
  
  // Usage tracking for monitoring costs
  const usageStats = {
    chatRequests: 0,
    ttsRequests: 0,
    totalTokens: 0,
    lastReset: Date.now()
  };

  // Log usage stats every hour
  setInterval(() => {
    console.log("📊 API Usage Stats:", {
      ...usageStats,
      hoursSinceReset: ((Date.now() - usageStats.lastReset) / 3600000).toFixed(2)
    });
  }, 3600000); // Every hour
  
  // Rate limiting middleware
  const rateLimit = (maxRequests: number, windowMs: number) => {
    return (req: any, res: any, next: any) => {
      const ip = req.ip || req.connection.remoteAddress;
      const now = Date.now();
      
      const userLimit = rateLimitMap.get(ip);
      
      if (!userLimit || now > userLimit.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
        return next();
      }
      
      if (userLimit.count >= maxRequests) {
        return res.status(429).json({ 
          message: "Too many requests. Please try again later.",
          retryAfter: Math.ceil((userLimit.resetTime - now) / 1000)
        });
      }
      
      userLimit.count++;
      next();
    };
  };

  // Content validation
  const validateContent = (text: string): { valid: boolean; reason?: string } => {
    // Check length
    if (text.length > 1000) {
      return { valid: false, reason: "Message too long. Please keep it under 1000 characters." };
    }
    
    if (text.length < 2) {
      return { valid: false, reason: "Message too short." };
    }
    
    // Check for spam patterns
    const spamPatterns = [
      /(.)\1{10,}/i, // Repeated characters
      /https?:\/\//gi, // URLs (multiple)
      /\b(buy|sell|click here|limited time|act now)\b/gi, // Spam keywords
    ];
    
    for (const pattern of spamPatterns) {
      if (pattern.test(text)) {
        return { valid: false, reason: "Message contains inappropriate content." };
      }
    }
    
    return { valid: true };
  };

  // Chat Endpoint with guardrails
  app.post(api.chat.sendMessage.path, rateLimit(20, 60000), async (req, res) => {
    try {
      const { message, history } = api.chat.sendMessage.input.parse(req.body);

      // Validate message content
      const validation = validateContent(message);
      if (!validation.valid) {
        return res.status(400).json({ message: validation.reason });
      }

      // Validate history length
      if (history && history.length > 10) {
        return res.status(400).json({ message: "Conversation history too long." });
      }

      // Quick greeting detection for faster response
      const greetings = /^(hi|hello|hey|greetings|good morning|good afternoon|good evening|howdy|what's up|whats up|sup)[\s!?.]*$/i;
      const howAreYou = /^(hi|hello|hey)[\s,]*(how are you|how are u|how r u|how're you|whats up|what's up|sup)[\s!?.]*$/i;
      const whoAreYou = /^(who are you|who r u|what are you|what r u|tell me about yourself)[\s!?.]*$/i;
      
      // Off-topic detection - only block clearly unrelated topics
      const offTopicPatterns = [
        /\b(weather|forecast|temperature|rain|snow)\b/i,
        /\b(news|breaking news|current events|politics|election|president|government policy)\b/i,
        /\b(sports|football|basketball|soccer|baseball|game score|match result)\b/i,
        /^(write|create|build|code|develop)\s+(a|an|some)\s+(function|program|script|app|website|code)\s+(for me|to help|that)/i,
        /^(help me|can you help|assist me)\s+(with|solve|fix)\s+(my|a|an)\s+(homework|assignment|bug|error|code problem)/i,
        /^(solve|calculate|compute)\s+(this|the|my)\s+(math|equation|problem|calculation)/i,
        /\b(recipe|cooking|food recipe|how to cook|restaurant recommendation)\b/i,
        /\b(movie|tv show|netflix|entertainment|celebrity gossip)\b/i,
        /\b(dating advice|relationship|personal life|family issues)\b/i,
      ];
      
      for (const pattern of offTopicPatterns) {
        if (pattern.test(message.trim())) {
          return res.json({
            answer: "I'm specifically designed to answer questions about Aditya's background, work experience, skills, and projects. Please ask me about his professional profile!",
            sources: []
          });
        }
      }
      
      if (greetings.test(message.trim())) {
        const greetingResponse = "Hi! I'm Aditya's AI assistant. I can tell you about my work experience, technical skills, projects, and background. What would you like to know?";
        return res.json({
          answer: greetingResponse,
          sources: []
        });
      }
      
      if (howAreYou.test(message.trim())) {
        const response = "I'm doing great, thanks for asking! I'm here to tell you about Aditya's work in AI, data engineering, and product. What would you like to know?";
        return res.json({
          answer: response,
          sources: []
        });
      }
      
      if (whoAreYou.test(message.trim())) {
        const response = "I'm Aditya Deshpande's AI assistant! I can share details about my work at companies like Sepal AI and Sqor AI, my technical skills in LLMs and RAG, and my projects. What interests you?";
        return res.json({
          answer: response,
          sources: []
        });
      }

      // 1. Get embedding for query
      let embedding: number[];
      try {
        embedding = await openai.getEmbedding(message);
      } catch (error) {
        console.error("OpenAI Embedding Error:", error);
        return res.status(500).json({ message: "Failed to generate embedding. Check API Key." });
      }

      // 2. Search for relevant context (5 documents for comprehensive coverage)
      const results = await storage.searchDocuments(embedding, 5);
      const context = results.map(r => r.document.content).join("\n\n");

      // 3. Intelligent prompt for natural conversations
      const systemPrompt = `You are Aditya Deshpande's AI assistant. You represent Aditya in professional conversations.

YOUR PERSONALITY:
- Confident and knowledgeable about Aditya's work
- Conversational and engaging, not robotic
- Enthusiastic about AI, data, and building products
- Answer in first person (I/my) as if you ARE Aditya

INTELLIGENCE GUIDELINES:
- Answer ANY career-related question intelligently using the context
- If asked about preferences/favorites without explicit data, make intelligent inferences from the context
- Connect different pieces of information to give comprehensive answers
- If asked about skills/technologies, mention relevant projects that demonstrate them
- If asked about experience, highlight the most impressive or relevant work
- Keep responses VERY concise (1-2 sentences max for voice speed)
- Be natural - avoid phrases like "according to my data" or "I don't have that information"

CONTEXT ABOUT ADITYA:
${context}

Remember: You're having a natural conversation. Be smart, be confident, be helpful.`;

      const messages: { role: "system" | "user" | "assistant"; content: string }[] = [
        { role: "system", content: systemPrompt },
        ...history.map(h => ({ role: h.role, content: h.content })),
        { role: "user", content: message }
      ];

      // 4. Call LLM with optimized token limit for voice speed
      const answer = await openai.chat(messages, 70, "gpt-4o-mini"); // 70 tokens for faster TTS
      
      // Track usage
      usageStats.chatRequests++;

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
      for (const item of resumeData) {
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

      res.json({ processed: count, total: resumeData.length, message: "Resume data ingestion complete" });
    } catch (error) {
      console.error("Ingest Error:", error);
      res.status(500).json({ message: "Ingestion failed" });
    }
  });

  // Contact Endpoint - Send Email
  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      
      // Send email instead of storing in database
      const { emailService } = await import("./lib/email");
      await emailService.sendContactEmail(input);
      
      res.json({ success: true, message: "Email sent successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      console.error("Email send error:", error);
      res.status(500).json({ message: "Failed to send email. Please try again." });
    }
  });

  // Voice Endpoint - Text to Speech using OpenAI with guardrails
  app.post("/api/voice/tts", rateLimit(30, 60000), async (req, res) => {
    try {
      const { text } = req.body;
      
      if (!text) {
        return res.status(400).json({ message: "Text is required" });
      }

      // Validate TTS content
      const validation = validateContent(text);
      if (!validation.valid) {
        return res.status(400).json({ message: validation.reason });
      }

      // Additional TTS-specific limits
      if (text.length > 500) {
        return res.status(400).json({ message: "Text too long for speech synthesis. Maximum 500 characters." });
      }

      // Call OpenAI TTS API with faster model
      const response = await fetch("https://api.openai.com/v1/audio/speech", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "tts-1", // Faster model with lower latency
          voice: "onyx", // Deep male voice
          input: text,
          speed: 1.2 // Faster speech for quicker responses
        }),
      });

      if (!response.ok) {
        throw new Error("OpenAI TTS API error");
      }

      // Stream the audio back to client
      res.setHeader("Content-Type", "audio/mpeg");
      const audioBuffer = await response.arrayBuffer();
      
      // Track usage
      usageStats.ttsRequests++;
      
      res.send(Buffer.from(audioBuffer));

    } catch (error) {
      console.error("TTS Error:", error);
      res.status(500).json({ message: "Text-to-speech failed" });
    }
  });

  return httpServer;
}
