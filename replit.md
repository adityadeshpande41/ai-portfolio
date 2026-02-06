# Replit MD

## Overview

This is a personal portfolio website for "Aditya Deshpande" — a premium, modern, AI-powered portfolio showcasing work experience, projects, blog posts, and publications. The site features two signature AI capabilities:

1. **RAG Chatbot** — A floating chat widget (and dedicated chat page) that answers questions about Aditya's resume, work, projects, and skills using Retrieval-Augmented Generation with OpenAI embeddings and chat completions, with source citations.
2. **Voice AI Agent** — A browser-based voice interface that lets users speak to an AI twin using the Web Speech API for input and browser TTS for output.

The stack is a full-stack TypeScript monorepo with a React + Vite frontend and an Express backend, using PostgreSQL with Drizzle ORM for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend

- **Framework:** React 18 with TypeScript, bundled by Vite
- **Routing:** Wouter (lightweight client-side router) with animated page transitions via Framer Motion's `AnimatePresence`
- **Styling:** Tailwind CSS with CSS variables for theming (dark mode by default), shadcn/ui component library (new-york style)
- **State Management:** TanStack React Query for server state; local React state for UI
- **Path Aliases:** `@/` maps to `client/src/`, `@shared/` maps to `shared/`
- **Pages:** Home, About, Experience, Projects, Writing, Contact, Chat (full-page chatbot), VoiceAgent
- **Key Interactive Elements:**
  - Custom cursor with gooey/bubble trail effect (hides default cursor via CSS)
  - Magnetic hover effects on buttons/cards
  - Smooth page transitions with Framer Motion
  - Floating ChatWidget component on all pages (bottom-right)
- **Voice Agent:** Uses browser-native Web Speech API (`SpeechRecognition`) for mic capture and `SpeechSynthesis` for TTS playback — no external voice API required

### Backend

- **Framework:** Express 5 on Node.js, served via `tsx` in development
- **API Design:** Typed API contract defined in `shared/routes.ts` using Zod schemas. Both client and server import from this shared contract for type safety.
- **Key Endpoints:**
  - `POST /api/chat` — RAG chatbot: accepts a message + conversation history, retrieves relevant documents via cosine similarity on embeddings, then calls OpenAI chat completion with context
  - `POST /api/voice/speak` — Voice synthesis endpoint (optional server-side TTS)
  - `POST /api/contact` — Contact form submission
- **RAG Pipeline:** Documents are embedded using OpenAI `text-embedding-3-small`, stored as JSON arrays in PostgreSQL. Search uses naive in-memory cosine similarity (suitable for <10k documents). Seed content is defined in `server/routes.ts`.
- **OpenAI Integration:** Wrapped in `server/lib/openai.ts` — uses `openai` npm package for embeddings and chat completions (model: `gpt-4o-mini`)

### Shared Layer (`shared/`)

- `schema.ts` — Drizzle ORM table definitions and Zod insert schemas for `documents`, `contacts`, and `messages`
- `routes.ts` — Full API contract with Zod input/output schemas, used by both client and server

### Database

- **ORM:** Drizzle ORM with PostgreSQL dialect
- **Connection:** `node-postgres` Pool via `DATABASE_URL` environment variable
- **Schema push:** `npm run db:push` (uses `drizzle-kit push`)
- **Tables:**
  - `documents` — RAG document store with title, source, content, category, metadata (JSONB), and embedding (JSONB array of floats)
  - `contacts` — Contact form submissions (name, email, message)
  - `messages` — Chat history persistence (role, content)
- **Migrations:** Output to `./migrations` directory via drizzle-kit

### Build & Deployment

- **Dev:** `npm run dev` runs `tsx server/index.ts` which sets up Vite dev server as middleware with HMR
- **Build:** `npm run build` runs a custom build script (`script/build.ts`) that:
  1. Builds the client with Vite (output: `dist/public/`)
  2. Bundles the server with esbuild (output: `dist/index.cjs`), externalizing most deps except an allowlist
- **Production:** `npm start` runs `node dist/index.cjs` which serves the static frontend and API

## External Dependencies

### Required Environment Variables
- `DATABASE_URL` — PostgreSQL connection string (must be provisioned)
- `OPENAI_API_KEY` — Required for RAG chatbot embeddings and chat completions. Without it, the OpenAI client instantiates with a dummy key but will throw errors on actual API calls.

### Third-Party Services
- **OpenAI API** — Used for `text-embedding-3-small` embeddings and `gpt-4o-mini` chat completions
- **PostgreSQL** — Primary data store for documents, contacts, and chat messages
- **Web Speech API** — Browser-native speech recognition and synthesis (no external service needed)

### Key NPM Packages
- `express` (v5) — HTTP server
- `drizzle-orm` + `drizzle-kit` — Database ORM and migration tooling
- `openai` — Official OpenAI SDK
- `@tanstack/react-query` — Client-side server state management
- `framer-motion` — Animations and page transitions
- `wouter` — Client-side routing
- `zod` + `drizzle-zod` — Schema validation shared between client and server
- `shadcn/ui` components (Radix UI primitives) — Extensive UI component library
- `connect-pg-simple` — PostgreSQL session store (available but session auth not yet implemented)