"use client";

import Link from 'next/link';
import { Heart, TrendingDown, ExternalLink } from 'lucide-react';
import { Perfume, useStore } from '@/lib/store';
import { formatPrice, getCheapestPrice, calculateSavings } from '@/lib/utils';

interface PerfumeCardProps {
  perfume: Perfume;
}

export default function PerfumeCard({ perfume }: PerfumeCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useStore();
  const favorite = isFavorite(perfume.id);

  const cheapest = getCheapestPrice(perfume.prices);
  const savings = calculateSavings(perfume.prices);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) {
      removeFavorite(perfume.id);
    } else {
      addFavorite(perfume.id);
    }
  };

  return (
    <Link href={`/perfume/${perfume.id}`}>
      <div className="card hover:scale-105 cursor-pointer animate-fade-in group">
        {/* Image */}
        <div className="relative mb-4 overflow-hidden rounded-xl">
          <img
            src={perfume.image}
            alt={perfume.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <button
            onClick={toggleFavorite}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all ${
              favorite
                ? 'bg-pink-500 text-white'
                : 'bg-white/80 text-gray-600 hover:bg-white'
            }`}
          >
            <Heart className={`w-5 h-5 ${favorite ? 'fill-current' : ''}`} />
          </button>

          {savings > 0 && (
            <div className="absolute top-3 left-3 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full flex items-center gap-1 backdrop-blur-sm">
              <TrendingDown className="w-3 h-3" />
              Save {formatPrice(savings)}
            </div>
          )}
        </div>

        {/* Content */}
        <div>
          <h3 className="text-xl font-display font-bold text-gray-900 mb-1 line-clamp-1">
            {perfume.name}
          </h3>
          <p className="text-gray-600 font-medium mb-2">{perfume.brand}</p>

          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-lg text-xs font-medium">
              {perfume.concentration}
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium">
              {perfume.size}
            </span>
          </div>

          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {perfume.description}
          </p>

          {/* Price */}
          {cheapest ? (
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Best price</p>
                  <p className="text-2xl font-bold text-primary-600">
                    {formatPrice(cheapest.price, cheapest.currency)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 mb-1">at</p>
                  <p className="text-sm font-semibold text-gray-900">{cheapest.shop}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {perfume.prices.filter(p => p.inStock).length} shops available
              </p>
            </div>
          ) : (
            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm text-red-600 font-medium">Out of stock</p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
