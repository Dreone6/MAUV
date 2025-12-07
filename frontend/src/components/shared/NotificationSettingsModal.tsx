import { X, Bell, Volume2, VolumeX } from 'lucide-react@0.487.0';
import { NotificationSettings } from '../types';

interface NotificationSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: NotificationSettings;
  onUpdateSettings: (settings: NotificationSettings) => void;
}

export function NotificationSettingsModal({ 
  isOpen, 
  onClose, 
  settings, 
  onUpdateSettings 
}: NotificationSettingsModalProps) {
  if (!isOpen) return null;

  const toggleSetting = (key: keyof NotificationSettings) => {
    onUpdateSettings({
      ...settings,
      [key]: !settings[key]
    });
  };

  const notificationOptions = [
    { key: 'periodReminder' as keyof NotificationSettings, label: 'Period Reminder', description: 'Get notified when your period is approaching' },
    { key: 'ovulationAlert' as keyof NotificationSettings, label: 'Ovulation Alert', description: 'Alert when you\'re ovulating' },
    { key: 'fertileWindowAlert' as keyof NotificationSettings, label: 'Fertile Window', description: 'Notify during fertile days' },
    { key: 'pillReminder' as keyof NotificationSettings, label: 'Pill Reminder', description: 'Daily reminder to take birth control' },
    { key: 'weightTracking' as keyof NotificationSettings, label: 'Weight Tracking', description: 'Reminder to log your weight' },
    { key: 'temperatureReminder' as keyof NotificationSettings, label: 'Temperature', description: 'Daily BBT tracking reminder' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[80vh] overflow-hidden flex flex-col animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md">
              <Bell className="w-5 h-5" />
            </div>
            <h2 className="text-gray-900">Notifications</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Sound Toggle */}
          <div className="mb-6 p-4 bg-purple-50 rounded-2xl border border-purple-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {settings.soundEnabled ? (
                  <Volume2 className="w-5 h-5 text-purple-600" />
                ) : (
                  <VolumeX className="w-5 h-5 text-gray-400" />
                )}
                <div>
                  <div className="text-sm text-gray-900">Sound Alerts</div>
                  <div className="text-xs text-gray-600">Play sound with notifications</div>
                </div>
              </div>
              <button
                onClick={() => toggleSetting('soundEnabled')}
                className={`relative w-12 h-7 rounded-full transition-colors ${
                  settings.soundEnabled ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform shadow-md ${
                    settings.soundEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Notification Options */}
          <div className="space-y-4">
            {notificationOptions.map((option) => (
              <div
                key={option.key}
                className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-200 hover:border-purple-300 transition-colors shadow-sm"
              >
                <div className="flex-1">
                  <div className="text-sm text-gray-900">{option.label}</div>
                  <div className="text-xs text-gray-600 mt-1">{option.description}</div>
                </div>
                <button
                  onClick={() => toggleSetting(option.key)}
                  className={`relative w-12 h-7 rounded-full transition-colors ml-4 ${
                    settings[option.key] ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform shadow-md ${
                      settings[option.key] ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg"
          >
            Done
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}