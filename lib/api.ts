import { Perfume } from './store';
import perfumesData from '../data/perfumes.json';

// Simulated API delay for realistic behavior
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// In a real app, this would fetch from actual shop APIs or scrape websites
export async function fetchPerfumes(): Promise<Perfume[]> {
  await delay(300); // Simulate network delay
  return perfumesData as Perfume[];
}

export async function fetchPerfumeById(id: string): Promise<Perfume | null> {
  await delay(200);
  const perfume = perfumesData.find(p => p.id === id);
  return perfume as Perfume || null;
}

// Simulated price scraper
export async function scrapePrices(perfumeId: string) {
  await delay(1000); // Simulate scraping delay

  // In production, this would:
  // 1. Use Puppeteer/Playwright to visit shop websites
  // 2. Extract price data from HTML
  // 3. Check stock availability
  // 4. Return updated prices

  // Example scraper structure:
  const scraperExample = {
    notino: async (perfumeName: string) => {
      // const browser = await puppeteer.launch();
      // const page = await browser.newPage();
      // await page.goto(`https://www.notino.com/search/${perfumeName}`);
      // const price = await page.$eval('.price', el => el.textContent);
      // return price;
    },
    douglas: async (perfumeName: string) => {
      // Similar scraping logic for Douglas
    },
    sephora: async (perfumeName: string) => {
      // Similar scraping logic for Sephora
    },
    perfumesClub: async (perfumeName: string) => {
      // Similar scraping logic for Perfume's Club
    }
  };

  return {
    success: true,
    message: 'Prices updated successfully',
    timestamp: new Date().toISOString()
  };
}

// Mock API endpoint structure for future implementation
export const apiEndpoints = {
  // GET /api/perfumes - Fetch all perfumes
  getAllPerfumes: '/api/perfumes',

  // GET /api/perfumes/:id - Fetch single perfume
  getPerfumeById: (id: string) => `/api/perfumes/${id}`,

  // POST /api/scrape - Trigger price scraping
  scrapePrices: '/api/scrape',

  // GET /api/prices/:id - Get latest prices for perfume
  getPrices: (id: string) => `/api/prices/${id}`,

  // POST /api/alerts - Create price alert
  createAlert: '/api/alerts',

  // GET /api/alerts - Get user's alerts
  getAlerts: '/api/alerts',

  // DELETE /api/alerts/:id - Delete alert
  deleteAlert: (id: string) => `/api/alerts/${id}`,
};

// Price comparison logic
export function comparePrices(perfume: Perfume) {
  const inStockPrices = perfume.prices.filter(p => p.inStock);

  if (inStockPrices.length === 0) {
    return {
      cheapest: null,
      mostExpensive: null,
      savings: 0,
      averagePrice: 0,
    };
  }

  const prices = inStockPrices.map(p => p.price);
  const cheapest = inStockPrices.reduce((min, p) =>
    p.price < min.price ? p : min
  );
  const mostExpensive = inStockPrices.reduce((max, p) =>
    p.price > max.price ? p : max
  );
  const savings = mostExpensive.price - cheapest.price;
  const averagePrice = prices.reduce((sum, p) => sum + p, 0) / prices.length;

  return {
    cheapest,
    mostExpensive,
    savings,
    averagePrice,
  };
}
