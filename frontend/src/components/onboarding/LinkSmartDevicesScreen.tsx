import { Watch, Activity, Thermometer, Scale, Heart } from 'lucide-react@0.487.0';
import { useState } from 'react';

interface LinkSmartDevicesScreenProps {
  onBack: () => void;
  onNext: () => void;
  onSkip: () => void;
}

export function LinkSmartDevicesScreen({ onBack, onNext, onSkip }: LinkSmartDevicesScreenProps) {
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);

  const devices = [
    {
      id: 'smartwatch',
      icon: <Watch className="w-6 h-6" />,
      name: 'Smartwatch (e.g., Apple Watch)',
      description: 'Tracks activity, steps, heart rate, and sleep patterns.',
      bgColor: 'from-purple-800/30 to-purple-700/30',
      iconBg: 'bg-purple-700/50',
    },
    {
      id: 'fitness-tracker',
      icon: <Activity className="w-6 h-6" />,
      name: 'Fitness Tracker',
      description: 'Monitors workouts, calorie burn, and daily activity levels.',
      bgColor: 'from-purple-800/30 to-purple-700/30',
      iconBg: 'bg-purple-700/50',
    },
    {
      id: 'thermometer',
      icon: <Thermometer className="w-6 h-6" />,
      name: 'Smart Thermometer',
      description: 'Records basal body temperature for fertility insights.',
      bgColor: 'from-purple-800/30 to-purple-700/30',
      iconBg: 'bg-purple-700/50',
    },
    {
      id: 'scale',
      icon: <Scale className="w-6 h-6" />,
      name: 'Smart Scale',
      description: 'Measures weight, body fat, and other body composition metrics.',
      bgColor: 'from-purple-800/30 to-purple-700/30',
      iconBg: 'bg-purple-700/50',
    },
    {
      id: 'bp-monitor',
      icon: <Heart className="w-6 h-6" />,
      name: 'Blood Pressure Monitor',
      description: 'Tracks blood pressure readings for cardiovascular health.',
      bgColor: 'from-purple-800/30 to-purple-700/30',
      iconBg: 'bg-purple-700/50',
    },
  ];

  const toggleDevice = (deviceId: string) => {
    setSelectedDevices(prev =>
      prev.includes(deviceId)
        ? prev.filter(id => id !== deviceId)
        : [...prev, deviceId]
    );
  };

  return (
    <div className="min-h-screen bg-[#1a0f2e] text-white p-6 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-xl mb-8">MAUV</h1>

          {/* Progress Bar */}
          <div className="flex justify-center gap-2 mb-8">
            <div className="w-12 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
            <div className="w-12 h-1.5 rounded-full bg-purple-900/30" />
            <div className="w-12 h-1.5 rounded-full bg-purple-900/30" />
            <div className="w-12 h-1.5 rounded-full bg-purple-900/30" />
            <div className="w-12 h-1.5 rounded-full bg-purple-900/30" />
          </div>

          <h2 className="text-3xl mb-3">
            Link Your Smart Devices
          </h2>
          <p className="text-gray-400 text-sm px-4">
            Select the devices you want to connect for automated tracking of your health data.
          </p>
        </div>

        {/* Devices List */}
        <div className="space-y-3 mb-8 flex-1 overflow-y-auto">
          {devices.map((device) => {
            const isSelected = selectedDevices.includes(device.id);
            return (
              <button
                key={device.id}
                onClick={() => toggleDevice(device.id)}
                className={`w-full rounded-3xl p-5 bg-gradient-to-br ${device.bgColor} border transition-all duration-300 text-left ${
                  isSelected ? 'border-purple-400' : 'border-purple-800/30'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl ${device.iconBg} flex items-center justify-center text-purple-200 flex-shrink-0`}>
                    {device.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white mb-1">{device.name}</h3>
                    <p className="text-sm text-gray-400 leading-snug">
                      {device.description}
                    </p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                    isSelected ? 'border-white bg-white' : 'border-gray-500'
                  }`}>
                    {isSelected && (
                      <div className="w-3 h-3 rounded-full bg-purple-600" />
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={onNext}
            disabled={selectedDevices.length === 0}
            className={`w-full py-4 px-6 rounded-full transition-all duration-300 ${
              selectedDevices.length > 0
                ? 'bg-purple-300 text-gray-900 hover:bg-purple-400 hover:scale-105 active:scale-95'
                : 'bg-purple-900/30 text-gray-500 cursor-not-allowed'
            }`}
          >
            Link Selected Devices
          </button>

          <button
            onClick={onSkip}
            className="w-full text-gray-400 hover:text-gray-300 transition-colors"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}