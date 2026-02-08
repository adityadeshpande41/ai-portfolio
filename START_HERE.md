# 👋 START HERE - Your Portfolio is Ready!

## ✅ What's Done

Your portfolio has been converted to use **SQLite** - no external database needed!

## 🚀 Quick Start (3 steps)

### 1. Install Dependencies
```bash
npm install
```

### 2. Add Your OpenAI API Key

Edit the `.env` file and replace `sk-your-openai-api-key-here` with your actual key.

Get one here: https://platform.openai.com/api-keys

### 3. Run Everything
```bash
npm run db:push && npm run ingest-resume && npm run dev
```

**Done!** Open http://localhost:5000

---

## 📋 What Each Command Does

```bash
npm run db:push        # Creates the SQLite database (data/portfolio.db)
npm run ingest-resume  # Loads your resume into the vector database
npm run dev            # Starts the development server
```

---

## 🎯 Your Portfolio Features

### Pages
- **Home** (`/`) - Landing page
- **About** (`/about`) - About section
- **Experience** (`/experience`) - Your work history (already updated!)
- **Projects** (`/projects`) - Project showcase
- **Writing** (`/writing`) - Blog posts
- **Chat** (`/chat`) - AI chatbot with RAG
- **Voice** (`/voice`) - Voice conversation with AI
- **Contact** (`/contact`) - Contact form

### AI Features
- **Chatbot**: Ask questions about your experience, skills, achievements
- **Voice Agent**: Talk to your AI twin - it speaks back!
- **Vector Database**: Your resume is searchable by AI

---

## 📝 Customization

### Update Your Resume Data
1. Edit `server/data/resume.ts`
2. Run `npm run ingest-resume`
3. Test the chatbot!

### Add Company Logos
Place logos in `client/public/images/logos/`:
- `sepal-ai.png`
- `sqor-ai.png`
- `cantor-fitzgerald.png`
- `covenant-house.png`
- `barc.png`

### Change Styling
- Edit components in `client/src/pages/`
- Modify `client/src/index.css` for global styles
- Update `tailwind.config.ts` for theme colors

---

## 🗄️ Database (SQLite)

**Location**: `data/portfolio.db`

**Tables**:
- `documents` - Resume embeddings for AI chatbot
- `contacts` - Contact form submissions
- `messages` - Chat history

**Reset Database**:
```bash
rm data/portfolio.db
npm run db:push
npm run ingest-resume
```

---

## 🎤 Voice Agent Details

The voice agent uses:
- **Web Speech API** (browser-based, free!)
- **Speech Recognition** - Listens to you
- **Speech Synthesis** - Speaks responses
- **OpenAI GPT-4** - Generates answers

**Requirements**:
- Chrome, Edge, or Safari browser
- Microphone permissions
- HTTPS or localhost

---

## 💰 Costs

**OpenAI API** (approximate):
- Embeddings: ~$0.002 for full resume ingestion
- Chat: ~$0.001-0.005 per conversation
- Expected: $5-20/month for personal portfolio

**Everything else**: FREE!
- SQLite: Free
- Web Speech API: Free
- Hosting: Many free options (Vercel, Railway, Render)

---

## 🐛 Troubleshooting

### "Cannot find module 'better-sqlite3'"
```bash
npm install
```

### "OPENAI_API_KEY not set"
1. Edit `.env` file
2. Add your OpenAI key
3. Restart server: `npm run dev`

### Chatbot not answering correctly
```bash
npm run ingest-resume
```

### Database errors
```bash
rm data/portfolio.db
npm run db:push
npm run ingest-resume
```

### Voice not working
- Use Chrome, Edge, or Safari
- Allow microphone permissions
- Check browser console for errors

---

## 📚 Documentation

- **SETUP.md** - Detailed setup instructions
- **QUICKSTART.md** - Full feature guide
- **CHATBOT_SETUP.md** - Chatbot documentation
- **server/data/README.md** - Vector database details

---

## 🚀 Deployment

When ready to deploy:

1. Push to GitHub
2. Deploy to Vercel/Railway/Render
3. Set environment variables:
   - `OPENAI_API_KEY`
   - `SESSION_SECRET`
4. Run migrations on production
5. Run ingestion on production

**Recommended Platforms**:
- Vercel (easiest)
- Railway (full-stack)
- Render (full-stack)
- Fly.io (full-stack)

---

## ✨ Next Steps

1. ✅ Run `npm install`
2. ✅ Add OpenAI key to `.env`
3. ✅ Run `npm run db:push && npm run ingest-resume && npm run dev`
4. 🎨 Customize content and styling
5. 📸 Add company logos
6. 🚀 Deploy to production
7. 🎉 Share your portfolio!

---

**Questions?** Check the docs or review the code - it's well commented!

**Ready to start?** Run the 3 commands above! 🚀
