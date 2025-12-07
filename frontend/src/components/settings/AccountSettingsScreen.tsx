import { ArrowLeft, ChevronRight, Sparkles, Crown } from 'lucide-react@0.487.0';

interface AccountSettingsScreenProps {
  onBack: () => void;
  onUpgradePlan: () => void;
  onNavigate: (screen: string) => void;
}

export function AccountSettingsScreen({ onBack, onUpgradePlan, onNavigate }: AccountSettingsScreenProps) {
  const settingsOptions = [
    { icon: '⚙️', label: 'Preferences', screen: 'preferences' },
    { icon: '🔔', label: 'Reminder', screen: 'reminder' },
    { icon: '🔒', label: 'Account & Security', screen: 'security' },
    { icon: '💳', label: 'Payment Methods', screen: 'payment' },
    { icon: '📋', label: 'Billing & Subscriptions', screen: 'billing' },
    { icon: '🔗', label: 'Linked Accounts', screen: 'linked' },
    { icon: '📊', label: 'Data & Analytics', screen: 'analytics' },
    { icon: '🎨', label: 'App Appearance', screen: 'appearance' },
    { icon: '❓', label: 'Help & Support', screen: 'support' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-400 to-pink-500 px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-xl text-white">Account</h1>
          <button className="w-10 h-10 flex items-center justify-center">
            <div className="w-1 h-1 bg-white rounded-full" />
            <div className="w-1 h-1 bg-white rounded-full ml-1" />
            <div className="w-1 h-1 bg-white rounded-full ml-1" />
          </button>
        </div>

        {/* Upgrade Plan Banner */}
        <button
          onClick={onUpgradePlan}
          className="w-full bg-white/95 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3 hover:bg-white transition-colors shadow-lg"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-pink-500 flex items-center justify-center flex-shrink-0">
            <Crown className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 text-left">
            <h3 className="text-gray-900 mb-0.5">Upgrade Plan Now!</h3>
            <p className="text-gray-600 text-sm">Unlock premium features</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
        </button>
      </div>

      {/* User Profile Section */}
      <div className="px-6 py-6">
        <button
          onClick={() => onNavigate('profile')}
          className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-50 transition-colors"
        >
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xl">IA</span>
          </div>
          <div className="flex-1 text-left">
            <h3 className="text-gray-900">Isabella Ainsley</h3>
            <p className="text-gray-500 text-sm">Isabella.yoursubdomain.com</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
        </button>
      </div>

      {/* Settings Options */}
      <div className="px-6 pb-24">
        <div className="space-y-1">
          {settingsOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => onNavigate(option.screen)}
              className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-gray-50 transition-colors group"
            >
              <span className="text-2xl flex-shrink-0">{option.icon}</span>
              <span className="flex-1 text-left text-gray-900">{option.label}</span>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-400 transition-colors flex-shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 safe-area-bottom">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <div className="w-6 h-6 rounded-lg bg-gray-100" />
            <span className="text-xs">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <div className="w-6 h-6 rounded-lg bg-gray-100" />
            <span className="text-xs">Calendar</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <div className="w-6 h-6 rounded-lg bg-gray-100" />
            <span className="text-xs">Insights</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <div className="w-6 h-6 rounded-lg bg-gray-100" />
            <span className="text-xs">AMARA</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-pink-500">
            <div className="w-6 h-6 rounded-lg bg-pink-500" />
            <span className="text-xs">Account</span>
          </button>
        </div>
      </div>
    </div>
  );
}
