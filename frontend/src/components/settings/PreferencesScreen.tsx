import { ArrowLeft, ChevronRight } from 'lucide-react@0.487.0';
import { useState } from 'react';

interface PreferencesScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, title: string) => void;
}

export function PreferencesScreen({ onBack, onNavigate }: PreferencesScreenProps) {
  const [bmiEnabled, setBmiEnabled] = useState(true);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-6 pt-12 pb-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-900" />
          </button>
          <h1 className="text-xl text-gray-900">Preferences</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Settings List */}
      <div className="px-6 py-6 space-y-1">
        {/* Weight Unit */}
        <button
          onClick={() => onNavigate('unit-selection', 'Weight Unit')}
          className="w-full flex items-center justify-between py-4 hover:bg-gray-50 rounded-xl px-2 transition-colors"
        >
          <span className="text-gray-900">Weight Unit</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">kg</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </button>

        {/* Height Unit */}
        <button
          onClick={() => onNavigate('unit-selection', 'Height Unit')}
          className="w-full flex items-center justify-between py-4 hover:bg-gray-50 rounded-xl px-2 transition-colors"
        >
          <span className="text-gray-900">Height Unit</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">cm</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </button>

        {/* Body Mass Index (BMI) */}
        <div className="w-full flex items-center justify-between py-4 px-2">
          <span className="text-gray-900">Body Mass Index (BMI)</span>
          <button
            onClick={() => setBmiEnabled(!bmiEnabled)}
            className={`relative w-12 h-7 rounded-full transition-colors ${
              bmiEnabled ? 'bg-gradient-to-r from-pink-400 to-pink-500' : 'bg-gray-300'
            }`}
          >
            <div
              className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                bmiEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Temperature Unit */}
        <button
          onClick={() => onNavigate('unit-selection', 'Temperature Unit')}
          className="w-full flex items-center justify-between py-4 hover:bg-gray-50 rounded-xl px-2 transition-colors"
        >
          <span className="text-gray-900">Temperature Unit</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">°C</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </button>

        {/* Divider */}
        <div className="h-px bg-gray-100 my-2" />

        {/* Water Intake Goal */}
        <button
          onClick={() => onNavigate('water-goal', 'Water Intake Goal')}
          className="w-full flex items-center justify-between py-4 hover:bg-gray-50 rounded-xl px-2 transition-colors"
        >
          <span className="text-gray-900">Water Intake Goal</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">2,400</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </button>

        {/* Cup Unit */}
        <button
          onClick={() => onNavigate('unit-selection', 'Cup Unit')}
          className="w-full flex items-center justify-between py-4 hover:bg-gray-50 rounded-xl px-2 transition-colors"
        >
          <span className="text-gray-900">Cup Unit</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">mL</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </button>

        {/* First Day of Week */}
        <button
          onClick={() => onNavigate('day-selection', 'First Day of Week')}
          className="w-full flex items-center justify-between py-4 hover:bg-gray-50 rounded-xl px-2 transition-colors"
        >
          <span className="text-gray-900">First Day of Week</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Sunday</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </button>

        {/* Time Format */}
        <button
          onClick={() => onNavigate('time-format', 'Time Format')}
          className="w-full flex items-center justify-between py-4 hover:bg-gray-50 rounded-xl px-2 transition-colors"
        >
          <span className="text-gray-900">Time Format</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">System Default</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </button>

        {/* Language */}
        <button
          onClick={() => onNavigate('language', 'Language')}
          className="w-full flex items-center justify-between py-4 hover:bg-gray-50 rounded-xl px-2 transition-colors"
        >
          <span className="text-gray-900">Language</span>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🇺🇸</span>
            <span className="text-gray-500">English</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </button>

        {/* Day Reset Time */}
        <button
          onClick={() => onNavigate('time-picker', 'Day Reset Time')}
          className="w-full flex items-center justify-between py-4 hover:bg-gray-50 rounded-xl px-2 transition-colors"
        >
          <span className="text-gray-900">Day Reset Time</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">00:00 AM</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </button>

        {/* Divider */}
        <div className="h-px bg-gray-100 my-2" />

        {/* Restart All Progress */}
        <button
          onClick={() => onNavigate('confirm-restart', 'Restart All Progress')}
          className="w-full flex items-center justify-between py-4 hover:bg-gray-50 rounded-xl px-2 transition-colors"
        >
          <span className="text-gray-900">Restart All Progress</span>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        {/* Clear Cache */}
        <button
          onClick={() => onNavigate('confirm-clear-cache', 'Clear Cache')}
          className="w-full flex items-center justify-between py-4 hover:bg-gray-50 rounded-xl px-2 transition-colors"
        >
          <span className="text-gray-900">Clear Cache</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">45.8 MB</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </button>
      </div>
    </div>
  );
}