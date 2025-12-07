import { LayoutDashboard, Calendar, MessageCircle, Users, Settings, TrendingUp, X } from 'lucide-react@0.487.0';
import { useState } from 'react';
import { FloatingBackground } from './FloatingBackground';
import { BottomNav } from './BottomNav';

interface CalendarViewProps {
  onBack: () => void;
  onNavigate: (nav: string) => void;
}

export function CalendarView({ onBack, onNavigate }: CalendarViewProps) {
  const [selectedNav, setSelectedNav] = useState('calendar');
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // Calendar data for December 2025
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  
  // December starts on a Monday (day 1 is index 1)
  const calendarDays = [
    null, // Sunday empty
    ...Array(31).fill(0).map((_, i) => i + 1) // Days 1-31
  ];

  // Phase backgrounds and data
  const dayData: Record<number, { 
    phase?: 'menstruation' | 'follicular' | 'ovulation' | 'luteal';
    dots?: string[];
    label?: string;
    logs?: { category: string; value: string; color: string }[];
  }> = {
    7: { phase: 'follicular', dots: ['bg-green-400'], label: 'Start', logs: [{ category: 'Symptoms', value: 'Cramps', color: 'text-green-500' }] },
    8: { phase: 'follicular', dots: ['bg-purple-400'], logs: [{ category: 'Sex & Drive', value: 'High', color: 'text-purple-500' }] },
    9: { phase: 'follicular' },
    10: { phase: 'follicular', dots: ['bg-red-400'], logs: [{ category: 'Menstrual Flow', value: 'Heavy', color: 'text-red-500' }] },
    11: { phase: 'follicular' },
    12: { phase: 'follicular', dots: ['bg-yellow-400'], logs: [{ category: 'Workout', value: 'Yoga 30min', color: 'text-yellow-500' }] },
    13: { phase: 'follicular' },
    14: { phase: 'ovulation', dots: ['bg-pink-400', 'bg-purple-400'], label: 'Ovu', logs: [{ category: 'Ovulation Test', value: 'Positive', color: 'text-pink-500' }, { category: 'Mood', value: 'Happy', color: 'text-purple-500' }] },
    15: { phase: 'luteal', dots: ['bg-red-400'], logs: [{ category: 'Sex & Drive', value: 'Medium', color: 'text-red-500' }] },
    16: { phase: 'luteal' },
    17: { phase: 'luteal' },
    18: { phase: 'luteal', dots: ['bg-yellow-400'], logs: [{ category: 'Workout', value: 'Running 5km', color: 'text-yellow-500' }] },
    19: { phase: 'luteal' },
    20: { phase: 'luteal', dots: ['bg-red-400'], logs: [{ category: 'Symptoms', value: 'Bloating', color: 'text-red-500' }] },
    21: { phase: 'luteal' },
    22: { phase: 'luteal', dots: ['bg-yellow-400'], logs: [{ category: 'Workout', value: 'Strength Training', color: 'text-yellow-500' }] },
    23: { phase: 'luteal' },
    24: { phase: 'luteal', dots: ['bg-yellow-400'], logs: [{ category: 'Mood', value: 'Stressed', color: 'text-yellow-500' }] },
    25: { phase: 'luteal', dots: ['bg-yellow-400'], logs: [{ category: 'Symptoms', value: 'Headache', color: 'text-yellow-500' }] },
    26: { phase: 'luteal' },
    27: { phase: 'luteal' },
    28: { phase: 'luteal', dots: ['bg-yellow-400'], logs: [{ category: 'Water', value: '8 glasses', color: 'text-blue-500' }] },
    29: { phase: 'luteal' },
    30: { phase: 'luteal', dots: ['bg-pink-400', 'bg-yellow-400'], logs: [{ category: 'Preg. Test', value: 'Negative', color: 'text-pink-500' }, { category: 'Symptoms', value: 'Fatigue', color: 'text-yellow-500' }] },
    31: { phase: 'luteal' },
  };

  const getPhaseBackground = (phase?: 'menstruation' | 'follicular' | 'ovulation' | 'luteal') => {
    switch (phase) {
      case 'menstruation':
        return 'bg-red-50';
      case 'follicular':
        return 'bg-pink-50';
      case 'ovulation':
        return 'bg-purple-50';
      case 'luteal':
        return 'bg-blue-50';
      default:
        return 'bg-white';
    }
  };

  const getPhaseTextColor = (phase?: 'menstruation' | 'follicular' | 'ovulation' | 'luteal') => {
    switch (phase) {
      case 'menstruation':
        return 'text-red-600';
      case 'follicular':
        return 'text-pink-600';
      case 'ovulation':
        return 'text-purple-600';
      case 'luteal':
        return 'text-blue-600';
      default:
        return 'text-gray-800';
    }
  };

  const getPhaseName = (phase?: 'menstruation' | 'follicular' | 'ovulation' | 'luteal') => {
    switch (phase) {
      case 'menstruation':
        return 'Menstruation';
      case 'follicular':
        return 'Follicular Phase';
      case 'ovulation':
        return 'Ovulation';
      case 'luteal':
        return 'Luteal Phase';
      default:
        return 'No Phase';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100">
      {/* Floating Background */}
      <FloatingBackground />
      
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-200/50 sticky top-0 z-10 shadow-sm">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* User Avatar */}
            <button className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white shadow-md">
              <span>O</span>
            </button>

            {/* Title */}
            <h1 className="text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              MAUV - Amara AI Assistant
            </h1>

            {/* Settings Button */}
            <button 
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors shadow-sm"
            >
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-8 pb-24">
        {/* Calendar Container */}
        <div className="bg-white/90 rounded-3xl p-6 shadow-lg border border-purple-200/50">
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {days.map((day) => (
              <div key={day} className="text-center text-xs text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => {
              const data = day ? dayData[day] : undefined;
              const phase = data?.phase;
              const dots = data?.dots || [];
              const label = data?.label;

              return (
                <button
                  key={index}
                  disabled={!day}
                  onClick={() => day && setSelectedDay(day)}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center relative transition-all duration-200 ${
                    day
                      ? `${getPhaseBackground(phase)} ${getPhaseTextColor(phase)} hover:scale-105 hover:shadow-md active:scale-95`
                      : 'invisible'
                  }`}
                >
                  {day && (
                    <>
                      {/* Day Number */}
                      <span className="text-sm mb-1">{day}</span>
                      
                      {/* Label (Start, Ovu) */}
                      {label && (
                        <span className="text-xs text-purple-600 absolute top-1 left-1/2 -translate-x-1/2">
                          {label}
                        </span>
                      )}
                      
                      {/* Dots for logged data */}
                      {dots.length > 0 && (
                        <div className="flex gap-0.5 absolute bottom-1">
                          {dots.map((dotColor, idx) => (
                            <div
                              key={idx}
                              className={`w-1.5 h-1.5 rounded-full ${dotColor} shadow-sm`}
                            />
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cycle Key Legend */}
        <div className="mt-6 bg-white/90 rounded-3xl p-6 shadow-lg border border-purple-200/50">
          <h3 className="text-gray-800 mb-4">Cycle Key</h3>
          <div className="grid grid-cols-2 gap-6">
            {/* Cycle Phases Column */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-lg bg-red-200 border border-red-300 shadow-sm" />
                <span className="text-sm text-gray-700">Menstruation</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-lg bg-pink-200 border border-pink-300 shadow-sm" />
                <span className="text-sm text-gray-700">Follicular Phase</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-lg bg-purple-200 border border-purple-300 shadow-sm" />
                <span className="text-sm text-gray-700">Ovulation</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-lg bg-blue-200 border border-blue-300 shadow-sm" />
                <span className="text-sm text-gray-700">Luteal Phase</span>
              </div>
            </div>

            {/* Activities Column */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-red-500 shadow-sm" />
                <span className="text-sm text-gray-700">Sex & Drive</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-500 shadow-sm" />
                <span className="text-sm text-gray-700">Mood</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-green-500 shadow-sm" />
                <span className="text-sm text-gray-700">Symptoms</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-yellow-500 shadow-sm" />
                <span className="text-sm text-gray-700">Activities</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Day Details Modal */}
      {selectedDay && dayData[selectedDay] && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6"
          onClick={() => setSelectedDay(null)}
        >
          <div 
            className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl text-gray-800">December {selectedDay}</h2>
                <p className={`text-sm ${getPhaseTextColor(dayData[selectedDay].phase)}`}>
                  {getPhaseName(dayData[selectedDay].phase)}
                </p>
              </div>
              <button
                onClick={() => setSelectedDay(null)}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Logged Data */}
            {dayData[selectedDay].logs && dayData[selectedDay].logs!.length > 0 ? (
              <div className="space-y-4">
                <h3 className="text-sm text-gray-500 uppercase tracking-wider">Summary</h3>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5 shadow-sm">
                  <p className="text-gray-700 leading-relaxed">
                    You logged{' '}
                    {dayData[selectedDay].logs!.map((log, idx) => (
                      <span key={idx}>
                        {idx > 0 && idx === dayData[selectedDay].logs!.length - 1 && ' and '}
                        {idx > 0 && idx < dayData[selectedDay].logs!.length - 1 && ', '}
                        <span className={`${log.color}`}>{log.category}</span>
                      </span>
                    ))}
                    {' '}for this day.
                  </p>
                </div>
                
                {/* Categories List */}
                <div className="space-y-2">
                  {dayData[selectedDay].logs!.map((log, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm"
                    >
                      <div className={`w-2 h-2 rounded-full ${log.color.replace('text-', 'bg-')}`} />
                      <span className="text-sm text-gray-700">{log.category}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400 mb-4">No data logged for this day</p>
                <button 
                  onClick={() => {
                    setSelectedDay(null);
                    onNavigate('dashboard');
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all active:scale-95"
                >
                  Go to Dashboard to Log
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNav
        onNavigate={onNavigate}
        currentScreen="calendar"
      />
    </div>
  );
}