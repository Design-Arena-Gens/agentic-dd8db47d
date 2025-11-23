# 🌸 Perfume Price Finder

A complete mobile-first web application for comparing perfume prices across multiple online retailers. Find the best deals, set price alerts, and discover your next favorite fragrance.

## 🌟 Live Demo

**[https://agentic-dd8db47d.vercel.app](https://agentic-dd8db47d.vercel.app)**

## ✨ Features

- **Smart Search**: Instant search with auto-suggestions
- **Price Comparison**: Compare prices across multiple shops
- **Best Deal Finder**: Automatically highlights cheapest options
- **Price Alerts**: Get notified when prices drop
- **Favorites**: Save your favorite perfumes
- **Safety Checker**: Website security verification
- **Perfume Details**: View notes, concentration, and images
- **Mobile-First**: Optimized for all devices
- **PWA Ready**: Install as mobile app

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📱 Deploy as Android APK

### Option 1: PWA Installation
1. Open website in Chrome on Android
2. Tap menu → "Install app"
3. App appears on home screen

### Option 2: Bubblewrap (TWA)
```bash
npm install -g @bubblewrap/cli
bubblewrap init --manifest https://agentic-dd8db47d.vercel.app/manifest.json
bubblewrap build
```

### Option 3: PWA Builder
Visit [pwabuilder.com](https://www.pwabuilder.com/) and enter the deployed URL

### Option 4: Capacitor
```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init
npm run build
npx cap add android
npx cap open android
```

## 🛠️ Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- Lucide React (Icons)

## 📂 Key Files

- `app/` - Pages and layouts
- `components/` - Reusable components
- `lib/` - Utilities and state
- `data/` - Perfume database
- `DEPLOYMENT.md` - Full deployment guide

## 🌐 Deployment

Deploy to Vercel:
```bash
vercel --prod
```

**Production URL**: [https://agentic-dd8db47d.vercel.app](https://agentic-dd8db47d.vercel.app)

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete instructions.

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
