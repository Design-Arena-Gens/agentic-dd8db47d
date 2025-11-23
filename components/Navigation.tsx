"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Heart, Bell, Search } from 'lucide-react';
import { useStore } from '@/lib/store';

export default function Navigation() {
  const pathname = usePathname();
  const { favorites, priceAlerts } = useStore();

  const navItems = [
    {
      href: '/',
      label: 'Home',
      icon: Home,
      exact: true,
    },
    {
      href: '/favorites',
      label: 'Favorites',
      icon: Heart,
      badge: favorites.length,
    },
    {
      href: '/alerts',
      label: 'Alerts',
      icon: Bell,
      badge: priceAlerts.filter(a => a.active).length,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-soft-xl z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex flex-col items-center justify-center gap-1 px-6 py-2 rounded-xl transition-all ${
                  isActive
                    ? 'text-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="relative">
                  <Icon
                    className={`w-6 h-6 ${
                      isActive ? 'fill-current' : ''
                    }`}
                  />
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {item.badge > 9 ? '9+' : item.badge}
                    </span>
                  )}
                </div>
                <span className={`text-xs font-medium ${
                  isActive ? 'font-semibold' : ''
                }`}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-600 rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
