import { useState } from 'react';
import { Calendar, Heart, Sparkles, FileText, Brain, BarChart, Bell } from 'lucide-react@0.487.0';

interface CustomizeRemindersScreenProps {
  onFinish: () => void;
}

export function CustomizeRemindersScreen({ onFinish }: CustomizeRemindersScreenProps) {
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [periodPredictions, setPeriodPredictions] = useState(true);
  const [fertilityWindow, setFertilityWindow] = useState(true);
  const [ovulationDay, setOvulationDay] = useState(true);
  const [dailyLog, setDailyLog] = useState(true);
  const [healthInsights, setHealthInsights] = useState(true);
  const [cyclePatternSummaries, setCyclePatternSummaries] = useState(true);

  return (
    <div className="min-h-screen bg-[#1a0f2e] text-white p-6 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl text-center mb-6">Customize Your Reminders</h1>

          {/* Progress Bars */}
          <div className="flex gap-2 mb-6">
            <div className="flex-1 h-1 rounded-full bg-purple-400" />
            <div className="flex-1 h-1 rounded-full bg-purple-400" />
            <div className="flex-1 h-1 rounded-full bg-purple-400" />
            <div className="flex-1 h-1 rounded-full bg-purple-400" />
            <div className="flex-1 h-1 rounded-full bg-gray-700" />
          </div>

          <p className="text-gray-400 text-sm text-center leading-relaxed">
            Notifications help you stay on top of your cycle. You are in full control of what we send you.
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto mb-6 space-y-6">
          {/* Enable Notifications */}
          <div className="flex items-center justify-between bg-purple-950/30 rounded-2xl p-4 border border-purple-800/30">
            <div className="flex items-center gap-3">
              <Bell className="w-6 h-6 text-purple-300" />
              <span className="text-white">Enable Notifications</span>
            </div>
            <button
              onClick={() => setEnableNotifications(!enableNotifications)}
              className={`w-14 h-8 rounded-full transition-all duration-300 relative ${
                enableNotifications ? 'bg-purple-400' : 'bg-gray-600'
              }`}
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 ${
                  enableNotifications ? 'right-1' : 'left-1'
                }`}
              />
            </button>
          </div>

          {/* CYCLE REMINDERS */}
          <div>
            <h3 className="text-gray-400 text-xs tracking-wider mb-4">CYCLE REMINDERS</h3>
            <div className="space-y-3">
              {/* Period Predictions */}
              <div className="flex items-start justify-between bg-purple-950/20 rounded-2xl p-4">
                <div className="flex items-start gap-3 flex-1">
                  <Calendar className="w-6 h-6 text-purple-300 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white mb-1">Period Predictions</h4>
                    <p className="text-gray-400 text-sm">Get a heads-up before your period starts.</p>
                  </div>
                </div>
                <button
                  onClick={() => setPeriodPredictions(!periodPredictions)}
                  className={`w-14 h-8 rounded-full transition-all duration-300 relative flex-shrink-0 ml-3 ${
                    periodPredictions ? 'bg-purple-400' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 ${
                      periodPredictions ? 'right-1' : 'left-1'
                    }`}
                  />
                </button>
              </div>

              {/* Fertility Window */}
              <div className="flex items-start justify-between bg-purple-950/20 rounded-2xl p-4">
                <div className="flex items-start gap-3 flex-1">
                  <Heart className="w-6 h-6 text-purple-300 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white mb-1">Fertility Window</h4>
                    <p className="text-gray-400 text-sm">Know when your fertile window is opening.</p>
                  </div>
                </div>
                <button
                  onClick={() => setFertilityWindow(!fertilityWindow)}
                  className={`w-14 h-8 rounded-full transition-all duration-300 relative flex-shrink-0 ml-3 ${
                    fertilityWindow ? 'bg-purple-400' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 ${
                      fertilityWindow ? 'right-1' : 'left-1'
                    }`}
                  />
                </button>
              </div>

              {/* Ovulation Day */}
              <div className="flex items-start justify-between bg-purple-950/20 rounded-2xl p-4">
                <div className="flex items-start gap-3 flex-1">
                  <Sparkles className="w-6 h-6 text-purple-300 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white mb-1">Ovulation Day</h4>
                    <p className="text-gray-400 text-sm">A reminder on your estimated ovulation day.</p>
                  </div>
                </div>
                <button
                  onClick={() => setOvulationDay(!ovulationDay)}
                  className={`w-14 h-8 rounded-full transition-all duration-300 relative flex-shrink-0 ml-3 ${
                    ovulationDay ? 'bg-purple-400' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 ${
                      ovulationDay ? 'right-1' : 'left-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* LOGGING PROMPTS */}
          <div>
            <h3 className="text-gray-400 text-xs tracking-wider mb-4">LOGGING PROMPTS</h3>
            <div className="space-y-3">
              {/* Daily Symptom & Mood Log */}
              <div className="flex items-start justify-between bg-purple-950/20 rounded-2xl p-4">
                <div className="flex items-start gap-3 flex-1">
                  <FileText className="w-6 h-6 text-purple-300 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white mb-1">Daily Symptom & Mood Log</h4>
                    <p className="text-gray-400 text-sm">A gentle nudge to log how you're feeling.</p>
                  </div>
                </div>
                <button
                  onClick={() => setDailyLog(!dailyLog)}
                  className={`w-14 h-8 rounded-full transition-all duration-300 relative flex-shrink-0 ml-3 ${
                    dailyLog ? 'bg-purple-400' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 ${
                      dailyLog ? 'right-1' : 'left-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* AMARA AI INSIGHTS */}
          <div>
            <h3 className="text-gray-400 text-xs tracking-wider mb-4">AMARA AI INSIGHTS</h3>
            <div className="space-y-3">
              {/* Personalized Health Insights */}
              <div className="flex items-start justify-between bg-purple-950/20 rounded-2xl p-4">
                <div className="flex items-start gap-3 flex-1">
                  <Brain className="w-6 h-6 text-purple-300 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white mb-1">Personalized Health Insights</h4>
                    <p className="text-gray-400 text-sm">Get AI-powered insights based on your logs.</p>
                  </div>
                </div>
                <button
                  onClick={() => setHealthInsights(!healthInsights)}
                  className={`w-14 h-8 rounded-full transition-all duration-300 relative flex-shrink-0 ml-3 ${
                    healthInsights ? 'bg-purple-400' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 ${
                      healthInsights ? 'right-1' : 'left-1'
                    }`}
                  />
                </button>
              </div>

              {/* Cycle Pattern Summaries */}
              <div className="flex items-start justify-between bg-purple-950/20 rounded-2xl p-4">
                <div className="flex items-start gap-3 flex-1">
                  <BarChart className="w-6 h-6 text-purple-300 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white mb-1">Cycle Pattern Summaries</h4>
                    <p className="text-gray-400 text-sm">Receive monthly summaries of your cycle.</p>
                  </div>
                </div>
                <button
                  onClick={() => setCyclePatternSummaries(!cyclePatternSummaries)}
                  className={`w-14 h-8 rounded-full transition-all duration-300 relative flex-shrink-0 ml-3 ${
                    cyclePatternSummaries ? 'bg-purple-400' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 ${
                      cyclePatternSummaries ? 'right-1' : 'left-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Finish Button */}
        <button
          onClick={onFinish}
          className="w-full py-5 px-6 rounded-full bg-purple-300 text-gray-900 text-lg transition-all duration-300 hover:bg-purple-400 hover:scale-105 active:scale-95 shadow-lg"
        >
          Finish Setup
        </button>
      </div>
    </div>
  );
}