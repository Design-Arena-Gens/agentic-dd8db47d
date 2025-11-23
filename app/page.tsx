"use client";

import { useEffect, useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { fetchPerfumes } from '@/lib/api';
import { Perfume } from '@/lib/store';
import { searchPerfumes, getSearchSuggestions } from '@/lib/utils';
import PerfumeCard from '@/components/PerfumeCard';
import SearchBar from '@/components/SearchBar';
import Logo from '@/components/Logo';

export default function Home() {
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [filteredPerfumes, setFilteredPerfumes] = useState<Perfume[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPerfumes();
  }, []);

  useEffect(() => {
    const results = searchPerfumes(perfumes, searchQuery);
    setFilteredPerfumes(results);
  }, [searchQuery, perfumes]);

  const loadPerfumes = async () => {
    setLoading(true);
    const data = await fetchPerfumes();
    setPerfumes(data);
    setFilteredPerfumes(data);
    setLoading(false);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-6 pb-24">
      {/* Header */}
      <div className="mb-8 text-center">
        <Logo />
        <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-2">
          Perfume Price Finder
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Compare prices and find the best deals on your favorite fragrances
        </p>
      </div>

      {/* Search Bar */}
      <SearchBar
        onSearch={handleSearch}
        perfumes={perfumes}
        placeholder="Search perfumes, brands, or notes..."
      />

      {/* Results Count */}
      {searchQuery && (
        <div className="mb-4 text-sm text-gray-600">
          Found {filteredPerfumes.length} perfume{filteredPerfumes.length !== 1 ? 's' : ''}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-gray-600">Loading perfumes...</p>
        </div>
      )}

      {/* Perfume Grid */}
      {!loading && (
        <>
          {filteredPerfumes.length === 0 ? (
            <div className="text-center py-20">
              <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No perfumes found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search query
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPerfumes.map((perfume) => (
                <PerfumeCard key={perfume.id} perfume={perfume} />
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
}
