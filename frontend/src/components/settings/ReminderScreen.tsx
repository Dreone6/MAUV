import { ArrowLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react@0.487.0';
import { useState } from 'react';

interface ReminderScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, title: string) => void;
}

export function ReminderScreen({ onBack, onNavigate }: ReminderScreenProps) {
  const [dailyLogEnabled, setDailyLogEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(false);
  const [volume, setVolume] = useState(60);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

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
          <h1 className="text-xl text-gray-900">Reminder</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Settings List */}
      <div className="px-6 py-6 space-y-1">
        {/* Daily Log Reminder */}
        <div className="w-full flex items-center justify-between py-4 px-2">
          <span className="text-gray-900">Daily Log Reminder</span>
          <button
            onClick={() => setDailyLogEnabled(!dailyLogEnabled)}
            className={`relative w-12 h-7 rounded-full transition-colors ${
              dailyLogEnabled ? 'bg-gradient-to-r from-pink-400 to-pink-500' : 'bg-gray-300'
            }`}
          >
            <div
              className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                dailyLogEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Reminder Time */}
        <button
          onClick={() => onNavigate('time-picker', 'Reminder Time')}
          className="w-full flex items-center justify-between py-4 hover:bg-gray-50 rounded-xl px-2 transition-colors"
        >
          <span className="text-gray-900">Reminder Time</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">09:00 AM</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </button>

        {/* Ringtone */}
        <button
          onClick={() => onNavigate('ringtone-selection', 'Ringtone')}
          className="w-full flex items-center justify-between py-4 hover:bg-gray-50 rounded-xl px-2 transition-colors"
        >
          <span className="text-gray-900">Ringtone</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Lollipop</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </button>

        {/* Volume Slider */}
        <div className="w-full py-4 px-2">
          <div className="flex items-center gap-4">
            {/* Mute Icon */}
            <button className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
              <VolumeX className="w-5 h-5 text-gray-400" />
            </button>

            {/* Slider */}
            <div className="flex-1 relative">
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-1 appearance-none bg-gray-200 rounded-full outline-none slider-thumb"
                style={{
                  background: `linear-gradient(to right, #ec4899 0%, #ec4899 ${volume}%, #e5e7eb ${volume}%, #e5e7eb 100%)`,
                }}
              />
              {/* Custom thumb */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-4 border-pink-500 shadow-md pointer-events-none"
                style={{ left: `calc(${volume}% - 10px)` }}
              />
            </div>

            {/* Max Volume Icon */}
            <button className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
              <Volume2 className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Vibration */}
        <div className="w-full flex items-center justify-between py-4 px-2">
          <span className="text-gray-900">Vibration</span>
          <button
            onClick={() => setVibrationEnabled(!vibrationEnabled)}
            className={`relative w-12 h-7 rounded-full transition-colors ${
              vibrationEnabled ? 'bg-gradient-to-r from-pink-400 to-pink-500' : 'bg-gray-300'
            }`}
          >
            <div
              className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                vibrationEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      <style>{`
        .slider-thumb::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 0;
          height: 0;
        }

        .slider-thumb::-moz-range-thumb {
          width: 0;
          height: 0;
          border: none;
          background: transparent;
        }
      `}</style>
    </div>
  );
}
