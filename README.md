# 💍 Wedding Template — Modern Wedding Website

A modern, production-ready **wedding website template** built with Next.js and a elegant UI. Perfect for wedding agencies, planners, or individual couples looking for a beautiful online presence.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-latest-EF4F91?logo=framer)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)

---

## ✨ Features

- 🎨 **Elegant UI** — refined design with smooth animations via Framer Motion
- 📱 **Fully Responsive** — optimized for all screen sizes
- ⚡ **Next.js 15** — App Router, SSR/SSG, optimized performance
- 🎭 **Tailwind CSS** — utility-first styling with custom design tokens
- 📋 **Contact Form** — built with React Hook Form + Zod validation
- 🌙 **Theme Support** — light/dark mode via next-themes
- 🗂 **Admin RSVP panel** — protected dashboard for guest responses
- 🚀 **Deploy-ready** — configured for Vercel

---

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 15 (App Router) |
| UI Library | React 19 |
| Styling | Tailwind CSS 3 |
| Animations | Framer Motion |
| Forms | React Hook Form + Zod |
| Language | TypeScript 5 |
| Deploy | Vercel |
| RSVP Storage | Vercel Blob or local JSON fallback |

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/wedding-template.git
cd wedding-template

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
src/
├── app/           # Next.js App Router pages
├── components/    # Reusable UI components
└── styles/        # Global styles
```

---

## 📦 Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start
```

Deploy instantly on [Vercel](https://vercel.com) — zero config needed.

### RSVP persistence

- For local development, RSVPs are stored in `data/rsvps.json`.
- For Vercel production, set `BLOB_READ_WRITE_TOKEN` to persist RSVPs in Vercel Blob.
- If no persistent storage is configured in production, the app falls back to in-memory storage.

---

## 🎯 Use Cases

- Wedding agency websites
- Individual couple wedding pages
- Wedding planner portfolios
- Event planning showcase

---

*Built with ❤️ for the wedding industry*
