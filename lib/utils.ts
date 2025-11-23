import { Perfume, PriceInfo } from './store';
import safetyData from '../data/safetyData.json';

export function getCheapestPrice(prices: PriceInfo[]): PriceInfo | null {
  const inStockPrices = prices.filter(p => p.inStock);
  if (inStockPrices.length === 0) return null;

  return inStockPrices.reduce((cheapest, current) =>
    current.price < cheapest.price ? current : cheapest
  );
}

export function calculateSavings(prices: PriceInfo[]): number {
  const inStockPrices = prices.filter(p => p.inStock);
  if (inStockPrices.length === 0) return 0;

  const cheapest = Math.min(...inStockPrices.map(p => p.price));
  const mostExpensive = Math.max(...inStockPrices.map(p => p.price));

  return mostExpensive - cheapest;
}

export function formatPrice(price: number, currency: string = 'EUR'): string {
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: currency,
  }).format(price);
}

export interface SafetyCheckResult {
  isSafe: boolean;
  warnings: string[];
  severity: 'safe' | 'low' | 'medium' | 'high' | 'critical';
}

export function checkWebsiteSafety(url: string): SafetyCheckResult {
  const warnings: string[] = [];
  let maxSeverity: 'safe' | 'low' | 'medium' | 'high' | 'critical' = 'safe';

  try {
    const urlObj = new URL(url);
    const domain = urlObj.hostname.replace('www.', '');

    // Check HTTPS
    if (urlObj.protocol !== 'https:') {
      warnings.push('⚠️ Website does not use HTTPS - your data may not be secure');
      maxSeverity = 'critical';
    }

    // Check if domain is trusted
    const isTrusted = safetyData.trustedDomains.some(trusted =>
      domain.includes(trusted)
    );

    if (!isTrusted) {
      warnings.push('⚠️ This shop is not in our verified trusted list');
      if (maxSeverity === 'safe') maxSeverity = 'low';
    }

    // Check for suspicious TLDs
    const suspiciousTlds = ['.tk', '.ml', '.ga', '.cf', '.gq', '.xyz', '.top'];
    const hasSuspiciousTld = suspiciousTlds.some(tld => domain.endsWith(tld));

    if (hasSuspiciousTld) {
      warnings.push('⚠️ Domain uses a potentially suspicious extension');
      if (maxSeverity === 'safe' || maxSeverity === 'low') maxSeverity = 'medium';
    }

    const isSafe = warnings.length === 0 || maxSeverity === 'low';

    return {
      isSafe,
      warnings,
      severity: maxSeverity,
    };
  } catch (error) {
    return {
      isSafe: false,
      warnings: ['⚠️ Invalid URL format'],
      severity: 'high',
    };
  }
}

export function searchPerfumes(perfumes: Perfume[], query: string): Perfume[] {
  if (!query.trim()) return perfumes;

  const lowerQuery = query.toLowerCase();

  return perfumes.filter(perfume =>
    perfume.name.toLowerCase().includes(lowerQuery) ||
    perfume.brand.toLowerCase().includes(lowerQuery) ||
    perfume.description.toLowerCase().includes(lowerQuery) ||
    perfume.notes.top.some(note => note.toLowerCase().includes(lowerQuery)) ||
    perfume.notes.middle.some(note => note.toLowerCase().includes(lowerQuery)) ||
    perfume.notes.base.some(note => note.toLowerCase().includes(lowerQuery))
  );
}

export function getSearchSuggestions(perfumes: Perfume[], query: string): string[] {
  if (!query.trim() || query.length < 2) return [];

  const lowerQuery = query.toLowerCase();
  const suggestions = new Set<string>();

  perfumes.forEach(perfume => {
    if (perfume.name.toLowerCase().includes(lowerQuery)) {
      suggestions.add(perfume.name);
    }
    if (perfume.brand.toLowerCase().includes(lowerQuery)) {
      suggestions.add(perfume.brand);
    }
  });

  return Array.from(suggestions).slice(0, 5);
}

export function getPriceChangePercentage(oldPrice: number, newPrice: number): number {
  return ((newPrice - oldPrice) / oldPrice) * 100;
}

export function shouldNotifyPriceAlert(targetPrice: number, currentPrice: number): boolean {
  return currentPrice <= targetPrice;
}
