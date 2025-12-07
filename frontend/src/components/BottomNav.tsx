import { Calendar, TrendingUp, MessageCircle, Users } from 'lucide-react@0.487.0';
import { AmaraNavButton } from './AmaraNavButton';

interface BottomNavProps {
  onNavigate: ((screen: string) => void) | ((screen: 'calendar' | 'insights' | 'amara-chat' | 'tribal-chat' | 'partner-link' | 'home-dashboard') => void);
  currentScreen: 'calendar' | 'insights' | 'amara-chat' | 'tribal-chat' | 'partner-link' | 'home-dashboard';
  darkMode?: boolean;
}

export function BottomNav({ onNavigate, currentScreen, darkMode = false }: BottomNavProps) {
  const activeColor = darkMode ? 'text-purple-400' : 'text-purple-600';
  const inactiveColor = darkMode ? 'text-gray-500' : 'text-gray-400';
  const bgColor = darkMode ? 'bg-gray-900/95' : 'bg-white/95';
  const borderColor = darkMode ? 'border-gray-700/50' : 'border-purple-200/50';

  const handleNavigate = (screen: string) => {
    if (onNavigate && typeof onNavigate === 'function') {
      onNavigate(screen as any);
    }
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 ${bgColor} backdrop-blur-sm border-t ${borderColor} shadow-2xl`}>
      <div className="max-w-md mx-auto px-6 py-3">
        <div className="flex items-center justify-around relative">
          {/* Calendar */}
          <button
            onClick={() => handleNavigate('calendar')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              currentScreen === 'calendar' ? activeColor : inactiveColor
            }`}
          >
            <Calendar className="w-6 h-6" />
            <span className="text-xs">Calendar</span>
          </button>

          {/* Insights */}
          <button
            onClick={() => handleNavigate('insights')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              currentScreen === 'insights' ? activeColor : inactiveColor
            }`}
          >
            <TrendingUp className="w-6 h-6" />
            <span className="text-xs">Insights</span>
          </button>

          {/* Amara AI - Center elevated button */}
          <AmaraNavButton
            onClick={() => handleNavigate('amara-chat')}
          />

          {/* Tribal Chat */}
          <button
            onClick={() => handleNavigate('tribal-chat')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              currentScreen === 'tribal-chat' ? activeColor : inactiveColor
            }`}
          >
            <MessageCircle className="w-6 h-6" />
            <span className="text-xs">Tribal Chat</span>
          </button>

          {/* Partner */}
          <button
            onClick={() => handleNavigate('partner-link')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              currentScreen === 'partner' ? activeColor : inactiveColor
            }`}
          >
            <Users className="w-6 h-6" />
            <span className="text-xs">Partner</span>
          </button>
        </div>
      </div>
    </div>
  );
}