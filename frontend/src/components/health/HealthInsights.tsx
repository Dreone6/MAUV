import { useState, useEffect, useMemo } from 'react';
import {
  ArrowLeft,
  LayoutDashboard,
  Calendar,
  MessageCircle,
  Users,
  Heart,
  Settings,
  TrendingUp,
  TrendingDown,
  Activity,
  Droplet,
  Thermometer,
  Moon,
  Star,
  Clock,
  Brain,
  Frown,
  Cloud,
  Leaf,
  Sunrise,
  Sun,
  Search,
  ChevronRight,
  Play,
  Flower2,
} from 'lucide-react@0.487.0';
import { FloatingBackground } from '../shared/FloatingBackground';
import { BottomNav } from '../shared/BottomNav';
import { HistoricalLogs, CycleData } from '../types';
import {
  predictNextPeriod,
  calculateCycleDay,
  calculateFertileWindow,
  analyzeSymptomPatterns,
  getLoggingStreak,
  formatDate,
} from '../utils/healthAnalytics';

// CircularProgress Component
interface CircularProgressProps {
  percentage: number;
  size: number;
  strokeWidth: number;
  color: string;
  label: string;
  value: string;
  subtext: string;
  delay: number;
}

function CircularProgress({
  percentage,
  size,
  strokeWidth,
  color,
  label,
  value,
  subtext,
  delay,
}: CircularProgressProps) {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage);
    }, delay);
    return () => clearTimeout(timer);
  }, [percentage, delay]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedPercentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-lg text-gray-800">{value}</p>
          <p className="text-xs text-gray-500">{subtext}</p>
        </div>
      </div>
      <p className="text-xs text-gray-600 mt-2 text-center">{label}</p>
    </div>
  );
}

interface HealthInsightsProps {
  onBack: () => void;
  onNavigate: (screen: 'calendar' | 'amara-chat' | 'tribal-chat' | 'partner-link') => void;
  historicalLogs: HistoricalLogs;
  cycleData: CycleData;
}

export function HealthInsights({ onBack, onNavigate, historicalLogs, cycleData }: HealthInsightsProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate real cycle data from user logs
  const realCycleData = useMemo(() => {
    const nextPeriod = predictNextPeriod(cycleData);
    const cycleDay = calculateCycleDay(cycleData);
    const fertileDates = calculateFertileWindow(cycleData);
    
    // Format next period date
    const nextPeriodFormatted = nextPeriod.date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
    });
    
    return {
      averageCycleLength: cycleData.averageCycleLength || 28,
      periodLength: cycleData.periodLength || 5,
      nextPeriodDate: nextPeriodFormatted,
      daysUntilPeriod: nextPeriod.daysUntil,
      cycleDay,
      fertileDates,
    };
  }, [cycleData]);

  // Calculate fertile week for display
  const fertileWeek = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const week = [];
    for (let i = -2; i <= 2; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      
      const isFertile = realCycleData.fertileDates.some(
        fertileDate => formatDate(fertileDate) === formatDate(date)
      );
      
      const isPeak = isFertile && i === 0;
      
      week.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
        date: date.getDate(),
        isFertile,
        isPeak,
      });
    }
    
    return week;
  }, [realCycleData.fertileDates]);

  // Analyze symptom patterns from real data
  const symptomTrends = useMemo(() => {
    const patterns = analyzeSymptomPatterns(historicalLogs, cycleData);
    
    if (patterns.length === 0) {
      // Default patterns if no data
      return [
        {
          name: 'No Symptoms Logged',
          description: 'Start logging symptoms to see personalized patterns',
          icon: <Frown className="w-6 h-6 text-gray-400" />,
          color: 'from-gray-100 to-gray-200',
          textColor: 'text-gray-600',
        },
      ];
    }
    
    // Map patterns to UI elements
    const iconMap: { [key: string]: any } = {
      'Cramps': <Frown className="w-6 h-6 text-orange-600" />,
      'Mood Swings': <Cloud className="w-6 h-6 text-purple-600" />,
      'Headache': <Frown className="w-6 h-6 text-red-600" />,
      'Bloating': <Cloud className="w-6 h-6 text-blue-600" />,
      'Fatigue': <Cloud className="w-6 h-6 text-gray-600" />,
    };
    
    const colorMap: { [key: string]: string } = {
      'Cramps': 'from-orange-100 to-orange-200',
      'Mood Swings': 'from-purple-100 to-purple-200',
      'Headache': 'from-red-100 to-red-200',
      'Bloating': 'from-blue-100 to-blue-200',
      'Fatigue': 'from-gray-100 to-gray-200',
    };
    
    const textColorMap: { [key: string]: string } = {
      'Cramps': 'text-orange-700',
      'Mood Swings': 'text-purple-700',
      'Headache': 'text-red-700',
      'Bloating': 'text-blue-700',
      'Fatigue': 'text-gray-700',
    };
    
    return patterns.slice(0, 2).map(pattern => ({
      name: pattern.name,
      description: pattern.description,
      icon: iconMap[pattern.name] || <Frown className="w-6 h-6 text-gray-600" />,
      color: colorMap[pattern.name] || 'from-gray-100 to-gray-200',
      textColor: textColorMap[pattern.name] || 'text-gray-700',
    }));
  }, [historicalLogs, cycleData]);

  // Calculate logging streak
  const loggingStreak = useMemo(() => getLoggingStreak(historicalLogs), [historicalLogs]);

  // Resource categories
  const categories = [
    { name: 'Menstrual Health', icon: <Heart className="w-8 h-8" />, color: 'from-pink-200 to-pink-300', textColor: 'text-pink-700' },
    { name: 'Fertility', icon: <Leaf className="w-8 h-8" />, color: 'from-teal-200 to-teal-300', textColor: 'text-teal-700' },
    { name: 'Menopause', icon: <Sunrise className="w-8 h-8" />, color: 'from-orange-200 to-orange-300', textColor: 'text-orange-700' },
    { name: 'Wellness', icon: <Sun className="w-8 h-8" />, color: 'from-gray-200 to-gray-300', textColor: 'text-gray-700' },
  ];

  // Featured articles
  const featuredArticles = [
    {
      category: 'MENSTRUAL HEALTH',
      title: 'Understanding Your Luteal Phase',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1690087938677-a2b27fe32270?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwbG90dXMlMjBmbG93ZXJ8ZW58MXx8fHwxNzY0NzM0NzUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      color: 'from-pink-400 to-pink-500',
    },
    {
      category: 'FERTILITY',
      title: 'Foods That Can Boost Your Fertility',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1651352650142-385087834d9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZm9vZCUyMHNhbGFkfGVufDF8fHx8MTc2NDcxNDIwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      color: 'from-teal-400 to-teal-500',
    },
    {
      category: 'WELLNESS',
      title: 'Exercise During Your Cycle',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1525296416200-59aaed194d0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGV4ZXJjaXNpbmclMjBmaXRuZXNzfGVufDF8fHx8MTc2NDczNDc1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      color: 'from-purple-400 to-purple-500',
    },
  ];

  // Videos
  const videos = [
    {
      title: 'Guided Meditation for Cramp Relief',
      duration: '12 min',
      thumbnail: 'https://images.unsplash.com/photo-1655943508401-5f1e2cce820e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMG1lZGl0YXRpb24lMjB5b2RhfGVufDF8fHx8MTc2NDczNDc1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      color: 'from-indigo-400 to-indigo-500',
    },
    {
      title: 'Expert Talk: Navigating Perimenopause',
      duration: '18 min',
      thumbnail: 'https://images.unsplash.com/photo-1576669801945-7a346954da5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBkb2N0b3IlMjBoZWFsdGhjYXJlfGVufDF8fHx8MTc2NDY2MDEwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      color: 'from-purple-400 to-purple-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-200/50 sticky top-0 z-10 shadow-sm">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors shadow-sm"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Insights
              </h1>
              <p className="text-sm text-gray-500">Your health at a glance</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 pb-24 space-y-6">
        {/* Your Cycle at a Glance */}
        <div className="bg-white rounded-3xl p-6 border border-purple-200/50 shadow-lg">
          <h2 className="text-lg text-gray-800 mb-4">Your Cycle at a Glance</h2>
          <p className="text-sm text-gray-500 mb-6">Based on your recent logs. Here's what we're seeing.</p>

          {/* Cycle Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <CircularProgress
              percentage={(realCycleData.cycleDay / realCycleData.averageCycleLength) * 100}
              size={100}
              strokeWidth={8}
              color="#9333ea"
              label="Current Cycle Day"
              value={`Day ${realCycleData.cycleDay}`}
              subtext={`of ${realCycleData.averageCycleLength}`}
              delay={200}
            />
            <CircularProgress
              percentage={Math.max(0, (1 - realCycleData.daysUntilPeriod / realCycleData.averageCycleLength) * 100)}
              size={100}
              strokeWidth={8}
              color="#ec4899"
              label="Period Countdown"
              value={`${realCycleData.daysUntilPeriod}`}
              subtext="days left"
              delay={400}
            />
          </div>

          {/* Next Period Prediction */}
          <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl mb-6 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center text-white flex-shrink-0 shadow-md">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700 mb-1">Next Period Prediction</p>
                <p className="text-lg text-blue-600">{realCycleData.nextPeriodDate}</p>
                <p className="text-xs text-gray-600 mt-1">
                  Your cycle is likely to begin in {realCycleData.daysUntilPeriod} days
                </p>
              </div>
            </div>
          </div>

          {/* Fertility Window */}
          <div className="p-5 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-white shadow-md">
                <Flower2 className="w-4 h-4" />
              </div>
              <h3 className="text-sm text-gray-800">Fertility Window</h3>
            </div>
            <p className="text-xs text-gray-600 mb-4">Your most fertile days are approaching</p>
            
            {/* Fertile Days Calendar */}
            <div className="flex gap-2 justify-between mb-3">
              {fertileWeek.map((day, idx) => (
                <div
                  key={idx}
                  className={`flex-1 rounded-xl p-2 text-center transition-all ${
                    day.isFertile
                      ? day.isPeak
                        ? 'bg-teal-500 text-white shadow-md scale-105'
                        : 'bg-teal-300 text-white shadow-sm'
                      : 'bg-white/50'
                  }`}
                >
                  <p className={`text-xs mb-1 ${day.isFertile ? 'text-white/90' : 'text-gray-500'}`}>
                    {day.day}
                  </p>
                  <p className={`text-base ${day.isFertile ? '' : 'text-gray-600'}`}>
                    {day.date}
                  </p>
                </div>
              ))}
            </div>
            
            <p className="text-xs text-gray-600 leading-relaxed">
              Based on when you last logged your period, fertile excitement around{' '}
              <span className="text-teal-700">October 2nd</span>. This is when you ovulate; log symptoms for more accuracy.
            </p>
          </div>
        </div>

        {/* Symptom Trends */}
        <div className="bg-white rounded-3xl p-6 border border-purple-200/50 shadow-lg">
          <h2 className="text-lg text-gray-800 mb-2">Symptom Trends</h2>
          <p className="text-sm text-gray-500 mb-4">
            Here's a snapshot of how you feel throughout your cycle.
          </p>

          <div className="space-y-3">
            {symptomTrends.map((symptom, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl bg-gradient-to-br ${symptom.color} shadow-sm`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/60 flex items-center justify-center flex-shrink-0">
                    {symptom.icon}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm mb-1 ${symptom.textColor}`}>{symptom.name}</p>
                    <p className="text-xs text-gray-600">{symptom.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 py-3 rounded-xl text-sm text-purple-600 hover:text-purple-700 flex items-center justify-center gap-1 transition-colors">
            Explore All Trends
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Resource Library */}
        <div className="bg-white rounded-3xl p-6 border border-purple-200/50 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg text-gray-800">Resource Library</h2>
            <button className="text-sm text-purple-600 hover:text-purple-700">
              See All
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles, videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all shadow-sm"
            />
          </div>

          {/* Categories */}
          <div className="mb-6">
            <h3 className="text-sm text-gray-700 mb-3">Categories</h3>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category, idx) => (
                <button
                  key={idx}
                  className={`p-4 rounded-2xl bg-gradient-to-br ${category.color} hover:scale-105 transition-transform shadow-md active:scale-95 flex flex-col items-center justify-center`}
                >
                  <div className={`mb-2 ${category.textColor}`}>{category.icon}</div>
                  <p className={`text-sm ${category.textColor}`}>{category.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Featured Articles */}
          <div className="mb-6">
            <h3 className="text-sm text-gray-700 mb-3">Featured Articles</h3>
            <div className="space-y-3">
              {featuredArticles.map((article, idx) => (
                <button
                  key={idx}
                  className="w-full p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors shadow-sm border border-gray-100 flex items-start gap-4"
                >
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${article.color} flex items-center justify-center text-3xl flex-shrink-0 shadow-md`}>
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-xs text-purple-600 mb-1">{article.category}</p>
                    <p className="text-sm text-gray-800 mb-1">{article.title}</p>
                    <p className="text-xs text-gray-500">{article.readTime}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Watch & Learn */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm text-gray-700">Watch & Learn</h3>
              <button className="text-sm text-purple-600 hover:text-purple-700">
                See All
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {videos.map((video, idx) => (
                <button
                  key={idx}
                  className="relative group"
                >
                  <div className={`aspect-video rounded-2xl bg-gradient-to-br ${video.color} flex items-center justify-center text-5xl shadow-md overflow-hidden`}>
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 text-purple-600 ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-700 mt-2 text-left">{video.title}</p>
                  <p className="text-xs text-gray-500 text-left">{video.duration}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom spacing for nav */}
        <div className="h-4" />
      </div>

      {/* Bottom Navigation */}
      <BottomNav
        onNavigate={onNavigate}
        currentScreen="insights"
      />
    </div>
  );
}