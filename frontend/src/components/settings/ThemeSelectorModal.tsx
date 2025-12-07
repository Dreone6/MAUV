import { X, Check, Sun, Moon } from 'lucide-react@0.487.0';

interface ThemeSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: 'light' | 'dark';
  onSelectTheme: (theme: 'light' | 'dark') => void;
}

export function ThemeSelectorModal({ isOpen, onClose, currentTheme, onSelectTheme }: ThemeSelectorModalProps) {
  if (!isOpen) return null;

  const themes = [
    {
      id: 'light' as const,
      name: 'Light Mode',
      description: 'Bright and clear for daytime use',
      icon: Sun,
      gradient: 'from-yellow-400 to-orange-400',
    },
    {
      id: 'dark' as const,
      name: 'Dark Mode',
      description: 'Easy on the eyes for nighttime',
      icon: Moon,
      gradient: 'from-purple-600 to-indigo-600',
    },
  ];

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl text-gray-800">App Theme</h2>
            <p className="text-sm text-gray-500">Choose your preferred appearance</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Theme Options */}
        <div className="space-y-3">
          {themes.map((theme) => {
            const Icon = theme.icon;
            const isSelected = currentTheme === theme.id;
            
            return (
              <button
                key={theme.id}
                onClick={() => {
                  onSelectTheme(theme.id);
                  onClose();
                }}
                className={`w-full p-4 rounded-2xl transition-all border-2 ${
                  isSelected
                    ? 'border-purple-500 bg-purple-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50/50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${theme.gradient} flex items-center justify-center shadow-md`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-gray-800">{theme.name}</h3>
                    <p className="text-sm text-gray-500">{theme.description}</p>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}