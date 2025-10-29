import React, { useState, useMemo } from 'react';
import { Plus, TrendingUp, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import SymptomTracker from '../components/SymptomTracker';
import InsightsPanel from '../components/InsightsPanel';
import CycleInfo from '../components/CycleInfo';
import { mockUser } from '../mockData';

const HomePage = () => {
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
    <div className="space-y-6">
      {/* Today's Overview */}
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
            <Button 
              variant="outline" 
              className="border-purple-300 text-purple-600 hover:bg-purple-50"
            >
              <TrendingUp className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Cycle Info & Quick Actions */}
      <CycleInfo cyclePhase={cyclePhase} />

      {/* Insights */}
      <InsightsPanel />

      {/* Symptom Tracker Modal */}
      {showSymptomTracker && (
        <SymptomTracker onClose={() => setShowSymptomTracker(false)} />
      )}
    </div>
  );
};

export default HomePage;
