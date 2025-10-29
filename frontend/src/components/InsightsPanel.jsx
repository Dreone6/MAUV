import React from 'react';
import { TrendingUp, Heart, Activity, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { mockInsights } from '../mockData';

const InsightsPanel = ({ expanded = false }) => {
  const iconMap = {
    calendar: Calendar,
    heart: Heart,
    activity: Activity
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Your Insights</h2>
        <TrendingUp className="w-5 h-5 text-pink-500" />
      </div>
      
      <div className={expanded ? 'space-y-4' : 'grid grid-cols-1 md:grid-cols-3 gap-4'}>
        {mockInsights.map((insight) => {
          const Icon = iconMap[insight.icon];
          return (
            <Card 
              key={insight.id} 
              className="border-0 shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-pointer bg-gradient-to-br from-white to-pink-50/30"
            >
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">{insight.title}</h3>
                    <p className="text-sm text-gray-600">{insight.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {expanded && (
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
          <CardHeader>
            <CardTitle>Symptom Patterns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <span className="text-gray-700">Most Common Symptom</span>
                <span className="font-semibold text-pink-600">Cramps</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <span className="text-gray-700">Average Mood</span>
                <span className="font-semibold text-purple-600">Happy</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <span className="text-gray-700">Energy Level Trend</span>
                <span className="font-semibold text-blue-600">Normal</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InsightsPanel;
