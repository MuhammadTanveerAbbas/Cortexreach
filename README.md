<h1 align="center">📧 CortexReach</h1>

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-18-blue?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/shadcn/ui-latest-black?logo=shadcn-ui&logoColor=white" alt="shadcn/ui" />
  <img src="https://img.shields.io/badge/Google_AI-Gemini-orange?logo=google&logoColor=white" alt="Google AI" />
  <br/>
  <a href="https://vercel.com/new/clone?repository-url=https://github.com/MuhammadTanveerAbbas/CortexReach"><img src="https://vercel.com/button" alt="Deploy" /></a>
</div>

---

**Generate personalized cold outreach emails using AI.** Paste prospect information, get customized emails powered by Google Gemini, and receive effectiveness predictions.

---

## ✨ Features

### 🤖 Smart Email Generation
- 📋 Paste prospect data (LinkedIn profiles, bios, articles, social posts)
- 🎯 Analyzes information and generates personalized emails
- ✏️ Rich text editor for customization
- 📎 Copy generated emails to clipboard

### 📊 Effectiveness Analysis
- 🎯 Scoring system (0-100 scale)
- 📈 Predicted engagement metrics
- 💡 Suggestions for improvement
- 🚫 Spam risk assessment

### 🎨 User Experience
- 📱 Responsive design for all devices
- 🌙 Dark/light mode support
- 💾 Local draft auto-save
- 📜 Email generation history

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) with App Router
- **Language:** [TypeScript 5](https://www.typescriptlang.org/)
- **UI Library:** [React 18](https://reactjs.org/)
- **Styling:** [Tailwind CSS 3](https://tailwindcss.com/)
- **Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **AI:** [Google Gemini 2.5 Flash](https://ai.google.dev/)

---

## 🚀 Getting Started

### ⚡ Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/MuhammadTanveerAbbas/CortexReach)

**⚠️ Important:** After deployment, configure environment variables in Vercel:
1. Go to your Vercel project → Settings → Environment Variables
2. Add `GOOGLE_GENAI_API_KEY` with your Google AI API key
3. Add `NEXT_PUBLIC_APP_URL` with your deployment URL
4. Redeploy the application

### 💻 Local Development

#### 📋 Prerequisites

- **Node.js** v18+ ([Download](https://nodejs.org/))
- **npm** v8+ (comes with Node.js)
- **Google AI API Key** ([Get yours here](https://ai.google.dev/))

### 📦 Installation

```bash
# 1. Clone the repository
git clone https://github.com/MuhammadTanveerAbbas/CortexReach.git
cd CortexReach

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.local.example .env.local
# Add your Google AI API key to .env.local

# 4. Start development server
npm run dev
```

### 🔐 Environment Setup

Create a `.env.local` file in the root directory:

```env
# Required: Google AI API Key
GOOGLE_GENAI_API_KEY=your_google_ai_api_key_here

# Optional: Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

See `.env.local.example` for all available options.

### 🔧 Available Scripts

```bash
npm run dev          # Start development server with Turbo
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript checks
npm run format       # Format code with Prettier
npm run clean        # Clean build artifacts
```

---

## 📖 Usage

1. 🌐 Navigate to `/tool` in your browser
2. 📋 Paste prospect information (LinkedIn profile, bio, articles, etc.)
3. ✍️ Optionally add name, company, and job title
4. 🎯 Click "Generate Personalized Email"
5. 👀 Review and edit the generated email
6. 📊 Click "Analyze Effectiveness" for feedback
7. 📎 Copy the final email to your clipboard

---

## 💼 What It Does

- ⚡ Automates personalized email generation
- 📊 Provides effectiveness scoring and suggestions
- ⏱️ Saves time on manual email writing
- ✅ Helps avoid common cold email mistakes

---

## 👨‍💻 Development

### 📁 Project Structure

```
CortexReach/
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # Reusable UI components
│   ├── ai/                  # AI integration and flows
│   ├── lib/                 # Utility functions
│   └── hooks/               # Custom React hooks
├── public/                  # Static assets
└── docs/                    # Documentation
```

### 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 🎯 Production Features

- 🔍 SEO optimized with meta tags and sitemap
- ⚠️ Error handling with custom error pages
- ✅ Environment variable validation
- 🧹 Code quality tools (ESLint, Prettier, TypeScript)
- 💾 Auto-save drafts to localStorage
- 📜 Email generation history

---

## 🔒 Privacy

- 🔑 API keys stored in environment variables
- 🚫 No permanent data storage on servers
- ⚡ Data processed only during email generation
- 💾 Local storage used for drafts and history

---

## 🗺️ Roadmap

- [ ] Email templates library
- [ ] CRM integration (Salesforce, HubSpot, Pipedrive)
- [ ] Bulk email generation
- [ ] A/B testing support
- [ ] Analytics dashboard
- [ ] Team collaboration features

---

## 💬 Support

- 🐛 **Issues:** [GitHub Issues](https://github.com/MuhammadTanveerAbbas/CortexReach/issues)
- 💭 **Discussions:** [GitHub Discussions](https://github.com/MuhammadTanveerAbbas/CortexReach/discussions)

---

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/MuhammadTanveerAbbas">Muhammad Tanveer Abbas</a></p>
</div>
