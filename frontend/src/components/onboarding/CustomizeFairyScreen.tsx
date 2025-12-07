import { useState } from 'react';
import { ArrowLeft, Sparkles, Shuffle } from 'lucide-react@0.487.0';

interface CustomizeFairyScreenProps {
  onBack: () => void;
  onSaveFairy: (fairy: CustomFairy) => void;
}

interface CustomFairy {
  name: string;
  skinColor: string;
  hairColor: string;
  dressColor: string;
  wingColor: string;
  accentColor: string;
}

const skinTones = [
  { id: 'porcelain', color: '#FCEAE5', name: 'Porcelain' },
  { id: 'fair', color: '#F5D5C3', name: 'Fair' },
  { id: 'beige', color: '#E8C4A0', name: 'Beige' },
  { id: 'tan', color: '#D4A574', name: 'Tan' },
  { id: 'olive', color: '#C89968', name: 'Olive' },
  { id: 'bronze', color: '#B8956A', name: 'Bronze' },
  { id: 'cocoa', color: '#9B6B4A', name: 'Cocoa' },
  { id: 'ebony', color: '#6B4423', name: 'Ebony' },
];

const hairColors = [
  { id: 'platinum', color: '#f3f4f6', name: 'Platinum' },
  { id: 'blonde', color: '#fbbf24', name: 'Blonde' },
  { id: 'strawberry', color: '#fb7185', name: 'Strawberry' },
  { id: 'auburn', color: '#ea580c', name: 'Auburn' },
  { id: 'brown', color: '#92400e', name: 'Brown' },
  { id: 'black', color: '#1a1a2e', name: 'Black' },
  { id: 'purple', color: '#8b5cf6', name: 'Purple' },
  { id: 'pink', color: '#ec4899', name: 'Pink' },
  { id: 'blue', color: '#0ea5e9', name: 'Blue' },
  { id: 'mint', color: '#6ee7b7', name: 'Mint' },
  { id: 'lavender', color: '#c084fc', name: 'Lavender' },
  { id: 'rose-gold', color: '#f87171', name: 'Rose Gold' },
];

const dressColors = [
  { id: 'midnight', color: '#2d1b4e', name: 'Midnight' },
  { id: 'royal-purple', color: '#7c3aed', name: 'Royal Purple' },
  { id: 'hot-pink', color: '#db2777', name: 'Hot Pink' },
  { id: 'rose', color: '#e11d48', name: 'Rose' },
  { id: 'ocean', color: '#0284c7', name: 'Ocean' },
  { id: 'emerald', color: '#059669', name: 'Emerald' },
  { id: 'gold', color: '#f59e0b', name: 'Gold' },
  { id: 'coral', color: '#f43f5e', name: 'Coral' },
  { id: 'crimson', color: '#dc2626', name: 'Crimson' },
  { id: 'sapphire', color: '#1e40af', name: 'Sapphire' },
  { id: 'amethyst', color: '#6d28d9', name: 'Amethyst' },
  { id: 'teal', color: '#0891b2', name: 'Teal' },
];

const wingColors = [
  { id: 'crystal', color: '#e2e8f0', name: 'Crystal' },
  { id: 'purple-glow', color: '#a78bfa', name: 'Purple Glow' },
  { id: 'pink-glow', color: '#f9a8d4', name: 'Pink Glow' },
  { id: 'cyan-glow', color: '#22d3ee', name: 'Cyan Glow' },
  { id: 'gold-glow', color: '#fcd34d', name: 'Gold Glow' },
  { id: 'emerald-glow', color: '#34d399', name: 'Emerald Glow' },
  { id: 'rose-glow', color: '#fb7185', name: 'Rose Glow' },
  { id: 'sky-glow', color: '#38bdf8', name: 'Sky Glow' },
];

function FairyAvatar({ fairy, size = 'lg' }: { fairy: CustomFairy; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-40 h-40',
    lg: 'w-64 h-64'
  };

  return (
    <div className={`${sizeClasses[size]} relative`}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
        {/* Wings */}
        <ellipse cx="30" cy="45" rx="18" ry="28" fill={fairy.wingColor} opacity="0.7" transform="rotate(-20 30 45)" />
        <ellipse cx="70" cy="45" rx="18" ry="28" fill={fairy.wingColor} opacity="0.7" transform="rotate(20 70 45)" />
        
        {/* Wing details */}
        <ellipse cx="30" cy="40" rx="12" ry="18" fill={fairy.accentColor} opacity="0.3" transform="rotate(-20 30 40)" />
        <ellipse cx="70" cy="40" rx="12" ry="18" fill={fairy.accentColor} opacity="0.3" transform="rotate(20 70 40)" />
        
        {/* Body/Dress */}
        <ellipse cx="50" cy="65" rx="16" ry="22" fill={fairy.dressColor} />
        <path d="M 42 65 Q 50 80 58 65" fill={fairy.dressColor} opacity="0.8" />
        <ellipse cx="50" cy="55" rx="14" ry="12" fill={fairy.dressColor} opacity="0.9" />
        
        {/* Head */}
        <circle cx="50" cy="40" r="12" fill={fairy.skinColor} />
        
        {/* Hair */}
        <ellipse cx="50" cy="35" rx="13" ry="10" fill={fairy.hairColor} />
        <ellipse cx="42" cy="38" rx="6" ry="8" fill={fairy.hairColor} />
        <ellipse cx="58" cy="38" rx="6" ry="8" fill={fairy.hairColor} />
        <ellipse cx="50" cy="42" rx="8" ry="5" fill={fairy.hairColor} opacity="0.6" />
        
        {/* Face details */}
        <circle cx="46" cy="39" r="1.5" fill="#1a1a2e" />
        <circle cx="54" cy="39" r="1.5" fill="#1a1a2e" />
        <circle cx="46.5" cy="38.5" r="0.5" fill="#ffffff" opacity="0.8" />
        <circle cx="54.5" cy="38.5" r="0.5" fill="#ffffff" opacity="0.8" />
        <path d="M 48 43 Q 50 44.5 52 43" stroke={fairy.accentColor} strokeWidth="1" fill="none" strokeLinecap="round" />
        
        {/* Blush */}
        <ellipse cx="44" cy="42" rx="2" ry="1.5" fill={fairy.accentColor} opacity="0.3" />
        <ellipse cx="56" cy="42" rx="2" ry="1.5" fill={fairy.accentColor} opacity="0.3" />
        
        {/* Sparkles */}
        <circle cx="20" cy="25" r="2" fill={fairy.accentColor} opacity="0.8">
          <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="80" cy="30" r="1.5" fill={fairy.accentColor} opacity="0.6">
          <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="30" cy="15" r="1.8" fill={fairy.accentColor} opacity="0.7">
          <animate attributeName="opacity" values="0.7;0.3;0.7" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="70" cy="20" r="1.2" fill={fairy.accentColor} opacity="0.5">
          <animate attributeName="opacity" values="0.5;0.2;0.5" dur="2.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="50" cy="10" r="1.5" fill={fairy.accentColor} opacity="0.6">
          <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2.8s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}

export function CustomizeFairyScreen({ onBack, onSaveFairy }: CustomizeFairyScreenProps) {
  const [customFairy, setCustomFairy] = useState<CustomFairy>({
    name: 'My Custom Fairy',
    skinColor: skinTones[3].color,
    hairColor: hairColors[6].color,
    dressColor: dressColors[1].color,
    wingColor: wingColors[1].color,
    accentColor: '#9333ea',
  });

  const randomize = () => {
    const randomSkin = skinTones[Math.floor(Math.random() * skinTones.length)];
    const randomHair = hairColors[Math.floor(Math.random() * hairColors.length)];
    const randomDress = dressColors[Math.floor(Math.random() * dressColors.length)];
    const randomWing = wingColors[Math.floor(Math.random() * wingColors.length)];
    
    setCustomFairy({
      ...customFairy,
      skinColor: randomSkin.color,
      hairColor: randomHair.color,
      dressColor: randomDress.color,
      wingColor: randomWing.color,
      accentColor: randomDress.color,
    });
  };

  const handleSave = () => {
    onSaveFairy(customFairy);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0f2e] to-[#2d1b4e] text-white flex flex-col">
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pt-4">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-purple-900/40 border border-purple-700/40 flex items-center justify-center hover:bg-purple-900/60 transition-all duration-300 mr-4 shadow-lg"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl">Create Your Fairy</h1>
          </div>
          
          <button
            onClick={randomize}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600/40 border border-purple-500/50 hover:bg-purple-600/60 transition-all duration-300 shadow-lg"
          >
            <Shuffle className="w-4 h-4" />
            <span className="text-sm">Randomize</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto mb-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Preview */}
            <div className="flex flex-col items-center justify-center">
              <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-3xl p-8 border-2 border-purple-800/40 shadow-2xl">
                <FairyAvatar fairy={customFairy} size="lg" />
              </div>
              <div className="mt-6 flex items-center gap-2 text-purple-300">
                <Sparkles className="w-5 h-5" />
                <p className="text-lg">Your Custom Fairy</p>
                <Sparkles className="w-5 h-5" />
              </div>
            </div>

            {/* Customization Options */}
            <div className="space-y-6">
              {/* Skin Tone */}
              <div>
                <h3 className="text-lg mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                  Skin Tone
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  {skinTones.map((tone) => (
                    <button
                      key={tone.id}
                      onClick={() => setCustomFairy({ ...customFairy, skinColor: tone.color })}
                      className={`aspect-square rounded-xl transition-all duration-300 transform hover:scale-110 ${
                        customFairy.skinColor === tone.color
                          ? 'ring-4 ring-purple-400 shadow-lg shadow-purple-500/50 scale-105'
                          : 'ring-2 ring-purple-800/40 hover:ring-purple-600/70'
                      }`}
                      style={{ backgroundColor: tone.color }}
                      title={tone.name}
                    />
                  ))}
                </div>
              </div>

              {/* Hair Color */}
              <div>
                <h3 className="text-lg mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-pink-400"></span>
                  Hair Color
                </h3>
                <div className="grid grid-cols-6 gap-3">
                  {hairColors.map((hair) => (
                    <button
                      key={hair.id}
                      onClick={() => setCustomFairy({ ...customFairy, hairColor: hair.color })}
                      className={`aspect-square rounded-xl transition-all duration-300 transform hover:scale-110 ${
                        customFairy.hairColor === hair.color
                          ? 'ring-4 ring-purple-400 shadow-lg shadow-purple-500/50 scale-105'
                          : 'ring-2 ring-purple-800/40 hover:ring-purple-600/70'
                      }`}
                      style={{ backgroundColor: hair.color }}
                      title={hair.name}
                    />
                  ))}
                </div>
              </div>

              {/* Dress Color */}
              <div>
                <h3 className="text-lg mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                  Dress Color
                </h3>
                <div className="grid grid-cols-6 gap-3">
                  {dressColors.map((dress) => (
                    <button
                      key={dress.id}
                      onClick={() => setCustomFairy({ ...customFairy, dressColor: dress.color, accentColor: dress.color })}
                      className={`aspect-square rounded-xl transition-all duration-300 transform hover:scale-110 ${
                        customFairy.dressColor === dress.color
                          ? 'ring-4 ring-purple-400 shadow-lg shadow-purple-500/50 scale-105'
                          : 'ring-2 ring-purple-800/40 hover:ring-purple-600/70'
                      }`}
                      style={{ backgroundColor: dress.color }}
                      title={dress.name}
                    />
                  ))}
                </div>
              </div>

              {/* Wing Color */}
              <div>
                <h3 className="text-lg mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-pink-400"></span>
                  Wing Color
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  {wingColors.map((wing) => (
                    <button
                      key={wing.id}
                      onClick={() => setCustomFairy({ ...customFairy, wingColor: wing.color })}
                      className={`aspect-square rounded-xl transition-all duration-300 transform hover:scale-110 ${
                        customFairy.wingColor === wing.color
                          ? 'ring-4 ring-purple-400 shadow-lg shadow-purple-500/50 scale-105'
                          : 'ring-2 ring-purple-800/40 hover:ring-purple-600/70'
                      }`}
                      style={{ backgroundColor: wing.color }}
                      title={wing.name}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full py-5 px-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white transition-all duration-300 shadow-lg mb-6 hover:scale-105 active:scale-95 hover:shadow-xl hover:shadow-purple-500/50"
        >
          Save My Custom Fairy
        </button>
      </div>
    </div>
  );
}
