# AI Chatbot Setup Guide

Your portfolio now includes an AI-powered chatbot that can answer questions about your experience, skills, and achievements using a vector database and RAG (Retrieval Augmented Generation).

## Quick Start

### 1. Set Your OpenAI API Key

```bash
export OPENAI_API_KEY="sk-your-key-here"
```

Or create a `.env` file in the root directory:
```
OPENAI_API_KEY=sk-your-key-here
```

### 2. Initialize the Database

```bash
npm run db:push
```

### 3. Ingest Your Resume Data

```bash
npm run ingest-resume
```

This will populate the vector database with your resume information.

### 4. Start the Development Server

```bash
npm run dev
```

### 5. Test the Chatbot

Navigate to the Chat page (`/chat`) and try asking:
- "What is your current role?"
- "Tell me about your experience at Sepal AI"
- "What AI technologies do you work with?"
- "What are your key achievements?"
- "Tell me about your work at Cantor Fitzgerald"

## What's Included

### Resume Data (`server/data/resume.ts`)

Your comprehensive resume data has been structured into 15 categories:

1. **Personal Bio** - Overview and summary
2. **Work Experience** - All 5 positions:
   - Sepal AI (Current)
   - Sqor AI
   - Cantor Fitzgerald
   - Covenant House
   - BARC
3. **Technical Skills** - AI/ML, Programming, Cloud
4. **Achievements** - Metrics and impact
5. **Domain Expertise** - Specializations
6. **Education & Research** - Academic background
7. **Leadership** - Project management experience
8. **Industries** - Sectors you've worked in
9. **Location** - Work preferences

### How It Works

1. **Vector Database**: Your resume is stored as embeddings in PostgreSQL
2. **Semantic Search**: When someone asks a question, it finds the most relevant resume sections
3. **AI Response**: GPT-4 generates a natural, conversational answer using the retrieved context
4. **Source Attribution**: Shows which parts of your resume were used to answer

### Architecture

```
User Question
    ↓
Convert to Embedding (OpenAI)
    ↓
Search Vector DB (Cosine Similarity)
    ↓
Retrieve Top 3 Relevant Sections
    ↓
Generate Answer (GPT-4 + Context)
    ↓
Return Answer + Sources
```

## Customization

### Update Your Resume Data

Edit `server/data/resume.ts` to:
- Add new experiences
- Update achievements
- Add new skills
- Modify descriptions

Then re-run:
```bash
npm run ingest-resume
```

### Adjust AI Personality

Edit the system prompt in `server/routes.ts` (line ~40) to change how the AI responds:
- Tone (formal vs casual)
- Response length
- Level of detail
- Personality traits

### Change Search Parameters

In `server/routes.ts`, adjust:
- `limit: 3` - Number of relevant sections to retrieve
- Similarity threshold
- Context formatting

## API Endpoints

### Chat
```
POST /api/chat
Body: {
  message: string,
  history: Array<{ role: 'user' | 'assistant', content: string }>
}
Response: {
  answer: string,
  sources: Array<{ title: string, source: string }>
}
```

### Manual Ingestion (Development)
```
POST /api/ingest
Response: {
  processed: number,
  total: number,
  message: string
}
```

## Troubleshooting

### Chatbot gives generic answers
- Make sure you ran `npm run ingest-resume`
- Check that your OpenAI API key is valid
- Verify data was inserted: Check your database

### "OPENAI_API_KEY not set" error
- Set the environment variable
- Restart your development server

### Slow responses
- Normal: Embedding + LLM calls take 2-3 seconds
- Check your internet connection
- Verify OpenAI API status

## Cost Considerations

Approximate costs per month (moderate usage):
- **Embeddings**: ~$0.50 (one-time ingestion + occasional updates)
- **Chat completions**: ~$5-15 (depends on traffic)
- **Total**: ~$5-20/month for a personal portfolio

Each chat interaction costs approximately $0.001-0.005.

## Production Deployment

Before deploying to production:

1. ✅ Set `OPENAI_API_KEY` in your hosting environment
2. ✅ Run database migrations
3. ✅ Run ingestion script on production database
4. ⚠️ Consider rate limiting the chat endpoint
5. ⚠️ Add error tracking (Sentry, etc.)
6. ⚠️ Monitor API usage and costs
7. 💡 Consider upgrading to a dedicated vector DB (Pinecone, Weaviate)

## Next Steps

1. **Test thoroughly**: Ask various questions to ensure good coverage
2. **Add more data**: Include projects, blog posts, or other content
3. **Refine responses**: Adjust the system prompt based on feedback
4. **Monitor usage**: Track which questions are asked most
5. **Iterate**: Update resume data as you gain new experience

## Support

For issues or questions:
- Check `server/data/README.md` for detailed documentation
- Review the code in `server/routes.ts` and `server/storage.ts`
- Test with the ingestion script: `npm run ingest-resume`

---

**Your AI chatbot is now ready to represent you! 🚀**
