import image_4181731f1825e464f60d30194016a6b9994ed07a from 'figma:asset/4181731f1825e464f60d30194016a6b9994ed07a.png';
import { 
  Droplet, Heart, Smile, Activity, 
  Droplets, UtensilsCrossed, TestTube, FlaskConical,
  Dumbbell, Pill, CreditCard, GlassWater,
  Scale, Thermometer, Briefcase, PenLine,
  LayoutDashboard, Calendar, MessageCircle, Users,
  TrendingUp, Moon, Zap, Settings, Bell
} from 'lucide-react@0.487.0';
import { useState, useEffect } from 'react';
import { CyclePhaseRing } from '../calendar/CyclePhaseRing';
import { LogModal } from '../tracking/LogModal';
import { NotificationSettingsModal } from '../shared/NotificationSettingsModal';
import { LogDefinition, DayLogs, LogEntry, NotificationSettings, CycleEvent } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';
import amaraLogo from "figma:asset/amara-logo.png";

interface HomeDashboardProps {
  onNavigate: (screen: 'calendar' | 'symptom-tracker' | 'insights' | 'settings' | 'amara-chat' | 'tribal-chat' | 'partner-link') => void;
}

export function HomeDashboard({ onNavigate }: HomeDashboardProps) {
  const [cycleDay] = useState(14);
  const [selectedNav, setSelectedNav] = useState('dashboard');
  const [todayLogs, setTodayLogs] = useState<DayLogs>({});
  const [selectedCategory, setSelectedCategory] = useState<LogDefinition | null>(null);
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);
  const [showAvatarTooltip, setShowAvatarTooltip] = useState(true);
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    periodReminder: true,
    ovulationAlert: true,
    fertileWindowAlert: true,
    pillReminder: false,
    weightTracking: false,
    temperatureReminder: false,
    soundEnabled: true,
  });

  // Phase colors matching CyclePhaseRing
  const getPhaseForDay = (day: number) => {
    if (day >= 1 && day <= 5) return { name: 'menstrual', color: '#ef4444', bgGradient: 'from-red-400 to-red-500', textColor: 'text-red-500' };
    if (day >= 6 && day <= 13) return { name: 'follicular', color: '#ec4899', bgGradient: 'from-pink-400 to-pink-500', textColor: 'text-pink-500' };
    if (day >= 14 && day <= 16) return { name: 'ovulation', color: '#a855f7', bgGradient: 'from-purple-500 to-purple-600', textColor: 'text-purple-500' };
    return { name: 'luteal', color: '#3b82f6', bgGradient: 'from-blue-400 to-blue-500', textColor: 'text-blue-500' };
  };

  // Comprehensive log definitions
  const logDefinitions: LogDefinition[] = [
    {
      id: 'flow',
      title: 'Menstrual Flow',
      color: 'bg-gradient-to-br from-red-400 to-red-500',
      icon: '💧',
      type: 'single-select',
      options: [
        { id: 'spotting', label: 'Spotting' },
        { id: 'light', label: 'Light' },
        { id: 'medium', label: 'Medium' },
        { id: 'heavy', label: 'Heavy' },
        { id: 'very-heavy', label: 'Very Heavy' },
      ],
    },
    {
      id: 'sex',
      title: 'Sex & Drive',
      color: 'bg-gradient-to-br from-orange-400 to-orange-500',
      icon: '❤️',
      type: 'multi-select',
      options: [
        { id: 'had-sex', label: 'Had Sex', icon: '💑' },
        { id: 'protected', label: 'Protected', icon: '🛡️' },
        { id: 'unprotected', label: 'Unprotected', icon: '⚠️' },
        { id: 'high-drive', label: 'High Drive', icon: '🔥' },
        { id: 'medium-drive', label: 'Medium Drive', icon: '😊' },
        { id: 'low-drive', label: 'Low Drive', icon: '😴' },
        { id: 'no-drive', label: 'No Drive', icon: '💤' },
      ],
    },
    {
      id: 'mood',
      title: 'Mood',
      color: 'bg-gradient-to-br from-yellow-400 to-yellow-500',
      icon: '😊',
      type: 'multi-select',
      options: [
        { id: 'happy', label: 'Happy', icon: '😊' },
        { id: 'energetic', label: 'Energetic', icon: '⚡' },
        { id: 'calm', label: 'Calm', icon: '😌' },
        { id: 'anxious', label: 'Anxious', icon: '😰' },
        { id: 'sad', label: 'Sad', icon: '😢' },
        { id: 'irritable', label: 'Irritable', icon: '😠' },
        { id: 'moody', label: 'Moody', icon: '🌧️' },
        { id: 'stressed', label: 'Stressed', icon: '😫' },
        { id: 'motivated', label: 'Motivated', icon: '💪' },
        { id: 'tired', label: 'Tired', icon: '😴' },
      ],
    },
    {
      id: 'symptoms',
      title: 'Symptoms',
      color: 'bg-gradient-to-br from-green-400 to-green-500',
      icon: '🩺',
      type: 'multi-select',
      options: [
        { id: 'cramps', label: 'Cramps', icon: '😣' },
        { id: 'headache', label: 'Headache', icon: '🤕' },
        { id: 'bloating', label: 'Bloating', icon: '🎈' },
        { id: 'breast-tenderness', label: 'Breast Tenderness', icon: '💢' },
        { id: 'acne', label: 'Acne', icon: '🔴' },
        { id: 'fatigue', label: 'Fatigue', icon: '😴' },
        { id: 'nausea', label: 'Nausea', icon: '🤢' },
        { id: 'backache', label: 'Backache', icon: '🔙' },
        { id: 'food-cravings', label: 'Food Cravings', icon: '🍫' },
        { id: 'insomnia', label: 'Insomnia', icon: '🌙' },
        { id: 'hot-flashes', label: 'Hot Flashes', icon: '🔥' },
        { id: 'dizziness', label: 'Dizziness', icon: '💫' },
      ],
    },
    {
      id: 'discharge',
      title: 'Discharge',
      color: 'bg-gradient-to-br from-blue-300 to-blue-400',
      icon: '💧',
      type: 'multi-select',
      options: [
        { id: 'dry', label: 'Dry' },
        { id: 'sticky', label: 'Sticky' },
        { id: 'creamy', label: 'Creamy' },
        { id: 'watery', label: 'Watery' },
        { id: 'egg-white', label: 'Egg White' },
        { id: 'unusual', label: 'Unusual' },
      ],
    },
    {
      id: 'digestion',
      title: 'Digestion',
      color: 'bg-gradient-to-br from-orange-400 to-orange-500',
      icon: '🍽️',
      type: 'multi-select',
      options: [
        { id: 'normal', label: 'Normal', icon: '✅' },
        { id: 'constipation', label: 'Constipation', icon: '🚫' },
        { id: 'diarrhea', label: 'Diarrhea', icon: '💨' },
        { id: 'bloating', label: 'Bloating', icon: '🎈' },
        { id: 'gas', label: 'Gas', icon: '💨' },
        { id: 'nausea', label: 'Nausea', icon: '🤢' },
        { id: 'heartburn', label: 'Heartburn', icon: '🔥' },
      ],
    },
    {
      id: 'preg-test',
      title: 'Pregnancy Test',
      color: 'bg-gradient-to-br from-pink-400 to-pink-500',
      icon: '🧪',
      type: 'single-select',
      options: [
        { id: 'positive', label: 'Positive ✅', icon: '✅' },
        { id: 'negative', label: 'Negative ❌', icon: '❌' },
      ],
    },
    {
      id: 'ovul-test',
      title: 'Ovulation Test',
      color: 'bg-gradient-to-br from-purple-400 to-purple-500',
      icon: '🔬',
      type: 'single-select',
      options: [
        { id: 'positive', label: 'Positive ✅', icon: '✅' },
        { id: 'high', label: 'High', icon: '📈' },
        { id: 'low', label: 'Low', icon: '📉' },
        { id: 'negative', label: 'Negative ❌', icon: '❌' },
      ],
    },
    {
      id: 'workout',
      title: 'Workout',
      color: 'bg-gradient-to-br from-blue-400 to-blue-500',
      icon: '💪',
      type: 'multi-select',
      options: [
        { id: 'cardio', label: 'Cardio', icon: '🏃' },
        { id: 'strength', label: 'Strength', icon: '🏋️' },
        { id: 'yoga', label: 'Yoga', icon: '🧘' },
        { id: 'pilates', label: 'Pilates', icon: '🤸' },
        { id: 'walking', label: 'Walking', icon: '🚶' },
        { id: 'running', label: 'Running', icon: '🏃' },
        { id: 'cycling', label: 'Cycling', icon: '🚴' },
        { id: 'swimming', label: 'Swimming', icon: '🏊' },
        { id: 'hiit', label: 'HIIT', icon: '⚡' },
        { id: 'stretching', label: 'Stretching', icon: '🤗' },
      ],
    },
    {
      id: 'oral-cont',
      title: 'Oral Contraceptive',
      color: 'bg-gradient-to-br from-purple-400 to-purple-500',
      icon: '💊',
      type: 'single-select',
      options: [
        { id: 'taken', label: 'Taken ✅', icon: '✅' },
        { id: 'missed', label: 'Missed ', icon: '❌' },
      ],
    },
    {
      id: 'non-oral',
      title: 'Non-Oral Contraceptive',
      color: 'bg-gradient-to-br from-cyan-400 to-cyan-500',
      icon: '🛡️',
      type: 'multi-select',
      options: [
        { id: 'iud', label: 'IUD' },
        { id: 'implant', label: 'Implant' },
        { id: 'patch', label: 'Patch' },
        { id: 'ring', label: 'Ring' },
        { id: 'injection', label: 'Injection' },
        { id: 'condom', label: 'Condom' },
      ],
    },
    {
      id: 'water',
      title: 'Water Intake',
      color: 'bg-gradient-to-br from-blue-400 to-blue-500',
      icon: '💧',
      type: 'numeric',
      unit: 'glasses',
      min: 0,
      max: 20,
      step: 1,
    },
    {
      id: 'weight',
      title: 'Weight',
      color: 'bg-gradient-to-br from-teal-400 to-teal-500',
      icon: '⚖️',
      type: 'numeric',
      unit: 'lbs',
      min: 50,
      max: 500,
      step: 0.1,
    },
    {
      id: 'temp',
      title: 'Basal Body Temperature',
      color: 'bg-gradient-to-br from-orange-400 to-orange-500',
      icon: '🌡️',
      type: 'numeric',
      unit: '°F',
      min: 95,
      max: 100,
      step: 0.1,
    },
    {
      id: 'work',
      title: 'Work',
      color: 'bg-gradient-to-br from-gray-500 to-gray-600',
      icon: '💼',
      type: 'multi-select',
      options: [
        { id: 'productive', label: 'Productive', icon: '✅' },
        { id: 'stressful', label: 'Stressful', icon: '😰' },
        { id: 'busy', label: 'Busy', icon: '🏃' },
        { id: 'relaxed', label: 'Relaxed', icon: '😌' },
        { id: 'focused', label: 'Focused', icon: '🎯' },
        { id: 'distracted', label: 'Distracted', icon: '😵' },
        { id: 'meeting-heavy', label: 'Meeting Heavy', icon: '👥' },
        { id: 'worked-from-home', label: 'Worked from Home', icon: '🏠' },
      ],
    },
    {
      id: 'notes',
      title: 'Notes',
      color: 'bg-gradient-to-br from-pink-400 to-pink-500',
      icon: '📝',
      type: 'text',
      placeholder: 'Add your notes here...',
    },
  ];

  // Week calendar data
  const weekDays = [
    { day: 'MON', date: 11, hasEvent: false, color: 'text-purple-400' },
    { day: 'TUE', date: 12, hasEvent: true, color: 'text-purple-400' },
    { day: 'WED', date: 13, hasEvent: false, color: 'text-purple-400' },
    { day: 'THU', date: 14, hasEvent: true, color: 'text-purple-400', isToday: true },
    { day: 'FRI', date: 15, hasEvent: false, color: 'text-orange-400' },
    { day: 'SAT', date: 16, hasEvent: true, color: 'text-orange-400' },
    { day: 'SUN', date: 17, hasEvent: false, color: 'text-orange-400' },
  ];

  // Tracking cards grid (4x4)
  const trackingCards = [
    // Row 1
    { id: 'flow', label: 'Menstrual\nFlow', icon: <Droplet className="w-6 h-6 text-red-400" />, color: 'text-red-400' },
    { id: 'sex', label: 'Sex & Drive', icon: <Heart className="w-6 h-6 text-orange-400" />, color: 'text-orange-400' },
    { id: 'mood', label: 'Mood', icon: <Smile className="w-6 h-6 text-yellow-400" />, color: 'text-yellow-400' },
    { id: 'symptoms', label: 'Symptoms', icon: <Activity className="w-6 h-6 text-green-400" />, color: 'text-green-400' },
    
    // Row 2
    { id: 'discharge', label: 'Discharge', icon: <Droplets className="w-6 h-6 text-blue-300" />, color: 'text-blue-300' },
    { id: 'digestion', label: 'Digestion', icon: <UtensilsCrossed className="w-6 h-6 text-orange-400" />, color: 'text-orange-400' },
    { id: 'preg-test', label: 'Preg. Test', icon: <TestTube className="w-6 h-6 text-pink-400" />, color: 'text-pink-400' },
    { id: 'ovul-test', label: 'Ovul. Test', icon: <FlaskConical className="w-6 h-6 text-purple-400" />, color: 'text-purple-400' },
    
    // Row 3
    { id: 'workout', label: 'Workout', icon: <Dumbbell className="w-6 h-6 text-blue-400" />, color: 'text-blue-400' },
    { id: 'oral-cont', label: 'Oral Cont.', icon: <Pill className="w-6 h-6 text-purple-400" />, color: 'text-purple-400' },
    { id: 'non-oral', label: 'Non-Oral', icon: <CreditCard className="w-6 h-6 text-cyan-400" />, color: 'text-cyan-400' },
    { id: 'water', label: 'Water', icon: <GlassWater className="w-6 h-6 text-blue-400" />, color: 'text-blue-400' },
    
    // Row 4
    { id: 'weight', label: 'Weight', icon: <Scale className="w-6 h-6 text-teal-400" />, color: 'text-teal-400' },
    { id: 'temp', label: 'Temp', icon: <Thermometer className="w-6 h-6 text-orange-400" />, color: 'text-orange-400' },
    { id: 'work', label: 'Work', icon: <Briefcase className="w-6 h-6 text-gray-600" />, color: 'text-gray-600' },
    { id: 'notes', label: 'Add Notes', icon: <PenLine className="w-6 h-6 text-pink-400" />, color: 'text-pink-400' },
  ];

  // Handle opening log modal
  const handleCardClick = (cardId: string) => {
    const definition = logDefinitions.find(d => d.id === cardId);
    if (definition) {
      setSelectedCategory(definition);
    }
  };

  // Handle saving log
  const handleSaveLog = (log: LogEntry) => {
    setTodayLogs(prev => ({
      ...prev,
      [log.categoryId]: log,
    }));
    
    // Play sound if enabled
    if (notificationSettings.soundEnabled) {
      playNotificationSound();
    }
  };

  // Play notification sound
  const playNotificationSound = () => {
    // Create a simple beep sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  };

  // Simulate cycle notifications
  useEffect(() => {
    // Check for ovulation notification (day 14)
    if (cycleDay === 14 && notificationSettings.ovulationAlert && notificationSettings.soundEnabled) {
      playNotificationSound();
    }
  }, [cycleDay, notificationSettings]);

  // Check if card has been logged today
  const isCardLogged = (cardId: string) => {
    return !!todayLogs[cardId];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100">
      
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
              MAUV Dashboard
            </h1>

            {/* Notification & Settings */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowNotificationSettings(true)}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors shadow-sm relative"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                {notificationSettings.soundEnabled && (
                  <div className="absolute top-1 right-1 w-2 h-2 bg-purple-500 rounded-full" />
                )}
              </button>
              <button 
                onClick={() => onNavigate('settings')}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors shadow-sm"
              >
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-8 pb-24 space-y-6">
        {/* Animated Cycle Phase Ring */}
        <CyclePhaseRing cycleDay={cycleDay} cycleLength={28} />

        {/* Week Calendar Strip */}
        <div className="flex gap-2">
          {weekDays.map((day, idx) => {
            const phase = getPhaseForDay(day.date);
            return (
              <button
                key={idx}
                className={`flex-1 rounded-2xl transition-all duration-200 ${
                  day.isToday
                    ? `bg-gradient-to-br ${phase.bgGradient} text-white shadow-lg scale-105`
                    : 'bg-white/70 hover:bg-white shadow-md hover:shadow-lg'
                }`}
              >
                <div className="p-2 text-center">
                  <p className={`text-xs mb-1 ${day.isToday ? 'text-white' : phase.textColor}`}>
                    {day.day}
                  </p>
                  <p className={`text-lg ${day.isToday ? 'text-white' : 'text-gray-800'}`}>
                    {day.date}
                  </p>
                  {day.hasEvent && (
                    <div className={`w-1.5 h-1.5 rounded-full mx-auto mt-1 ${
                      day.isToday ? 'bg-white' : ''
                    }`} 
                    style={{ backgroundColor: day.isToday ? 'white' : phase.color }}
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Amara Tips Card */}
        <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-5 border border-purple-200/50 shadow-lg">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white flex-shrink-0 shadow-lg">
              <img 
                src={image_4181731f1825e464f60d30194016a6b9994ed07a} 
                alt="Amara AI"
                className="w-12 h-12 object-contain drop-shadow-lg"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-800 mb-2">Amara Tips for Today</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Today is your predicted ovulation day. You might feel more energetic and experience a higher sex drive. Listen to your body and enjoy the vitality!
              </p>
            </div>
          </div>
        </div>

        {/* Tracking Cards Grid */}
        <div className="grid grid-cols-4 gap-3">
          {trackingCards.map((card) => {
            const isLogged = isCardLogged(card.id);
            return (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`bg-white/90 hover:bg-white rounded-2xl p-3 flex flex-col items-center justify-center gap-2 transition-all duration-200 hover:scale-105 active:scale-95 shadow-md hover:shadow-xl border relative ${
                  isLogged ? 'border-purple-400 bg-purple-50' : 'border-purple-100/50'
                }`}
              >
                {isLogged && (
                  <div className="absolute top-1 right-1 w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                )}
                <div className="w-10 h-10 flex items-center justify-center">
                  {card.icon}
                </div>
                <p className="text-xs text-gray-700 text-center whitespace-pre-line leading-tight">
                  {card.label}
                </p>
              </button>
            );
          })}
        </div>

        {/* Insights Section */}
        <div className="bg-white/90 rounded-3xl p-6 border border-purple-200/50 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg text-gray-800">Health Insights</h3>
            <button 
              onClick={() => onNavigate('insights')}
              className="text-sm text-purple-600 hover:text-purple-700 transition-colors"
            >
              View All
            </button>
          </div>

          {/* Insights Grid */}
          <div className="space-y-4">
            {/* Cycle Consistency */}
            <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl shadow-sm">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center flex-shrink-0 shadow-md">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm text-gray-800 mb-1">Cycle Consistency</h4>
                <p className="text-xs text-gray-600">Your cycle has been regular (28 days avg) for 3 months</p>
              </div>
            </div>

            {/* Sleep Pattern */}
            <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-sm">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-md">
                <Moon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm text-gray-800 mb-1">Sleep Quality</h4>
                <p className="text-xs text-gray-600">Average 7.5 hours • Better during follicular phase</p>
              </div>
            </div>

            {/* Energy Levels */}
            <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl shadow-sm">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-md">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm text-gray-800 mb-1">Energy & Activity</h4>
                <p className="text-xs text-gray-600">Peak energy days 8-14 • 3 workouts logged this week</p>
              </div>
            </div>

            {/* Common Symptoms */}
            <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl shadow-sm">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center flex-shrink-0 shadow-md">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm text-gray-800 mb-1">Well-being Summary</h4>
                <p className="text-xs text-gray-600">Mood: Positive • Hydration: 6 glasses/day • PMS: Mild</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom spacing for nav */}
        <div className="h-4" />
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-purple-200/50 shadow-2xl">
        <div className="max-w-md mx-auto px-6 py-3">
          <div className="flex items-center justify-around relative">
            {/* Calendar */}
            <button
              onClick={() => {
                setSelectedNav('calendar');
                onNavigate('calendar');
              }}
              className={`flex flex-col items-center gap-1 transition-colors ${
                selectedNav === 'calendar' ? 'text-purple-600' : 'text-gray-400'
              }`}
            >
              <Calendar className="w-6 h-6" />
              <span className="text-xs">Calendar</span>
            </button>

            {/* Insights */}
            <button
              onClick={() => {
                setSelectedNav('insights');
                onNavigate('insights');
              }}
              className={`flex flex-col items-center gap-1 transition-colors ${
                selectedNav === 'insights' ? 'text-purple-600' : 'text-gray-400'
              }`}
            >
              <TrendingUp className="w-6 h-6" />
              <span className="text-xs">Insights</span>
            </button>

            {/* Amara AI - Center elevated button */}
            <button
              onClick={() => {
                setSelectedNav('amara');
                onNavigate('amara-chat');
              }}
              className="relative -mt-8"
            >
              <div 
                className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white hover:scale-105 transition-transform"
                style={{
                  boxShadow: '0 8px 16px rgba(147, 51, 234, 0.3), 0 4px 8px rgba(236, 72, 153, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1), inset 0 -2px 4px rgba(0, 0, 0, 0.1), inset 0 2px 4px rgba(255, 255, 255, 0.2)',
                }}
              >
                <img 
                  src={image_4181731f1825e464f60d30194016a6b9994ed07a} 
                  alt="Amara AI"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs text-purple-600 whitespace-nowrap">
                Amara AI
              </span>
            </button>

            {/* Tribal Chat */}
            <button
              onClick={() => {
                setSelectedNav('chat');
                onNavigate('tribal-chat');
              }}
              className={`flex flex-col items-center gap-1 transition-colors ${
                selectedNav === 'chat' ? 'text-purple-600' : 'text-gray-400'
              }`}
            >
              <MessageCircle className="w-6 h-6" />
              <span className="text-xs">Tribal Chat</span>
            </button>

            {/* Partner */}
            <button
              onClick={() => {
                setSelectedNav('partner');
                onNavigate('partner-link');
              }}
              className={`flex flex-col items-center gap-1 transition-colors ${
                selectedNav === 'partner' ? 'text-purple-600' : 'text-gray-400'
              }`}
            >
              <Users className="w-6 h-6" />
              <span className="text-xs">Partner</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {selectedCategory && (
        <LogModal
          isOpen={!!selectedCategory}
          onClose={() => setSelectedCategory(null)}
          definition={selectedCategory}
          existingLog={todayLogs[selectedCategory.id]}
          onSave={handleSaveLog}
        />
      )}

      <NotificationSettingsModal
        isOpen={showNotificationSettings}
        onClose={() => setShowNotificationSettings(false)}
        settings={notificationSettings}
        onUpdateSettings={setNotificationSettings}
      />
    </div>
  );
}