
import React, { useState, useEffect } from 'react';
import { InsightItem, LogCategoryDefinition } from '../types';
import Settings from './Settings';
import LogModal from './LogModal';
import { playNotificationSound } from '../utils/sound';

interface DashboardProps {
  onOpenEditor: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onOpenEditor }) => {
  const [selectedDay, setSelectedDay] = useState(14);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // Modal State
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<LogCategoryDefinition | null>(null);
  const [loggedData, setLoggedData] = useState<{[key: string]: any}>({});

  // Initialize from localStorage or default to true
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('mauv_sound_enabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const handleToggleSound = (enabled: boolean) => {
    setSoundEnabled(enabled);
    localStorage.setItem('mauv_sound_enabled', JSON.stringify(enabled));
    if (enabled) {
      playNotificationSound();
    }
  };

  // Play sound when selecting an important day (Day 14 is ovulation in this demo)
  useEffect(() => {
    if (soundEnabled && selectedDay === 14) {
      playNotificationSound();
    }
  }, [selectedDay, soundEnabled]);

  // Handle Log Saving
  const handleSaveLog = (categoryId: string, value: any) => {
    setLoggedData(prev => ({
      ...prev,
      [categoryId]: value
    }));
    // Optional: play sound on save
    if (soundEnabled && value) playNotificationSound();
  };

  const openLogModal = (category: LogCategoryDefinition) => {
    setSelectedCategory(category);
    setIsLogModalOpen(true);
  };
  
  // Definitions for all loggable categories
  const logDefinitions: LogCategoryDefinition[] = [
    { 
      id: 'flow', label: 'Menstrual Flow', icon: 'water_drop', colorClass: 'text-red-400', type: 'selection', multiSelect: false,
      options: [
        { id: '1', label: 'Spotting' }, 
        { id: '2', label: 'Light' }, 
        { id: '3', label: 'Medium' }, 
        { id: '4', label: 'Heavy' }, 
        { id: '5', label: 'Very Heavy' }
      ]
    },
    { 
      id: 'sex', label: 'Sex & Drive', icon: 'favorite', colorClass: 'text-accent-coral', type: 'selection', multiSelect: true,
      options: [
        { id: '1', label: 'Protected Sex' }, { id: '2', label: 'Unprotected Sex' }, { id: '3', label: 'High Drive' }, { id: '4', label: 'Low Drive' }, { id: '5', label: 'Masturbation' }
      ]
    },
    { 
      id: 'mood', label: 'Mood', icon: 'sentiment_satisfied', colorClass: 'text-yellow-400', type: 'selection', multiSelect: true,
      options: [
        { id: '1', label: 'Happy' }, { id: '2', label: 'Sad' }, { id: '3', label: 'Anxious' }, { id: '4', label: 'Irritable' }, { id: '5', label: 'Calm' }, { id: '6', label: 'Energetic' }, { id: '7', label: 'Fatigue' }, { id: '8', label: 'Weepy' }
      ]
    },
    { 
      id: 'symptoms', label: 'Symptoms', icon: 'healing', colorClass: 'text-green-400', type: 'selection', multiSelect: true,
      options: [
        { id: '1', label: 'Cramps' }, { id: '2', label: 'Headache' }, { id: '3', label: 'Bloating' }, { id: '4', label: 'Acne' }, { id: '5', label: 'Backache' }, { id: '6', label: 'Nausea' }, { id: '7', label: 'Tender Breasts' }, { id: '8', label: 'Insomnia' }
      ]
    },
    { 
      id: 'discharge', label: 'Discharge', icon: 'opacity', colorClass: 'text-blue-300', type: 'selection', multiSelect: false,
      options: [
        { id: '1', label: 'Dry' }, { id: '2', label: 'Sticky' }, { id: '3', label: 'Creamy' }, { id: '4', label: 'Watery' }, { id: '5', label: 'Egg White' }, { id: '6', label: 'Unusual' }
      ]
    },
    { 
      id: 'digestion', label: 'Digestion', icon: 'restaurant', colorClass: 'text-amber-600', type: 'selection', multiSelect: true,
      options: [
        { id: '1', label: 'Normal' }, { id: '2', label: 'Bloated' }, { id: '3', label: 'Gassy' }, { id: '4', label: 'Constipation' }, { id: '5', label: 'Diarrhea' }, { id: '6', label: 'Cravings' }
      ]
    },
    { 
      id: 'ptest', label: 'Preg. Test', icon: 'pregnancy', colorClass: 'text-pink-400', type: 'selection', multiSelect: false,
      options: [
         { id: '1', label: 'Negative' }, { id: '2', label: 'Positive' }, { id: '3', label: 'Faint Line' }
      ]
    },
    { 
      id: 'otest', label: 'Ovul. Test', icon: 'science', colorClass: 'text-purple-400', type: 'selection', multiSelect: false,
      options: [
         { id: '1', label: 'Negative' }, { id: '2', label: 'High' }, { id: '3', label: 'Peak' }
      ]
    },
    { 
      id: 'workout', label: 'Workout', icon: 'fitness_center', colorClass: 'text-sky-400', type: 'selection', multiSelect: true,
      options: [
        { id: '1', label: 'Cardio' }, { id: '2', label: 'Strength' }, { id: '3', label: 'Yoga' }, { id: '4', label: 'Pilates' }, { id: '5', label: 'Walk' }, { id: '6', label: 'Rest Day' }
      ]
    },
    { 
      id: 'oral', label: 'Oral Contr.', icon: 'pill', colorClass: 'text-indigo-400', type: 'selection', multiSelect: false,
      options: [
         { id: '1', label: 'Taken On Time' }, { id: '2', label: 'Taken Late' }, { id: '3', label: 'Missed' }
      ]
    },
    { 
      id: 'nonoral', label: 'Non-Oral', icon: 'vaccines', colorClass: 'text-cyan-400', type: 'selection', multiSelect: false,
      options: [
         { id: '1', label: 'Patch Changed' }, { id: '2', label: 'Ring Inserted' }, { id: '3', label: 'Ring Removed' }, { id: '4', label: 'Injection' }
      ]
    },
    { 
      id: 'water', label: 'Water', icon: 'water_full', colorClass: 'text-blue-500', type: 'selection', multiSelect: false,
      options: [
         { id: '1', label: '1-2 Glasses' }, { id: '2', label: '3-5 Glasses' }, { id: '3', label: '6-8 Glasses' }, { id: '4', label: '8+ Glasses' }
      ]
    },
    { 
      id: 'weight', label: 'Weight', icon: 'monitor_weight', colorClass: 'text-teal-400', type: 'number', unit: 'kg'
    },
    { 
      id: 'temp', label: 'Temp', icon: 'thermostat', colorClass: 'text-orange-400', type: 'number', unit: '°C'
    },
    { 
      id: 'work', label: 'Work', icon: 'work', colorClass: 'text-slate-500', type: 'selection', multiSelect: false,
      options: [
        { id: '1', label: 'Productive' }, { id: '2', label: 'Stressful' }, { id: '3', label: 'Neutral' }, { id: '4', label: 'Day Off' }
      ]
    },
    {
      id: 'notes', label: 'Add Notes', icon: 'edit_note', colorClass: 'text-rose-400', type: 'text'
    }
  ];

  const insights: InsightItem[] = [
    { id: 'i1', icon: 'local_florist', title: 'Embrace Your Luteal Phase', subtitle: 'Tips for managing PMS symptoms.' },
    { id: 'i2', icon: 'lunch_dining', title: 'Cycle-Syncing Your Diet', subtitle: 'What to eat during your fertile window.' },
  ];

  // Helper to determine phase and styling
  const getCycleStatus = (day: number) => {
    // Check for logged flow data to override simulation
    const loggedFlow = loggedData['flow'];

    if (day >= 1 && day <= 5) {
      // Menstruation - Simulate flow levels
      let flowLevel = 20;
      let intensity = 'Light';

      if (loggedFlow) {
         intensity = loggedFlow;
         switch(loggedFlow) {
            case 'Spotting': flowLevel = 15; break;
            case 'Light': flowLevel = 30; break;
            case 'Medium': flowLevel = 50; break;
            case 'Heavy': flowLevel = 70; break;
            case 'Very Heavy': flowLevel = 90; break;
            default: flowLevel = 30;
         }
      } else {
         // Default simulation if nothing logged
         if (day === 2 || day === 3) { flowLevel = 60; intensity = 'Heavy'; }
         else if (day === 1 || day === 4) { flowLevel = 35; intensity = 'Medium'; }
      }
      
      return {
        phase: 'Menstruation',
        title: `Day ${day}`,
        subtitle: `${intensity} Flow`,
        textColor: 'text-red-300',
        strokeColor: 'text-red-400',
        shadowColor: 'shadow-purple-900/50',
        pulseColor: 'bg-red-500/10',
        flowLevel: flowLevel, // % height of liquid
        isFlow: true
      };
    } else if (day >= 6 && day <= 13) {
      return {
        phase: 'Follicular',
        title: `Day ${day}`,
        subtitle: 'Rising Energy',
        textColor: 'text-blue-300',
        strokeColor: 'text-blue-400',
        shadowColor: 'shadow-purple-900/50',
        pulseColor: 'bg-blue-400/10',
        flowLevel: 0,
        isFlow: false
      };
    } else if (day === 14) {
      return {
        phase: 'Ovulation',
        title: 'Day 14',
        subtitle: 'High Fertility',
        textColor: 'text-purple-200',
        strokeColor: 'text-primary',
        shadowColor: 'shadow-primary/40',
        pulseColor: 'bg-primary/20',
        flowLevel: 0,
        isFlow: false
      };
    } else {
      return {
        phase: 'Luteal',
        title: `Day ${day}`,
        subtitle: 'Reflection Phase',
        textColor: 'text-amber-200',
        strokeColor: 'text-amber-400',
        shadowColor: 'shadow-purple-900/50',
        pulseColor: 'bg-amber-400/10',
        flowLevel: 0,
        isFlow: false
      };
    }
  };

  const status = getCycleStatus(selectedDay);

  const getDayColorClass = (date: number) => {
    if (date >= 1 && date <= 5) return 'bg-red-50 dark:bg-red-900/10 text-red-700 dark:text-red-300 border-red-100'; // Menstruation
    if (date >= 6 && date <= 13) return 'bg-blue-50 dark:bg-blue-900/10 text-blue-700 dark:text-blue-300 border-blue-100'; // Follicular
    if (date === 14) return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200'; // Ovulation
    return 'bg-amber-50 dark:bg-amber-900/10 text-amber-700 dark:text-amber-300 border-amber-100'; // Luteal
  };

  const hasSexLog = (date: number) => [12, 14, 16].includes(date);

  const weekDays = [
    { day: 'MON', date: 11 },
    { day: 'TUE', date: 12 },
    { day: 'WED', date: 13 },
    { day: 'THU', date: 14 },
    { day: 'FRI', date: 15 },
    { day: 'SAT', date: 16 },
    { day: 'SUN', date: 17 },
  ];

  return (
    <div className="w-full pb-24 animate-in fade-in duration-500">
      <Settings 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {selectedCategory && (
        <LogModal
          isOpen={isLogModalOpen}
          onClose={() => setIsLogModalOpen(false)}
          category={selectedCategory}
          initialValue={loggedData[selectedCategory.id]}
          onSave={handleSaveLog}
        />
      )}

      {/* Header */}
      <header className="flex items-center justify-between p-4 z-10 relative">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-secondary-lavender flex items-center justify-center text-white font-bold text-xl shadow-md">
            AM
          </div>
          <div>
            <p className="text-sm font-medium text-text-light/80 dark:text-text-dark/80">Welcome back,</p>
            <h1 className="text-lg font-bold text-text-light dark:text-text-dark">Amara</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 hover:bg-primary/30 transition-colors"
          >
            <span className="material-symbols-outlined text-primary">settings</span>
          </button>
        </div>
      </header>

      {/* Interactive Cycle Circle */}
      <div className="relative mx-auto my-8 flex h-64 w-64 items-center justify-center z-10">
        {/* Glow Background */}
        <div className={`absolute h-full w-full animate-pulse rounded-full blur-2xl ${status.pulseColor} transition-colors duration-500`}></div>
        
        {/* Main Circle Container */}
        <div className={`relative h-48 w-48 rounded-full bg-gradient-to-b from-[#4A0072] to-[#31004a] shadow-2xl ${status.shadowColor} flex flex-col items-center justify-center text-center overflow-hidden border-[6px] border-[#5b21b6] transition-all duration-500`}>
          
          {/* Liquid Flow Animation (Only for Menstruation) */}
          {status.isFlow && (
            <div className="absolute bottom-0 left-0 right-0 w-full z-0 transition-all duration-1000 ease-in-out" style={{ height: `${status.flowLevel}%` }}>
               <div className="absolute top-0 left-0 w-[200%] h-full bg-red-600/40 animate-wave-slow"></div>
               <div className="absolute top-[-5px] left-[-10px] w-[200%] h-full bg-red-500/50 animate-wave-fast"></div>
            </div>
          )}

          {/* Text Content */}
          <div className="relative z-10 p-2">
            <p className={`text-xs font-bold uppercase tracking-wider ${status.textColor} transition-colors duration-300 mb-1`}>{status.phase}</p>
            <p className="text-4xl font-bold font-display text-white drop-shadow-md">{status.title}</p>
            <p className="mt-1 text-xs text-purple-100 font-medium opacity-90">{status.subtitle}</p>
          </div>
        </div>

        {/* Outer Ring Progress */}
        <svg className="absolute w-full h-full rotate-[-90deg] pointer-events-none" viewBox="0 0 256 256">
          {/* Track */}
          <circle cx="128" cy="128" r="110" fill="none" stroke="currentColor" strokeWidth="4" className="text-gray-200 dark:text-gray-800 opacity-20" />
          
          {/* Progress Indicator */}
          <circle 
            cx="128" 
            cy="128" 
            r="110" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="6" 
            strokeDasharray="691" 
            strokeDashoffset={691 - (691 * (selectedDay / 28))} 
            strokeLinecap="round" 
            className={`${status.strokeColor} transition-all duration-1000 ease-out`} 
          />
        </svg>
      </div>

      {/* Calendar Strip */}
      <div className="px-4 mt-8 z-10 relative">
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((d) => {
            const isSelected = selectedDay === d.date;
            const colorClass = getDayColorClass(d.date);
            const sexLogged = hasSexLog(d.date);

            return (
              <button 
                key={d.day}
                onClick={() => setSelectedDay(d.date)}
                className={`relative flex flex-col items-center gap-2 rounded-lg p-2 transition-all border ${colorClass} ${
                  isSelected 
                    ? 'ring-2 ring-primary ring-offset-1 scale-105 shadow-md z-10' 
                    : 'opacity-90 hover:opacity-100'
                }`}
              >
                <span className="text-[10px] font-bold opacity-80">{d.day}</span>
                <span className="text-lg font-bold">{d.date}</span>
                {sexLogged && (
                  <span className="absolute bottom-1 w-1.5 h-1.5 bg-red-500 rounded-full shadow-sm"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Daily Insight Card */}
      <div className="px-4 mt-6 z-10 relative">
        <div className="rounded-xl bg-gradient-to-br from-primary/20 to-secondary-lavender/20 p-4 border border-white/50 shadow-sm backdrop-blur-md">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary-lavender text-white shadow-md">
              <span className="text-xl font-bold font-display">A</span>
            </div>
            <div>
              <p className="text-sm font-bold text-text-light dark:text-text-dark">Amara Tips for Today</p>
              <p className="text-sm text-text-light/80 dark:text-text-dark/80 mt-1 leading-relaxed">
                Today is your predicted ovulation day. You might feel more energetic and experience a higher sex drive. Listen to your body and enjoy the vitality!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Logs Grid */}
      <div className="px-4 mt-8 z-10 relative">
        <div className="grid grid-cols-4 gap-3">
          {logDefinitions.map((def) => {
            const hasData = loggedData[def.id] !== undefined && loggedData[def.id] !== null && (Array.isArray(loggedData[def.id]) ? loggedData[def.id].length > 0 : loggedData[def.id] !== '');
            return (
              <button 
                key={def.id}
                onClick={() => openLogModal(def)}
                className={`flex flex-col items-center justify-center gap-2 p-2 aspect-square rounded-xl shadow-md transition-all duration-300 ${
                  hasData 
                    ? 'bg-primary/20 ring-2 ring-primary ring-offset-2 ring-offset-background-light dark:ring-offset-background-dark scale-95' 
                    : 'bg-white dark:bg-background-dark hover:shadow-lg hover:-translate-y-1'
                }`}
              >
                <span className={`material-symbols-outlined text-3xl transition-transform ${hasData ? 'scale-110' : ''} ${hasData ? 'filled' : 'filled'} ${def.colorClass}`}>
                  {def.icon}
                </span>
                <span className="text-[10px] font-medium text-center leading-tight text-text-light dark:text-text-dark">
                  {def.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Cycle Insights Section (History & Stats) */}
      <div className="px-4 mt-8 z-10 relative">
        <div className="bg-white dark:bg-background-dark rounded-2xl p-5 shadow-md border border-primary/10">
          <div className="flex items-center justify-between mb-4">
             <h2 className="text-lg font-bold text-text-light dark:text-text-dark">Cycle Insights</h2>
             <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">Last 6 Months</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
             <div className="p-4 bg-background-light dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-1">
                   <span className="material-symbols-outlined text-primary text-sm">update</span>
                   <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Avg Cycle</p>
                </div>
                <p className="text-2xl font-bold text-text-light dark:text-text-dark">29 <span className="text-sm font-medium text-gray-400">Days</span></p>
                <p className="text-[10px] text-green-500 font-bold mt-1 flex items-center gap-1">
                   <span className="material-symbols-outlined text-[10px] filled">check_circle</span> Regular
                </p>
             </div>
             <div className="p-4 bg-background-light dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-1">
                   <span className="material-symbols-outlined text-accent-coral text-sm">water_drop</span>
                   <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Avg Period</p>
                </div>
                <p className="text-2xl font-bold text-text-light dark:text-text-dark">5 <span className="text-sm font-medium text-gray-400">Days</span></p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium mt-1">Normal Range</p>
             </div>
          </div>

          <div className="mb-6">
             <div className="flex justify-between items-end mb-2">
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Phase Distribution</p>
             </div>
             <div className="flex w-full h-4 rounded-full overflow-hidden shadow-inner">
                <div className="h-full bg-red-300 dark:bg-red-400 w-[18%]" title="Menstrual"></div>
                <div className="h-full bg-blue-300 dark:bg-blue-400 w-[30%]" title="Follicular"></div>
                <div className="h-full bg-purple-300 dark:bg-purple-400 w-[5%]" title="Ovulation"></div>
                <div className="h-full bg-amber-300 dark:bg-amber-400 w-[47%]" title="Luteal"></div>
             </div>
             <div className="flex justify-between text-[10px] text-gray-500 dark:text-gray-400 mt-2 px-1">
                <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-300 dark:bg-red-400"></div>Menstrual</span>
                <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-300 dark:bg-blue-400"></div>Follicular</span>
                <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-purple-300 dark:bg-purple-400"></div>Ovul.</span>
                <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber-300 dark:bg-amber-400"></div>Luteal</span>
             </div>
          </div>

          <div className="bg-gradient-to-br from-primary/5 to-secondary-lavender/10 rounded-xl p-4 border border-primary/10">
             <div className="flex items-start gap-3">
                <div className="p-2 bg-white dark:bg-background-dark rounded-full shadow-sm text-primary">
                   <span className="material-symbols-outlined text-lg">school</span>
                </div>
                <div>
                   <p className="text-sm font-bold text-text-light dark:text-text-dark">Cycle Education</p>
                   <p className="text-xs text-text-light/70 dark:text-text-dark/70 mt-1 leading-relaxed">
                      Your <strong>Luteal Phase</strong> is dominant (47%). This is when PMS symptoms may occur. Prioritize magnesium-rich foods during this time.
                   </p>
                   <button className="text-xs font-bold text-primary mt-2.5 flex items-center gap-1 hover:underline">
                      Read full analysis <span className="material-symbols-outlined text-[10px]">arrow_forward</span>
                   </button>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Daily Health Report Summary */}
      <div className="px-4 mt-8 z-10 relative">
        <div className="bg-white dark:bg-background-dark rounded-2xl p-5 shadow-md border border-primary/10">
          <div className="flex items-center justify-between mb-4">
             <h2 className="text-lg font-bold text-text-light dark:text-text-dark">Daily Health Report</h2>
             <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-full animate-pulse">LIVE</span>
          </div>

          <div className="flex gap-6 items-center">
             <div className="relative w-24 h-24 flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-100 dark:text-gray-800" />
                  <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="251.2" strokeDashoffset="62.8" className="text-primary transition-all duration-1000 ease-out" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                   <span className="text-2xl font-bold text-text-light dark:text-text-dark">75%</span>
                   <span className="text-[10px] text-gray-500 uppercase font-medium">Readiness</span>
                </div>
             </div>

             <div className="flex-1 space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                     <span className="font-bold text-text-light/80 dark:text-text-dark/80">Mood Stability</span>
                     <span className="font-bold text-secondary-baby-blue">Good</span>
                  </div>
                  <div className="h-2.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                     <div className="h-full bg-secondary-baby-blue w-[80%] rounded-full shadow-[0_0_10px_rgba(137,207,240,0.5)]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                     <span className="font-bold text-text-light/80 dark:text-text-dark/80">Symptom Intensity</span>
                     <span className="font-bold text-accent-coral">Low</span>
                  </div>
                  <div className="h-2.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                     <div className="h-full bg-accent-coral w-[20%] rounded-full shadow-[0_0_10px_rgba(255,127,80,0.5)]"></div>
                  </div>
                </div>
             </div>
          </div>

          <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800 flex gap-3 items-start">
             <div className="p-1.5 bg-gradient-to-br from-primary to-secondary-lavender rounded-lg text-white shadow-sm mt-0.5">
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
             </div>
             <p className="text-xs text-text-light/80 dark:text-text-dark/80 leading-relaxed">
                Based on your logs, your body is in a <strong>high energy phase</strong>. It's a great day for intense workouts or creative projects. Hydration levels look good!
             </p>
          </div>
        </div>
      </div>

      {/* Trends & Patterns Section */}
      <div className="px-4 mt-8 z-10 relative">
        <h2 className="text-lg font-bold mb-3 text-text-light dark:text-text-dark">Trends & Patterns</h2>
        <div className="flex gap-3 overflow-x-auto pb-4 snap-x no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
           <div className="min-w-[240px] bg-white dark:bg-background-dark p-4 rounded-2xl shadow-sm border border-primary/20 snap-center">
              <div className="flex items-center gap-2 mb-2">
                 <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <span className="material-symbols-outlined text-red-400">ecg_heart</span>
                 </div>
                 <span className="text-xs font-bold text-red-400 uppercase tracking-wider">Pattern</span>
              </div>
              <h3 className="font-bold text-text-light dark:text-text-dark mb-1">Symptom Correlation</h3>
              <p className="text-xs text-text-light/70 dark:text-text-dark/70 leading-relaxed">
                 You often report <strong>headaches</strong> 2 days before ovulation. Consider hydrating extra today.
              </p>
           </div>

           <div className="min-w-[240px] bg-white dark:bg-background-dark p-4 rounded-2xl shadow-sm border border-primary/20 snap-center">
              <div className="flex items-center gap-2 mb-2">
                 <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <span className="material-symbols-outlined text-purple-400">egg_alt</span>
                 </div>
                 <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Fertility</span>
              </div>
              <h3 className="font-bold text-text-light dark:text-text-dark mb-1">Peak Fertility Window</h3>
              <p className="text-xs text-text-light/70 dark:text-text-dark/70 leading-relaxed">
                 Your fertile window is open. Chances of conception are <strong>Very High</strong> today.
              </p>
           </div>
           
           <div className="min-w-[240px] bg-white dark:bg-background-dark p-4 rounded-2xl shadow-sm border border-primary/20 snap-center">
              <div className="flex items-center gap-2 mb-2">
                 <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <span className="material-symbols-outlined text-blue-400">waves</span>
                 </div>
                 <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Wellness</span>
              </div>
              <h3 className="font-bold text-text-light dark:text-text-dark mb-1">Hydration Goal</h3>
              <p className="text-xs text-text-light/70 dark:text-text-dark/70 leading-relaxed">
                 You've hit your water goal <strong>5 days</strong> in a row! Keep up the glowing work.
              </p>
           </div>
        </div>
      </div>

      {/* Bottom Insights List */}
      <div className="px-4 mt-4 mb-4 z-10 relative">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Recommended Reading</h2>
          <button className="text-sm font-bold text-primary hover:text-primary/80">View All</button>
        </div>
        <div className="mt-4 space-y-3">
          {insights.map((insight) => (
            <button key={insight.id} className="w-full text-left flex items-center gap-4 rounded-xl bg-white dark:bg-background-dark p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
                <span className="material-symbols-outlined text-3xl">{insight.icon}</span>
              </div>
              <div>
                <p className="font-bold text-text-light dark:text-text-dark">{insight.title}</p>
                <p className="text-sm text-text-light/70 dark:text-text-dark/70">{insight.subtitle}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
