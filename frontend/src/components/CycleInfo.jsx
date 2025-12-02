import React from 'react';
import { Calendar, Heart, Droplet, Moon } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';

const CycleInfo = ({ cyclePhase, cycleSettings }) => {
  const getPredictions = () => {
    const today = new Date();
    const lastPeriod = new Date(cycleSettings.lastPeriodStart);
    const daysSinceLastPeriod = Math.floor((today - lastPeriod) / (1000 * 60 * 60 * 24));
    
    const daysUntilNextPeriod = cycleSettings.cycleLength - daysSinceLastPeriod;
    const daysUntilOvulation = 14 - daysSinceLastPeriod;
    const daysUntilFertileWindow = 10 - daysSinceLastPeriod;

    return {
      nextPeriod: daysUntilNextPeriod > 0 ? daysUntilNextPeriod : cycleSettings.cycleLength + daysUntilNextPeriod,
      ovulation: daysUntilOvulation > 0 ? daysUntilOvulation : 'Passed',
      fertileWindow: daysUntilFertileWindow > 0 ? daysUntilFertileWindow : (daysUntilFertileWindow + 7 > 0 ? 'Now' : 'Passed')
    };
  };

  const predictions = getPredictions();
  const cycleProgress = (cyclePhase.day / cycleSettings.cycleLength) * 100;

  return (
    <div className="space-y-4">
      {/* Cycle Progress */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-purple-50/30">
        <CardContent className="pt-6">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Cycle Progress</span>
              <span className="text-sm font-bold text-purple-600">{cyclePhase.day}/{cycleSettings.cycleLength} days</span>
            </div>
            <Progress value={cycleProgress} className="h-3" />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <Calendar className="w-6 h-6 text-pink-500 mx-auto mb-2" />
              <p className="text-xs text-gray-600 mb-1">Next Period</p>
              <p className="text-lg font-bold text-pink-600">{predictions.nextPeriod} days</p>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <Heart className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <p className="text-xs text-gray-600 mb-1">Ovulation</p>
              <p className="text-lg font-bold text-purple-600">
                {typeof predictions.ovulation === 'number' ? `${predictions.ovulation} days` : predictions.ovulation}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-0 shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-pointer bg-gradient-to-br from-red-50 to-pink-50">
          <CardContent className="pt-6 text-center">
            <Droplet className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <p className="text-sm font-semibold text-gray-800">Log Period</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-pointer bg-gradient-to-br from-blue-50 to-purple-50">
          <CardContent className="pt-6 text-center">
            <Moon className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <p className="text-sm font-semibold text-gray-800">Sleep Quality</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CycleInfo;
