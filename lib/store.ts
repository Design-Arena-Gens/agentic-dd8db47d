import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Perfume {
  id: string;
  name: string;
  brand: string;
  concentration: string;
  size: string;
  image: string;
  notes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  description: string;
  prices: PriceInfo[];
}

export interface PriceInfo {
  shop: string;
  price: number;
  currency: string;
  url: string;
  inStock: boolean;
  lastUpdated: string;
}

export interface PriceAlert {
  id: string;
  perfumeId: string;
  perfumeName: string;
  targetPrice: number;
  currentPrice: number;
  createdAt: string;
  active: boolean;
}

interface AppState {
  favorites: string[];
  priceAlerts: PriceAlert[];
  searchQuery: string;
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  addPriceAlert: (alert: Omit<PriceAlert, 'id' | 'createdAt' | 'active'>) => void;
  removePriceAlert: (id: string) => void;
  updatePriceAlert: (id: string, currentPrice: number) => void;
  setSearchQuery: (query: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      favorites: [],
      priceAlerts: [],
      searchQuery: '',

      addFavorite: (id) =>
        set((state) => ({
          favorites: [...state.favorites, id],
        })),

      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav !== id),
        })),

      isFavorite: (id) => get().favorites.includes(id),

      addPriceAlert: (alert) =>
        set((state) => ({
          priceAlerts: [
            ...state.priceAlerts,
            {
              ...alert,
              id: `alert_${Date.now()}`,
              createdAt: new Date().toISOString(),
              active: true,
            },
          ],
        })),

      removePriceAlert: (id) =>
        set((state) => ({
          priceAlerts: state.priceAlerts.filter((alert) => alert.id !== id),
        })),

      updatePriceAlert: (id, currentPrice) =>
        set((state) => ({
          priceAlerts: state.priceAlerts.map((alert) =>
            alert.id === id ? { ...alert, currentPrice } : alert
          ),
        })),

      setSearchQuery: (query) => set({ searchQuery: query }),
    }),
    {
      name: 'perfume-finder-storage',
    }
  )
);
