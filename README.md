# AI Portfolio Website

A modern, interactive portfolio website featuring an AI chatbot with RAG (Retrieval-Augmented Generation), voice agent capabilities, and vector database integration.

## 🚀 Features

- **AI Chatbot**: Conversational AI assistant powered by OpenAI with RAG for accurate responses about professional background
- **Voice Agent**: Real-time voice conversations with text-to-speech and speech recognition
- **Vector Search**: SQLite-based vector database for semantic search
- **Interactive UI**: Modern, responsive design with smooth animations
- **Contact System**: Email integration for direct communication
- **Resume Management**: Role-specific resume delivery system

## 🛠️ Tech Stack

**Frontend:**
- React + TypeScript
- Vite
- TailwindCSS
- Framer Motion
- Shadcn/ui components

**Backend:**
- Node.js + Express
- SQLite with vector embeddings
- OpenAI API (GPT-4, Embeddings, TTS)
- Drizzle ORM

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenAI API key
- Gmail App Password (for contact form)

## 🔧 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in the root directory:
```env
OPENAI_API_KEY=your_openai_api_key_here
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=your_gmail_app_password
```

4. Initialize the database and ingest resume data:
```bash
npm run db:push
npm run ingest
```

5. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3001`

## 📦 Deployment

### Render Deployment

1. Push your code to GitHub
2. Create a new Web Service on Render
3. Connect your GitHub repository
4. Configure:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment Variables**: Add `OPENAI_API_KEY`, `GMAIL_USER`, `GMAIL_APP_PASSWORD`
5. Deploy!

## 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | Your OpenAI API key for GPT and embeddings |
| `GMAIL_USER` | Gmail address for contact form |
| `GMAIL_APP_PASSWORD` | Gmail app-specific password |

## 📝 Project Structure

```
├── client/              # Frontend React app
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── hooks/       # Custom React hooks
│   │   └── lib/         # Utilities
├── server/              # Backend Express server
│   ├── data/            # Resume data and content
│   ├── lib/             # OpenAI and email services
│   ├── scripts/         # Database ingestion scripts
│   └── routes.ts        # API endpoints
├── shared/              # Shared types and schemas
└── data/                # SQLite database files
```

## 🤖 AI Features

### Chatbot
- RAG-powered responses using vector similarity search
- Context-aware conversations with message history
- Role-specific resume delivery
- Conversational contact form flow

### Voice Agent
- Real-time speech recognition
- OpenAI TTS with male voice (onyx)
- Optimized for low latency
- Intelligent response generation

## 📧 Contact Form

The contact form sends emails directly using Gmail SMTP. To set up:

1. Enable 2-factor authentication on your Gmail account
2. Generate an app-specific password
3. Add credentials to `.env` file

## 🔒 Security

- Rate limiting on API endpoints
- Content validation and spam detection
- Environment variables for sensitive data
- Input sanitization

## 📄 License

MIT License - feel free to use this as a template for your own portfolio!

## 👤 Author

**Aditya Deshpande**
- Portfolio: [aditya.ai](https://aditya.ai)
- Email: amdnyu@gmail.com
- LinkedIn: [Your LinkedIn]
- GitHub: [Your GitHub]

## 🙏 Acknowledgments

- OpenAI for GPT and TTS APIs
- Shadcn for beautiful UI components
- The open-source community
