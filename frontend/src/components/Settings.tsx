
import React, { useState } from 'react';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
  soundEnabled: boolean;
  onToggleSound: (enabled: boolean) => void;
}

const Settings: React.FC<SettingsProps> = ({ isOpen, onClose, soundEnabled, onToggleSound }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [cycleLength, setCycleLength] = useState(28);
  const [periodLength, setPeriodLength] = useState(5);

  if (!isOpen) return null;

  const SectionHeader = ({ title }: { title: string }) => (
    <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-1 mt-6">
      {title}
    </h3>
  );

  const SettingItem = ({ 
    icon, 
    label, 
    value, 
    type = 'chevron', 
    onToggle,
    isDestructive = false
  }: { 
    icon: string, 
    label: string, 
    value?: string | boolean, 
    type?: 'chevron' | 'toggle' | 'value', 
    onToggle?: () => void,
    isDestructive?: boolean
  }) => (
    <button 
      onClick={onToggle}
      className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-900 first:rounded-t-xl last:rounded-b-xl border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full ${isDestructive ? 'bg-red-50 text-red-500' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'}`}>
          <span className="material-symbols-outlined text-xl">{icon}</span>
        </div>
        <span className={`text-sm font-medium ${isDestructive ? 'text-red-500' : 'text-text-light dark:text-text-dark'}`}>
          {label}
        </span>
      </div>

      <div className="flex items-center gap-2">
        {type === 'value' && (
          <span className="text-sm text-gray-400">{value}</span>
        )}
        {type === 'chevron' && (
           <div className="flex items-center gap-2">
             {value && <span className="text-sm text-gray-400">{value}</span>}
             <span className="material-symbols-outlined text-gray-300">chevron_right</span>
           </div>
        )}
        {type === 'toggle' && (
          <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${value ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700'}`}>
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${value ? 'translate-x-6' : 'translate-x-1'}`} />
          </div>
        )}
      </div>
    </button>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full h-[95vh] sm:h-auto sm:max-h-[90vh] sm:max-w-md bg-background-light dark:bg-background-dark rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 z-10">
          <h2 className="text-lg font-bold text-text-light dark:text-text-dark">Settings</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
          
          {/* Profile Card */}
          <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-2xl mb-2 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-secondary-lavender flex items-center justify-center text-white text-2xl font-bold shadow-md">
              A
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-text-light dark:text-text-dark">Amara</h3>
              <p className="text-xs text-text-light/60 dark:text-text-dark/60">amara@example.com</p>
              <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary uppercase">
                Free Plan
              </span>
            </div>
            <button className="text-primary font-bold text-sm">Edit</button>
          </div>

          <SectionHeader title="My Body" />
          <div className="flex flex-col rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
             <SettingItem icon="cached" label="Cycle Length" value={`${cycleLength} Days`} type="chevron" onToggle={() => setCycleLength(prev => prev === 28 ? 29 : 28)} />
             <SettingItem icon="water_drop" label="Period Duration" value={`${periodLength} Days`} type="chevron" onToggle={() => setPeriodLength(prev => prev === 5 ? 6 : 5)} />
             <SettingItem icon="target" label="Reproductive Goal" value="Track Cycle" type="chevron" />
          </div>

          <SectionHeader title="Notifications" />
          <div className="flex flex-col rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
             <SettingItem 
                icon="notifications_active" 
                label="Sound Effects" 
                value={soundEnabled} 
                type="toggle" 
                onToggle={() => onToggleSound(!soundEnabled)} 
             />
             <SettingItem icon="calendar_month" label="Period Predictions" value={true} type="toggle" onToggle={() => {}} />
             <SettingItem icon="egg_alt" label="Fertility Window" value={true} type="toggle" onToggle={() => {}} />
             <SettingItem icon="medication" label="Pill Reminders" value={false} type="toggle" onToggle={() => {}} />
          </div>

          <SectionHeader title="Preferences" />
          <div className="flex flex-col rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
             <SettingItem icon="thermostat" label="Temperature Unit" value="Celsius (°C)" type="chevron" />
             <SettingItem icon="monitor_weight" label="Weight Unit" value="Kg" type="chevron" />
             <SettingItem 
                icon="dark_mode" 
                label="Dark Mode" 
                value={darkMode} 
                type="toggle" 
                onToggle={() => {
                   setDarkMode(!darkMode);
                   document.documentElement.classList.toggle('dark');
                }} 
             />
             <SettingItem icon="lock" label="PIN Protection" value={false} type="toggle" onToggle={() => {}} />
          </div>

          <SectionHeader title="Support & Data" />
          <div className="flex flex-col rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
             <SettingItem icon="help" label="Help Center" type="chevron" />
             <SettingItem icon="privacy_tip" label="Privacy Policy" type="chevron" />
             <SettingItem icon="download" label="Export Data" type="chevron" />
          </div>

          <div className="mt-6 mb-8">
            <button className="w-full py-3.5 bg-red-50 dark:bg-red-900/10 text-red-500 font-bold rounded-xl hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors border border-red-100 dark:border-red-900/20">
              Log Out
            </button>
            <p className="text-center text-[10px] text-gray-400 mt-4">Version 1.2.0 • Build 2408</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;
