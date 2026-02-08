# 🚀 Super Quick Setup - SQLite Version

Your portfolio now uses **SQLite** - no external database needed!

## Setup in 3 Commands:

```bash
# 1. Install dependencies
npm install

# 2. Create .env file with your OpenAI key
echo 'OPENAI_API_KEY="sk-your-key-here"' > .env
echo 'SESSION_SECRET="random-secret-123"' >> .env

# 3. Initialize database and start
npm run db:push && npm run ingest-resume && npm run dev
```

That's it! Open **http://localhost:5000**

---

## What Changed?

✅ **No PostgreSQL needed** - Uses SQLite (local file database)  
✅ **No external services** - Everything runs locally  
✅ **Zero configuration** - Database created automatically  
✅ **Same features** - Chatbot, Voice Agent, everything works!

## Where is the Database?

The SQLite database is stored at: `data/portfolio.db`

This file contains:
- Your resume embeddings (vector database)
- Contact form submissions
- Chat history

## Manual Steps (if you prefer):

### 1. Install
```bash
npm install
```

### 2. Create .env
Create a `.env` file with:
```
OPENAI_API_KEY=sk-your-actual-key-here
SESSION_SECRET=any-random-string
```

Get your OpenAI key: https://platform.openai.com/api-keys

### 3. Initialize Database
```bash
npm run db:push
```

### 4. Load Resume Data
```bash
npm run ingest-resume
```

### 5. Start Server
```bash
npm run dev
```

## Testing

Visit these pages:
- **Home**: http://localhost:5000
- **Chat**: http://localhost:5000/chat
- **Voice**: http://localhost:5000/voice
- **Experience**: http://localhost:5000/experience

## Troubleshooting

**"Cannot find module 'better-sqlite3'"**
- Run: `npm install`

**"OPENAI_API_KEY not set"**
- Add your key to `.env` file
- Restart the server

**Chatbot not working**
- Run: `npm run ingest-resume`
- Check your OpenAI API key is valid

**Database errors**
- Delete `data/portfolio.db`
- Run: `npm run db:push` again

## What's Next?

1. ✅ Get it running
2. 📝 Update `server/data/resume.ts` with your info
3. 🔄 Run `npm run ingest-resume` to update chatbot
4. 🎨 Customize styling and content
5. 📸 Add company logos to `client/public/images/logos/`
6. 🚀 Deploy!

---

**Need help?** Check `QUICKSTART.md` for detailed docs.
