"use client";

import { useEffect, useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { fetchPerfumes } from '@/lib/api';
import { Perfume, useStore } from '@/lib/store';
import PerfumeCard from '@/components/PerfumeCard';

export default function Favorites() {
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [favoritePerfumes, setFavoritePerfumes] = useState<Perfume[]>([]);
  const [loading, setLoading] = useState(true);

  const { favorites } = useStore();

  useEffect(() => {
    loadPerfumes();
  }, []);

  useEffect(() => {
    const filtered = perfumes.filter(p => favorites.includes(p.id));
    setFavoritePerfumes(filtered);
  }, [favorites, perfumes]);

  const loadPerfumes = async () => {
    setLoading(true);
    const data = await fetchPerfumes();
    setPerfumes(data);
    setLoading(false);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-6 pb-24">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Heart className="w-8 h-8 text-pink-600 fill-current" />
          <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900">
            My Favorites
          </h1>
        </div>
        <p className="text-gray-600">
          Your saved perfumes in one place
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-gray-600">Loading favorites...</p>
        </div>
      )}

      {/* Perfume Grid */}
      {!loading && (
        <>
          {favoritePerfumes.length === 0 ? (
            <div className="text-center py-20">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No favorites yet
              </h3>
              <p className="text-gray-500 mb-6">
                Start adding perfumes to your favorites list
              </p>
              <a href="/" className="btn-primary inline-block">
                Explore Perfumes
              </a>
            </div>
          ) : (
            <>
              <div className="mb-4 text-sm text-gray-600">
                {favoritePerfumes.length} favorite{favoritePerfumes.length !== 1 ? 's' : ''}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoritePerfumes.map((perfume) => (
                  <PerfumeCard key={perfume.id} perfume={perfume} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </main>
  );
}
