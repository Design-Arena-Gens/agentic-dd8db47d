"use client";

import { useEffect, useState } from 'react';
import { Bell, Trash2, TrendingDown, Check } from 'lucide-react';
import { fetchPerfumes } from '@/lib/api';
import { Perfume, useStore } from '@/lib/store';
import { formatPrice, shouldNotifyPriceAlert } from '@/lib/utils';

export default function Alerts() {
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [loading, setLoading] = useState(true);

  const { priceAlerts, removePriceAlert } = useStore();

  useEffect(() => {
    loadPerfumes();
  }, []);

  const loadPerfumes = async () => {
    setLoading(true);
    const data = await fetchPerfumes();
    setPerfumes(data);
    setLoading(false);
  };

  const getAlertStatus = (alertId: string, targetPrice: number, currentPrice: number) => {
    const shouldNotify = shouldNotifyPriceAlert(targetPrice, currentPrice);
    return {
      shouldNotify,
      priceChange: currentPrice - targetPrice,
      percentageChange: ((currentPrice - targetPrice) / targetPrice) * 100,
    };
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-6 pb-24">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Bell className="w-8 h-8 text-primary-600" />
          <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900">
            Price Alerts
          </h1>
        </div>
        <p className="text-gray-600">
          Get notified when prices drop below your target
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-gray-600">Loading alerts...</p>
        </div>
      )}

      {/* Alerts List */}
      {!loading && (
        <>
          {priceAlerts.length === 0 ? (
            <div className="text-center py-20">
              <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No price alerts set
              </h3>
              <p className="text-gray-500 mb-6">
                Create alerts to get notified when perfume prices drop
              </p>
              <a href="/" className="btn-primary inline-block">
                Browse Perfumes
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {priceAlerts.map((alert) => {
                const status = getAlertStatus(alert.id, alert.targetPrice, alert.currentPrice);
                const perfume = perfumes.find(p => p.id === alert.perfumeId);

                return (
                  <div
                    key={alert.id}
                    className={`card ${
                      status.shouldNotify
                        ? 'border-2 border-green-300 bg-green-50'
                        : ''
                    }`}
                  >
                    <div className="flex flex-col md:flex-row gap-4">
                      {/* Perfume Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-1">
                              {alert.perfumeName}
                            </h3>
                            {perfume && (
                              <p className="text-sm text-gray-600">{perfume.brand}</p>
                            )}
                          </div>
                          <button
                            onClick={() => removePriceAlert(alert.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete alert"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Price Info */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Target Price</p>
                            <p className="text-lg font-bold text-primary-600">
                              {formatPrice(alert.targetPrice)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Current Price</p>
                            <p className="text-lg font-bold text-gray-900">
                              {formatPrice(alert.currentPrice)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Difference</p>
                            <div className="flex items-center gap-2">
                              {status.shouldNotify ? (
                                <TrendingDown className="w-5 h-5 text-green-600" />
                              ) : (
                                <span className="text-lg">📈</span>
                              )}
                              <p
                                className={`text-lg font-bold ${
                                  status.shouldNotify
                                    ? 'text-green-600'
                                    : 'text-red-600'
                                }`}
                              >
                                {status.shouldNotify ? '-' : '+'}
                                {formatPrice(Math.abs(status.priceChange))}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Alert Status */}
                        {status.shouldNotify && (
                          <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-lg flex items-center gap-3">
                            <Check className="w-5 h-5 text-green-700" />
                            <p className="text-sm font-medium text-green-700">
                              Price target reached! This perfume is now at or below your target price.
                            </p>
                          </div>
                        )}

                        {!status.shouldNotify && (
                          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-sm text-blue-700">
                              We'll notify you when the price drops to{' '}
                              <span className="font-semibold">
                                {formatPrice(alert.targetPrice)}
                              </span>{' '}
                              or below
                            </p>
                          </div>
                        )}

                        {/* View Perfume Button */}
                        <div className="mt-4">
                          <a
                            href={`/perfume/${alert.perfumeId}`}
                            className="btn-secondary inline-block text-sm"
                          >
                            View Perfume
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </main>
  );
}
