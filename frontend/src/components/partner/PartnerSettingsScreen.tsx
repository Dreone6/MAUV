import { Bell, LogOut, Shield, HelpCircle, User, Heart, Mail, Lock } from 'lucide-react@0.487.0';
import { useState } from 'react';
import mauvLogo from 'figma:asset/6ef1ddd1de4618a9d43c80d42ea305e9848fbf52.png';

interface PartnerSettingsScreenProps {
  onBack: () => void;
  onLogout: () => void;
}

export function PartnerSettingsScreen({ onBack, onLogout }: PartnerSettingsScreenProps) {
  const [notifications, setNotifications] = useState({
    periodReminder: true,
    fertilityWindow: true,
    cycleInsights: false,
    dailyTips: true,
  });

  const partnerName = "Sarah";
  const connectedDate = "Jan 15, 2024";

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-fuchsia-50 text-gray-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white p-6 pb-24 rounded-b-[3rem] shadow-2xl">
        <div className="max-w-md mx-auto">
          <button
            onClick={onBack}
            className="mb-6 hover:opacity-80 transition-opacity"
          >
            ← Back
          </button>

          <div className="flex items-center gap-2 mb-6">
            <img src={mauvLogo} alt="MAUV Logo" className="h-10" />
          </div>

          <h1 className="text-3xl mb-2">Settings</h1>
          <p className="text-pink-100">
            Manage your partner account
          </p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 -mt-16 pb-8">
        {/* Connection Status Card */}
        <div className="bg-white rounded-3xl p-6 shadow-xl mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-fuchsia-400 to-pink-500 flex items-center justify-center">
              <Heart className="w-8 h-8 text-white fill-white" />
            </div>
            <div>
              <h2 className="text-xl text-gray-900">Connected to {partnerName}</h2>
              <p className="text-sm text-gray-500">Since {connectedDate}</p>
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-sm text-green-700">Active Connection</span>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <h3 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-fuchsia-500" />
            Notifications
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900">Period Reminders</p>
                <p className="text-sm text-gray-500">Get notified before period starts</p>
              </div>
              <button
                onClick={() => toggleNotification('periodReminder')}
                className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                  notifications.periodReminder 
                    ? 'bg-gradient-to-r from-fuchsia-500 to-pink-500' 
                    : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
                    notifications.periodReminder ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900">Fertility Window</p>
                <p className="text-sm text-gray-500">Alerts during fertile days</p>
              </div>
              <button
                onClick={() => toggleNotification('fertilityWindow')}
                className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                  notifications.fertilityWindow 
                    ? 'bg-gradient-to-r from-fuchsia-500 to-pink-500' 
                    : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
                    notifications.fertilityWindow ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900">Cycle Insights</p>
                <p className="text-sm text-gray-500">Weekly cycle summaries</p>
              </div>
              <button
                onClick={() => toggleNotification('cycleInsights')}
                className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                  notifications.cycleInsights 
                    ? 'bg-gradient-to-r from-fuchsia-500 to-pink-500' 
                    : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
                    notifications.cycleInsights ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900">Daily Tips</p>
                <p className="text-sm text-gray-500">How to support tips</p>
              </div>
              <button
                onClick={() => toggleNotification('dailyTips')}
                className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                  notifications.dailyTips 
                    ? 'bg-gradient-to-r from-fuchsia-500 to-pink-500' 
                    : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
                    notifications.dailyTips ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Account Section */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <h3 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-fuchsia-500" />
            Account
          </h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">Email Preferences</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>

            <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">Privacy Settings</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>

            <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">Help & Support</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
          </div>
        </div>

        {/* Privacy Info */}
        <div className="bg-fuchsia-50 border border-fuchsia-200 rounded-2xl p-5 mb-6 shadow-md">
          <div className="flex gap-3">
            <Shield className="w-5 h-5 text-fuchsia-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-gray-900 mb-2">Your Privacy Matters</h4>
              <p className="text-sm text-gray-600">
                You only see information that {partnerName} has chosen to share with you. She can update sharing preferences at any time.
              </p>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="w-full py-4 px-6 rounded-full bg-red-50 text-red-600 border-2 border-red-200 hover:bg-red-100 transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
        >
          <LogOut className="w-5 h-5" />
          Disconnect & Logout
        </button>

        <p className="text-center text-xs text-gray-500 mt-4">
          This will remove your access to the shared dashboard
        </p>
      </div>
    </div>
  );
}
