import { useState } from 'react';
import { ArrowLeft, Footprints, Dumbbell, Moon, Heart, Droplet, Thermometer, Flame, Apple } from 'lucide-react@0.487.0';

interface Permission {
  id: string;
  name: string;
  icon: React.ReactNode;
  enabled: boolean;
}

interface AppleHealthPermissionsScreenProps {
  onBack: () => void;
}

export function AppleHealthPermissionsScreen({ onBack }: AppleHealthPermissionsScreenProps) {
  const [permissions, setPermissions] = useState<Permission[]>([
    { id: 'steps', name: 'Steps', icon: <Footprints className="w-6 h-6" />, enabled: true },
    { id: 'workouts', name: 'Workouts', icon: <Dumbbell className="w-6 h-6" />, enabled: true },
    { id: 'sleep', name: 'Sleep Analysis', icon: <Moon className="w-6 h-6" />, enabled: true },
    { id: 'heart-rate', name: 'Heart Rate', icon: <Heart className="w-6 h-6" />, enabled: false },
    { id: 'menstrual', name: 'Menstrual Cycles', icon: <Droplet className="w-6 h-6" />, enabled: true },
    { id: 'temperature', name: 'Basal Body Temperature', icon: <Thermometer className="w-6 h-6" />, enabled: false },
    { id: 'energy', name: 'Active Energy', icon: <Flame className="w-6 h-6" />, enabled: false },
  ]);

  const togglePermission = (id: string) => {
    setPermissions(permissions.map(p => 
      p.id === id ? { ...p, enabled: !p.enabled } : p
    ));
  };

  const handleDisconnect = () => {
    if (confirm('Are you sure you want to disconnect Apple Health?')) {
      alert('Apple Health disconnected');
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-[#1a0f2e] text-white p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-purple-900/30 border border-purple-700/30 flex items-center justify-center hover:bg-purple-900/50 transition-all duration-300 mr-4"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl">Apple Health Permissions</h1>
        </div>

        {/* Apple Health Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-purple-800 flex items-center justify-center shadow-lg shadow-purple-500/50">
            <Apple className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Permission Description */}
        <p className="text-gray-400 mb-6 text-center">
          Allow MAUV to access the following data:
        </p>

        {/* Permissions List */}
        <div className="bg-purple-950/30 border border-purple-800/30 rounded-3xl p-4 mb-8 space-y-4">
          {permissions.map((permission) => (
            <div
              key={permission.id}
              className="flex items-center justify-between py-2"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-900/40 flex items-center justify-center text-purple-300">
                  {permission.icon}
                </div>
                <span className="text-white">{permission.name}</span>
              </div>
              
              <button
                onClick={() => togglePermission(permission.id)}
                className={`relative w-14 h-8 rounded-full transition-all duration-300 ${
                  permission.enabled
                    ? 'bg-gradient-to-r from-purple-400 to-pink-400'
                    : 'bg-gray-600'
                }`}
              >
                <div
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 ${
                    permission.enabled ? 'left-7' : 'left-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        {/* Disconnect Button */}
        <button
          onClick={handleDisconnect}
          className="w-full py-4 px-6 rounded-full bg-red-900/20 border border-red-500/30 text-red-400 transition-all duration-300 hover:bg-red-900/30 hover:border-red-500/50 hover:scale-105 active:scale-95"
        >
          Disconnect Apple Health
        </button>
      </div>
    </div>
  );
}