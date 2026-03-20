# 🌌 CosmosAI — Your AI Guide to the Universe

An AI-powered space and astronomy chatbot with a stunning cosmic-themed UI. Ask about planets, stars, black holes, NASA missions, and the deepest mysteries of the universe.

![CosmosAI Landing Page](./docs/landing.png)

## ✨ Features

- **🤖 AI-Powered Chat** — Powered by Groq AI (Llama 3), purpose-built for space & astronomy
- **🌠 Immersive Starfield** — Canvas-based animated background with twinkling stars, parallax, and shooting stars
- **💬 Streaming Responses** — Real-time text streaming for a natural conversation feel
- **🎨 Cosmic Design System** — Glass-morphism, nebula gradients, and custom animations
- **📱 Fully Responsive** — Mobile-first design that works beautifully on all devices
- **⚡ UX-First Design** — Thoughtful loading states, error handling, empty states, and suggested prompts

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- A free Groq API key from [Groq Console](https://console.groq.com/keys)

### Setup

```bash
# Clone the repo
git clone <your-repo-url>
cd cosmos-ai

# Install dependencies
npm install

# Set up your API key
cp .env.example .env.local
# Edit .env.local and add your GROQ_API_KEY

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| AI Model | Groq AI (Llama 3 70B) |
| AI SDK | Vercel AI SDK |
| Styling | Vanilla CSS + CSS Modules |
| Fonts | Orbitron + Inter (Google Fonts) |
| Deployment | Vercel |

## 🎯 Frontend Thinking Highlights

### First Impressions
- Animated starfield with parallax and shooting stars
- "Explore the Cosmos" hero with gradient typography and glowing CTA
- Feature cards showing chatbot capabilities

### Conversation Experience
- Streaming text responses (character-by-character)
- Typing indicator with orbiting dots while AI thinks
- Auto-scrolling message area
- Markdown rendering in bot responses

### UX States
- **Empty state**: Suggested prompt chips (black holes, Mars, stars, etc.)
- **Loading state**: Animated typing indicator with "CosmosAI is thinking..."
- **Error state**: "Houston, we have a problem!" with retry button
- **Online/Thinking status**: Real-time header status indicator

### Micro-Interactions
- Message slide-in animations
- Button hover glow effects
- Input focus ring with purple glow
- Timestamp reveal on message hover
- Card lift on hover

## 📂 Project Structure

```
cosmos-ai/
├── app/
│   ├── api/chat/route.js    # AI chat API with Groq
│   ├── globals.css           # Cosmic design system
│   ├── layout.js             # Root layout with SEO
│   ├── page.js               # Landing page + chat toggle
│   └── page.module.css       # Landing page styles
├── components/
│   ├── ChatWindow.js         # Main chat orchestrator
│   ├── ChatInput.js          # Auto-growing input
│   ├── MessageBubble.js      # User/bot message display
│   ├── TypingIndicator.js    # Loading animation
│   └── Starfield.js          # Animated canvas background
└── .env.example              # Environment template
```

## 🌐 Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=<your-repo-url>)

Or manually:

```bash
npm run build
npx vercel --prod
```

Don't forget to add your `GROQ_API_KEY` to your Vercel project's environment variables.

## 📄 License

MIT
