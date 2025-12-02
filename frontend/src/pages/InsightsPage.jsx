import React, { useState, useEffect } from 'react';
import { TrendingUp, BookOpen, Lightbulb, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { getCycleSettings, getAllSymptomLogs, getCycleLogs } from '../services/dataService';

const InsightsPage = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [cycleSettings, setCycleSettings] = useState(null);
  const [symptomLogs, setSymptomLogs] = useState([]);
  const [insights, setInsights] = useState(null);

  useEffect(() => {
    loadDataAndCalculate();
  }, []);

  const loadDataAndCalculate = async () => {
    const settings = await getCycleSettings();
    const logs = await getAllSymptomLogs();
    
    setCycleSettings(settings);
    setSymptomLogs(logs);

    // Calculate insights from real data
    const calculated = calculateInsights(settings, logs);
    setInsights(calculated);
  };

  const calculateInsights = (settings, logs) => {
    if (!logs || logs.length === 0) {
      return {
        cycleHealth: 85,
        avgCycle: settings.cycleLength,
        avgPeriod: settings.periodLength,
        commonSymptoms: ['No data yet'],
        moodTrend: 'neutral',
        suggestion: 'Start logging your daily symptoms to see personalized insights!',
        highlights: [
          {
            title: 'Start Tracking',
            description: 'Log your symptoms daily to unlock personalized health insights',
            color: 'bg-pink-50'
          }
        ]
      };
    }

    // Calculate common symptoms
    const symptomCount = {};
    logs.forEach(log => {
      if (log.symptoms) {
        log.symptoms.forEach(symptom => {
          symptomCount[symptom] = (symptomCount[symptom] || 0) + 1;
        });
      }
    });
    const commonSymptoms = Object.entries(symptomCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([symptom]) => symptom);

    // Calculate mood trend
    const moods = logs.filter(l => l.mood).map(l => l.mood);
    const happyCount = moods.filter(m => ['happy', 'calm'].includes(m)).length;
    const sadCount = moods.filter(m => ['sad', 'anxious', 'irritable'].includes(m)).length;
    const moodTrend = happyCount > sadCount ? 'positive' : sadCount > happyCount ? 'needs-attention' : 'neutral';

    // Generate suggestion
    let suggestion = '';
    if (commonSymptoms.includes('cramps')) {
      suggestion = 'You often experience cramps. Try gentle exercise, heat therapy, or magnesium supplements.';
    } else if (moodTrend === 'needs-attention') {
      suggestion = 'Your mood patterns show some challenges. Consider stress management techniques or talking to someone.';
    } else {
      suggestion = 'Your cycle patterns look healthy! Keep tracking to maintain awareness.';
    }

    // Health score (simple calculation)
    const cycleHealth = Math.min(100, Math.max(50, 85 - (symptomCount['cramps'] || 0) * 5));

    return {
      cycleHealth,
      avgCycle: settings.cycleLength,
      avgPeriod: settings.periodLength,
      commonSymptoms: commonSymptoms.length > 0 ? commonSymptoms : ['None yet'],
      moodTrend,
      suggestion,
      highlights: [
        {
          title: 'Cycle Regularity',
          description: `Your cycle has been tracked for ${logs.length} days. Keep it up!`,
          color: 'bg-pink-50'
        },
        {
          title: 'Most Common Symptom',
          description: commonSymptoms[0] ? `You typically experience ${commonSymptoms[0]}` : 'No symptoms logged yet',
          color: 'bg-purple-50'
        },
        {
          title: 'Mood Pattern',
          description: moodTrend === 'positive' ? 'Your mood is generally positive!' : 'Track your mood to see patterns',
          color: 'bg-blue-50'
        }
      ]
    };
  };

  if (!cycleSettings || !insights) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-600">Calculating your insights...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Your Insights
        </h1>
        <p className="text-gray-600">Personalized health insights based on your cycle data</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="patterns">Patterns</TabsTrigger>
          <TabsTrigger value="learn">Learn</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Cycle Health Score */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-purple-50/30">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-purple-600" />
                <span>Cycle Health Score</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <div className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {insights.cycleHealth}%
                </div>
                <p className="text-sm text-gray-600">{insights.suggestion}</p>
              </div>
              <Progress value={insights.cycleHealth} className="h-3" />
            </CardContent>
          </Card>

          {/* Key Insights */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>This Month's Highlights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {insights.highlights.map((highlight, index) => (
                <div key={index} className={`flex items-start space-x-3 p-3 ${highlight.color} rounded-lg`}>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center flex-shrink-0">
                    {index === 0 ? <TrendingUp className="w-5 h-5 text-white" /> : 
                     index === 1 ? <Activity className="w-5 h-5 text-white" /> :
                     <Lightbulb className="w-5 h-5 text-white" />}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{highlight.title}</h4>
                    <p className="text-sm text-gray-600">{highlight.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Common Symptoms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {insights.commonSymptoms.map((symptom, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium capitalize">{symptom.replace('-', ' ')}</span>
                    <span className="text-sm text-gray-600">Frequently logged</span>
                  </div>
                  <Progress value={(3 - index) * 30} className="h-2" />
                </div>
              ))}
              {insights.commonSymptoms.length === 0 && (
                <p className="text-sm text-gray-600">No symptoms logged yet. Start tracking to see patterns!</p>
              )}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Cycle Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-pink-50 rounded-lg text-center">
                  <p className="text-2xl font-bold text-pink-600">{insights.avgCycle}</p>
                  <p className="text-sm text-gray-600">Avg Cycle Length</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg text-center">
                  <p className="text-2xl font-bold text-purple-600">{insights.avgPeriod}</p>
                  <p className="text-sm text-gray-600">Avg Period Days</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="learn" className="space-y-4">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Understanding Your Cycle Phases</h3>
                  <p className="text-sm text-gray-600 mb-2">Learn about the 4 phases of your menstrual cycle and what happens in your body</p>
                  <Badge className="bg-pink-100 text-pink-600">5 min read</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Managing PMS Symptoms</h3>
                  <p className="text-sm text-gray-600 mb-2">Natural remedies and lifestyle tips to ease premenstrual symptoms</p>
                  <Badge className="bg-purple-100 text-purple-600">7 min read</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center flex-shrink-0">
                  <Activity className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Fertility & Ovulation Basics</h3>
                  <p className="text-sm text-gray-600 mb-2">Everything you need to know about your fertile window and conception</p>
                  <Badge className="bg-blue-100 text-blue-600">8 min read</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InsightsPage;
