import { useState } from 'react';
import { ArrowLeft, Footprints, Zap, Moon, Heart, Droplet, Thermometer, Flame } from 'lucide-react@0.487.0';

interface AppleHealthPermissionsDetailScreenProps {
  onBack: () => void;
  onDisconnect: () => void;
}

export function AppleHealthPermissionsDetailScreen({ onBack, onDisconnect }: AppleHealthPermissionsDetailScreenProps) {
  const [permissions, setPermissions] = useState({
    steps: true,
    workouts: true,
    sleepAnalysis: true,
    heartRate: false,
    menstrualCycles: true,
    basalBodyTemperature: false,
    activeEnergy: false,
  });

  const togglePermission = (key: keyof typeof permissions) => {
    setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const permissionItems = [
    { key: 'steps' as const, label: 'Steps', icon: <Footprints className="w-6 h-6" /> },
    { key: 'workouts' as const, label: 'Workouts', icon: <Zap className="w-6 h-6" /> },
    { key: 'sleepAnalysis' as const, label: 'Sleep Analysis', icon: <Moon className="w-6 h-6" /> },
    { key: 'heartRate' as const, label: 'Heart Rate', icon: <Heart className="w-6 h-6" /> },
    { key: 'menstrualCycles' as const, label: 'Menstrual Cycles', icon: <Droplet className="w-6 h-6" /> },
    { key: 'basalBodyTemperature' as const, label: 'Basal Body Temperature', icon: <Thermometer className="w-6 h-6" /> },
    { key: 'activeEnergy' as const, label: 'Active Energy', icon: <Flame className="w-6 h-6" /> },
  ];

  return (
    <div className="min-h-screen bg-[#1a0f2e] text-white p-6 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-8 pt-4">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl">Apple Health Permissions</h1>
          </div>
        </div>

        {/* Apple Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-2xl bg-[#f5f3ed] flex items-center justify-center">
            <svg width="32" height="38" viewBox="0 0 32 38" fill="none">
              <path
                d="M25.5 19.5c0-3.8 3.1-5.7 3.3-5.8-1.8-2.6-4.6-3-5.6-3-2.4-.2-4.6 1.4-5.8 1.4-1.2 0-3.1-1.4-5.1-1.3-2.6 0-5 1.5-6.3 3.8-2.7 4.7-.7 11.6 1.9 15.4 1.3 1.9 2.8 4 4.8 3.9 1.9-.1 2.7-1.2 5-1.2 2.3 0 3 1.2 5.1 1.2 2.1 0 3.4-1.9 4.7-3.8 1.5-2.2 2.1-4.3 2.1-4.4-.1 0-4-.1-4.1-4.2zm-3.8-11.2c1.1-1.3 1.8-3.1 1.6-4.9-1.6.1-3.5 1.1-4.6 2.4-1 1.2-1.9 3-1.7 4.8 1.8.1 3.6-.9 4.7-2.3z"
                fill="#52c41a"
              />
            </svg>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-center mb-8">
          Allow MAUV to access the following data:
        </p>

        {/* Permission List */}
        <div className="bg-[#2a1a3e]/60 rounded-3xl p-4 mb-auto">
          {permissionItems.map((item, index) => (
            <button
              key={item.key}
              onClick={() => togglePermission(item.key)}
              className={`w-full flex items-center justify-between py-4 px-4 ${
                index !== permissionItems.length - 1 ? 'border-b border-purple-900/40' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-900/60 flex items-center justify-center text-purple-300">
                  {item.icon}
                </div>
                <span className="text-lg">{item.label}</span>
              </div>
              <div
                className={`relative w-12 h-7 rounded-full transition-colors duration-300 ${
                  permissions[item.key] ? 'bg-purple-400' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                    permissions[item.key] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </div>
            </button>
          ))}
        </div>

        {/* Disconnect Button */}
        <button
          onClick={onDisconnect}
          className="w-full py-5 px-6 rounded-full bg-red-900/40 text-red-400 border border-red-800/40 text-lg transition-all duration-300 hover:bg-red-900/60 mt-8 mb-8"
        >
          Disconnect Apple Health
        </button>
      </div>
    </div>
  );
}