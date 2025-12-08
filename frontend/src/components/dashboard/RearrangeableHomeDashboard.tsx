import { LogDefinition, DayLogs, LogEntry, NotificationSettings, CycleEvent } from '../types';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import image_4181731f1825e464f60d30194016a6b9994ed07a from 'figma:asset/4181731f1825e464f60d30194016a6b9994ed07a.png';
import { toast } from 'sonner@2.0.3';
import { AmaraNavButton } from '../shared/AmaraNavButton';

interface HomeDashboardProps {
  onNavigate: (screen: 'calendar' | 'symptom-tracker' | 'insights' | 'settings' | 'amara-chat' | 'tribal-chat' | 'partner-link') => void;
}

interface TrackingCard {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

export function RearrangeableHomeDashboard({ onNavigate }: HomeDashboardProps) {
  const [cycleDay] = useState(14);
  const [selectedNav, setSelectedNav] = useState('dashboard');
  const [todayLogs, setTodayLogs] = useState<DayLogs>({});
  const [selectedCategory, setSelectedCategory] = useState<LogDefinition | null>(null);
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);
  const [showAvatarTooltip, setShowAvatarTooltip] = useState(true);
  const [isRearrangeMode, setIsRearrangeMode] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    periodReminder: true,
    ovulationAlert: true,
    fertileWindowAlert: true,
    pillReminder: false,
    weightTracking: false,
    temperatureReminder: false,
    soundEnabled: true,
  });

  // Default card order
  const defaultCardOrder = [
    { id: 'flow', label: 'Menstrual\nFlow', icon: <Droplet className="w-6 h-6 text-red-400" />, color: 'text-red-400' },
    { id: 'sex', label: 'Sex & Drive', icon: <Heart className="w-6 h-6 text-orange-400" />, color: 'text-orange-400' },
    { id: 'mood', label: 'Mood', icon: <Smile className="w-6 h-6 text-yellow-400" />, color: 'text-yellow-400' },
    { id: 'symptoms', label: 'Symptoms', icon: <Activity className="w-6 h-6 text-green-400" />, color: 'text-green-400' },
    { id: 'discharge', label: 'Discharge', icon: <Droplets className="w-6 h-6 text-blue-300" />, color: 'text-blue-300' },
    { id: 'digestion', label: 'Digestion', icon: <UtensilsCrossed className="w-6 h-6 text-orange-400" />, color: 'text-orange-400' },
    { id: 'preg-test', label: 'Preg. Test', icon: <TestTube className="w-6 h-6 text-pink-400" />, color: 'text-pink-400' },
    { id: 'ovul-test', label: 'Ovul. Test', icon: <FlaskConical className="w-6 h-6 text-purple-400" />, color: 'text-purple-400' },
    { id: 'workout', label: 'Workout', icon: <Dumbbell className="w-6 h-6 text-blue-400" />, color: 'text-blue-400' },
    { id: 'oral-cont', label: 'Oral Cont.', icon: <Pill className="w-6 h-6 text-purple-400" />, color: 'text-purple-400' },
    { id: 'non-oral', label: 'Non-Oral', icon: <CreditCard className="w-6 h-6 text-cyan-400" />, color: 'text-cyan-400' },
    { id: 'water', label: 'Water', icon: <GlassWater className="w-6 h-6 text-blue-400" />, color: 'text-blue-400' },
    { id: 'weight', label: 'Weight', icon: <Scale className="w-6 h-6 text-teal-400" />, color: 'text-teal-400' },
    { id: 'temp', label: 'Temp', icon: <Thermometer className="w-6 h-6 text-orange-400" />, color: 'text-orange-400' },
    { id: 'work', label: 'Work', icon: <Briefcase className="w-6 h-6 text-gray-600" />, color: 'text-gray-600' },
    { id: 'notes', label: 'Add Notes', icon: <PenLine className="w-6 h-6 text-pink-400" />, color: 'text-pink-400' },
  ];

  // Load saved card order from localStorage
  const [trackingCards, setTrackingCards] = useState<TrackingCard[]>(() => {
    const saved = localStorage.getItem('dashboard-card-order');
    return saved ? JSON.parse(saved) : defaultCardOrder;
  });

  // Save card order to localStorage
  useEffect(() => {
    localStorage.setItem('dashboard-card-order', JSON.stringify(trackingCards));
  }, [trackingCards]);

  // Phase colors matching CyclePhaseRing
  const getPhaseForDay = (day: number) => {
    if (day >= 1 && day <= 5) return { name: 'menstrual', color: '#ef4444', bgGradient: 'from-red-400 to-red-500', textColor: 'text-red-500' };
    if (day >= 6 && day <= 13) return { name: 'follicular', color: '#ec4899', bgGradient: 'from-pink-400 to-pink-500', textColor: 'text-pink-500' };
    if (day >= 14 && day <= 16) return { name: 'ovulation', color: '#a855f7', bgGradient: 'from-purple-500 to-purple-600', textColor: 'text-purple-500' };
    return { name: 'luteal', color: '#3b82f6', bgGradient: 'from-blue-400 to-blue-500', textColor: 'text-blue-500' };
  };

  const currentPhase = getPhaseForDay(cycleDay);

  // Comprehensive log definitions (same as original)
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
    // ... (include all other log definitions from original)
  ];

  // Week days for calendar preview
  const weekDays = [
    { day: 'MON', date: 11, hasEvent: false, color: 'text-purple-400' },
    { day: 'TUE', date: 12, hasEvent: true, color: 'text-purple-400' },
    { day: 'WED', date: 13, hasEvent: false, color: 'text-purple-400' },
    { day: 'THU', date: 14, hasEvent: true, color: 'text-purple-400', isToday: true },
    { day: 'FRI', date: 15, hasEvent: false, color: 'text-orange-400' },
    { day: 'SAT', date: 16, hasEvent: true, color: 'text-orange-400' },
    { day: 'SUN', date: 17, hasEvent: false, color: 'text-orange-400' },
  ];

  // Drag and Drop Handlers
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragEnd = () => {
    if (draggedIndex !== null && dragOverIndex !== null && draggedIndex !== dragOverIndex) {
      const newCards = [...trackingCards];
      const [removed] = newCards.splice(draggedIndex, 1);
      newCards.splice(dragOverIndex, 0, removed);
      setTrackingCards(newCards);
      toast.success('Dashboard layout updated!');
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const toggleRearrangeMode = () => {
    setIsRearrangeMode(!isRearrangeMode);
    if (!isRearrangeMode) {
      toast.info('Drag & drop cards to rearrange');
    } else {
      toast.success('Layout saved!');
    }
  };

  const resetToDefault = () => {
    setTrackingCards(defaultCardOrder);
    localStorage.removeItem('dashboard-card-order');
    toast.success('Reset to default layout!');
  };

  // Handle opening log modal
  const handleCardClick = (cardId: string) => {
    if (isRearrangeMode) return; // Don't open modal in rearrange mode
    
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
    
    if (notificationSettings.soundEnabled) {
      playNotificationSound();
    }
  };

  // Play notification sound
  const playNotificationSound = () => {
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
              Dashboard
            </h1>

            {/* Settings & Notification Buttons */}
            <div className="flex gap-2">
              <button 
                onClick={() => setShowNotificationSettings(true)}
                className="w-10 h-10 rounded-full bg-purple-100 hover:bg-purple-200 flex items-center justify-center transition-colors relative"
              >
                <Bell className="w-5 h-5 text-purple-600" />
                {(notificationSettings.periodReminder || notificationSettings.ovulationAlert) && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>
              <button 
                onClick={() => onNavigate('settings')}
                className="w-10 h-10 rounded-full bg-purple-100 hover:bg-purple-200 flex items-center justify-center transition-colors"
              >
                <Settings className="w-5 h-5 text-purple-600" />
              </button>
            </div>
          </div>
          
          {/* Subtitle */}
          <p className="text-center text-xs text-gray-400 mt-2">
            Track your cycle with ease
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-6 py-6 pb-24">
        
        {/* Cycle Ring with Stats */}
        <div className="mb-6">
          <CyclePhaseRing 
            currentDay={cycleDay}
            totalDays={28}
            onDayClick={(day) => console.log('Day clicked:', day)}
          />
        </div>

        {/* Week Calendar Preview */}
        <div className="bg-white/90 rounded-3xl p-5 shadow-md mb-6 border border-purple-100/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-800">This Week</h2>
            <button 
              onClick={() => onNavigate('calendar')}
              className="text-sm text-purple-600 hover:text-purple-700"
            >
              View All
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day) => (
              <div 
                key={day.date} 
                className={`flex flex-col items-center p-2 rounded-xl transition-all ${
                  day.isToday 
                    ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-md' 
                    : 'bg-purple-50/50 hover:bg-purple-100/50'
                }`}
              >
                <span className={`text-xs mb-1 ${day.isToday ? 'text-white' : 'text-gray-500'}`}>
                  {day.day}
                </span>
                <span className={`${day.isToday ? 'text-white' : day.color}`}>
                  {day.date}
                </span>
                {day.hasEvent && !day.isToday && (
                  <div className="w-1 h-1 bg-purple-500 rounded-full mt-1"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Rearrange Mode Toggle */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-gray-800">Quick Tracking</h2>
          <div className="flex gap-2">
            {isRearrangeMode && (
              <button
                onClick={resetToDefault}
                className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            )}
            <button
              onClick={toggleRearrangeMode}
              className={`px-3 py-2 rounded-xl text-sm flex items-center gap-1 transition-all shadow-sm ${
                isRearrangeMode
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-purple-100 hover:bg-purple-200 text-purple-600'
              }`}
            >
              <GripVertical className="w-4 h-4" />
              {isRearrangeMode ? 'Done' : 'Rearrange'}
            </button>
          </div>
        </div>

        {/* Tracking Cards Grid */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {trackingCards.map((card, index) => {
            const isLogged = isCardLogged(card.id);
            const isDragging = draggedIndex === index;
            const isDragOver = dragOverIndex === index;
            
            return (
              <div
                key={card.id}
                draggable={isRearrangeMode}
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                onDragLeave={handleDragLeave}
                onClick={() => handleCardClick(card.id)}
                className={`
                  relative bg-white/90 rounded-2xl p-4 shadow-md hover:shadow-lg 
                  transition-all duration-200 flex flex-col items-center justify-center gap-2 
                  border-2 ${isDragOver ? 'border-purple-500 scale-105' : 'border-transparent'}
                  ${isDragging ? 'opacity-50 scale-95' : ''}
                  ${isRearrangeMode ? 'cursor-move' : 'cursor-pointer'}
                  ${isLogged ? 'ring-2 ring-green-400' : ''}
                `}
                style={{
                  minHeight: '100px',
                }}
              >
                {isRearrangeMode && (
                  <div className="absolute top-1 right-1">
                    <GripVertical className="w-4 h-4 text-gray-400" />
                  </div>
                )}
                
                {isLogged && (
                  <div className="absolute top-1 left-1 w-2 h-2 bg-green-400 rounded-full"></div>
                )}
                
                {card.icon}
                <span className={`text-xs text-center whitespace-pre-line ${card.color}`}>
                  {card.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Insights Section */}
        <div className="bg-white/90 rounded-3xl p-6 shadow-md border border-purple-100/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-800 flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-600" />
              Insights
            </h2>
            <button 
              onClick={() => onNavigate('insights')}
              className="text-sm text-purple-600 hover:text-purple-700"
            >
              View More
            </button>
          </div>

          <div className="space-y-4">
            {/* Insight Card 1 */}
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm text-gray-800 mb-1">Peak Fertility Today</h3>
                  <p className="text-xs text-gray-600">
                    You're in your ovulation window. Your chances of conception are highest during these 3 days.
                  </p>
                </div>
              </div>
            </div>

            {/* Insight Card 2 */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <Moon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm text-gray-800 mb-1">Sleep Pattern Detected</h3>
                  <p className="text-xs text-gray-600">
                    Your sleep quality tends to improve during the follicular phase. Average: 7.5 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-purple-200/50 shadow-2xl">
        <div className="max-w-md mx-auto px-6 py-3">
          <div className="flex items-center justify-around relative">
            {/* Dashboard */}
            <button
              onClick={() => setSelectedNav('dashboard')}
              className={`flex flex-col items-center gap-1 transition-colors ${
                selectedNav === 'dashboard' ? 'text-purple-600' : 'text-gray-400'
              }`}
            >
              <LayoutDashboard className="w-6 h-6" />
              <span className="text-xs">Dashboard</span>
            </button>

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

            {/* Amara AI - Center elevated button */}
            <AmaraNavButton
              onClick={() => {
                setSelectedNav('amara');
                onNavigate('amara-chat');
              }}
              className="relative -mt-8"
            />

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
          category={selectedCategory}
          onClose={() => setSelectedCategory(null)}
          onSave={handleSaveLog}
          existingLog={todayLogs[selectedCategory.id]}
        />
      )}

      {showNotificationSettings && (
        <NotificationSettingsModal
          isOpen={showNotificationSettings}
          onClose={() => setShowNotificationSettings(false)}
          settings={notificationSettings}
          onSave={setNotificationSettings}
        />
      )}
    </div>
  );
}