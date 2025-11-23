# Perfume Price Finder - Deployment Guide

## 🚀 Overview

This is a complete Perfume Price Finder application built with Next.js, React, TypeScript, and Tailwind CSS. It allows users to search for perfumes, compare prices across multiple shops, set price alerts, and check website safety.

## 📱 Features

- **Search & Browse**: Search perfumes by name, brand, or fragrance notes with instant suggestions
- **Price Comparison**: Compare prices across Notino, Douglas, Sephora EU, Perfume's Club, and more
- **Best Deal Finder**: Automatically highlights the cheapest available price
- **Favorites**: Save your favorite perfumes for quick access
- **Price Alerts**: Set target prices and get notified when prices drop
- **Safety Checker**: Website safety verification with warnings for risky sites
- **Perfume Details**: View fragrance notes (top, middle, base), concentration, size, and images
- **Mobile-First Design**: Responsive layout optimized for mobile devices
- **Modern UI**: Clean design with rounded cards, soft shadows, and smooth animations

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand (with localStorage persistence)
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📦 Project Structure

```
perfume-price-finder/
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout with navigation
│   ├── page.tsx             # Home page (search & browse)
│   ├── perfume/[id]/        # Perfume detail page
│   ├── favorites/           # Favorites page
│   ├── alerts/              # Price alerts page
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── Logo.tsx            # App logo
│   ├── Navigation.tsx      # Bottom navigation bar
│   ├── PerfumeCard.tsx     # Perfume card component
│   ├── SearchBar.tsx       # Search with suggestions
│   ├── SafetyBadge.tsx     # Website safety indicator
│   └── PriceAlertModal.tsx # Price alert creation modal
├── lib/                     # Utilities and logic
│   ├── store.ts            # Zustand state management
│   ├── utils.ts            # Utility functions
│   └── api.ts              # API and scraper structure
├── data/                    # Data files
│   ├── perfumes.json       # Perfume database
│   └── safetyData.json     # Safety check data
├── public/                  # Static assets
│   └── manifest.json       # PWA manifest
└── Configuration files
    ├── package.json
    ├── tsconfig.json
    ├── tailwind.config.ts
    ├── next.config.mjs
    └── postcss.config.mjs
```

## 🎨 Design System

### Colors
- **Primary**: Purple gradient (#d946ef to #c026d3)
- **Accent**: Orange (#f97316)
- **Background**: Gradient from purple to orange to pink
- **Cards**: White with soft shadows

### Typography
- **Display Font**: Poppins (headings)
- **Body Font**: Inter (text)

### Shadows
- `shadow-soft`: Subtle shadow for cards
- `shadow-soft-lg`: Medium shadow for hover states
- `shadow-soft-xl`: Large shadow for modals

## 🔧 Installation & Setup

### Local Development

1. **Install dependencies**:
```bash
npm install
```

2. **Run development server**:
```bash
npm run dev
```

3. **Open in browser**:
```
http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

## 🌐 Deployment to Vercel

### Method 1: Automatic Deployment (Recommended)

This project is configured for Vercel deployment with the provided token.

```bash
# Build and verify locally first
npm install
npm run build

# Deploy to Vercel
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-dd8db47d
```

The app will be available at: `https://agentic-dd8db47d.vercel.app`

### Method 2: Manual Deployment via Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel --prod
```

### Method 3: Deploy via Vercel Dashboard

1. Push code to GitHub
2. Import project in Vercel dashboard
3. Configure and deploy

## 📱 Building Android APK (Progressive Web App)

Since this is a web application, you can create an Android app using PWA technologies:

### Option 1: PWA Installation (Recommended)

Users can install the app directly from the browser:
1. Open the app in Chrome on Android
2. Tap the menu and select "Install app" or "Add to Home Screen"
3. The app will appear on the home screen and run in standalone mode

### Option 2: Convert to APK using TWA (Trusted Web Activity)

1. **Install Bubblewrap**:
```bash
npm install -g @bubblewrap/cli
```

2. **Initialize TWA project**:
```bash
bubblewrap init --manifest https://agentic-dd8db47d.vercel.app/manifest.json
```

3. **Build APK**:
```bash
bubblewrap build
```

4. **Output**: APK file will be in `app-release-signed.apk`

### Option 3: PWA Builder

1. Visit https://www.pwabuilder.com/
2. Enter your deployed URL: `https://agentic-dd8db47d.vercel.app`
3. Generate Android package
4. Download APK

### Option 4: Capacitor (Full Native App)

For a fully native experience:

```bash
# Install Capacitor
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android

# Initialize
npx cap init

# Build web assets
npm run build

# Add Android platform
npx cap add android

# Open in Android Studio
npx cap open android

# Build APK in Android Studio
```

## 🔍 API & Scraper Structure

The app includes a simulated price scraper structure. For production, implement:

### Price Scraping

```typescript
// Example implementation in lib/api.ts
const scrapers = {
  notino: async (perfumeName: string) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.notino.com/search/${perfumeName}`);
    const price = await page.$eval('.price', el => el.textContent);
    await browser.close();
    return parseFloat(price);
  },
  // Similar for other shops...
};
```

### Backend API Endpoints (Future)

- `GET /api/perfumes` - Fetch all perfumes
- `GET /api/perfumes/:id` - Fetch single perfume
- `POST /api/scrape` - Trigger price scraping
- `POST /api/alerts` - Create price alert
- `GET /api/alerts` - Get user's alerts
- `DELETE /api/alerts/:id` - Delete alert

## 🔒 Safety Checker Logic

Located in `lib/utils.ts`:

```typescript
export function checkWebsiteSafety(url: string): SafetyCheckResult {
  // Checks:
  // 1. HTTPS protocol
  // 2. Trusted domain list
  // 3. Suspicious TLDs (.tk, .ml, .ga, etc.)
  // 4. Domain age (future)
  // Returns safety level: safe, low, medium, high, critical
}
```

## 📊 Data Structure

### Perfume Object
```typescript
{
  id: string;
  name: string;
  brand: string;
  concentration: string; // "Eau de Parfum", "Eau de Toilette"
  size: string; // "100ml"
  image: string; // URL
  notes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  description: string;
  prices: [
    {
      shop: string;
      price: number;
      currency: string;
      url: string;
      inStock: boolean;
      lastUpdated: string;
    }
  ];
}
```

## 🎯 Future Enhancements

1. **Real-time Scraping**: Implement actual price scrapers
2. **User Accounts**: Authentication and cloud sync
3. **Push Notifications**: Real price drop notifications
4. **More Shops**: Add additional perfume retailers
5. **Reviews**: User reviews and ratings
6. **Filters**: Filter by brand, price range, notes, concentration
7. **Comparison**: Side-by-side perfume comparison
8. **History**: Price history graphs
9. **Recommendations**: AI-powered perfume recommendations
10. **Social**: Share deals with friends

## 📝 Environment Variables

For production, set these in Vercel:

```env
# Optional: If implementing real APIs
NEXT_PUBLIC_API_URL=https://your-api.com
API_SECRET_KEY=your-secret-key

# For real-time scraping
SCRAPER_API_KEY=your-scraper-key

# For notifications
FIREBASE_API_KEY=your-firebase-key
```

## 🐛 Troubleshooting

### Build Errors
- Ensure Node.js 18+ is installed
- Clear cache: `rm -rf .next node_modules && npm install`

### Deployment Issues
- Check Vercel logs in dashboard
- Verify environment variables are set
- Ensure `next.config.mjs` is properly configured

### PWA Not Installing
- Verify manifest.json is accessible
- Check HTTPS is enabled
- Ensure icons are present

## 📄 License

This project is open source and available for personal and commercial use.

## 👨‍💻 Development

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS.

For questions or issues, please refer to the documentation or create an issue.

---

**Live Demo**: https://agentic-dd8db47d.vercel.app
