# Vector Database Setup for AI Chatbot

This directory contains the resume data that powers the AI chatbot on your portfolio website.

## Overview

The chatbot uses a **RAG (Retrieval Augmented Generation)** system with:
- **Vector Database**: Stores embeddings of your resume content
- **OpenAI Embeddings**: Converts text to vector representations
- **Semantic Search**: Finds relevant context based on user questions
- **LLM Response**: Generates natural answers using GPT-4

## How It Works

1. **Ingestion**: Resume data is converted to embeddings and stored in PostgreSQL
2. **Query**: User asks a question → converted to embedding
3. **Search**: Find most similar resume content using cosine similarity
4. **Generate**: LLM uses retrieved context to answer the question

## Setup Instructions

### 1. Set OpenAI API Key

Make sure you have your OpenAI API key set in your environment:

```bash
export OPENAI_API_KEY="sk-..."
```

Or add it to your `.env` file:

```
OPENAI_API_KEY=sk-...
```

### 2. Initialize Database

Make sure your database is set up:

```bash
npm run db:push
```

### 3. Ingest Resume Data

Run the ingestion script to populate the vector database:

```bash
npm run ingest-resume
```

This will:
- Clear existing documents
- Process all resume items in `resume.ts`
- Generate embeddings using OpenAI
- Store them in the database

You should see output like:
```
🚀 Starting resume data ingestion...
📄 Total items to process: 15
✅ Success
...
🎉 Resume data successfully ingested into vector database!
```

### 4. Test the Chatbot

Start your development server:

```bash
npm run dev
```

Navigate to the Chat page and try asking questions like:
- "What is Aditya's current role?"
- "Tell me about his experience with AI"
- "What technologies does he work with?"
- "What are his key achievements?"

## Updating Resume Data

To update the chatbot's knowledge:

1. Edit `server/data/resume.ts`
2. Add, modify, or remove entries
3. Run `npm run ingest-resume` again

### Resume Data Structure

Each entry should have:

```typescript
{
  title: string;        // Short descriptive title
  source: string;       // Category/source identifier
  category: string;     // Type: bio, experience, skills, etc.
  content: string;      // The actual content (will be embedded)
}
```

### Best Practices

- **Be specific**: Include metrics, dates, and concrete details
- **Be comprehensive**: Cover all aspects you want the chatbot to know
- **Use natural language**: Write as if explaining to a person
- **Avoid redundancy**: Each entry should cover unique information
- **Keep it current**: Update regularly as you gain new experience

## Categories

Current categories in the resume data:

- `bio` - Personal information and summary
- `experience` - Work experience and roles
- `skills` - Technical skills and expertise
- `achievements` - Key accomplishments and metrics
- `expertise` - Domain knowledge and focus areas
- `education` - Academic background and research
- `leadership` - Management and team experience
- `industries` - Industry sectors worked in
- `personal` - Location and preferences

## API Endpoints

### Chat Endpoint
```
POST /api/chat
Body: { message: string, history: Array<{role, content}> }
Response: { answer: string, sources: Array<{title, source}> }
```

### Ingest Endpoint
```
POST /api/ingest
Response: { processed: number, total: number, message: string }
```

## Troubleshooting

### "OPENAI_API_KEY not set" error
- Make sure your API key is properly set in environment variables
- Restart your development server after setting the key

### No results or poor answers
- Check if data was ingested: Look for documents in the database
- Try re-running the ingestion script
- Verify your OpenAI API key has sufficient credits

### Slow responses
- Embeddings API calls take 1-2 seconds
- Consider caching frequently asked questions
- For production, use a proper vector database like Pinecone or Weaviate

## Production Considerations

For production deployment:

1. **Use a dedicated vector database** (Pinecone, Weaviate, Qdrant)
2. **Cache embeddings** to avoid regenerating on every query
3. **Implement rate limiting** on the chat endpoint
4. **Add authentication** if needed
5. **Monitor API usage** and costs
6. **Set up error tracking** (Sentry, etc.)

## Cost Estimation

OpenAI API costs (approximate):
- Embeddings: $0.0001 per 1K tokens (~$0.002 for full resume ingestion)
- GPT-4 Mini: $0.15 per 1M input tokens, $0.60 per 1M output tokens
- Typical chat: ~$0.001-0.005 per conversation

For a personal portfolio with moderate traffic, expect $5-20/month.
