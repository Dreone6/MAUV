import { ArrowLeft, Check } from 'lucide-react@0.487.0';
import { useState } from 'react';

interface SymptomTrackerProps {
  onBack: () => void;
}

export function SymptomTracker({ onBack }: SymptomTrackerProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [selectedFlow, setSelectedFlow] = useState<string | null>(null);
  const [notes, setNotes] = useState('');

  const moods = [
    { emoji: '😊', label: 'Happy' },
    { emoji: '😌', label: 'Calm' },
    { emoji: '😔', label: 'Sad' },
    { emoji: '😰', label: 'Anxious' },
    { emoji: '😴', label: 'Tired' },
    { emoji: '😤', label: 'Irritated' },
  ];

  const symptoms = [
    { id: 'cramps', label: 'Cramps', emoji: '⚡' },
    { id: 'headache', label: 'Headache', emoji: '🤕' },
    { id: 'bloating', label: 'Bloating', emoji: '💨' },
    { id: 'acne', label: 'Acne', emoji: '🔴' },
    { id: 'breast-tenderness', label: 'Breast Tenderness', emoji: '💔' },
    { id: 'fatigue', label: 'Fatigue', emoji: '😪' },
    { id: 'nausea', label: 'Nausea', emoji: '🤢' },
    { id: 'back-pain', label: 'Back Pain', emoji: '🦴' },
    { id: 'mood-swings', label: 'Mood Swings', emoji: '🎭' },
    { id: 'food-cravings', label: 'Food Cravings', emoji: '🍫' },
  ];

  const flowOptions = [
    { id: 'spotting', label: 'Spotting', color: 'from-red-200 to-red-300' },
    { id: 'light', label: 'Light', color: 'from-red-300 to-red-400' },
    { id: 'medium', label: 'Medium', color: 'from-red-400 to-red-500' },
    { id: 'heavy', label: 'Heavy', color: 'from-red-500 to-red-600' },
  ];

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleSave = () => {
    alert('Symptoms logged successfully! 🎉');
    onBack();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0f2e] via-[#2a1a3e] to-[#1a0f2e] text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 backdrop-blur-sm border-b border-purple-800/30 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl">Log Today</h1>
              <p className="text-sm text-gray-400">December 15, 2025 • Day 16</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 space-y-6">
        {/* Mood Section */}
        <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/40 rounded-3xl p-6 border border-purple-700/30">
          <h3 className="text-lg mb-4">How are you feeling?</h3>
          <div className="grid grid-cols-3 gap-3">
            {moods.map((mood) => (
              <button
                key={mood.label}
                onClick={() => setSelectedMood(mood.label)}
                className={`p-4 rounded-2xl transition-all duration-200 ${
                  selectedMood === mood.label
                    ? 'bg-gradient-to-br from-purple-600 to-pink-600 scale-105 ring-2 ring-white'
                    : 'bg-purple-950/40 hover:bg-purple-950/60'
                }`}
              >
                <div className="text-3xl mb-2">{mood.emoji}</div>
                <div className="text-xs">{mood.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Flow Section */}
        <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/40 rounded-3xl p-6 border border-purple-700/30">
          <h3 className="text-lg mb-4">Period Flow (if applicable)</h3>
          <div className="grid grid-cols-2 gap-3">
            {flowOptions.map((flow) => (
              <button
                key={flow.id}
                onClick={() => setSelectedFlow(flow.id)}
                className={`p-4 rounded-2xl transition-all duration-200 relative ${
                  selectedFlow === flow.id
                    ? `bg-gradient-to-br ${flow.color} scale-105 ring-2 ring-white`
                    : 'bg-purple-950/40 hover:bg-purple-950/60'
                }`}
              >
                {selectedFlow === flow.id && (
                  <Check className="w-5 h-5 absolute top-2 right-2" />
                )}
                <div className="text-sm">{flow.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Symptoms Section */}
        <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/40 rounded-3xl p-6 border border-purple-700/30">
          <h3 className="text-lg mb-4">Symptoms</h3>
          <div className="grid grid-cols-2 gap-3">
            {symptoms.map((symptom) => (
              <button
                key={symptom.id}
                onClick={() => toggleSymptom(symptom.id)}
                className={`p-4 rounded-2xl transition-all duration-200 text-left relative ${
                  selectedSymptoms.includes(symptom.id)
                    ? 'bg-gradient-to-br from-purple-600 to-pink-600 ring-2 ring-purple-400'
                    : 'bg-purple-950/40 hover:bg-purple-950/60'
                }`}
              >
                {selectedSymptoms.includes(symptom.id) && (
                  <Check className="w-4 h-4 absolute top-2 right-2" />
                )}
                <div className="text-2xl mb-2">{symptom.emoji}</div>
                <div className="text-xs">{symptom.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Notes Section */}
        <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/40 rounded-3xl p-6 border border-purple-700/30">
          <h3 className="text-lg mb-4">Additional Notes</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any notes about today... diet, exercise, sleep quality, etc."
            className="w-full bg-purple-950/40 rounded-2xl p-4 text-white placeholder-gray-500 border border-purple-800/30 focus:border-purple-500/50 focus:outline-none resize-none min-h-[120px]"
          />
        </div>

        {/* Activity & Sleep Quick Log */}
        <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/40 rounded-3xl p-6 border border-purple-700/30">
          <h3 className="text-lg mb-4">Quick Stats</h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-300 mb-2 block">Water Intake (glasses)</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <button
                    key={num}
                    className="flex-1 aspect-square rounded-xl bg-purple-950/40 hover:bg-gradient-to-br hover:from-blue-500 hover:to-blue-600 transition-all duration-200 text-sm"
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-2 block">Sleep Quality</label>
              <div className="grid grid-cols-5 gap-2">
                {['😴', '😪', '😐', '😊', '🤩'].map((emoji, idx) => (
                  <button
                    key={idx}
                    className="aspect-square rounded-xl bg-purple-950/40 hover:bg-purple-950/60 transition-all duration-200 text-2xl"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg text-lg sticky bottom-6"
        >
          Save Today's Log
        </button>

        {/* Bottom spacing */}
        <div className="h-8" />
      </div>
    </div>
  );
}