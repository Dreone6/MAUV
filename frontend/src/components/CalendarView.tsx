
import React, { useState } from 'react';
import { playNotificationSound } from '../utils/sound';

interface DayData {
  date: number;
  dayOfWeek: string;
  phase: 'Menstruation' | 'Follicular' | 'Ovulation' | 'Luteal';
  isToday?: boolean;
  logs?: {
    sex?: boolean;
    symptoms?: boolean;
    mood?: boolean;
  };
}

const CalendarView: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<DayData | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Limit navigation to 36 months back
  const minDate = new Date();
  minDate.setMonth(minDate.getMonth() - 36);

  const handlePrevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    if (newDate >= minDate) {
      setCurrentDate(newDate);
    }
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const isPrevDisabled = () => {
    const prevDate = new Date(currentDate);
    prevDate.setMonth(prevDate.getMonth() - 1);
    return prevDate < minDate;
  };

  // Generate days for the current month
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 = Sunday

  const days: DayData[] = Array.from({ length: daysInMonth }, (_, i) => {
    const date = i + 1;
    let phase: DayData['phase'] = 'Luteal';
    
    // Simplified cycle logic for demo: assumes Day 1 is start of cycle every month
    // In a real app, this would calculate based on cycle history
    if (date >= 1 && date <= 5) phase = 'Menstruation';
    else if (date >= 6 && date <= 13) phase = 'Follicular';
    else if (date === 14) phase = 'Ovulation';
    else phase = 'Luteal';

    // Mock logs (randomized deterministically based on date)
    const logs = {
      sex: (date % 5 === 0 || date === 14),
      symptoms: (date % 7 === 0 || date === 1),
      mood: (date % 6 === 0),
    };

    const isToday = 
      date === new Date().getDate() && 
      month === new Date().getMonth() && 
      year === new Date().getFullYear();

    return {
      date,
      dayOfWeek: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][new Date(year, month, date).getDay()],
      phase,
      isToday,
      logs
    };
  });

  const getPhaseStyles = (phase: DayData['phase'], isToday: boolean) => {
    const base = "relative flex flex-col items-center justify-start pt-2 h-24 rounded-xl transition-all border border-transparent hover:border-primary/20 hover:shadow-md active:scale-95";
    
    if (isToday) return `${base} bg-primary/20 ring-2 ring-primary ring-offset-2 ring-offset-white dark:ring-offset-background-dark`;
    
    switch (phase) {
      case 'Menstruation':
        return `${base} bg-red-50 dark:bg-red-900/10 text-red-700 dark:text-red-300`;
      case 'Follicular':
        return `${base} bg-blue-50 dark:bg-blue-900/10 text-blue-700 dark:text-blue-300`;
      case 'Ovulation':
        return `${base} bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200`;
      case 'Luteal':
        return `${base} bg-amber-50 dark:bg-amber-900/10 text-amber-700 dark:text-amber-300`;
      default:
        return base;
    }
  };

  const getPhaseLabelColor = (phase: DayData['phase']) => {
    switch (phase) {
      case 'Menstruation': return 'text-red-500 bg-red-100 dark:bg-red-900/30';
      case 'Follicular': return 'text-blue-500 bg-blue-100 dark:bg-blue-900/30';
      case 'Ovulation': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30';
      case 'Luteal': return 'text-amber-500 bg-amber-100 dark:bg-amber-900/30';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  return (
    <div className="w-full min-h-screen pb-28 animate-in fade-in duration-500 bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="p-4 flex items-center justify-between sticky top-0 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md z-20 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-1">
          <button 
            onClick={handlePrevMonth} 
            disabled={isPrevDisabled()}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
             <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <h1 className="text-xl font-bold text-text-light dark:text-text-dark min-w-[140px] text-center">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h1>
          <button 
            onClick={handleNextMonth}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
             <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
        <button 
          onClick={() => setCurrentDate(new Date())}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-primary"
          title="Go to Today"
        >
           <span className="material-symbols-outlined filled">calendar_today</span>
        </button>
      </header>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 px-2 mb-2 text-center">
        {weekDays.map(d => (
          <div key={d} className="text-[10px] font-bold text-gray-400 py-2">{d}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 px-2">
        {/* Empty cells for offset */}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
           <div key={`empty-${i}`} className="h-24"></div>
        ))}
        
        {days.map((day) => (
          <button 
            key={day.date}
            onClick={() => {
              playNotificationSound();
              setSelectedDay(day);
            }}
            className={getPhaseStyles(day.phase, !!day.isToday)}
          >
            <span className={`text-sm font-bold ${day.isToday ? 'scale-110' : ''}`}>{day.date}</span>
            
            {/* Dots Container */}
            <div className="flex gap-0.5 mt-2 flex-wrap justify-center px-1">
               {day.logs?.sex && (
                 <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-sm"></div>
               )}
               {day.logs?.symptoms && (
                 <div className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-sm"></div>
               )}
               {day.logs?.mood && (
                 <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shadow-sm"></div>
               )}
            </div>

            {day.phase === 'Ovulation' && (
              <span className="absolute bottom-1 right-1 text-[8px] font-bold text-purple-600 opacity-60">OVU</span>
            )}
            {day.phase === 'Menstruation' && day.date === 1 && (
               <span className="absolute bottom-1 right-1 text-[8px] font-bold text-red-400 opacity-60">Start</span>
            )}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="p-4 mt-6">
        <h3 className="text-sm font-bold text-text-light dark:text-text-dark mb-3">Cycle Key</h3>
        <div className="space-y-3 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
           <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-red-100 border border-red-200"></div>
              <span className="text-xs text-gray-600 dark:text-gray-300">Menstruation</span>
           </div>
           <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-blue-100 border border-blue-200"></div>
              <span className="text-xs text-gray-600 dark:text-gray-300">Follicular Phase</span>
           </div>
           <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-purple-100 border border-purple-200"></div>
              <span className="text-xs text-gray-600 dark:text-gray-300">Ovulation</span>
           </div>
           <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-amber-100 border border-amber-200"></div>
              <span className="text-xs text-gray-600 dark:text-gray-300">Luteal Phase</span>
           </div>
        </div>
      </div>

      {/* Detail Overlay */}
      {selectedDay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
           <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setSelectedDay(null)}></div>
           
           <div className="relative w-full max-w-xs bg-white dark:bg-background-dark rounded-2xl shadow-2xl p-5 border border-white/50 dark:border-gray-700 scale-100 animate-in zoom-in-95 duration-200">
              
              {/* Overlay Header */}
              <div className="flex items-start justify-between mb-4">
                 <div>
                    <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">
                      {currentDate.toLocaleString('default', { month: 'short' })} {selectedDay.date}
                    </h2>
                    <p className="text-sm text-text-light/60 dark:text-text-dark/60">{selectedDay.dayOfWeek}</p>
                 </div>
                 <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${getPhaseLabelColor(selectedDay.phase)}`}>
                    {selectedDay.phase}
                 </span>
              </div>

              {/* Logs List */}
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Daily Logs</h3>
              
              <div className="space-y-2">
                 {selectedDay.logs?.sex && (
                    <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-900/30">
                       <span className="material-symbols-outlined text-red-400">favorite</span>
                       <div>
                          <p className="text-sm font-bold text-gray-800 dark:text-gray-200">Intimacy</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Activity logged</p>
                       </div>
                    </div>
                 )}
                 
                 {selectedDay.logs?.symptoms && (
                    <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-900/30">
                       <span className="material-symbols-outlined text-green-400">healing</span>
                       <div>
                          <p className="text-sm font-bold text-gray-800 dark:text-gray-200">Symptoms</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Details recorded</p>
                       </div>
                    </div>
                 )}
                 
                 {selectedDay.logs?.mood && (
                    <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-100 dark:border-yellow-900/30">
                       <span className="material-symbols-outlined text-yellow-400">sentiment_satisfied</span>
                       <div>
                          <p className="text-sm font-bold text-gray-800 dark:text-gray-200">Mood</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Feeling recorded</p>
                       </div>
                    </div>
                 )}

                 {!selectedDay.logs?.sex && !selectedDay.logs?.symptoms && !selectedDay.logs?.mood && (
                    <div className="text-center py-6 text-gray-400">
                       <span className="material-symbols-outlined text-4xl mb-2 opacity-50">event_note</span>
                       <p className="text-sm">No activities logged for this day.</p>
                    </div>
                 )}
              </div>

              {/* Close Button */}
              <button 
                onClick={() => setSelectedDay(null)}
                className="w-full mt-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl font-medium text-sm transition-colors"
              >
                Close
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;
    