import { useState } from 'react';
import {
  ChevronLeft,
  Users,
  Calendar,
  Heart,
  Activity,
  Smile,
  Thermometer,
  Droplet,
  Pill,
  FileText,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  Stethoscope,
  Baby,
  Moon,
  Utensils,
  Dumbbell,
  Brain,
  Sparkles,
  MessageCircle
} from 'lucide-react@0.487.0';
import { FloatingBackground } from './FloatingBackground';
import { BottomNav } from './BottomNav';

interface PartnerSharingSettingsProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
  darkMode?: boolean;
}

export function PartnerSharingSettings({ onBack, onNavigate, darkMode = false }: PartnerSharingSettingsProps) {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Cycle & Period Data
  const [sharePeriodDates, setSharePeriodDates] = useState(true);
  const [shareCycleLength, setShareCycleLength] = useState(true);
  const [shareFertileWindow, setShareFertileWindow] = useState(true);
  const [sharePredictions, setSharePredictions] = useState(true);

  // Physical Symptoms
  const [shareCramps, setShareCramps] = useState(true);
  const [shareHeadaches, setShareHeadaches] = useState(true);
  const [shareBreastTenderness, setShareBreastTenderness] = useState(true);
  const [shareBloating, setShareBloating] = useState(false);
  const [shareAcne, setShareAcne] = useState(false);

  // Emotional & Mental
  const [shareMood, setShareMood] = useState(true);
  const [shareAnxiety, setShareAnxiety] = useState(false);
  const [shareEnergyLevels, setShareEnergyLevels] = useState(true);
  const [shareSleep, setShareSleep] = useState(true);

  // Intimate & Fertility
  const [shareIntimacy, setShareIntimacy] = useState(true);
  const [shareLibido, setShareLibido] = useState(true);
  const [shareOvulation, setShareOvulation] = useState(true);

  // Health & Medical
  const [shareMedications, setShareMedications] = useState(false);
  const [shareAppointments, setShareAppointments] = useState(true);
  const [shareMedicalNotes, setShareMedicalNotes] = useState(false);
  const [shareVitamins, setShareVitamins] = useState(true);

  // Lifestyle
  const [shareExercise, setShareExercise] = useState(true);
  const [shareNutrition, setShareNutrition] = useState(false);
  const [shareWater, setShareWater] = useState(false);
  const [shareWeight, setShareWeight] = useState(false);

  // AI & Insights
  const [shareAmaraChats, setShareAmaraChats] = useState(false);
  const [shareHealthInsights, setShareHealthInsights] = useState(true);
  const [shareRecommendations, setShareRecommendations] = useState(true);

  const handleToggle = (setter: (value: boolean) => void, value: boolean) => {
    setter(value);
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    // Save settings logic
    setHasUnsavedChanges(false);
    alert('Partner sharing preferences saved successfully!');
  };

  const bgColor = darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50';
  const headerBg = darkMode ? 'bg-gray-800/80' : 'bg-white/80';
  const borderColor = darkMode ? 'border-gray-700/50' : 'border-purple-200/50';
  const cardBg = darkMode ? 'bg-gray-800/80' : 'bg-white';
  const cardBorder = darkMode ? 'border-gray-700/50' : 'border-purple-100';
  const textPrimary = darkMode ? 'text-gray-200' : 'text-gray-900';
  const textSecondary = darkMode ? 'text-gray-500' : 'text-gray-600';
  const iconBg = darkMode ? 'bg-purple-900/50' : 'bg-purple-100';
  const iconBorder = darkMode ? 'border-purple-700/50' : 'border-purple-200';
  const iconColor = darkMode ? 'text-purple-400' : 'text-purple-600';

  return (
    <div className={`min-h-screen ${bgColor}`}>
      <FloatingBackground />

      {/* Header */}
      <div className={`${headerBg} backdrop-blur-sm border-b ${borderColor} sticky top-0 z-10 shadow-xl`}>
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <button
              onClick={onBack}
              className={`w-10 h-10 rounded-full ${darkMode ? 'bg-gray-700/80 hover:bg-gray-600/80' : 'bg-purple-100 hover:bg-purple-200'} flex items-center justify-center transition-colors shadow-md`}
            >
              <ChevronLeft className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-purple-600'}`} />
            </button>

            {/* Title */}
            <h1 className="text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Partner Sharing
            </h1>

            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={!hasUnsavedChanges}
              className={`px-4 py-2 rounded-full text-sm transition-all shadow-md ${
                hasUnsavedChanges
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg'
                  : darkMode
                  ? 'bg-gray-700/80 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Save
            </button>
          </div>

          {/* Subtitle */}
          <p className={`text-center text-xs ${textSecondary} mt-2`}>
            Choose what information to share with your partner
          </p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 pb-24">
        {/* Info Banner */}
        <div className={`${cardBg} rounded-3xl p-5 shadow-lg mb-6 border ${cardBorder}`}>
          <div className="flex items-start gap-4">
            <div className={`w-10 h-10 rounded-full ${iconBg} flex items-center justify-center flex-shrink-0 border ${iconBorder}`}>
              <Users className={`w-5 h-5 ${iconColor}`} />
            </div>
            <div>
              <h3 className={`${textPrimary} mb-1`}>Partner: Alex</h3>
              <p className={`text-xs ${textSecondary} leading-relaxed`}>
                You have control over what your partner sees. Changes take effect immediately after saving.
              </p>
            </div>
          </div>
        </div>

        {/* CYCLE & PERIOD DATA */}
        <div className="mb-6">
          <h4 className={`text-xs ${textSecondary} uppercase tracking-wider mb-3 px-2`}>Cycle & Period Data</h4>

          <ToggleCard
            icon={<Calendar className="w-5 h-5" />}
            title="Period Dates"
            description="Start and end dates of your period"
            value={sharePeriodDates}
            onChange={(val) => handleToggle(setSharePeriodDates, val)}
            darkMode={darkMode}
            iconColor="text-pink-500"
            iconBgColor={darkMode ? 'bg-pink-900/50' : 'bg-pink-100'}
            iconBorderColor={darkMode ? 'border-pink-700/50' : 'border-pink-200'}
          />

          <ToggleCard
            icon={<Activity className="w-5 h-5" />}
            title="Cycle Length & Patterns"
            description="Your average cycle duration"
            value={shareCycleLength}
            onChange={(val) => handleToggle(setShareCycleLength, val)}
            darkMode={darkMode}
            iconColor="text-purple-500"
            iconBgColor={darkMode ? 'bg-purple-900/50' : 'bg-purple-100'}
            iconBorderColor={darkMode ? 'border-purple-700/50' : 'border-purple-200'}
          />

          <ToggleCard
            icon={<Baby className="w-5 h-5" />}
            title="Fertile Window"
            description="Your most fertile days"
            value={shareFertileWindow}
            onChange={(val) => handleToggle(setShareFertileWindow, val)}
            darkMode={darkMode}
            iconColor="text-green-500"
            iconBgColor={darkMode ? 'bg-green-900/50' : 'bg-green-100'}
            iconBorderColor={darkMode ? 'border-green-700/50' : 'border-green-200'}
          />

          <ToggleCard
            icon={<Sparkles className="w-5 h-5" />}
            title="Period Predictions"
            description="Upcoming period forecasts"
            value={sharePredictions}
            onChange={(val) => handleToggle(setSharePredictions, val)}
            darkMode={darkMode}
            iconColor="text-purple-500"
            iconBgColor={darkMode ? 'bg-purple-900/50' : 'bg-purple-100'}
            iconBorderColor={darkMode ? 'border-purple-700/50' : 'border-purple-200'}
            isLast
          />
        </div>

        {/* PHYSICAL SYMPTOMS */}
        <div className="mb-6">
          <h4 className={`text-xs ${textSecondary} uppercase tracking-wider mb-3 px-2`}>Physical Symptoms</h4>

          <ToggleCard
            icon={<Activity className="w-5 h-5" />}
            title="Cramps & Pain"
            description="Period cramp intensity"
            value={shareCramps}
            onChange={(val) => handleToggle(setShareCramps, val)}
            darkMode={darkMode}
            iconColor="text-red-500"
            iconBgColor={darkMode ? 'bg-red-900/50' : 'bg-red-100'}
            iconBorderColor={darkMode ? 'border-red-700/50' : 'border-red-200'}
          />

          <ToggleCard
            icon={<Brain className="w-5 h-5" />}
            title="Headaches & Migraines"
            description="Head pain tracking"
            value={shareHeadaches}
            onChange={(val) => handleToggle(setShareHeadaches, val)}
            darkMode={darkMode}
            iconColor="text-orange-500"
            iconBgColor={darkMode ? 'bg-orange-900/50' : 'bg-orange-100'}
            iconBorderColor={darkMode ? 'border-orange-700/50' : 'border-orange-200'}
          />

          <ToggleCard
            icon={<Heart className="w-5 h-5" />}
            title="Breast Tenderness"
            description="Chest sensitivity levels"
            value={shareBreastTenderness}
            onChange={(val) => handleToggle(setShareBreastTenderness, val)}
            darkMode={darkMode}
            iconColor="text-pink-500"
            iconBgColor={darkMode ? 'bg-pink-900/50' : 'bg-pink-100'}
            iconBorderColor={darkMode ? 'border-pink-700/50' : 'border-pink-200'}
          />

          <ToggleCard
            icon={<Droplet className="w-5 h-5" />}
            title="Bloating & Water Retention"
            description="Fluid retention tracking"
            value={shareBloating}
            onChange={(val) => handleToggle(setShareBloating, val)}
            darkMode={darkMode}
            iconColor="text-blue-500"
            iconBgColor={darkMode ? 'bg-blue-900/50' : 'bg-blue-100'}
            iconBorderColor={darkMode ? 'border-blue-700/50' : 'border-blue-200'}
          />

          <ToggleCard
            icon={<Sparkles className="w-5 h-5" />}
            title="Acne & Skin Changes"
            description="Skin condition tracking"
            value={shareAcne}
            onChange={(val) => handleToggle(setShareAcne, val)}
            darkMode={darkMode}
            iconColor="text-yellow-500"
            iconBgColor={darkMode ? 'bg-yellow-900/50' : 'bg-yellow-100'}
            iconBorderColor={darkMode ? 'border-yellow-700/50' : 'border-yellow-200'}
            isLast
          />
        </div>

        {/* EMOTIONAL & MENTAL HEALTH */}
        <div className="mb-6">
          <h4 className={`text-xs ${textSecondary} uppercase tracking-wider mb-3 px-2`}>Emotional & Mental Health</h4>

          <ToggleCard
            icon={<Smile className="w-5 h-5" />}
            title="Mood Tracking"
            description="Daily mood and emotions"
            value={shareMood}
            onChange={(val) => handleToggle(setShareMood, val)}
            darkMode={darkMode}
            iconColor="text-yellow-500"
            iconBgColor={darkMode ? 'bg-yellow-900/50' : 'bg-yellow-100'}
            iconBorderColor={darkMode ? 'border-yellow-700/50' : 'border-yellow-200'}
          />

          <ToggleCard
            icon={<AlertCircle className="w-5 h-5" />}
            title="Anxiety & Stress Levels"
            description="Mental wellness tracking"
            value={shareAnxiety}
            onChange={(val) => handleToggle(setShareAnxiety, val)}
            darkMode={darkMode}
            iconColor="text-orange-500"
            iconBgColor={darkMode ? 'bg-orange-900/50' : 'bg-orange-100'}
            iconBorderColor={darkMode ? 'border-orange-700/50' : 'border-orange-200'}
          />

          <ToggleCard
            icon={<Activity className="w-5 h-5" />}
            title="Energy Levels"
            description="Daily energy and fatigue"
            value={shareEnergyLevels}
            onChange={(val) => handleToggle(setShareEnergyLevels, val)}
            darkMode={darkMode}
            iconColor="text-green-500"
            iconBgColor={darkMode ? 'bg-green-900/50' : 'bg-green-100'}
            iconBorderColor={darkMode ? 'border-green-700/50' : 'border-green-200'}
          />

          <ToggleCard
            icon={<Moon className="w-5 h-5" />}
            title="Sleep Quality"
            description="Sleep patterns and duration"
            value={shareSleep}
            onChange={(val) => handleToggle(setShareSleep, val)}
            darkMode={darkMode}
            iconColor="text-indigo-500"
            iconBgColor={darkMode ? 'bg-indigo-900/50' : 'bg-indigo-100'}
            iconBorderColor={darkMode ? 'border-indigo-700/50' : 'border-indigo-200'}
            isLast
          />
        </div>

        {/* INTIMATE & FERTILITY */}
        <div className="mb-6">
          <h4 className={`text-xs ${textSecondary} uppercase tracking-wider mb-3 px-2`}>Intimate & Fertility</h4>

          <ToggleCard
            icon={<Heart className="w-5 h-5" />}
            title="Intimacy Tracking"
            description="Protected & unprotected activity"
            value={shareIntimacy}
            onChange={(val) => handleToggle(setShareIntimacy, val)}
            darkMode={darkMode}
            iconColor="text-pink-500"
            iconBgColor={darkMode ? 'bg-pink-900/50' : 'bg-pink-100'}
            iconBorderColor={darkMode ? 'border-pink-700/50' : 'border-pink-200'}
          />

          <ToggleCard
            icon={<Thermometer className="w-5 h-5" />}
            title="Libido & Sex Drive"
            description="Interest and desire levels"
            value={shareLibido}
            onChange={(val) => handleToggle(setShareLibido, val)}
            darkMode={darkMode}
            iconColor="text-red-500"
            iconBgColor={darkMode ? 'bg-red-900/50' : 'bg-red-100'}
            iconBorderColor={darkMode ? 'border-red-700/50' : 'border-red-200'}
          />

          <ToggleCard
            icon={<Baby className="w-5 h-5" />}
            title="Ovulation Signs"
            description="Cervical mucus & body temp"
            value={shareOvulation}
            onChange={(val) => handleToggle(setShareOvulation, val)}
            darkMode={darkMode}
            iconColor="text-green-500"
            iconBgColor={darkMode ? 'bg-green-900/50' : 'bg-green-100'}
            iconBorderColor={darkMode ? 'border-green-700/50' : 'border-green-200'}
            isLast
          />
        </div>

        {/* HEALTH & MEDICAL */}
        <div className="mb-6">
          <h4 className={`text-xs ${textSecondary} uppercase tracking-wider mb-3 px-2`}>Health & Medical</h4>

          <ToggleCard
            icon={<Pill className="w-5 h-5" />}
            title="Medications"
            description="Birth control & prescriptions"
            value={shareMedications}
            onChange={(val) => handleToggle(setShareMedications, val)}
            darkMode={darkMode}
            iconColor="text-blue-500"
            iconBgColor={darkMode ? 'bg-blue-900/50' : 'bg-blue-100'}
            iconBorderColor={darkMode ? 'border-blue-700/50' : 'border-blue-200'}
            secure
          />

          <ToggleCard
            icon={<Stethoscope className="w-5 h-5" />}
            title="Medical Appointments"
            description="Doctor visits & checkups"
            value={shareAppointments}
            onChange={(val) => handleToggle(setShareAppointments, val)}
            darkMode={darkMode}
            iconColor="text-purple-500"
            iconBgColor={darkMode ? 'bg-purple-900/50' : 'bg-purple-100'}
            iconBorderColor={darkMode ? 'border-purple-700/50' : 'border-purple-200'}
          />

          <ToggleCard
            icon={<FileText className="w-5 h-5" />}
            title="Medical Notes"
            description="Private health observations"
            value={shareMedicalNotes}
            onChange={(val) => handleToggle(setShareMedicalNotes, val)}
            darkMode={darkMode}
            iconColor="text-gray-500"
            iconBgColor={darkMode ? 'bg-gray-700/50' : 'bg-gray-100'}
            iconBorderColor={darkMode ? 'border-gray-600/50' : 'border-gray-300'}
            secure
          />

          <ToggleCard
            icon={<Pill className="w-5 h-5" />}
            title="Vitamins & Supplements"
            description="Daily supplement tracking"
            value={shareVitamins}
            onChange={(val) => handleToggle(setShareVitamins, val)}
            darkMode={darkMode}
            iconColor="text-orange-500"
            iconBgColor={darkMode ? 'bg-orange-900/50' : 'bg-orange-100'}
            iconBorderColor={darkMode ? 'border-orange-700/50' : 'border-orange-200'}
            isLast
          />
        </div>

        {/* LIFESTYLE TRACKING */}
        <div className="mb-6">
          <h4 className={`text-xs ${textSecondary} uppercase tracking-wider mb-3 px-2`}>Lifestyle Tracking</h4>

          <ToggleCard
            icon={<Dumbbell className="w-5 h-5" />}
            title="Exercise & Activity"
            description="Workout logs and intensity"
            value={shareExercise}
            onChange={(val) => handleToggle(setShareExercise, val)}
            darkMode={darkMode}
            iconColor="text-green-500"
            iconBgColor={darkMode ? 'bg-green-900/50' : 'bg-green-100'}
            iconBorderColor={darkMode ? 'border-green-700/50' : 'border-green-200'}
          />

          <ToggleCard
            icon={<Utensils className="w-5 h-5" />}
            title="Nutrition & Diet"
            description="Food intake and cravings"
            value={shareNutrition}
            onChange={(val) => handleToggle(setShareNutrition, val)}
            darkMode={darkMode}
            iconColor="text-yellow-500"
            iconBgColor={darkMode ? 'bg-yellow-900/50' : 'bg-yellow-100'}
            iconBorderColor={darkMode ? 'border-yellow-700/50' : 'border-yellow-200'}
          />

          <ToggleCard
            icon={<Droplet className="w-5 h-5" />}
            title="Water Intake"
            description="Daily hydration tracking"
            value={shareWater}
            onChange={(val) => handleToggle(setShareWater, val)}
            darkMode={darkMode}
            iconColor="text-blue-500"
            iconBgColor={darkMode ? 'bg-blue-900/50' : 'bg-blue-100'}
            iconBorderColor={darkMode ? 'border-blue-700/50' : 'border-blue-200'}
          />

          <ToggleCard
            icon={<Activity className="w-5 h-5" />}
            title="Weight & Body Metrics"
            description="Weight changes over time"
            value={shareWeight}
            onChange={(val) => handleToggle(setShareWeight, val)}
            darkMode={darkMode}
            iconColor="text-purple-500"
            iconBgColor={darkMode ? 'bg-purple-900/50' : 'bg-purple-100'}
            iconBorderColor={darkMode ? 'border-purple-700/50' : 'border-purple-200'}
            secure
            isLast
          />
        </div>

        {/* AI & INSIGHTS */}
        <div className="mb-6">
          <h4 className={`text-xs ${textSecondary} uppercase tracking-wider mb-3 px-2`}>AI & Insights</h4>

          <ToggleCard
            icon={<MessageCircle className="w-5 h-5" />}
            title="AMARA AI Conversations"
            description="Your private chats with AMARA"
            value={shareAmaraChats}
            onChange={(val) => handleToggle(setShareAmaraChats, val)}
            darkMode={darkMode}
            iconColor="text-purple-500"
            iconBgColor={darkMode ? 'bg-purple-900/50' : 'bg-purple-100'}
            iconBorderColor={darkMode ? 'border-purple-700/50' : 'border-purple-200'}
            secure
          />

          <ToggleCard
            icon={<Activity className="w-5 h-5" />}
            title="Health Insights"
            description="AI-generated health reports"
            value={shareHealthInsights}
            onChange={(val) => handleToggle(setShareHealthInsights, val)}
            darkMode={darkMode}
            iconColor="text-green-500"
            iconBgColor={darkMode ? 'bg-green-900/50' : 'bg-green-100'}
            iconBorderColor={darkMode ? 'border-green-700/50' : 'border-green-200'}
          />

          <ToggleCard
            icon={<Sparkles className="w-5 h-5" />}
            title="Recommendations"
            description="Personalized suggestions"
            value={shareRecommendations}
            onChange={(val) => handleToggle(setShareRecommendations, val)}
            darkMode={darkMode}
            iconColor="text-pink-500"
            iconBgColor={darkMode ? 'bg-pink-900/50' : 'bg-pink-100'}
            iconBorderColor={darkMode ? 'border-pink-700/50' : 'border-pink-200'}
            isLast
          />
        </div>

        {/* Privacy Notice */}
        <div className={`${cardBg} rounded-3xl p-5 shadow-lg border ${cardBorder}`}>
          <div className="flex items-start gap-4">
            <div className={`w-10 h-10 rounded-full ${darkMode ? 'bg-blue-900/50' : 'bg-blue-100'} flex items-center justify-center flex-shrink-0 border ${darkMode ? 'border-blue-700/50' : 'border-blue-200'}`}>
              <Lock className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <div>
              <h3 className={`${textPrimary} mb-1`}>Your Privacy Matters</h3>
              <p className={`text-xs ${textSecondary} leading-relaxed`}>
                You can change these settings at any time. Your partner will only see data from the moment you enable sharing, not historical data.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav
        onNavigate={onNavigate}
        currentScreen="partner-link"
        darkMode={darkMode}
      />
    </div>
  );
}

// Reusable Toggle Card Component
interface ToggleCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  value: boolean;
  onChange: (value: boolean) => void;
  darkMode: boolean;
  iconColor: string;
  iconBgColor: string;
  iconBorderColor: string;
  secure?: boolean;
  isLast?: boolean;
}

function ToggleCard({
  icon,
  title,
  description,
  value,
  onChange,
  darkMode,
  iconColor,
  iconBgColor,
  iconBorderColor,
  secure = false,
  isLast = false
}: ToggleCardProps) {
  const cardBg = darkMode ? 'bg-gray-800/80' : 'bg-white';
  const cardBorder = darkMode ? 'border-gray-700/50' : 'border-purple-100';
  const textPrimary = darkMode ? 'text-gray-200' : 'text-gray-900';
  const textSecondary = darkMode ? 'text-gray-500' : 'text-gray-600';

  return (
    <div className={`${cardBg} rounded-3xl p-5 shadow-lg border ${cardBorder} ${!isLast ? 'mb-3' : ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className={`w-10 h-10 rounded-full ${iconBgColor} flex items-center justify-center border ${iconBorderColor}`}>
            <div className={iconColor}>{icon}</div>
          </div>
          <div className="text-left flex-1">
            <div className="flex items-center gap-2">
              <h3 className={textPrimary}>{title}</h3>
              {secure && (
                <Lock className={`w-3 h-3 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
              )}
            </div>
            <p className={`text-xs ${textSecondary}`}>{description}</p>
          </div>
        </div>
        <button
          onClick={() => onChange(!value)}
          className={`relative w-12 h-7 rounded-full transition-colors shadow-inner ${
            value ? 'bg-gradient-to-r from-purple-500 to-pink-500' : darkMode ? 'bg-gray-700' : 'bg-gray-300'
          }`}
        >
          <div
            className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform flex items-center justify-center ${
              value ? 'translate-x-5' : ''
            }`}
          >
            {value ? (
              <CheckCircle className="w-3 h-3 text-purple-600" />
            ) : (
              <EyeOff className="w-3 h-3 text-gray-400" />
            )}
          </div>
        </button>
      </div>
    </div>
  );
}
