import React, { useState, useMemo } from 'react';
import { Calendar, Heart, Activity, Bell, User, Plus, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import CalendarView from '../components/CalendarView';
import SymptomTracker from '../components/SymptomTracker';
import InsightsPanel from '../components/InsightsPanel';
import CycleInfo from '../components/CycleInfo';
import { mockUser, mockCycleData } from '../mockData';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [showSymptomTracker, setShowSymptomTracker] = useState(false);

  const cyclePhase = useMemo(() => {
    const today = new Date();
    const lastPeriod = new Date(mockUser.lastPeriodStart);
    const daysSinceLastPeriod = Math.floor((today - lastPeriod) / (1000 * 60 * 60 * 24));
    
    // Calculate current cycle day (wraps around based on cycle length)
    const cycleDay = ((daysSinceLastPeriod % mockUser.cycleLength) + 1);
    
    if (cycleDay <= mockUser.periodLength) {
      return { phase: 'period', day: cycleDay, color: 'from-red-400 to-pink-500' };
    } else if (cycleDay > 10 && cycleDay <= 16) {
      return { phase: 'fertile', day: cycleDay, color: 'from-purple-400 to-pink-400' };
    } else if (cycleDay > 16 && cycleDay <= 24) {
      return { phase: 'luteal', day: cycleDay, color: 'from-blue-400 to-purple-400' };
    } else {
      return { phase: 'follicular', day: cycleDay, color: 'from-teal-400 to-blue-400' };
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" fill="white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Flo
            </h1>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full"></span>
            </Button>
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5 text-gray-600" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 pb-24">
        {/* Today's Overview */}
        <div className="mb-6">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-white/90 to-pink-50/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Today</p>
                  <h2 className="text-3xl font-bold capitalize bg-gradient-to-r {cyclePhase.color} bg-clip-text text-transparent">
                    {cyclePhase.phase} Phase
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">Day {cyclePhase.day} of your cycle</p>
                </div>
                <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${cyclePhase.color} flex items-center justify-center shadow-lg`}>
                  <span className="text-white text-2xl font-bold">{cyclePhase.day}</span>
                </div>
              </div>
              
              <div className="flex space-x-2 mt-4">
                <Button 
                  className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-md"
                  onClick={() => setShowSymptomTracker(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Log Symptoms
                </Button>
                <Button variant="outline" className="border-pink-300 text-pink-600 hover:bg-pink-50">
                  <TrendingUp className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          {['today', 'calendar', 'insights', 'cycle'].map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? 'default' : 'ghost'}
              className={activeTab === tab ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white' : 'text-gray-600'}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Button>
          ))}
        </div>

        {/* Content Based on Active Tab */}
        <div className="space-y-6">
          {activeTab === 'today' && (
            <>
              <CycleInfo cyclePhase={cyclePhase} />
              <InsightsPanel />
            </>
          )}
          
          {activeTab === 'calendar' && <CalendarView />}
          
          {activeTab === 'insights' && (
            <div className="space-y-4">
              <InsightsPanel expanded />
            </div>
          )}
          
          {activeTab === 'cycle' && (
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Cycle Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-pink-50 rounded-lg">
                    <span className="text-gray-700">Average Cycle Length</span>
                    <span className="font-bold text-pink-600">{mockUser.cycleLength} days</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                    <span className="text-gray-700">Period Length</span>
                    <span className="font-bold text-purple-600">{mockUser.periodLength} days</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                    <span className="text-gray-700">Next Period</span>
                    <span className="font-bold text-blue-600">In 15 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Symptom Tracker Modal */}
      {showSymptomTracker && (
        <SymptomTracker onClose={() => setShowSymptomTracker(false)} />
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-pink-100 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-around items-center">
            <button className="flex flex-col items-center space-y-1 text-pink-600">
              <Calendar className="w-6 h-6" />
              <span className="text-xs font-medium">Home</span>
            </button>
            <button className="flex flex-col items-center space-y-1 text-gray-400 hover:text-pink-600 transition-colors">
              <Heart className="w-6 h-6" />
              <span className="text-xs">Health</span>
            </button>
            <button className="flex flex-col items-center space-y-1 text-gray-400 hover:text-pink-600 transition-colors">
              <Activity className="w-6 h-6" />
              <span className="text-xs">Insights</span>
            </button>
            <button className="flex flex-col items-center space-y-1 text-gray-400 hover:text-pink-600 transition-colors">
              <User className="w-6 h-6" />
              <span className="text-xs">Profile</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default HomePage;
