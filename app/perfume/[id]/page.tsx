"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Heart, Bell, ExternalLink, Shield, TrendingDown, Package } from 'lucide-react';
import { fetchPerfumeById } from '@/lib/api';
import { Perfume, useStore } from '@/lib/store';
import { formatPrice, getCheapestPrice, calculateSavings, checkWebsiteSafety } from '@/lib/utils';
import PriceAlertModal from '@/components/PriceAlertModal';
import SafetyBadge from '@/components/SafetyBadge';

export default function PerfumeDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [perfume, setPerfume] = useState<Perfume | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAlertModal, setShowAlertModal] = useState(false);

  const { favorites, addFavorite, removeFavorite, isFavorite } = useStore();

  useEffect(() => {
    loadPerfume();
  }, [id]);

  const loadPerfume = async () => {
    setLoading(true);
    const data = await fetchPerfumeById(id);
    setPerfume(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!perfume) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Perfume not found</h2>
        <button onClick={() => router.push('/')} className="btn-primary mt-4">
          Back to Home
        </button>
      </div>
    );
  }

  const cheapest = getCheapestPrice(perfume.prices);
  const savings = calculateSavings(perfume.prices);
  const favorite = isFavorite(perfume.id);

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(perfume.id);
    } else {
      addFavorite(perfume.id);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-6 pb-24">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back</span>
      </button>

      {/* Perfume Header */}
      <div className="card mb-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image */}
          <div className="w-full md:w-1/3">
            <img
              src={perfume.image}
              alt={perfume.name}
              className="w-full h-64 md:h-80 object-cover rounded-xl"
            />
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
                  {perfume.name}
                </h1>
                <p className="text-xl text-gray-600 font-medium">{perfume.brand}</p>
              </div>
              <button
                onClick={toggleFavorite}
                className={`p-3 rounded-xl transition-all ${
                  favorite
                    ? 'bg-pink-100 text-pink-600'
                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                }`}
              >
                <Heart className={`w-6 h-6 ${favorite ? 'fill-current' : ''}`} />
              </button>
            </div>

            <div className="flex flex-wrap gap-3 mb-4">
              <span className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg font-medium text-sm">
                {perfume.concentration}
              </span>
              <span className="px-4 py-2 bg-accent-100 text-accent-700 rounded-lg font-medium text-sm flex items-center gap-2">
                <Package className="w-4 h-4" />
                {perfume.size}
              </span>
            </div>

            <p className="text-gray-600 mb-6">{perfume.description}</p>

            {/* Best Price */}
            {cheapest && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-700 font-medium mb-1">Best Price</p>
                    <p className="text-3xl font-bold text-green-900">
                      {formatPrice(cheapest.price, cheapest.currency)}
                    </p>
                    <p className="text-sm text-green-700 mt-1">at {cheapest.shop}</p>
                  </div>
                  {savings > 0 && (
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-green-700 mb-1">
                        <TrendingDown className="w-5 h-5" />
                        <span className="font-semibold">Save {formatPrice(savings)}</span>
                      </div>
                      <p className="text-xs text-green-600">vs highest price</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowAlertModal(true)}
                className="btn-secondary flex-1 flex items-center justify-center gap-2"
              >
                <Bell className="w-5 h-5" />
                Price Alert
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fragrance Notes */}
      <div className="card mb-6">
        <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
          Fragrance Notes
        </h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Top Notes</h3>
            <div className="flex flex-wrap gap-2">
              {perfume.notes.top.map((note, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Middle Notes</h3>
            <div className="flex flex-wrap gap-2">
              {perfume.notes.middle.map((note, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Base Notes</h3>
            <div className="flex flex-wrap gap-2">
              {perfume.notes.base.map((note, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Price Comparison */}
      <div className="card">
        <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
          Price Comparison
        </h2>

        <div className="space-y-3">
          {perfume.prices
            .sort((a, b) => a.price - b.price)
            .map((priceInfo, index) => {
              const safety = checkWebsiteSafety(priceInfo.url);
              const isCheapest = cheapest && priceInfo.shop === cheapest.shop;

              return (
                <div
                  key={index}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    isCheapest
                      ? 'border-green-300 bg-green-50'
                      : 'border-gray-200 bg-white hover:border-primary-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{priceInfo.shop}</h3>
                        {isCheapest && (
                          <span className="px-2 py-1 bg-green-600 text-white text-xs font-bold rounded-full">
                            BEST DEAL
                          </span>
                        )}
                        {!priceInfo.inStock && (
                          <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                            Out of Stock
                          </span>
                        )}
                      </div>

                      <SafetyBadge safety={safety} />
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900 mb-2">
                        {formatPrice(priceInfo.price, priceInfo.currency)}
                      </p>
                      {priceInfo.inStock && (
                        <a
                          href={priceInfo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
                        >
                          Visit Shop
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Price Alert Modal */}
      {showAlertModal && (
        <PriceAlertModal
          perfume={perfume}
          onClose={() => setShowAlertModal(false)}
        />
      )}
    </main>
  );
}
