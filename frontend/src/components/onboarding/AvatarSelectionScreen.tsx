import { useState } from 'react';
import { ArrowLeft, Check, Wand2 } from 'lucide-react@0.487.0';

interface AvatarSelectionScreenProps {
  onBack: () => void;
  onSelectAvatar: (avatarId: string) => void;
  onCustomize?: () => void;
}

interface FairyPreset {
  id: string;
  name: string;
  skinColor: string;
  hairColor: string;
  hairGradient: string;
  dressColor: string;
  dressGradient: string;
  wingColor: string;
  wingGradient: string;
  accentColor: string;
}

const fairyPresets: FairyPreset[] = [
  { id: 'fairy-1', name: 'Midnight Dreams', skinColor: '#D4A574', hairColor: '#1a1a2e', hairGradient: 'from-[#1a1a2e] to-[#16213e]', dressColor: '#2d1b4e', dressGradient: 'from-purple-900 to-indigo-900', wingColor: '#6b46c1', wingGradient: 'from-purple-500/40 to-indigo-400/40', accentColor: '#9333ea' },
  { id: 'fairy-2', name: 'Ocean Breeze', skinColor: '#E8C4A0', hairColor: '#0ea5e9', hairGradient: 'from-cyan-500 to-blue-500', dressColor: '#0284c7', dressGradient: 'from-cyan-600 to-sky-600', wingColor: '#38bdf8', wingGradient: 'from-cyan-300/40 to-blue-300/40', accentColor: '#06b6d4' },
  { id: 'fairy-3', name: 'Golden Sunshine', skinColor: '#C89968', hairColor: '#fbbf24', hairGradient: 'from-yellow-400 to-amber-400', dressColor: '#f59e0b', dressGradient: 'from-yellow-500 to-orange-500', wingColor: '#fcd34d', wingGradient: 'from-yellow-300/40 to-amber-300/40', accentColor: '#f59e0b' },
  { id: 'fairy-4', name: 'Emerald Garden', skinColor: '#B8956A', hairColor: '#10b981', hairGradient: 'from-emerald-500 to-green-600', dressColor: '#059669', dressGradient: 'from-emerald-600 to-green-700', wingColor: '#34d399', wingGradient: 'from-emerald-300/40 to-green-300/40', accentColor: '#10b981' },
  { id: 'fairy-5', name: 'Rose Petal', skinColor: '#F5D5C3', hairColor: '#f43f5e', hairGradient: 'from-rose-500 to-pink-500', dressColor: '#e11d48', dressGradient: 'from-rose-600 to-pink-600', wingColor: '#fb7185', wingGradient: 'from-rose-400/40 to-pink-400/40', accentColor: '#f43f5e' },
  { id: 'fairy-6', name: 'Crystal Ice', skinColor: '#FCEAE5', hairColor: '#e0f2fe', hairGradient: 'from-sky-100 to-blue-100', dressColor: '#bae6fd', dressGradient: 'from-sky-200 to-blue-200', wingColor: '#7dd3fc', wingGradient: 'from-sky-200/40 to-blue-200/40', accentColor: '#38bdf8' },
  { id: 'fairy-7', name: 'Autumn Flame', skinColor: '#D4A574', hairColor: '#ea580c', hairGradient: 'from-orange-600 to-red-600', dressColor: '#dc2626', dressGradient: 'from-orange-700 to-red-700', wingColor: '#fb923c', wingGradient: 'from-orange-400/40 to-red-400/40', accentColor: '#f97316' },
  { id: 'fairy-8', name: 'Winter Frost', skinColor: '#E5D4C9', hairColor: '#cbd5e1', hairGradient: 'from-slate-300 to-gray-300', dressColor: '#94a3b8', dressGradient: 'from-slate-400 to-gray-400', wingColor: '#e2e8f0', wingGradient: 'from-slate-200/40 to-gray-200/40', accentColor: '#64748b' },
  { id: 'fairy-9', name: 'Ruby Radiance', skinColor: '#C89968', hairColor: '#be123c', hairGradient: 'from-rose-700 to-red-700', dressColor: '#9f1239', dressGradient: 'from-rose-800 to-red-800', wingColor: '#fb7185', wingGradient: 'from-rose-400/40 to-red-400/40', accentColor: '#e11d48' },
  { id: 'fairy-10', name: 'Aqua Dream', skinColor: '#F5D5C3', hairColor: '#06b6d4', hairGradient: 'from-cyan-500 to-teal-500', dressColor: '#0891b2', dressGradient: 'from-cyan-600 to-teal-600', wingColor: '#22d3ee', wingGradient: 'from-cyan-400/40 to-teal-400/40', accentColor: '#06b6d4' },
  { id: 'fairy-11', name: 'Stardust', skinColor: '#B8956A', hairColor: '#8b5cf6', hairGradient: 'from-violet-500 to-purple-500', dressColor: '#7c3aed', dressGradient: 'from-violet-600 to-purple-600', wingColor: '#a78bfa', wingGradient: 'from-violet-400/40 to-purple-400/40', accentColor: '#8b5cf6' },
  { id: 'fairy-12', name: 'Cherry Blossom', skinColor: '#FCEAE5', hairColor: '#ec4899', hairGradient: 'from-pink-500 to-rose-500', dressColor: '#db2777', dressGradient: 'from-pink-600 to-rose-600', wingColor: '#f9a8d4', wingGradient: 'from-pink-400/40 to-rose-400/40', accentColor: '#ec4899' },
  { id: 'fairy-13', name: 'Violet Twilight', skinColor: '#D4A574', hairColor: '#6d28d9', hairGradient: 'from-violet-700 to-purple-700', dressColor: '#5b21b6', dressGradient: 'from-violet-800 to-purple-800', wingColor: '#8b5cf6', wingGradient: 'from-violet-500/40 to-purple-500/40', accentColor: '#7c3aed' },
  { id: 'fairy-14', name: 'Moonlight Pearl', skinColor: '#E8C4A0', hairColor: '#f3f4f6', hairGradient: 'from-gray-100 to-slate-200', dressColor: '#e5e7eb', dressGradient: 'from-gray-200 to-slate-300', wingColor: '#f9fafb', wingGradient: 'from-gray-50/40 to-slate-100/40', accentColor: '#9ca3af' },
  { id: 'fairy-15', name: 'Marigold Meadow', skinColor: '#C89968', hairColor: '#eab308', hairGradient: 'from-yellow-500 to-amber-500', dressColor: '#ca8a04', dressGradient: 'from-yellow-600 to-amber-600', wingColor: '#fde047', wingGradient: 'from-yellow-300/40 to-amber-300/40', accentColor: '#eab308' },
  { id: 'fairy-16', name: 'Jade Empress', skinColor: '#B8956A', hairColor: '#16a34a', hairGradient: 'from-green-600 to-emerald-600', dressColor: '#15803d', dressGradient: 'from-green-700 to-emerald-700', wingColor: '#4ade80', wingGradient: 'from-green-400/40 to-emerald-400/40', accentColor: '#16a34a' },
  { id: 'fairy-17', name: 'Burgundy Belle', skinColor: '#F5D5C3', hairColor: '#881337', hairGradient: 'from-rose-900 to-red-900', dressColor: '#9f1239', dressGradient: 'from-rose-800 to-red-800', wingColor: '#be123c', wingGradient: 'from-rose-600/40 to-red-600/40', accentColor: '#be123c' },
  { id: 'fairy-18', name: 'Arctic Spirit', skinColor: '#E5D4C9', hairColor: '#dbeafe', hairGradient: 'from-blue-100 to-indigo-100', dressColor: '#bfdbfe', dressGradient: 'from-blue-200 to-indigo-200', wingColor: '#93c5fd', wingGradient: 'from-blue-300/40 to-indigo-300/40', accentColor: '#60a5fa' },
  { id: 'fairy-19', name: 'Coral Sunrise', skinColor: '#FCEAE5', hairColor: '#fb7185', hairGradient: 'from-rose-400 to-pink-400', dressColor: '#f43f5e', dressGradient: 'from-rose-500 to-pink-500', wingColor: '#fda4af', wingGradient: 'from-rose-300/40 to-pink-300/40', accentColor: '#f43f5e' },
  { id: 'fairy-20', name: 'Lavender Haze', skinColor: '#D4A574', hairColor: '#c084fc', hairGradient: 'from-purple-400 to-violet-400', dressColor: '#a855f7', dressGradient: 'from-purple-500 to-violet-500', wingColor: '#d8b4fe', wingGradient: 'from-purple-300/40 to-violet-300/40', accentColor: '#a855f7' },
  { id: 'fairy-21', name: 'Crimson Rose', skinColor: '#C89968', hairColor: '#dc2626', hairGradient: 'from-red-600 to-rose-600', dressColor: '#b91c1c', dressGradient: 'from-red-700 to-rose-700', wingColor: '#f87171', wingGradient: 'from-red-400/40 to-rose-400/40', accentColor: '#dc2626' },
  { id: 'fairy-22', name: 'Mint Breeze', skinColor: '#B8956A', hairColor: '#6ee7b7', hairGradient: 'from-emerald-300 to-teal-300', dressColor: '#5eead4', dressGradient: 'from-emerald-400 to-teal-400', wingColor: '#6ee7b7', wingGradient: 'from-emerald-300/40 to-teal-300/40', accentColor: '#14b8a6' },
  { id: 'fairy-23', name: 'Opal Goddess', skinColor: '#E8C4A0', hairColor: '#fef3c7', hairGradient: 'from-amber-100 to-yellow-100', dressColor: '#fde68a', dressGradient: 'from-amber-200 to-yellow-200', wingColor: '#fef08a', wingGradient: 'from-amber-200/40 to-yellow-200/40', accentColor: '#fbbf24' },
  { id: 'fairy-24', name: 'Sunset Magic', skinColor: '#F5D5C3', hairColor: '#f97316', hairGradient: 'from-orange-500 to-amber-500', dressColor: '#ea580c', dressGradient: 'from-orange-600 to-amber-600', wingColor: '#fb923c', wingGradient: 'from-orange-400/40 to-amber-400/40', accentColor: '#f97316' },
];

function FairyAvatar({ preset, size = 'md' }: { preset: FairyPreset; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-32 h-32',
    lg: 'w-48 h-48'
  };

  return (
    <div className={`${sizeClasses[size]} relative`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Wings */}
        <ellipse cx="30" cy="45" rx="18" ry="28" fill={preset.wingColor} opacity="0.6" transform="rotate(-20 30 45)" />
        <ellipse cx="70" cy="45" rx="18" ry="28" fill={preset.wingColor} opacity="0.6" transform="rotate(20 70 45)" />
        
        {/* Body/Dress */}
        <ellipse cx="50" cy="65" rx="16" ry="22" fill={preset.dressColor} />
        <path d="M 42 65 Q 50 80 58 65" fill={preset.dressColor} opacity="0.8" />
        
        {/* Head */}
        <circle cx="50" cy="40" r="12" fill={preset.skinColor} />
        
        {/* Hair */}
        <ellipse cx="50" cy="35" rx="13" ry="10" fill={preset.hairColor} />
        <ellipse cx="42" cy="38" rx="6" ry="8" fill={preset.hairColor} />
        <ellipse cx="58" cy="38" rx="6" ry="8" fill={preset.hairColor} />
        
        {/* Face details */}
        <circle cx="46" cy="39" r="1.5" fill="#2d1b4e" />
        <circle cx="54" cy="39" r="1.5" fill="#2d1b4e" />
        <path d="M 48 43 Q 50 44 52 43" stroke={preset.accentColor} strokeWidth="0.8" fill="none" />
        
        {/* Sparkles */}
        <circle cx="25" cy="30" r="1.5" fill={preset.accentColor} opacity="0.8" />
        <circle cx="75" cy="35" r="1" fill={preset.accentColor} opacity="0.6" />
        <circle cx="35" cy="20" r="1.2" fill={preset.accentColor} opacity="0.7" />
        <circle cx="65" cy="25" r="0.8" fill={preset.accentColor} opacity="0.5" />
      </svg>
    </div>
  );
}

export function AvatarSelectionScreen({ onBack, onSelectAvatar, onCustomize }: AvatarSelectionScreenProps) {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  const handleConfirm = () => {
    if (selectedAvatar) {
      onSelectAvatar(selectedAvatar);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0f2e] to-[#2d1b4e] text-white flex flex-col">
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col p-6">
        {/* Header */}
        <div className="flex items-center mb-6 pt-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-purple-900/40 border border-purple-700/40 flex items-center justify-center hover:bg-purple-900/60 transition-all duration-300 mr-4 shadow-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl">Choose Your Fairy Avatar</h1>
        </div>

        {/* Subtitle */}
        <p className="text-gray-300 text-center mb-4 px-4">
          Select a magical fairy to represent you on your wellness journey
        </p>

        {/* Create Custom Fairy Button */}
        {onCustomize && (
          <div className="mb-6 flex justify-center">
            <button
              onClick={onCustomize}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 hover:shadow-xl hover:shadow-pink-500/50"
            >
              <Wand2 className="w-5 h-5" />
              <span>Create Custom Fairy</span>
            </button>
          </div>
        )}

        {/* Avatar Grid */}
        <div className="flex-1 overflow-y-auto mb-6">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 pb-4">
            {fairyPresets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => setSelectedAvatar(preset.id)}
                className={`relative rounded-2xl p-4 transition-all duration-300 transform hover:scale-110 ${
                  selectedAvatar === preset.id
                    ? 'bg-gradient-to-br from-purple-600/30 to-pink-600/30 ring-4 ring-purple-400 shadow-xl shadow-purple-500/60 scale-105'
                    : 'bg-gradient-to-br from-purple-900/20 to-pink-900/20 ring-2 ring-purple-800/40 hover:ring-purple-600/70'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <FairyAvatar preset={preset} size="md" />
                  <p className="text-xs text-center text-gray-300 leading-tight">{preset.name}</p>
                </div>
                
                {/* Selected Checkmark */}
                {selectedAvatar === preset.id && (
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center shadow-lg">
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleConfirm}
          disabled={!selectedAvatar}
          className={`w-full py-5 px-6 rounded-full text-white transition-all duration-300 shadow-lg mb-6 ${
            selectedAvatar
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 active:scale-95 hover:shadow-xl hover:shadow-purple-500/50'
              : 'bg-gray-600 cursor-not-allowed opacity-50'
          }`}
        >
          Continue with Selected Fairy
        </button>
      </div>
    </div>
  );
}