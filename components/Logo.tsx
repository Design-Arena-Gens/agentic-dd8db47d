export default function Logo() {
  return (
    <div className="flex justify-center mb-4">
      <div className="relative">
        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-soft-lg rotate-3 transform hover:rotate-6 transition-transform">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-10 h-10 text-white"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Perfume bottle shape */}
            <path d="M9 2h6v2H9z" fill="currentColor" />
            <rect x="7" y="4" width="10" height="3" rx="1" fill="currentColor" />
            <path
              d="M8 7v2c0 1-0.5 2-1 3v7a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3v-7c-0.5-1-1-2-1-3V7z"
              fill="currentColor"
              opacity="0.9"
            />
            <circle cx="12" cy="15" r="1.5" fill="white" opacity="0.3" />
          </svg>
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent-400 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-soft">
          ✓
        </div>
      </div>
    </div>
  );
}
