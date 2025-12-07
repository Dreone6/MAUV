import { ArrowLeft, ChevronLeft, ChevronRight, BarChart3, TrendingUp, Info } from 'lucide-react@0.487.0';
import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface HealthTrackerScreenProps {
  onBack: () => void;
}

type ViewMode = 'bar' | 'line';
type TabMode = 'log' | 'health';

export function HealthTrackerScreen({ onBack }: HealthTrackerScreenProps) {
  const [activeTab, setActiveTab] = useState<TabMode>('health');
  const [weightView, setWeightView] = useState<ViewMode>('bar');
  const [temperatureView, setTemperatureView] = useState<ViewMode>('bar');
  const [waterView, setWaterView] = useState<ViewMode>('bar');

  // Sample data for charts
  const weightData = [
    { day: '13', value: 63.5, label: 'Mon' },
    { day: '14', value: 63.2, label: 'Tue' },
    { day: '15', value: 63.0, label: 'Wed' },
    { day: '16', value: 62.8, label: 'Thu' },
    { day: '17', value: 62.7, label: 'Fri' },
    { day: '18', value: 62.9, label: 'Sat' },
    { day: '19', value: 63.1, label: 'Sun' },
  ];

  const temperatureData = [
    { day: '13', value: 36.8, label: 'Mon' },
    { day: '14', value: 36.7, label: 'Tue' },
    { day: '15', value: 36.9, label: 'Wed' },
    { day: '16', value: 36.6, label: 'Thu' },
    { day: '17', value: 36.8, label: 'Fri' },
    { day: '18', value: 36.7, label: 'Sat' },
    { day: '19', value: 36.5, label: 'Sun' },
  ];

  const waterData = [
    { day: '13', value: 1.8, label: 'Mon' },
    { day: '14', value: 2.1, label: 'Tue' },
    { day: '15', value: 1.6, label: 'Wed' },
    { day: '16', value: 2.3, label: 'Thu' },
    { day: '17', value: 1.9, label: 'Fri' },
    { day: '18', value: 2.4, label: 'Sat' },
    { day: '19', value: 1.2, label: 'Sun' },
  ];

  const bmiCategories = [
    { label: 'Very severely underweight', range: 'BMI < 15.0', color: '#10b981', dotColor: '#10b981' },
    { label: 'Severely underweight', range: 'BMI 15.0 - 16.9', color: '#10b981', dotColor: '#10b981' },
    { label: 'Underweight', range: 'BMI 17.0 - 18.4', color: '#10b981', dotColor: '#10b981' },
    { label: 'Normal', range: 'BMI 18.5 - 24.9', color: '#10b981', dotColor: '#10b981' },
    { label: 'Overweight', range: 'BMI 25.0 - 29.9', color: '#fbbf24', dotColor: '#fbbf24' },
    { label: 'Obese Class I', range: 'BMI 30.0 - 34.9', color: '#fb923c', dotColor: '#fb923c' },
    { label: 'Obese Class II', range: 'BMI 35.0 - 39.9', color: '#f87171', dotColor: '#f87171' },
    { label: 'Obese Class III', range: 'BMI ≥ 40.0', color: '#ef4444', dotColor: '#ef4444' },
  ];

  const currentBMI = 22.0;
  const bmiPercentage = ((currentBMI - 15) / (40 - 15)) * 100;

  return (
    <div className="min-h-screen bg-[#1e3a5f] pb-20">
      {/* Header */}
      <div className="px-6 pt-12 pb-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-xl text-white">Tracker</h1>
          <button className="w-10 h-10 rounded-full flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-white"></div>
            <div className="w-1 h-1 rounded-full bg-white ml-1"></div>
            <div className="w-1 h-1 rounded-full bg-white ml-1"></div>
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('log')}
            className={`flex-1 py-3 rounded-full transition-all ${
              activeTab === 'log'
                ? 'bg-white/20 text-white'
                : 'bg-white/5 text-white/60'
            }`}
          >
            Log Count
          </button>
          <button
            onClick={() => setActiveTab('health')}
            className={`flex-1 py-3 rounded-full transition-all ${
              activeTab === 'health'
                ? 'bg-gradient-to-r from-pink-400 to-pink-500 text-white'
                : 'bg-white/5 text-white/60'
            }`}
          >
            Health
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Weight Tracker */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-gray-900">Weight (kg)</h3>
              <span className="px-2 py-0.5 bg-green-500 text-white text-xs rounded">63</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setWeightView('bar')}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                  weightView === 'bar' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setWeightView('line')}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                  weightView === 'line' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Date Range */}
          <div className="flex items-center justify-between mb-4">
            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <span className="text-gray-600 text-sm">Aug 13 - Aug 19, 2024</span>
            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Chart */}
          <div className="h-48">
            {weightView === 'bar' ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weightData}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} domain={[60, 65]} />
                  <Bar dataKey="value" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weightData}>
                  <defs>
                    <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} domain={[60, 65]} />
                  <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} fill="url(#weightGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* BMI Tracker */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <h3 className="text-gray-900">BMI</h3>
              <span className="px-2 py-0.5 bg-green-500 text-white text-xs rounded">Normal</span>
            </div>
          </div>

          {/* BMI Gauge */}
          <div className="flex justify-center mb-6">
            <div className="relative w-48 h-48">
              {/* Background Circle */}
              <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="20"
                  strokeDasharray="251.2"
                  strokeDashoffset="0"
                />
                {/* Gradient Arc */}
                <defs>
                  <linearGradient id="bmiGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="50%" stopColor="#fbbf24" />
                    <stop offset="75%" stopColor="#fb923c" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                </defs>
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="url(#bmiGradient)"
                  strokeWidth="20"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * bmiPercentage) / 100}
                  strokeLinecap="round"
                />
              </svg>
              {/* Center Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-3xl text-gray-900">{currentBMI}</div>
                <div className="text-sm text-gray-500">22 (kg/m2)</div>
              </div>
            </div>
          </div>

          {/* BMI Categories */}
          <div className="space-y-2">
            {bmiCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full`} style={{ backgroundColor: category.dotColor }}></div>
                  <span className="text-gray-700">{category.label}</span>
                </div>
                <span className="text-gray-500">{category.range}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Temperature Tracker */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-gray-900">Temperature (°C)</h3>
              <span className="px-2 py-0.5 bg-orange-500 text-white text-xs rounded">37</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTemperatureView('bar')}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                  temperatureView === 'bar' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-400'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTemperatureView('line')}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                  temperatureView === 'line' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-400'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Date Range */}
          <div className="flex items-center justify-between mb-4">
            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <span className="text-gray-600 text-sm">Aug 13 - Aug 19, 2024</span>
            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Chart */}
          <div className="h-48">
            {temperatureView === 'bar' ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={temperatureData}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} domain={[36, 38]} />
                  <Bar dataKey="value" fill="#fb923c" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={temperatureData}>
                  <defs>
                    <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#fb923c" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#fb923c" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} domain={[36, 38]} />
                  <Area type="monotone" dataKey="value" stroke="#fb923c" strokeWidth={3} fill="url(#tempGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Water Tracker */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-gray-900">Water (mL)</h3>
              <span className="px-2 py-0.5 bg-blue-500 text-white text-xs rounded">2L</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setWaterView('bar')}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                  waterView === 'bar' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setWaterView('line')}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                  waterView === 'line' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Date Range */}
          <div className="flex items-center justify-between mb-4">
            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <span className="text-gray-600 text-sm">Aug 13 - Aug 19, 2024</span>
            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Chart */}
          <div className="h-48">
            {waterView === 'bar' ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={waterData}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} domain={[0, 3]} />
                  <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={waterData}>
                  <defs>
                    <linearGradient id="waterGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} domain={[0, 3]} />
                  <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fill="url(#waterGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Water Info */}
          <div className="mt-4 p-3 bg-blue-50 rounded-xl flex items-start gap-2">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-700">
              <p className="mb-1">Staying hydrated is essential for your overall health and well-being.</p>
              <p>Aim for 2-3 liters of water daily, more if you're active or in hot weather.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}