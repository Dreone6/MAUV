import { Check, Sparkles } from 'lucide-react@0.487.0';
import amaraLogo from 'figma:asset/aa826e4365d1d92f4e0bff911c331606c8b18a52.png';
import { ScreenType } from '../App';

interface Screen {
  id: ScreenType;
  name: string;
  status: 'completed' | 'in-progress' | 'pending';
  description: string;
}

interface ScreenBoardProps {
  onSelectScreen: (screen: ScreenType) => void;
}

export function ScreenBoard({ onSelectScreen }: ScreenBoardProps) {
  const screens: Screen[] = [
    // === SPLASH & ONBOARDING FLOW ===
    {
      id: 'splash',
      name: 'Splash Screen',
      status: 'completed',
      description: 'Animated 6-second logo splash screen',
    },
    {
      id: 'onboarding',
      name: 'Onboarding Carousel',
      status: 'completed',
      description: 'Welcome carousel with app features',
    },
    {
      id: 'welcome',
      name: 'Welcome to MAUV',
      status: 'completed',
      description: 'Introduction to main features',
    },
    {
      id: 'testimonial',
      name: 'Testimonial Screen',
      status: 'completed',
      description: 'User review and tracking benefits',
    },
    {
      id: 'social-login',
      name: 'Social Login',
      status: 'completed',
      description: 'Sign up with Apple, Google, or Email',
    },
    {
      id: 'partner-code',
      name: 'Partner Code',
      status: 'completed',
      description: 'Select if using for yourself or partner',
    },
    {
      id: 'name-input',
      name: 'Name Input',
      status: 'completed',
      description: 'Collect user preferred name',
    },
    {
      id: 'birthday-input',
      name: 'Birthday Input',
      status: 'completed',
      description: 'Date picker for birthday selection',
    },
    {
      id: 'welcome-name',
      name: 'Welcome [Name]',
      status: 'completed',
      description: 'Personalized welcome message',
    },
    {
      id: 'main-goal',
      name: 'Main Goal Selection',
      status: 'completed',
      description: 'Select primary use case (track cycle, conceive, etc)',
    },
    {
      id: 'health-conditions',
      name: 'Health Conditions',
      status: 'completed',
      description: 'Multi-select health conditions checklist',
    },
    {
      id: 'birth-control',
      name: 'Birth Control Selection',
      status: 'completed',
      description: 'Select current birth control method',
    },
    {
      id: 'terms-agreement',
      name: 'Terms & Privacy Agreement',
      status: 'completed',
      description: 'Accept terms, privacy policy, and data processing',
    },
    {
      id: 'important-information',
      name: 'Important Information',
      status: 'completed',
      description: 'Disclaimers and terms acknowledgment',
    },
    {
      id: 'notification-permission',
      name: 'Notification Permission',
      status: 'completed',
      description: 'Request permission for cycle reminders',
    },
    {
      id: 'device-integrations',
      name: 'Device Integrations',
      status: 'completed',
      description: 'Connect health apps and devices',
    },
    {
      id: 'apple-health',
      name: 'Apple Health Permissions',
      status: 'completed',
      description: 'Manage health data permissions',
    },
    {
      id: 'last-period-start',
      name: 'Last Period Start Date',
      status: 'completed',
      description: 'Calendar to select last period start',
    },
    {
      id: 'period-frequency',
      name: 'Period Frequency',
      status: 'completed',
      description: 'Select how regular periods are',
    },
    {
      id: 'cycle-changes',
      name: 'Cycle Changes Selection',
      status: 'completed',
      description: 'Multi-select symptoms experienced during cycle',
    },
    {
      id: 'confirm-details',
      name: 'Confirm Cycle Details',
      status: 'completed',
      description: 'Review cycle length and period info',
    },
    {
      id: 'setting-up-plan',
      name: 'Setting Up Plan',
      status: 'completed',
      description: 'Loading screen with personalization',
    },
    {
      id: 'cycle-power',
      name: 'Cycle Power Screen',
      status: 'completed',
      description: 'Motivational splash screen',
    },
    {
      id: 'support-features',
      name: 'Support Features',
      status: 'completed',
      description: 'Overview of tracking capabilities',
    },
    {
      id: 'tracking-smarter',
      name: 'Tracking Smarter',
      status: 'completed',
      description: 'Explanation of ML-powered predictions',
    },
    {
      id: 'symptom-patterns',
      name: 'Symptom Patterns',
      status: 'completed',
      description: 'Visual symptom tracking overview',
    },
    {
      id: 'hormonal-rhythm',
      name: 'Hormonal Rhythm',
      status: 'completed',
      description: 'Estrogen and progesterone cycle chart',
    },
    {
      id: 'lh-surge',
      name: 'LH Surge Education',
      status: 'completed',
      description: 'Graph showing LH levels and ovulation prediction',
    },
    {
      id: 'temperature-ovulation',
      name: 'Temperature & Ovulation',
      status: 'completed',
      description: 'BBT tracking explanation with graph',
    },
    {
      id: 'fertility-changes-daily',
      name: 'Fertility Changes Daily',
      status: 'completed',
      description: 'Graph showing fertility levels throughout cycle',
    },
    {
      id: 'understanding-fertile-window',
      name: 'Understanding Fertile Window',
      status: 'completed',
      description: 'Timeline visualization of fertile days',
    },
    {
      id: 'how-mauv-helps-fertility',
      name: 'How MAUV Helps Fertility',
      status: 'completed',
      description: 'AI predictions, alerts, and insights overview',
    },
    {
      id: 'ovulation-goal',
      name: 'Ovulation Goal',
      status: 'completed',
      description: 'Ask if user wants to track ovulation',
    },
    {
      id: 'ovulation-key',
      name: 'Ovulation Key to Fertility',
      status: 'completed',
      description: 'Educational screen about ovulation importance',
    },
    {
      id: 'pinpoint-fertile-days',
      name: 'Pinpoint Fertile Days',
      status: 'completed',
      description: 'Calendar to select fertile window',
    },
    {
      id: 'fertile-window-explain',
      name: 'Fertile Window Explanation',
      status: 'completed',
      description: 'Explain LH and BBT tracking',
    },
    {
      id: 'manage-pms',
      name: 'Manage PMS',
      status: 'completed',
      description: 'PMS symptom tracking introduction',
    },
    {
      id: 'introduce-amara',
      name: 'Introduce AMARA AI',
      status: 'completed',
      description: 'Overview of AMARA AI assistant features',
    },
    {
      id: 'mauv-plus',
      name: 'MAUV Plus Pricing',
      status: 'completed',
      description: 'Premium subscription options',
    },
    {
      id: 'unlock-plus',
      name: 'Unlock MAUV Plus',
      status: 'completed',
      description: 'Alternative premium screen with features',
    },
    {
      id: 'premium',
      name: 'Premium Subscription',
      status: 'completed',
      description: 'Unlock premium features trial',
    },
    {
      id: 'unlock-premium-modal',
      name: 'Unlock Premium Modal',
      status: 'completed',
      description: 'Premium subscription modal with trial offer',
    },
    {
      id: 'purchase-success',
      name: 'Purchase Success',
      status: 'completed',
      description: 'Confirmation modal for premium purchase',
    },
    {
      id: 'congratulations',
      name: 'Congratulations',
      status: 'completed',
      description: 'Onboarding completion celebration',
    },
    
    // === MAIN APP SCREENS ===
    {
      id: 'home-dashboard',
      name: 'Home Dashboard',
      status: 'completed',
      description: 'Main dashboard with cycle tracking',
    },
    {
      id: 'calendar',
      name: 'Calendar View',
      status: 'completed',
      description: 'Monthly cycle calendar',
    },
    {
      id: 'insights',
      name: 'Health Insights',
      status: 'completed',
      description: 'Analytics and trends',
    },
    {
      id: 'amara-chat',
      name: 'Amara AI Chat',
      status: 'completed',
      description: 'Smart AI assistant and confidant',
    },
    {
      id: 'tribal-chat',
      name: 'Tribal Chat',
      status: 'completed',
      description: 'Community forum for women',
    },
    {
      id: 'partner-link',
      name: 'Partner Link/Sync',
      status: 'completed',
      description: 'Share cycle status with partner',
    },
    
    // === SETTINGS & CONFIGURATION ===
    {
      id: 'settings',
      name: 'Profile Settings',
      status: 'completed',
      description: 'User preferences and settings',
    },
    {
      id: 'create-avatar',
      name: 'Create Avatar',
      status: 'completed',
      description: 'Avatar creation prompt with privacy info',
    },
    {
      id: 'customize-reminders',
      name: 'Customize Reminders',
      status: 'completed',
      description: 'Notification preferences and toggles',
    },
    {
      id: 'link-smart-device',
      name: 'Link Smart Device',
      status: 'completed',
      description: 'Smartwatch connection intro carousel',
    },
    {
      id: 'link-smart-devices',
      name: 'Link Smart Devices',
      status: 'completed',
      description: 'Multi-device selection and linking',
    },
    
    // === ADDITIONAL SCREENS ===
    {
      id: 'symptom-tracker',
      name: 'Symptom Tracker',
      status: 'completed',
      description: 'Log and track symptoms',
    },
    {
      id: 'device-app-integrations',
      name: 'Device & App Integrations Detail',
      status: 'completed',
      description: 'Manage connected devices and permissions',
    },
    {
      id: 'apple-health-detail',
      name: 'Apple Health Permissions Detail',
      status: 'completed',
      description: 'Detailed toggle settings for Apple Health data',
    },
    {
      id: 'partner-settings',
      name: 'Partner Sharing Settings',
      status: 'completed',
      description: 'Control what data to share',
    },
    {
      id: 'partner-sharing-settings',
      name: 'Advanced Partner Sharing',
      status: 'completed',
      description: 'Detailed granular privacy controls',
    },
    {
      id: 'partner-onboarding',
      name: 'Partner Onboarding',
      status: 'completed',
      description: 'Male partner code entry flow',
    },
    {
      id: 'partner-dashboard',
      name: 'Partner Dashboard',
      status: 'completed',
      description: 'Male partner view with shared data',
    },
  ];

  const handleScreenClick = (screenId: ScreenType) => {
    onSelectScreen(screenId);
  };

  const completedCount = screens.filter(s => s.status === 'completed').length;
  const progress = (completedCount / screens.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0f2e] via-[#2a1a3e] to-[#1a0f2e] text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex justify-center mb-6">
            <img src={amaraLogo} alt="AMARA Logo" className="h-16 w-auto" />
          </div>
          <h1 className="text-4xl mb-4 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
            Screen Development Board
          </h1>
          <p className="text-gray-400">
            Track progress on all AMARA app screens
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12 bg-purple-950/30 rounded-2xl p-6 border border-purple-800/30">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-300">Overall Progress</span>
            <span className="text-sm text-purple-300">{completedCount} of {screens.length} screens</span>
          </div>
          <div className="w-full h-3 bg-purple-950/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Screen Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {screens.map((screen, index) => (
            <button
              key={`${screen.id}-${index}`}
              onClick={() => handleScreenClick(screen.id)}
              className="bg-gradient-to-br from-purple-900/20 to-purple-950/20 backdrop-blur-sm border border-purple-800/30 rounded-3xl p-6 text-left transition-all duration-300 hover:border-purple-600/50 hover:shadow-lg hover:shadow-purple-900/20 hover:scale-105 active:scale-100"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl text-white">
                  {screen.name}
                </h3>
                {screen.status === 'completed' ? (
                  <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-400/50 flex items-center justify-center">
                    <Check className="w-5 h-5 text-green-400" />
                  </div>
                ) : screen.status === 'in-progress' ? (
                  <div className="w-8 h-8 rounded-full bg-yellow-500/20 border border-yellow-400/50 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-500/20 border border-gray-400/50" />
                )}
              </div>

              <p className="text-gray-400 text-sm mb-4">
                {screen.description}
              </p>

              <div className="flex items-center gap-2">
                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    screen.status === 'completed'
                      ? 'bg-green-500/20 text-green-400 border border-green-400/30'
                      : screen.status === 'in-progress'
                      ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-400/30'
                      : 'bg-gray-500/20 text-gray-400 border border-gray-400/30'
                  }`}
                >
                  {screen.status === 'completed' ? 'Completed' : screen.status === 'in-progress' ? 'In Progress' : 'Pending'}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <span>In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-400" />
            <span>Pending</span>
          </div>
        </div>
      </div>
    </div>
  );
}