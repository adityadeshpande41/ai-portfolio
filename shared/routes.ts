import { z } from 'zod';
import { insertContactSchema, documents, contacts } from './schema';

// ============================================
// API CONTRACT
// ============================================
export const api = {
  chat: {
    sendMessage: {
      method: 'POST' as const,
      path: '/api/chat',
      input: z.object({
        message: z.string(),
        history: z.array(z.object({
          role: z.enum(['user', 'assistant']),
          content: z.string()
        })).optional().default([])
      }),
      responses: {
        200: z.object({
          answer: z.string(),
          sources: z.array(z.object({
            title: z.string(),
            source: z.string()
          }))
        }),
        429: z.object({ message: z.string() }), // Rate limit
        500: z.object({ message: z.string() })
      }
    }
  },
  voice: {
    speak: {
      method: 'POST' as const,
      path: '/api/voice/speak',
      input: z.object({
        text: z.string()
      }),
      responses: {
        200: z.any(), // Returns audio stream
        500: z.object({ message: z.string() })
      }
    }
  },
  contact: {
    submit: {
      method: 'POST' as const,
      path: '/api/contact',
      input: insertContactSchema,
      responses: {
        200: z.custom<typeof contacts.$inferSelect>(),
        400: z.object({ message: z.string() })
      }
    }
  },
  ingest: {
    run: {
      method: 'POST' as const,
      path: '/api/ingest',
      input: z.object({}), // Protected by internal check or simple token if needed
      responses: {
        200: z.object({
          processed: z.number(),
          message: z.string()
        })
      }
    }
  }
};

// ============================================
// SHARED ERROR SCHEMAS
// ============================================
export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

// ============================================
// HELPER
// ============================================
export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
