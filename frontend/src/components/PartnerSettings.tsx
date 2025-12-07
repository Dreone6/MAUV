import { useState } from 'react';
import { ArrowLeft, Shield, ChevronRight } from 'lucide-react@0.487.0';

interface PartnerSettingsProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

interface SharingOption {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

export function PartnerSettings({ onBack, onNavigate }: PartnerSettingsProps) {
  const [sharingOptions, setSharingOptions] = useState<SharingOption[]>([
    {
      id: 'cycle-day',
      label: 'Cycle Day',
      description: 'Share current cycle day number',
      enabled: true,
    },
    {
      id: 'phase',
      label: 'Current Phase',
      description: 'Share menstrual cycle phase',
      enabled: true,
    },
    {
      id: 'fertility',
      label: 'Fertility Status',
      description: 'Share fertility window and pregnancy chance',
      enabled: true,
    },
    {
      id: 'mood',
      label: 'Mood & Emotions',
      description: 'Share daily mood tracking',
      enabled: true,
    },
    {
      id: 'symptoms',
      label: 'Symptoms',
      description: 'Share logged symptoms and severity',
      enabled: true,
    },
    {
      id: 'daily-note',
      label: 'Daily Notes',
      description: 'Share personal notes and messages',
      enabled: true,
    },
    {
      id: 'period-prediction',
      label: 'Period Predictions',
      description: 'Share upcoming period dates',
      enabled: true,
    },
    {
      id: 'intimacy',
      label: 'Intimacy Tracking',
      description: 'Share intimacy logs',
      enabled: false,
    },
    {
      id: 'medications',
      label: 'Medications',
      description: 'Share birth control and medication info',
      enabled: false,
    },
    {
      id: 'health-data',
      label: 'Health Vitals',
      description: 'Share weight, temperature, and other vitals',
      enabled: false,
    },
  ]);

  const toggleOption = (id: string) => {
    setSharingOptions(prev =>
      prev.map(option =>
        option.id === id ? { ...option, enabled: !option.enabled } : option
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-200/50 sticky top-0 z-10 shadow-sm">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Partner Sharing Settings
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-8">
        {/* Info Card */}
        <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-5 mb-6 border border-purple-200/50 shadow-md">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-gray-800 mb-1">Your Privacy Matters</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Choose what information you want to share with your partner. You can change these settings anytime.
              </p>
            </div>
          </div>
        </div>

        {/* Advanced Sharing Button */}
        <button
          onClick={() => onNavigate('partner-sharing-settings')}
          className="w-full bg-white/90 rounded-2xl p-5 shadow-md border border-purple-100/50 hover:shadow-lg hover:border-purple-200 transition-all mb-6"
        >
          <div className="flex items-center justify-between">
            <div className="text-left">
              <h4 className="text-gray-800 mb-1">Advanced Sharing Options</h4>
              <p className="text-sm text-gray-500">Fine-tune exactly what data to share</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
          </div>
        </button>

        {/* Sharing Options */}
        <div className="space-y-3">
          {sharingOptions.map((option) => (
            <div
              key={option.id}
              className="bg-white/90 rounded-2xl p-5 shadow-md border border-purple-100/50"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="text-gray-800 mb-1">{option.label}</h4>
                  <p className="text-sm text-gray-500">{option.description}</p>
                </div>
                <button
                  onClick={() => toggleOption(option.id)}
                  className={`ml-4 w-12 h-7 rounded-full transition-all duration-300 relative flex-shrink-0 ${
                    option.enabled
                      ? 'bg-gradient-to-r from-purple-400 to-pink-400'
                      : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${
                      option.enabled ? 'left-6' : 'left-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <button className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-2xl py-4 transition-all shadow-lg hover:shadow-xl">
          Save Preferences
        </button>
      </div>
    </div>
  );
}