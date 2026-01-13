<div align="center">

# 📧 CortexReach

### AI-Powered Cold Email Generator

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth-green?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

**Generate personalized cold outreach emails using AI**

[Live Demo](https://cortexreach.vercel.app) • [Report Bug](https://github.com/MuhammadTanveerAbbas/CortexReach/issues) • [Request Feature](https://github.com/MuhammadTanveerAbbas/CortexReach/issues)

</div>

---

## 🎯 What It Does

CortexReach helps you write personalized cold emails faster. Paste prospect information, and AI generates a customized email with:

- Personalized email body based on prospect details
- Subject line suggestions
- Effectiveness score (0-100)
- Optimization tips

**Note:** This is a tool to help draft emails faster. Results depend on the quality of prospect information you provide.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🤖 **AI Generation** | Uses Google Gemini & Groq to create personalized emails |
| 📊 **Effectiveness Score** | Get AI predictions on email performance |
| 💾 **Auto-Save** | Drafts saved automatically in browser |
| 📤 **Export** | Download as TXT, HTML, or JSON |
| 🎨 **Rich Editor** | Format emails with bold, italic, lists |
| 🔐 **Auth** | Secure login with Supabase |
| 📱 **Responsive** | Works on desktop, tablet, and mobile |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Google AI API key → [Get it here](https://ai.google.dev/)
- Groq API key → [Get it here](https://console.groq.com/)
- Supabase account → [Sign up](https://supabase.com/)

### Installation

```bash
# Clone repository
git clone https://github.com/MuhammadTanveerAbbas/CortexReach.git
cd CortexReach

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
```

### Environment Variables

Create `.env.local` with:

```env
# AI APIs
GOOGLE_GENAI_API_KEY=your_google_ai_key
GROQ_API_KEY=your_groq_key

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_service_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📖 How to Use

1. **Sign Up** - Create a free account
2. **Add Prospect Info** - Paste LinkedIn profile, bio, or any details
3. **Generate** - AI creates personalized email
4. **Review & Edit** - Customize the generated content
5. **Analyze** - Check effectiveness score
6. **Export** - Copy or download

### Free Plan Limits
- 5 email generations per day
- Basic AI features
- Email effectiveness scoring

---

## 🛠️ Tech Stack

**Frontend**
- Next.js 15 (App Router)
- React 18
- TypeScript 5
- Tailwind CSS
- shadcn/ui components

**Backend**
- Supabase (Auth & Database)
- Google Gemini 2.5 Flash
- Groq AI

**Deployment**
- Vercel

---

## 📁 Project Structure

```
CortexReach/
├── src/
│   ├── app/              # Next.js pages
│   ├── components/       # React components
│   ├── lib/              # Utilities
│   └── ai/               # AI flows
├── public/               # Static assets
└── supabase/             # Database schema
```

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create your branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open a Pull Request

---

## 📝 License

MIT License - see [LICENSE](LICENSE)

---

## 👨‍💻 Author

**Muhammad Tanveer Abbas**

- Portfolio: [muhammadtanveerabbas.vercel.app](https://muhammadtanveerabbas.vercel.app/)
- GitHub: [@MuhammadTanveerAbbas](https://github.com/MuhammadTanveerAbbas)
- LinkedIn: [muhammadtanveerabbas](https://linkedin.com/in/muhammadtanveerabbas)

---

<div align="center">

### ⭐ Star this repo if you find it useful!

Made with ❤️ using Next.js and AI

</div>
