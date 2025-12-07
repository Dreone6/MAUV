export function FloatingSymbolsBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
      {/* Flowers */}
      <svg className="absolute top-[10%] left-[5%] w-16 h-16 text-purple-300" viewBox="0 0 64 64" fill="currentColor">
        <circle cx="32" cy="20" r="8" opacity="0.6" />
        <circle cx="20" cy="32" r="8" opacity="0.6" />
        <circle cx="44" cy="32" r="8" opacity="0.6" />
        <circle cx="32" cy="44" r="8" opacity="0.6" />
        <circle cx="32" cy="32" r="6" opacity="0.8" />
      </svg>

      {/* Lotus */}
      <svg className="absolute top-[20%] right-[10%] w-20 h-20 text-pink-300" viewBox="0 0 64 64" fill="currentColor">
        <ellipse cx="32" cy="40" rx="12" ry="18" opacity="0.5" />
        <ellipse cx="20" cy="38" rx="10" ry="16" opacity="0.5" transform="rotate(-20 20 38)" />
        <ellipse cx="44" cy="38" rx="10" ry="16" opacity="0.5" transform="rotate(20 44 38)" />
        <ellipse cx="14" cy="40" rx="8" ry="14" opacity="0.4" transform="rotate(-40 14 40)" />
        <ellipse cx="50" cy="40" rx="8" ry="14" opacity="0.4" transform="rotate(40 50 40)" />
      </svg>

      {/* Butterfly */}
      <svg className="absolute top-[35%] left-[15%] w-14 h-14 text-purple-400" viewBox="0 0 64 64" fill="currentColor">
        <ellipse cx="24" cy="24" rx="12" ry="16" opacity="0.5" />
        <ellipse cx="40" cy="24" rx="12" ry="16" opacity="0.5" />
        <ellipse cx="24" cy="44" rx="10" ry="14" opacity="0.4" />
        <ellipse cx="40" cy="44" rx="10" ry="14" opacity="0.4" />
        <rect x="30" y="16" width="4" height="36" rx="2" opacity="0.6" />
      </svg>

      {/* Moon Phases */}
      <svg className="absolute bottom-[25%] right-[8%] w-12 h-12 text-purple-300" viewBox="0 0 48 48" fill="currentColor">
        <circle cx="24" cy="24" r="10" opacity="0.5" />
        <path d="M24 14a10 10 0 0 0 0 20 8 8 0 0 1 0-20z" opacity="0.3" />
      </svg>

      {/* Droplet */}
      <svg className="absolute top-[60%] left-[8%] w-10 h-10 text-pink-400" viewBox="0 0 48 48" fill="currentColor">
        <path d="M24 4C24 4 12 20 12 28a12 12 0 0 0 24 0C36 20 24 4 24 4z" opacity="0.5" />
      </svg>

      {/* Heart */}
      <svg className="absolute bottom-[15%] left-[20%] w-12 h-12 text-pink-300" viewBox="0 0 48 48" fill="currentColor">
        <path d="M24 42L20.5 38.8C11 30.2 5 24.8 5 18.3 5 13.3 9 9.5 14 9.5c3 0 5.9 1.4 7.8 3.5C23.7 10.9 26.6 9.5 29.6 9.5c5 0 9 3.8 9 8.8 0 6.5-6 11.9-15.5 20.5L24 42z" opacity="0.4" />
      </svg>

      {/* Small Flower */}
      <svg className="absolute top-[45%] right-[25%] w-10 h-10 text-purple-400" viewBox="0 0 48 48" fill="currentColor">
        <circle cx="24" cy="16" r="5" opacity="0.5" />
        <circle cx="16" cy="24" r="5" opacity="0.5" />
        <circle cx="32" cy="24" r="5" opacity="0.5" />
        <circle cx="24" cy="32" r="5" opacity="0.5" />
        <circle cx="24" cy="24" r="4" opacity="0.6" />
      </svg>

      {/* Leaf */}
      <svg className="absolute bottom-[40%] right-[15%] w-14 h-14 text-green-300" viewBox="0 0 48 48" fill="currentColor">
        <path d="M12 40C12 40 12 20 24 12C36 20 36 40 36 40C36 40 30 34 24 34C18 34 12 40 12 40Z" opacity="0.4" />
      </svg>

      {/* Venus Symbol */}
      <svg className="absolute top-[70%] right-[30%] w-16 h-16 text-pink-400" viewBox="0 0 64 64" fill="currentColor">
        <circle cx="32" cy="24" r="12" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.4" />
        <line x1="32" y1="36" x2="32" y2="52" stroke="currentColor" strokeWidth="3" opacity="0.4" />
        <line x1="24" y1="48" x2="40" y2="48" stroke="currentColor" strokeWidth="3" opacity="0.4" />
      </svg>

      {/* Cherry Blossom */}
      <svg className="absolute top-[50%] left-[30%] w-12 h-12 text-pink-300" viewBox="0 0 48 48" fill="currentColor">
        <ellipse cx="24" cy="18" rx="6" ry="8" opacity="0.5" />
        <ellipse cx="34" cy="26" rx="6" ry="8" opacity="0.5" transform="rotate(72 34 26)" />
        <ellipse cx="30" cy="36" rx="6" ry="8" opacity="0.5" transform="rotate(144 30 36)" />
        <ellipse cx="18" cy="36" rx="6" ry="8" opacity="0.5" transform="rotate(216 18 36)" />
        <ellipse cx="14" cy="26" rx="6" ry="8" opacity="0.5" transform="rotate(288 14 26)" />
        <circle cx="24" cy="26" r="4" opacity="0.6" />
      </svg>

      {/* Crescent Moon */}
      <svg className="absolute bottom-[10%] right-[40%] w-14 h-14 text-purple-300" viewBox="0 0 48 48" fill="currentColor">
        <path d="M24 6C15 6 8 13 8 22s7 16 16 16c1.5 0 3-.2 4.4-.6-3.7-2.2-6.2-6.2-6.2-10.8 0-6.9 5.6-12.5 12.5-12.5 1.2 0 2.3.2 3.4.5C35.8 9.8 30.3 6 24 6z" opacity="0.5" />
      </svg>

      {/* Star */}
      <svg className="absolute top-[15%] left-[40%] w-10 h-10 text-yellow-300" viewBox="0 0 48 48" fill="currentColor">
        <path d="M24 2l6.2 12.5L44 16.4l-10 9.7 2.4 13.9L24 33.5 11.6 40l2.4-13.9-10-9.7 13.8-1.9L24 2z" opacity="0.4" />
      </svg>

      {/* Spiral */}
      <svg className="absolute bottom-[30%] left-[35%] w-12 h-12 text-purple-400" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M24 24c0-2 2-4 4-4s4 2 4 6-2 8-6 8-8-4-8-10 4-12 10-12 12 6 12 14" opacity="0.4" />
      </svg>

      {/* Dandelion */}
      <svg className="absolute top-[80%] left-[12%] w-16 h-16 text-purple-300" viewBox="0 0 64 64" fill="currentColor">
        <circle cx="32" cy="32" r="2" opacity="0.6" />
        <circle cx="32" cy="20" r="2" opacity="0.4" />
        <circle cx="44" cy="32" r="2" opacity="0.4" />
        <circle cx="32" cy="44" r="2" opacity="0.4" />
        <circle cx="20" cy="32" r="2" opacity="0.4" />
        <circle cx="38" cy="24" r="2" opacity="0.3" />
        <circle cx="40" cy="40" r="2" opacity="0.3" />
        <circle cx="24" cy="40" r="2" opacity="0.3" />
        <circle cx="24" cy="24" r="2" opacity="0.3" />
      </svg>

      {/* Infinity Symbol */}
      <svg className="absolute top-[25%] left-[50%] w-16 h-16 text-pink-400" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3">
        <path d="M16 32a8 8 0 1 0 16 0 8 8 0 1 0-16 0M32 32a8 8 0 1 0 16 0 8 8 0 1 0-16 0" opacity="0.4" />
      </svg>

      {/* Small Hearts */}
      <svg className="absolute top-[5%] right-[35%] w-8 h-8 text-pink-300" viewBox="0 0 48 48" fill="currentColor">
        <path d="M24 42L20.5 38.8C11 30.2 5 24.8 5 18.3 5 13.3 9 9.5 14 9.5c3 0 5.9 1.4 7.8 3.5C23.7 10.9 26.6 9.5 29.6 9.5c5 0 9 3.8 9 8.8 0 6.5-6 11.9-15.5 20.5L24 42z" opacity="0.3" />
      </svg>

      {/* Mandala */}
      <svg className="absolute bottom-[5%] left-[45%] w-18 h-18 text-purple-400" viewBox="0 0 64 64" fill="currentColor">
        <circle cx="32" cy="32" r="20" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <circle cx="32" cy="32" r="14" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <circle cx="32" cy="32" r="8" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <circle cx="32" cy="12" r="3" opacity="0.4" />
        <circle cx="32" cy="52" r="3" opacity="0.4" />
        <circle cx="12" cy="32" r="3" opacity="0.4" />
        <circle cx="52" cy="32" r="3" opacity="0.4" />
      </svg>
    </div>
  );
}
