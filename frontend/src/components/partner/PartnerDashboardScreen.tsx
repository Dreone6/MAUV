import { Calendar, Heart, Moon, Sun, Sunrise, AlertCircle, TrendingUp, Activity, MessageCircle, Droplet, Settings } from 'lucide-react@0.487.0';
import { useState } from 'react';
import mauvLogo from 'figma:asset/6ef1ddd1de4618a9d43c80d42ea305e9848fbf52.png';

interface PartnerDashboardScreenProps {
  onSettings: () => void;
  onEducation: () => void;
}

export function PartnerDashboardScreen({ onSettings, onEducation }: PartnerDashboardScreenProps) {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'insights'>('overview');

  // Mock data
  const partnerName = "Sarah";
  const currentPhase = "Follicular";
  const daysUntilPeriod = 12;
  const fertilityStatus = "Fertile Window";
  const cycleDay = 14;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-fuchsia-50 text-gray-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white p-6 pb-32 rounded-b-[3rem] shadow-2xl">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <img src={mauvLogo} alt="MAUV Logo" className="h-10" />
            </div>
            <button
              onClick={onSettings}
              className="p-2 hover:bg-white/20 rounded-full transition-all duration-300"
            >
              <Settings className="w-6 h-6" />
            </button>
          </div>

          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-8 h-8 fill-white" />
            <h1 className="text-3xl">Partner Dashboard</h1>
          </div>
          <p className="text-pink-100">
            Supporting {partnerName} through her cycle
          </p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 -mt-24 pb-8">
        {/* Cycle Overview Card */}
        <div className="bg-white rounded-3xl p-6 shadow-xl mb-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-fuchsia-100 to-pink-100 rounded-full mb-4">
              <Droplet className="w-4 h-4 text-fuchsia-600" />
              <span className="text-sm text-fuchsia-700">Day {cycleDay} of Cycle</span>
            </div>
            
            <h2 className="text-2xl text-gray-900 mb-2">{currentPhase} Phase</h2>
            <p className="text-gray-600">
              Period expected in {daysUntilPeriod} days
            </p>
          </div>

          {/* Cycle Ring */}
          <div className="flex justify-center mb-6">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#fce7f3"
                  strokeWidth="16"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="url(#cycleGradient)"
                  strokeWidth="16"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 80 * (cycleDay / 28)} ${2 * Math.PI * 80}`}
                />
                <defs>
                  <linearGradient id="cycleGradient" x1="0%" y1="0%" x2="100%\" y2="0%">
                    <stop offset="0%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#d946ef" />
                  </linearGradient>
                </defs>
              </svg>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-4xl text-gray-900">{cycleDay}</p>
                <p className="text-gray-500">of 28</p>
              </div>
            </div>
          </div>

          {/* Fertility Status */}
          <div className="bg-gradient-to-r from-pink-50 to-fuchsia-50 rounded-2xl p-4 border-2 border-pink-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-fuchsia-500 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white fill-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Fertility Status</p>
                  <p className="text-lg text-gray-900">{fertilityStatus}</p>
                </div>
              </div>
              <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setSelectedTab('overview')}
            className={`flex-1 py-3 px-4 rounded-full transition-all duration-300 shadow-md ${
              selectedTab === 'overview'
                ? 'bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setSelectedTab('insights')}
            className={`flex-1 py-3 px-4 rounded-full transition-all duration-300 shadow-md ${
              selectedTab === 'insights'
                ? 'bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Insights
          </button>
        </div>

        {selectedTab === 'overview' && (
          <div className="space-y-4">
            {/* Phase Info Card */}
            <div className="bg-white rounded-2xl p-5 shadow-lg">
              <h3 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
                <Sunrise className="w-5 h-5 text-fuchsia-500" />
                What to Expect
              </h3>
              <div className="space-y-3 text-gray-600">
                <div className="flex gap-3">
                  <span className="text-fuchsia-500">•</span>
                  <p>Energy levels are rising during this phase</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-fuchsia-500">•</span>
                  <p>Social and communicative mood</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-fuchsia-500">•</span>
                  <p>Good time for new activities and planning</p>
                </div>
              </div>
            </div>

            {/* Support Tips */}
            <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-2xl p-5 shadow-lg border border-purple-100">
              <h3 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-fuchsia-500" />
                How to Support
              </h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex gap-3">
                  <span className="text-fuchsia-500">💪</span>
                  <p>Great time for active dates and adventures</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-fuchsia-500">🗣️</span>
                  <p>Engage in meaningful conversations</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-fuchsia-500">🎉</span>
                  <p>Plan social activities together</p>
                </div>
              </div>
            </div>

            {/* Recent Symptoms */}
            <div className="bg-white rounded-2xl p-5 shadow-lg">
              <h3 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-fuchsia-500" />
                Recent Notes
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-700">Energy Level</span>
                  <span className="text-fuchsia-600">High</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-700">Mood</span>
                  <span className="text-fuchsia-600">Positive</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'insights' && (
          <div className="space-y-4">
            {/* Cycle Patterns */}
            <div className="bg-white rounded-2xl p-5 shadow-lg">
              <h3 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-fuchsia-500" />
                Cycle Patterns
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Average Cycle Length</span>
                    <span className="text-gray-900">28 days</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-fuchsia-500 to-pink-500 h-2 rounded-full" style={{ width: '90%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Cycle Regularity</span>
                    <span className="text-gray-900">Very Regular</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-fuchsia-500 to-pink-500 h-2 rounded-full" style={{ width: '95%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Summary */}
            <div className="bg-white rounded-2xl p-5 shadow-lg">
              <h3 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-fuchsia-500" />
                This Month
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-fuchsia-50 rounded-xl p-4 text-center">
                  <p className="text-2xl text-fuchsia-600 mb-1">12</p>
                  <p className="text-sm text-gray-600">Good Days</p>
                </div>
                <div className="bg-pink-50 rounded-xl p-4 text-center">
                  <p className="text-2xl text-pink-600 mb-1">5</p>
                  <p className="text-sm text-gray-600">Period Days</p>
                </div>
              </div>
            </div>

            {/* Education CTA */}
            <button
              onClick={onEducation}
              className="w-full bg-gradient-to-br from-purple-50 to-fuchsia-50 border-2 border-fuchsia-200 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-fuchsia-400 to-pink-500 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-gray-900">Learn More</p>
                    <p className="text-sm text-gray-600">Understanding her cycle</p>
                  </div>
                </div>
                <span className="text-fuchsia-500">→</span>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
