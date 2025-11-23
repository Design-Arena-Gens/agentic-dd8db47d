"use client";

import { useState } from 'react';
import { X, Bell } from 'lucide-react';
import { Perfume, useStore } from '@/lib/store';
import { formatPrice, getCheapestPrice } from '@/lib/utils';

interface PriceAlertModalProps {
  perfume: Perfume;
  onClose: () => void;
}

export default function PriceAlertModal({ perfume, onClose }: PriceAlertModalProps) {
  const cheapest = getCheapestPrice(perfume.prices);
  const currentPrice = cheapest?.price || 0;

  const [targetPrice, setTargetPrice] = useState(
    currentPrice > 10 ? Math.floor(currentPrice * 0.9) : currentPrice
  );

  const { addPriceAlert } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addPriceAlert({
      perfumeId: perfume.id,
      perfumeName: `${perfume.brand} ${perfume.name}`,
      targetPrice,
      currentPrice,
    });

    onClose();
  };

  const discount = currentPrice > 0 ? ((currentPrice - targetPrice) / currentPrice) * 100 : 0;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-soft-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-100 rounded-xl">
              <Bell className="w-6 h-6 text-primary-600" />
            </div>
            <h2 className="text-2xl font-display font-bold text-gray-900">
              Set Price Alert
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Perfume Info */}
          <div className="mb-6 p-4 bg-gray-50 rounded-xl">
            <h3 className="font-semibold text-gray-900 mb-1">{perfume.name}</h3>
            <p className="text-sm text-gray-600">{perfume.brand}</p>
          </div>

          {/* Current Price */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2">Current Best Price</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-gray-900">
                {formatPrice(currentPrice)}
              </p>
              {cheapest && (
                <p className="text-sm text-gray-500">at {cheapest.shop}</p>
              )}
            </div>
          </div>

          {/* Alert Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Notify me when price drops to:
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg font-semibold">
                  €
                </span>
                <input
                  type="number"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(parseFloat(e.target.value) || 0)}
                  step="0.01"
                  min="0"
                  max={currentPrice}
                  required
                  className="w-full pl-10 pr-4 py-4 text-2xl font-bold rounded-xl border-2 border-gray-300 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none"
                />
              </div>
            </div>

            {/* Discount Info */}
            {discount > 0 && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                <p className="text-sm font-medium text-green-700">
                  You'll save{' '}
                  <span className="font-bold">
                    {formatPrice(currentPrice - targetPrice)}
                  </span>{' '}
                  ({discount.toFixed(0)}% off) when this alert triggers!
                </p>
              </div>
            )}

            {targetPrice >= currentPrice && (
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                <p className="text-sm font-medium text-yellow-700">
                  Your target price is at or above the current price. We recommend setting a lower target to get notified of real savings.
                </p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
              <button type="submit" className="flex-1 btn-primary">
                Create Alert
              </button>
            </div>
          </form>

          {/* Info */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="text-xs text-blue-700">
              💡 <strong>Tip:</strong> We'll check prices regularly and notify you when your target is reached. You can manage your alerts in the Alerts tab.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
