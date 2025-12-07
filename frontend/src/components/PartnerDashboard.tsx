import { useState } from 'react';
import { Heart, Calendar, TrendingUp, Sparkles, Settings, LogOut } from 'lucide-react@0.487.0';

interface PartnerDashboardProps {
  onLogout: () => void;
}

export function PartnerDashboard({ onLogout }: PartnerDashboardProps) {
  const [partnerName] = useState('Amara');
  const [cycleDay] = useState(14);
  const [phase] = useState('Ovulation');
  const [fertility] = useState('High');
  const [mood] = useState('Energetic & Social');
  const [dailyNote] = useState('Feeling energetic and social today! Great day for a date night.');
  const [upcomingPeriod] = useState(14);

  // Recent symptoms/moods
  const recentUpdates = [
    { date: 'Today', mood: '😊 Happy', symptoms: 'Mild bloating' },
    { date: 'Yesterday', mood: '😌 Calm', symptoms: 'None' },
    { date: 'Dec 12', mood: '😴 Tired', symptoms: 'Headache' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-200/50 shadow-sm">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white shadow-md">
                <span>A</span>
              </div>
              <div>
                <h1 className="text-gray-800">{partnerName}'s Updates</h1>
                <p className="text-xs text-gray-500">Updated just now</p>
              </div>
            </div>
            <button 
              onClick={onLogout}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors shadow-sm"
            >
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-8 space-y-6">
        {/* Main Status Card */}
        <div className="bg-white/90 rounded-3xl p-6 shadow-lg border border-purple-200/50">
          {/* Cycle Day */}
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-200 via-pink-200 to-purple-300 p-1.5 shadow-lg">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 flex flex-col items-center justify-center text-white">
                <p className="text-xs uppercase tracking-wide mb-1">{phase}</p>
                <p className="text-3xl">Day {cycleDay}</p>
              </div>
            </div>
          </div>

          {/* Phase and Fertility */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-purple-50 rounded-2xl p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">Current Phase</p>
              <p className="text-purple-600">{phase}</p>
            </div>
            <div className="bg-orange-50 rounded-2xl p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">Fertility</p>
              <p className="text-orange-500">{fertility}</p>
            </div>
          </div>

          {/* Mood */}
          <div className="bg-blue-50 rounded-2xl p-4 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-1">Today's Mood</p>
                <p className="text-blue-600">{mood}</p>
              </div>
              <Heart className="w-6 h-6 text-blue-400" />
            </div>
          </div>

          {/* Daily Note */}
          {dailyNote && (
            <div className="bg-pink-50 rounded-2xl p-4">
              <p className="text-xs text-pink-400 mb-2">DAILY NOTE</p>
              <p className="text-sm text-gray-700 italic">"{dailyNote}"</p>
            </div>
          )}
        </div>

        {/* Upcoming Period */}
        <div className="bg-white/90 rounded-3xl p-6 shadow-lg border border-purple-200/50">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-gray-800 mb-1 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-500" />
                Next Period
              </h3>
              <p className="text-sm text-gray-600">Expected in {upcomingPeriod} days</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-lg text-purple-600">{upcomingPeriod}</span>
            </div>
          </div>
        </div>

        {/* Recent Updates */}
        <div className="bg-white/90 rounded-3xl p-6 shadow-lg border border-purple-200/50">
          <h3 className="text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-500" />
            Recent Updates
          </h3>
          <div className="space-y-3">
            {recentUpdates.map((update, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500">{update.date}</span>
                  <span className="text-sm">{update.mood}</span>
                </div>
                <p className="text-sm text-gray-600">
                  Symptoms: {update.symptoms}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Amara Tips for Partner */}
        <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-6 border border-purple-200/50 shadow-lg">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white flex-shrink-0 shadow-md">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-800 mb-2">Partner Tip</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                During ovulation, energy levels are typically high! This is a great time for activities together. Be supportive and understanding of any mood changes.
              </p>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 text-gray-500 hover:text-gray-700 py-3 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm">Sign Out</span>
        </button>
      </div>
    </div>
  );
}