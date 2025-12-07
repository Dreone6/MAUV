import { X, Check, Bell, Clock, Calendar, Droplet, Heart, ThermometerSun, Pill } from 'lucide-react@0.487.0';
import { useState } from 'react';

interface ReminderType {
  id: string;
  name: string;
  description: string;
  icon: any;
  enabled: boolean;
  time: string;
  frequency: 'once' | 'daily';
}

interface ReminderSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (reminders: ReminderType[]) => void;
  currentReminders?: ReminderType[];
}

export function ReminderSettingsModal({ isOpen, onClose, onSave, currentReminders }: ReminderSettingsModalProps) {
  const [reminders, setReminders] = useState<ReminderType[]>(
    currentReminders || [
      {
        id: 'period-start',
        name: 'Period Start',
        description: 'Log when your period begins',
        icon: Droplet,
        enabled: false,
        time: '08:00',
        frequency: 'daily',
      },
      {
        id: 'daily-symptoms',
        name: 'Daily Symptoms',
        description: 'Track your symptoms and mood',
        icon: Heart,
        enabled: true,
        time: '20:00',
        frequency: 'daily',
      },
      {
        id: 'temperature',
        name: 'Temperature Tracking',
        description: 'Record basal body temperature',
        icon: ThermometerSun,
        enabled: false,
        time: '07:00',
        frequency: 'daily',
      },
      {
        id: 'medication',
        name: 'Medication/Pill',
        description: 'Take birth control or vitamins',
        icon: Pill,
        enabled: false,
        time: '21:00',
        frequency: 'daily',
      },
      {
        id: 'ovulation',
        name: 'Ovulation Window',
        description: 'Reminder during fertile days',
        icon: Calendar,
        enabled: false,
        time: '09:00',
        frequency: 'once',
      },
      {
        id: 'period-prediction',
        name: 'Period Prediction',
        description: 'Heads up before period starts',
        icon: Bell,
        enabled: false,
        time: '10:00',
        frequency: 'once',
      },
    ]
  );

  if (!isOpen) return null;

  const toggleReminder = (id: string) => {
    setReminders(prev =>
      prev.map(r => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  };

  const updateTime = (id: string, time: string) => {
    setReminders(prev =>
      prev.map(r => (r.id === id ? { ...r, time } : r))
    );
  };

  const updateFrequency = (id: string, frequency: 'once' | 'daily') => {
    setReminders(prev =>
      prev.map(r => (r.id === id ? { ...r, frequency } : r))
    );
  };

  const handleSave = () => {
    onSave(reminders);
    onClose();
  };

  const enabledCount = reminders.filter(r => r.enabled).length;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl transform transition-all max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl text-gray-800">Reminder Settings</h2>
            <p className="text-sm text-gray-500">
              {enabledCount} {enabledCount === 1 ? 'reminder' : 'reminders'} active
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Reminder List */}
        <div className="space-y-4 mb-6">
          {reminders.map((reminder) => {
            const Icon = reminder.icon;
            
            return (
              <div
                key={reminder.id}
                className={`rounded-2xl p-4 transition-all border-2 ${
                  reminder.enabled
                    ? 'bg-purple-50 border-purple-300'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                {/* Header Row */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      reminder.enabled 
                        ? 'bg-gradient-to-br from-purple-500 to-pink-500' 
                        : 'bg-gray-300'
                    }`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-gray-800">{reminder.name}</h3>
                      <p className="text-xs text-gray-500">{reminder.description}</p>
                    </div>
                  </div>
                  
                  {/* Toggle */}
                  <button
                    onClick={() => toggleReminder(reminder.id)}
                    className={`relative w-12 h-7 rounded-full transition-colors shadow-inner ${
                      reminder.enabled 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                        : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                        reminder.enabled ? 'translate-x-5' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Settings (only show when enabled) */}
                {reminder.enabled && (
                  <div className="mt-4 pt-4 border-t border-purple-200">
                    <div className="grid grid-cols-2 gap-3">
                      {/* Time Picker */}
                      <div>
                        <label className="block text-xs text-gray-600 mb-2">Time</label>
                        <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-purple-200">
                          <Clock className="w-4 h-4 text-purple-600" />
                          <input
                            type="time"
                            value={reminder.time}
                            onChange={(e) => updateTime(reminder.id, e.target.value)}
                            className="flex-1 bg-transparent text-sm text-gray-800 outline-none"
                          />
                        </div>
                      </div>

                      {/* Frequency */}
                      <div>
                        <label className="block text-xs text-gray-600 mb-2">Frequency</label>
                        <div className="relative">
                          <select
                            value={reminder.frequency}
                            onChange={(e) => updateFrequency(reminder.id, e.target.value as 'once' | 'daily')}
                            className="w-full p-2 bg-white rounded-lg border border-purple-200 text-sm text-gray-800 outline-none appearance-none pr-8"
                          >
                            <option value="daily">Daily</option>
                            <option value="once">One Time</option>
                          </select>
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-200">
          <div className="flex gap-3">
            <Bell className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-blue-800">
                Enable notifications in your device settings to receive these reminders.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg transition-all"
          >
            Save Reminders
          </button>
        </div>
      </div>
    </div>
  );
}
