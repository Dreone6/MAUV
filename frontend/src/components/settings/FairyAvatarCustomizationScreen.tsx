import { X, ChevronLeft, ChevronRight, Sparkles, Palette, Wand2 } from 'lucide-react@0.487.0';
import { useState } from 'react';

interface FairyPreset {
  id: string;
  emoji: string;
  name: string;
  colors: string[];
}

interface FairyAvatarCustomizationScreenProps {
  onClose: () => void;
  onSelectAvatar: (avatarId: string) => void;
  currentAvatarId?: string;
}

export function FairyAvatarCustomizationScreen({ 
  onClose, 
  onSelectAvatar,
  currentAvatarId = 'fairy-1'
}: FairyAvatarCustomizationScreenProps) {
  const [selectedTab, setSelectedTab] = useState<'preset' | 'custom'>('preset');
  const [selectedAvatarId, setSelectedAvatarId] = useState(currentAvatarId);

  // 24 Preset Fairies
  const presetFairies: FairyPreset[] = [
    { id: 'fairy-1', emoji: '🧚', name: 'Classic Fairy', colors: ['#ec4899', '#a855f7'] },
    { id: 'fairy-2', emoji: '🧚‍♀️', name: 'Pink Fairy', colors: ['#ec4899', '#f472b6'] },
    { id: 'fairy-3', emoji: '🧚‍♂️', name: 'Blue Fairy', colors: ['#3b82f6', '#60a5fa'] },
    { id: 'fairy-4', emoji: '🦋', name: 'Butterfly', colors: ['#a855f7', '#ec4899'] },
    { id: 'fairy-5', emoji: '🌸', name: 'Blossom', colors: ['#fbbf24', '#f97316'] },
    { id: 'fairy-6', emoji: '🌺', name: 'Hibiscus', colors: ['#dc2626', '#f43f5e'] },
    { id: 'fairy-7', emoji: '🌼', name: 'Daisy', colors: ['#eab308', '#fbbf24'] },
    { id: 'fairy-8', emoji: '🌻', name: 'Sunflower', colors: ['#f59e0b', '#fbbf24'] },
    { id: 'fairy-9', emoji: '🌷', name: 'Tulip', colors: ['#ec4899', '#f472b6'] },
    { id: 'fairy-10', emoji: '🌹', name: 'Rose', colors: ['#dc2626', '#f43f5e'] },
    { id: 'fairy-11', emoji: '💐', name: 'Bouquet', colors: ['#ec4899', '#a855f7'] },
    { id: 'fairy-12', emoji: '🦄', name: 'Unicorn', colors: ['#a855f7', '#ec4899'] },
    { id: 'fairy-13', emoji: '⭐', name: 'Star', colors: ['#fbbf24', '#f59e0b'] },
    { id: 'fairy-14', emoji: '✨', name: 'Sparkles', colors: ['#fbbf24', '#a855f7'] },
    { id: 'fairy-15', emoji: '🌟', name: 'Glowing Star', colors: ['#fbbf24', '#f97316'] },
    { id: 'fairy-16', emoji: '💫', name: 'Dizzy', colors: ['#3b82f6', '#a855f7'] },
    { id: 'fairy-17', emoji: '🌈', name: 'Rainbow', colors: ['#ec4899', '#3b82f6'] },
    { id: 'fairy-18', emoji: '☁️', name: 'Cloud', colors: ['#60a5fa', '#93c5fd'] },
    { id: 'fairy-19', emoji: '🎀', name: 'Ribbon', colors: ['#ec4899', '#f472b6'] },
    { id: 'fairy-20', emoji: '💖', name: 'Sparkling Heart', colors: ['#ec4899', '#a855f7'] },
    { id: 'fairy-21', emoji: '💝', name: 'Heart Gift', colors: ['#f43f5e', '#ec4899'] },
    { id: 'fairy-22', emoji: '🎨', name: 'Artist', colors: ['#a855f7', '#ec4899'] },
    { id: 'fairy-23', emoji: '🌙', name: 'Moon', colors: ['#fbbf24', '#f59e0b'] },
    { id: 'fairy-24', emoji: '🪄', name: 'Magic Wand', colors: ['#a855f7', '#ec4899'] },
  ];

  const handleSelectAvatar = (avatarId: string) => {
    setSelectedAvatarId(avatarId);
  };

  const handleConfirm = () => {
    onSelectAvatar(selectedAvatarId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-lg max-h-[85vh] overflow-hidden shadow-2xl animate-slide-up-modal flex flex-col">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl text-gray-900">Choose Your Fairy</h1>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <X className="w-5 h-5 text-gray-900" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedTab('preset')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all ${
                selectedTab === 'preset'
                  ? 'bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Presets</span>
            </button>
            <button
              onClick={() => setSelectedTab('custom')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all ${
                selectedTab === 'custom'
                  ? 'bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Wand2 className="w-4 h-4" />
              <span>Custom</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {selectedTab === 'preset' ? (
            <div className="p-6">
              <div className="grid grid-cols-4 gap-3">
                {presetFairies.map((fairy) => (
                  <button
                    key={fairy.id}
                    onClick={() => handleSelectAvatar(fairy.id)}
                    className={`relative aspect-square rounded-2xl flex flex-col items-center justify-center p-3 transition-all ${
                      selectedAvatarId === fairy.id
                        ? 'bg-gradient-to-br scale-105 shadow-lg ring-4 ring-pink-400'
                        : 'bg-gray-50 hover:bg-gray-100 hover:scale-105'
                    }`}
                    style={
                      selectedAvatarId === fairy.id
                        ? {
                            background: `linear-gradient(to bottom right, ${fairy.colors[0]}, ${fairy.colors[1]})`,
                          }
                        : undefined
                    }
                  >
                    <span className="text-3xl mb-1">{fairy.emoji}</span>
                    <span
                      className={`text-[10px] text-center leading-tight ${
                        selectedAvatarId === fairy.id ? 'text-white' : 'text-gray-600'
                      }`}
                    >
                      {fairy.name}
                    </span>
                    {selectedAvatarId === fairy.id && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-md">
                        <div className="w-4 h-4 rounded-full bg-pink-500 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <CustomFairyEditor 
              onSelectCustom={(customId) => setSelectedAvatarId(customId)}
              currentCustomId={selectedAvatarId.startsWith('custom-') ? selectedAvatarId : undefined}
            />
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex-shrink-0">
          <button
            onClick={handleConfirm}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-400 to-purple-500 text-white hover:shadow-lg transition-all"
          >
            Confirm Selection
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slide-up-modal {
          from {
            opacity: 0;
            transform: translateY(100px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }

        .animate-slide-up-modal {
          animation: slide-up-modal 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

// Custom Fairy Editor Component
interface CustomFairyEditorProps {
  onSelectCustom: (customId: string) => void;
  currentCustomId?: string;
}

function CustomFairyEditor({ onSelectCustom, currentCustomId }: CustomFairyEditorProps) {
  const [skinTone, setSkinTone] = useState('medium');
  const [hairColor, setHairColor] = useState('brown');
  const [wingStyle, setWingStyle] = useState('sparkle');
  const [outfit, setOutfit] = useState('dress');

  const skinTones = [
    { id: 'light', name: 'Light', color: '#fde8d7' },
    { id: 'medium', name: 'Medium', color: '#e8b796' },
    { id: 'tan', name: 'Tan', color: '#d4a574' },
    { id: 'deep', name: 'Deep', color: '#8d5524' },
    { id: 'dark', name: 'Dark', color: '#5c3317' },
  ];

  const hairColors = [
    { id: 'blonde', name: 'Blonde', color: '#fbbf24' },
    { id: 'brown', name: 'Brown', color: '#92400e' },
    { id: 'black', name: 'Black', color: '#1f2937' },
    { id: 'red', name: 'Red', color: '#dc2626' },
    { id: 'pink', name: 'Pink', color: '#ec4899' },
    { id: 'purple', name: 'Purple', color: '#a855f7' },
    { id: 'blue', name: 'Blue', color: '#3b82f6' },
  ];

  const wingStyles = [
    { id: 'sparkle', name: 'Sparkle', emoji: '✨' },
    { id: 'butterfly', name: 'Butterfly', emoji: '🦋' },
    { id: 'star', name: 'Star', emoji: '⭐' },
    { id: 'flower', name: 'Flower', emoji: '🌸' },
  ];

  const outfits = [
    { id: 'dress', name: 'Dress', emoji: '👗' },
    { id: 'casual', name: 'Casual', emoji: '👕' },
    { id: 'elegant', name: 'Elegant', emoji: '👘' },
    { id: 'sporty', name: 'Sporty', emoji: '🏃‍♀️' },
  ];

  // Generate custom ID based on selections
  const customId = `custom-${skinTone}-${hairColor}-${wingStyle}-${outfit}`;

  // Update parent whenever selections change
  const handleUpdate = () => {
    onSelectCustom(customId);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Preview */}
      <div className="flex justify-center mb-6">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-300 to-purple-400 flex items-center justify-center relative shadow-lg">
          <span className="text-6xl">🧚‍♀️</span>
          <div className="absolute -bottom-2 -right-2">
            <span className="text-3xl">{wingStyles.find(w => w.id === wingStyle)?.emoji}</span>
          </div>
        </div>
      </div>

      {/* Skin Tone */}
      <div>
        <label className="text-gray-900 mb-3 flex items-center gap-2">
          <Palette className="w-4 h-4 text-pink-500" />
          Skin Tone
        </label>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {skinTones.map((tone) => (
            <button
              key={tone.id}
              onClick={() => {
                setSkinTone(tone.id);
                setTimeout(handleUpdate, 0);
              }}
              className={`flex-shrink-0 flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${
                skinTone === tone.id
                  ? 'bg-pink-50 ring-2 ring-pink-400'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div
                className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                style={{ backgroundColor: tone.color }}
              />
              <span className="text-xs text-gray-700">{tone.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Hair Color */}
      <div>
        <label className="text-gray-900 mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-500" />
          Hair Color
        </label>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {hairColors.map((color) => (
            <button
              key={color.id}
              onClick={() => {
                setHairColor(color.id);
                setTimeout(handleUpdate, 0);
              }}
              className={`flex-shrink-0 flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${
                hairColor === color.id
                  ? 'bg-pink-50 ring-2 ring-pink-400'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div
                className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                style={{ backgroundColor: color.color }}
              />
              <span className="text-xs text-gray-700">{color.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Wing Style */}
      <div>
        <label className="text-gray-900 mb-3 flex items-center gap-2">
          <Wand2 className="w-4 h-4 text-pink-500" />
          Wing Style
        </label>
        <div className="grid grid-cols-4 gap-2">
          {wingStyles.map((style) => (
            <button
              key={style.id}
              onClick={() => {
                setWingStyle(style.id);
                setTimeout(handleUpdate, 0);
              }}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${
                wingStyle === style.id
                  ? 'bg-gradient-to-br from-pink-400 to-purple-500 text-white ring-2 ring-pink-400'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <span className="text-2xl">{style.emoji}</span>
              <span className={`text-xs ${wingStyle === style.id ? 'text-white' : 'text-gray-700'}`}>
                {style.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Outfit */}
      <div>
        <label className="text-gray-900 mb-3 flex items-center gap-2">
          <span className="text-pink-500">👗</span>
          Outfit
        </label>
        <div className="grid grid-cols-4 gap-2">
          {outfits.map((outfitOption) => (
            <button
              key={outfitOption.id}
              onClick={() => {
                setOutfit(outfitOption.id);
                setTimeout(handleUpdate, 0);
              }}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${
                outfit === outfitOption.id
                  ? 'bg-gradient-to-br from-pink-400 to-purple-500 text-white ring-2 ring-pink-400'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <span className="text-2xl">{outfitOption.emoji}</span>
              <span className={`text-xs ${outfit === outfitOption.id ? 'text-white' : 'text-gray-700'}`}>
                {outfitOption.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}