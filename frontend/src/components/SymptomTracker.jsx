import React, { useState, useEffect } from 'react';
import { X, Smile, Frown, Zap, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { symptomCategories } from '../mockData';
import { toast } from '../hooks/use-toast';
import { getSymptomLog, saveSymptomLog } from '../services/dataService';

const SymptomTracker = ({ onClose, onSave }) => {
  const today = new Date().toISOString().split('T')[0];
  
  const [selectedMood, setSelectedMood] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [selectedFlow, setSelectedFlow] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load existing log for today if it exists
    getSymptomLog(today).then(log => {
      if (log) {
        setSelectedMood(log.mood || '');
        setSelectedSymptoms(log.symptoms || []);
        setSelectedFlow(log.flow || '');
        setNotes(log.notes || '');
      }
      setLoading(false);
    });
  }, [today]);

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSave = async () => {
    try {
      await saveSymptomLog(today, {
        mood: selectedMood,
        symptoms: selectedSymptoms,
        flow: selectedFlow,
        notes: notes
      });
      
      toast({
        title: "Symptoms Logged!",
        description: "Your symptoms have been recorded for today.",
      });
      
      if (onSave) onSave();
      onClose();
    } catch (error) {
      console.error('Failed to save symptom log:', error);
      toast({
        title: "Error",
        description: "Failed to save your symptoms. Please try again.",
        variant: "destructive"
      });
    }
  };

  const moodEmojis = {
    happy: '😊',
    sad: '😢',
    anxious: '😰',
    irritable: '😤',
    calm: '😌',
    emotional: '🥺'
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto border-0 shadow-2xl">
        <CardHeader className="border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Log Your Day
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-sm text-gray-600 mt-2">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {/* Mood Selection */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Smile className="w-5 h-5 mr-2 text-pink-500" />
              How are you feeling?
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {symptomCategories.mood.map((mood) => (
                <button
                  key={mood}
                  onClick={() => setSelectedMood(mood)}
                  className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                    selectedMood === mood
                      ? 'border-pink-500 bg-pink-50'
                      : 'border-gray-200 hover:border-pink-300'
                  }`}
                >
                  <div className="text-3xl mb-2">{moodEmojis[mood]}</div>
                  <div className="text-sm font-medium capitalize">{mood.replace('-', ' ')}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Flow Tracking */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-red-500" />
              Period Flow
            </h3>
            <div className="flex space-x-3">
              {symptomCategories.flow.map((flow) => (
                <button
                  key={flow}
                  onClick={() => setSelectedFlow(flow)}
                  className={`flex-1 p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                    selectedFlow === flow
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-red-300'
                  }`}
                >
                  <div className="text-sm font-medium capitalize">{flow}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Physical Symptoms */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-purple-500" />
              Physical Symptoms
            </h3>
            <div className="flex flex-wrap gap-2">
              {symptomCategories.physical.map((symptom) => (
                <Badge
                  key={symptom}
                  variant={selectedSymptoms.includes(symptom) ? 'default' : 'outline'}
                  className={`cursor-pointer transition-all hover:scale-105 ${
                    selectedSymptoms.includes(symptom)
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                      : 'border-gray-300 hover:border-pink-400'
                  }`}
                  onClick={() => toggleSymptom(symptom)}
                >
                  {symptom.replace('-', ' ')}
                </Badge>
              ))}
            </div>
          </div>

          {/* Energy Level */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Energy Level</h3>
            <div className="flex space-x-3">
              {symptomCategories.energy.map((energy) => (
                <button
                  key={energy}
                  onClick={() => toggleSymptom(energy)}
                  className={`flex-1 p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                    selectedSymptoms.includes(energy)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="text-sm font-medium capitalize">{energy}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Notes</h3>
            <Textarea
              placeholder="How are you feeling today? Any additional notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-24 resize-none border-gray-300 focus:border-pink-500"
            />
          </div>

          {/* Save Button */}
          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
            >
              Save Log
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SymptomTracker;
