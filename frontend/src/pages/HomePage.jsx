import React, { useState, useMemo, useEffect } from 'react';
import { Plus, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import SymptomTracker from '../components/SymptomTracker';
import InsightsPanel from '../components/InsightsPanel';
import CycleInfo from '../components/CycleInfo';
import { getCycleSettings, getSymptomLog } from '../services/dataService';

const HomePage = () => {
  const [showSymptomTracker, setShowSymptomTracker] = useState(false);
  const [cycleSettings, setCycleSettings] = useState(null);
  const [todayLog, setTodayLog] = useState(null);

  useEffect(() => {
    // Load real data from IndexedDB
    const loadData = async () => {
      const settings = await getCycleSettings();
      setCycleSettings(settings);

      const today = new Date().toISOString().split('T')[0];
      const log = await getSymptomLog(today);
      setTodayLog(log);
    };
    loadData();
  }, []);

  const cyclePhase = useMemo(() => {
    if (!cycleSettings || !cycleSettings.lastPeriodStart) {
      return { phase: 'unknown', day: 0, color: 'from-gray-400 to-gray-500' };
    }

    const today = new Date();
    const lastPeriod = new Date(cycleSettings.lastPeriodStart);
    const daysSinceLastPeriod = Math.floor((today - lastPeriod) / (1000 * 60 * 60 * 24));
    
    // Calculate current cycle day (wraps around based on cycle length)
    const cycleDay = ((daysSinceLastPeriod % cycleSettings.cycleLength) + 1);
    
    if (cycleDay <= cycleSettings.periodLength) {
      return { phase: 'period', day: cycleDay, color: 'from-red-400 to-pink-500' };
    } else if (cycleDay > 10 && cycleDay <= 16) {
      return { phase: 'fertile', day: cycleDay, color: 'from-purple-400 to-pink-400' };
    } else if (cycleDay > 16 && cycleDay <= 24) {
      return { phase: 'luteal', day: cycleDay, color: 'from-blue-400 to-purple-400' };
    } else {
      return { phase: 'follicular', day: cycleDay, color: 'from-teal-400 to-blue-400' };
    }
  }, [cycleSettings]);

  if (!cycleSettings) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

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
              {todayLog && (
                <p className="text-xs text-purple-600 mt-2">
                  ✓ You've logged today's symptoms
                </p>
              )}
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
              {todayLog ? 'Update Symptoms' : 'Log Symptoms'}
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
      <CycleInfo cyclePhase={cyclePhase} cycleSettings={cycleSettings} />

      {/* Insights */}
      <InsightsPanel />

      {/* Symptom Tracker Modal */}
      {showSymptomTracker && (
        <SymptomTracker 
          onClose={() => setShowSymptomTracker(false)}
          onSave={() => {
            // Reload today's log after saving
            const today = new Date().toISOString().split('T')[0];
            getSymptomLog(today).then(setTodayLog);
          }}
        />
      )}
    </div>
  );
};

export default HomePage;
