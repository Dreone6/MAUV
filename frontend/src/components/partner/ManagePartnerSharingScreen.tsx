import { Shield, Calendar, Heart, Activity, MessageCircle, Thermometer, Users, AlertCircle } from 'lucide-react@0.487.0';
import { useState } from 'react';
import mauvLogo from 'figma:asset/6ef1ddd1de4618a9d43c80d42ea305e9848fbf52.png';

interface ManagePartnerSharingScreenProps {
  onBack: () => void;
  onSave: () => void;
}

interface SharingOption {
  id: string;
  icon: any;
  title: string;
  description: string;
  enabled: boolean;
}

export function ManagePartnerSharingScreen({ onBack, onSave }: ManagePartnerSharingScreenProps) {
  const [options, setOptions] = useState<SharingOption[]>([
    {
      id: 'cycle',
      icon: Calendar,
      title: 'Cycle Information',
      description: 'Period dates, cycle length, and phase',
      enabled: true,
    },
    {
      id: 'fertility',
      icon: Heart,
      title: 'Fertility Window',
      description: 'Ovulation and fertile days prediction',
      enabled: true,
    },
    {
      id: 'symptoms',
      icon: Activity,
      title: 'Symptoms',
      description: 'Physical symptoms you log each day',
      enabled: true,
    },
    {
      id: 'mood',
      icon: MessageCircle,
      title: 'Mood & Emotions',
      description: 'Emotional state and mood tracking',
      enabled: false,
    },
    {
      id: 'temperature',
      icon: Thermometer,
      title: 'Temperature Data',
      description: 'Basal body temperature readings',
      enabled: false,
    },
    {
      id: 'intimacy',
      icon: Users,
      title: 'Intimacy Logs',
      description: 'Protected and unprotected activity',
      enabled: true,
    },
  ]);

  const toggleOption = (id: string) => {
    setOptions(options.map(opt => 
      opt.id === id ? { ...opt, enabled: !opt.enabled } : opt
    ));
  };

  const handleSave = () => {
    // Save settings
    onSave();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-fuchsia-50 text-gray-800 p-6 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <img src={mauvLogo} alt="MAUV Logo" className="h-12" />
          </div>
          <button
            onClick={onBack}
            className="absolute top-6 left-6 text-gray-500 hover:text-gray-700 transition-colors"
          >
            ← Back
          </button>
        </div>

        {/* Title Section */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-fuchsia-400 to-pink-500 flex items-center justify-center shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl text-gray-900 mb-2">
            Manage Sharing
          </h1>
          <p className="text-gray-600">
            Choose what information to share with your partner
          </p>
        </div>

        {/* Info Alert */}
        <div className="bg-fuchsia-50 border border-fuchsia-200 rounded-2xl p-4 mb-6 flex gap-3 shadow-sm">
          <AlertCircle className="w-5 h-5 text-fuchsia-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700">
            Your partner will only see the information you enable below. You can change these settings anytime.
          </p>
        </div>

        {/* Sharing Options */}
        <div className="space-y-3 mb-auto">
          {options.map((option) => {
            const Icon = option.icon;
            return (
              <div
                key={option.id}
                className="bg-white rounded-2xl p-5 shadow-md transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                      option.enabled 
                        ? 'bg-gradient-to-br from-fuchsia-100 to-pink-100' 
                        : 'bg-gray-100'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        option.enabled ? 'text-fuchsia-500' : 'text-gray-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-gray-900 mb-1">
                        {option.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {option.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Toggle Switch */}
                  <button
                    onClick={() => toggleOption(option.id)}
                    className={`relative w-12 h-6 rounded-full transition-all duration-300 flex-shrink-0 ${
                      option.enabled 
                        ? 'bg-gradient-to-r from-fuchsia-500 to-pink-500' 
                        : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
                        option.enabled ? 'translate-x-6' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="pt-8 pb-6 space-y-4">
          <button
            onClick={handleSave}
            className="w-full py-5 px-6 rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
          >
            Save Changes
          </button>

          <p className="text-center text-sm text-gray-500">
            Changes apply immediately to your partner's view
          </p>
        </div>
      </div>
    </div>
  );
}
