# Quick Start Guide - Portfolio Website

Get your portfolio running on localhost in 5 minutes!

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- OpenAI API key (for chatbot)

**That's it!** No database setup needed - SQLite is used automatically.

## Step-by-Step Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
# OpenAI API Key (required for chatbot)
OPENAI_API_KEY="sk-your-openai-api-key-here"

# Session Secret (any random string)
SESSION_SECRET="your-random-secret-key-here"
```

**That's it!** The SQLite database will be created automatically in the `data/` folder.

### 3. Initialize Database

Push the database schema (creates the SQLite database):

```bash
npm run db:push
```

This creates `data/portfolio.db` with all necessary tables.

### 4. Ingest Resume Data (For Chatbot)

Populate the vector database with your resume:

```bash
npm run ingest-resume
```

You should see:
```
🚀 Starting resume data ingestion...
📄 Total items to process: 15
✅ Success
...
🎉 Resume data successfully ingested!
```

### 5. Start Development Server

```bash
npm run dev
```

The server will start on **http://localhost:5000** (or the port shown in terminal)

### 6. Open in Browser

Navigate to: **http://localhost:5000**

## What You'll See

Your portfolio includes these pages:

- **Home** (`/`) - Landing page with hero section
- **About** (`/about`) - About you section
- **Experience** (`/experience`) - Work experience timeline with your actual resume
- **Projects** (`/projects`) - Your projects showcase
- **Writing** (`/writing`) - Blog posts or articles
- **Chat** (`/chat`) - AI chatbot powered by RAG + OpenAI
- **Voice Agent** (`/voice`) - Voice conversation with AI (uses Web Speech API)
- **Contact** (`/contact`) - Contact form

## Testing the Features

### Test the Chatbot

1. Go to `/chat`
2. Try asking:
   - "What is your current role?"
   - "Tell me about your experience at Sepal AI"
   - "What AI technologies do you work with?"
   - "What are your key achievements?"

### Test the Voice Agent

1. Go to `/voice`
2. Click the microphone button
3. Speak your question (e.g., "Tell me about your background")
4. The AI will respond with voice!

**Note**: Voice features require:
- HTTPS (or localhost)
- Browser with Web Speech API support (Chrome, Edge, Safari)
- Microphone permissions

## Troubleshooting

### "OPENAI_API_KEY not set"
- Add your OpenAI API key to `.env`
- Get one at: https://platform.openai.com/api-keys
- Restart the dev server after adding

### Chatbot gives generic answers
- Run `npm run ingest-resume` to populate the vector database
- Check that ingestion completed successfully
- Verify your OpenAI API key has credits

### Database errors
- Delete `data/portfolio.db` and run `npm run db:push` again
- Make sure the `data/` directory exists

### Voice agent not working
- Use Chrome, Edge, or Safari (best support)
- Allow microphone permissions
- Must be on localhost or HTTPS

### Port already in use
- Change the port in `server/index.ts`
- Or kill the process using the port

## Project Structure

```
├── client/               # Frontend React app
│   ├── src/
│   │   ├── pages/       # All pages (Home, Chat, Voice, etc.)
│   │   ├── components/  # Reusable components
│   │   └── hooks/       # Custom hooks (use-chat, use-voice)
│   └── public/          # Static assets
├── server/              # Backend Express server
│   ├── routes.ts        # API endpoints
│   ├── storage.ts       # Database operations
│   ├── lib/openai.ts    # OpenAI integration
│   ├── data/resume.ts   # Your resume data
│   └── scripts/         # Utility scripts
└── shared/              # Shared types and schemas
```

## Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run db:push          # Push database schema
npm run ingest-resume    # Ingest resume data into vector DB
npm run check            # TypeScript type checking
```

## Customization

### Update Your Resume Data

1. Edit `server/data/resume.ts`
2. Add/modify your experience, skills, achievements
3. Run `npm run ingest-resume` to update the chatbot

### Change Styling

- Edit Tailwind classes in components
- Modify `client/src/index.css` for global styles
- Update colors in `tailwind.config.ts`

### Add Company Logos

Place logo images in `client/public/images/logos/`:
- `sepal-ai.png`
- `sqor-ai.png`
- `cantor-fitzgerald.png`
- `covenant-house.png`
- `barc.png`

### Modify AI Personality

Edit the system prompt in `server/routes.ts` (around line 40) to change how the AI responds.

## Production Deployment

When ready to deploy:

1. Set environment variables on your hosting platform
2. Run `npm run build`
3. Run `npm run ingest-resume` on production database
4. Start with `npm run start`

**Recommended Platforms:**
- Vercel (frontend + serverless)
- Railway (full-stack)
- Render (full-stack)
- Fly.io (full-stack)

## Need Help?

- Check `CHATBOT_SETUP.md` for detailed chatbot documentation
- Check `server/data/README.md` for vector database details
- Review the code comments in key files

## Next Steps

1. ✅ Get it running locally
2. 📝 Update resume data with your actual information
3. 🎨 Customize colors and styling
4. 📸 Add your company logos
5. 🚀 Deploy to production
6. 🎉 Share your portfolio!

---

**Your portfolio is ready! Start the dev server and explore.** 🚀
