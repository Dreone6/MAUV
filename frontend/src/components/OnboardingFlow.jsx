import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { saveProfile, saveCycleSettings } from '../services/dataService';

const AVATARS = [
  { id: 'fairy_1', image: '/avatars/fairy_1.jpg', name: 'Luna', color: 'from-purple-400 to-pink-400', preset: { skin: 'light', hair: 'purple', eyes: 'blue', wings: 'butterfly', accessories: ['crown'] } },
  { id: 'fairy_2', image: '/avatars/fairy_2.jpg', name: 'Sparkle', color: 'from-blue-400 to-purple-400', preset: { skin: 'medium', hair: 'blonde', eyes: 'green', wings: 'dragonfly', accessories: [] } },
  { id: 'fairy_3', image: '/avatars/fairy_3.jpg', name: 'Blossom', color: 'from-pink-400 to-rose-400', preset: { skin: 'light', hair: 'pink', eyes: 'brown', wings: 'flower', accessories: ['tiara'] } },
  { id: 'fairy_4', image: '/avatars/fairy_4.jpg', name: 'Violet', color: 'from-purple-500 to-indigo-400', preset: { skin: 'tan', hair: 'violet', eyes: 'purple', wings: 'butterfly', accessories: [] } },
  { id: 'fairy_5', image: '/avatars/fairy_5.jpg', name: 'Moon', color: 'from-indigo-400 to-blue-400', preset: { skin: 'medium', hair: 'silver', eyes: 'blue', wings: 'moon', accessories: ['crescent'] } },
  { id: 'fairy_6', image: '/avatars/fairy_6.jpg', name: 'Hibiscus', color: 'from-rose-400 to-pink-500', preset: { skin: 'dark', hair: 'black', eyes: 'brown', wings: 'tropical', accessories: ['flower'] } },
  { id: 'fairy_7', image: '/avatars/fairy_7.jpg', name: 'Star', color: 'from-yellow-400 to-orange-400', preset: { skin: 'light', hair: 'golden', eyes: 'amber', wings: 'star', accessories: ['star'] } },
  { id: 'fairy_8', image: '/avatars/fairy_8.jpg', name: 'Azure', color: 'from-cyan-400 to-blue-500', preset: { skin: 'medium', hair: 'blue', eyes: 'teal', wings: 'butterfly', accessories: [] } },
  { id: 'fairy_9', image: '/avatars/fairy_9.jpg', name: 'Rainbow', color: 'from-pink-400 via-purple-400 to-blue-400', preset: { skin: 'tan', hair: 'rainbow', eyes: 'violet', wings: 'rainbow', accessories: ['glasses'] } },
  { id: 'fairy_10', image: '/avatars/fairy_10.jpg', name: 'Willow', color: 'from-green-400 to-emerald-500', preset: { skin: 'medium', hair: 'brown', eyes: 'green', wings: 'leaf', accessories: [] } },
  { id: 'fairy_11', image: '/avatars/fairy_11.jpg', name: 'Frost', color: 'from-blue-200 to-cyan-300', preset: { skin: 'light', hair: 'white', eyes: 'ice-blue', wings: 'ice', accessories: ['tiara'] } },
  { id: 'fairy_12', image: '/avatars/fairy_12.jpg', name: 'Ember', color: 'from-orange-400 to-red-500', preset: { skin: 'dark', hair: 'red', eyes: 'amber', wings: 'fire', accessories: [] } },
];

const OnboardingFlow = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [alias, setAlias] = useState('');
  const [cycleLength, setCycleLength] = useState(28);
  const [periodLength, setPeriodLength] = useState(5);
  const [lastPeriodStart, setLastPeriodStart] = useState('');
  const [moodBaseline, setMoodBaseline] = useState('');

  const handleAliasSubmit = () => {
    if (alias.trim()) {
      setStep(2);
    }
  };

  const handleComplete = async () => {
    try {
      // Save profile (without avatar for now)
      await saveProfile({
        alias: alias.trim(),
        avatarId: null, // No avatar selected yet
        avatarConfig: null,
        createdAt: new Date().toISOString()
      });

      // Save cycle settings
      await saveCycleSettings({
        cycleLength: parseInt(cycleLength),
        periodLength: parseInt(periodLength),
        lastPeriodStart: lastPeriodStart || new Date().toISOString().split('T')[0],
        moodBaseline: moodBaseline
      });

      onComplete();
    } catch (error) {
      console.error('Failed to complete onboarding:', error);
      alert('Failed to save your profile. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl border-0 shadow-2xl">
        {/* Step 1: Alias Selection */}
        {step === 1 && (
          <>
            <CardHeader className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                <img src="/mauv_logo.png" alt="MAUV" className="w-12 h-12" />
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Welcome to MAUV
              </CardTitle>
              <p className="text-gray-600 mt-2">Your personal, private cycle companion</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
                  Choose Your Alias
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  MAUV is <strong>completely anonymous</strong>. Pick a magical name that represents you!
                </p>
                <div className="bg-pink-50 border border-pink-200 rounded-lg p-3 mb-4">
                  <p className="text-xs text-gray-700">
                    🔒 <strong>No real names required.</strong> Your identity stays private. 
                    Only you will see this alias in the app.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alias">Your Magical Alias</Label>
                  <Input
                    id="alias"
                    placeholder="e.g., Luna, Sage, River, Willow..."
                    value={alias}
                    onChange={(e) => setAlias(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAliasSubmit()}
                    className="text-lg"
                    maxLength={20}
                    autoFocus
                  />
                  <p className="text-xs text-gray-500">
                    Choose any name that feels right - no personal information needed!
                  </p>
                </div>
              </div>

              <Button
                onClick={handleAliasSubmit}
                disabled={!alias.trim()}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-6 text-lg"
              >
                Continue
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </>
        )}

        {/* Step 2: Cycle Settings */}
        {step === 2 && (
          <>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">
                Tell Us About Your Cycle
              </CardTitle>
              <p className="text-gray-600 mt-2">Help us personalize your MAUV experience</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cycleLength">Average Cycle Length (days)</Label>
                  <Input
                    id="cycleLength"
                    type="number"
                    min="21"
                    max="35"
                    value={cycleLength}
                    onChange={(e) => setCycleLength(e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Typical range: 21-35 days (average is 28)</p>
                </div>

                <div>
                  <Label htmlFor="periodLength">Period Duration (days)</Label>
                  <Input
                    id="periodLength"
                    type="number"
                    min="2"
                    max="10"
                    value={periodLength}
                    onChange={(e) => setPeriodLength(e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Typical range: 3-7 days</p>
                </div>

                <div>
                  <Label htmlFor="lastPeriod">Last Period Start Date (Optional)</Label>
                  <Input
                    id="lastPeriod"
                    type="date"
                    value={lastPeriodStart}
                    onChange={(e) => setLastPeriodStart(e.target.value)}
                    className="mt-1"
                    max={new Date().toISOString().split('T')[0]}
                  />
                  <p className="text-xs text-gray-500 mt-1">Skip if you prefer to log it later</p>
                </div>

                <div>
                  <Label htmlFor="moodBaseline">How are you feeling today?</Label>
                  <select
                    id="moodBaseline"
                    value={moodBaseline}
                    onChange={(e) => setMoodBaseline(e.target.value)}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select your mood...</option>
                    <option value="happy">Happy 😊</option>
                    <option value="calm">Calm 😌</option>
                    <option value="neutral">Neutral 😐</option>
                    <option value="anxious">Anxious 😰</option>
                    <option value="sad">Sad 😢</option>
                    <option value="irritable">Irritable 😤</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">This helps us understand your baseline</p>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <p className="text-sm text-gray-700">
                  🔒 <strong>Privacy First:</strong> All this information stays on your device. 
                  We never store it on our servers.
                </p>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={handleComplete}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                >
                  Complete Setup
                  <Sparkles className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
};

export default OnboardingFlow;
