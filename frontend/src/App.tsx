// === REACT ===
import { useState } from 'react';

// === TYPES & UTILS ===
import { HistoricalLogs, CycleData } from './types';
import { formatDate } from './utils/healthAnalytics';

// === AUTH SCREENS ===
import { SocialLoginScreen } from './components/auth/SocialLoginScreen';
import { EmailSignInScreen } from './components/auth/EmailSignInScreen';
import { EmailSignupScreen } from './components/auth/EmailSignupScreen';
import { ForgotPasswordScreen } from './components/auth/ForgotPasswordScreen';
import { ResetPasswordScreen } from './components/auth/ResetPasswordScreen';
import { OTPVerificationScreen } from './components/auth/OTPVerificationScreen';
import { PasswordUpdatedSuccessScreen } from './components/auth/PasswordUpdatedSuccessScreen';

// === ONBOARDING: WELCOME ===
import { SplashScreen } from './components/onboarding/welcome/SplashScreen';
import { OnboardingScreen } from './components/onboarding/welcome/OnboardingScreen';
import { WelcomeScreen } from './components/onboarding/welcome/WelcomeScreen';
import { TestimonialScreen } from './components/onboarding/welcome/TestimonialScreen';

// === ONBOARDING: PROFILE SETUP ===
import { NameInputScreen } from './components/onboarding/profile/NameInputScreen';
import { BirthdayInputScreen } from './components/onboarding/profile/BirthdayInputScreen';
import { WelcomeNameScreen } from './components/onboarding/profile/WelcomeNameScreen';
import { ConfirmDetailsScreen } from './components/onboarding/profile/ConfirmDetailsScreen';
import { TermsAgreementScreen } from './components/onboarding/profile/TermsAgreementScreen';

// === ONBOARDING: HEALTH SETUP ===
import { MainGoalScreen } from './components/onboarding/health-setup/MainGoalScreen';
import { HealthConditionsScreen } from './components/onboarding/health-setup/HealthConditionsScreen';
import { BirthControlScreen } from './components/onboarding/health-setup/BirthControlScreen';

// === ONBOARDING: CYCLE SETUP ===
import { LastPeriodStartScreen } from './components/onboarding/cycle-setup/LastPeriodStartScreen';
import { PeriodFrequencyScreen } from './components/onboarding/cycle-setup/PeriodFrequencyScreen';
import { CycleChangesScreen } from './components/onboarding/cycle-setup/CycleChangesScreen';
import { SettingUpPlanScreen } from './components/onboarding/cycle-setup/SettingUpPlanScreen';
import { ImportantInformationScreen } from './components/onboarding/cycle-setup/ImportantInformationScreen';

// === ONBOARDING: EDUCATION ===
import { CyclePowerScreen } from './components/onboarding/education/CyclePowerScreen';
import { SupportFeaturesScreen } from './components/onboarding/education/SupportFeaturesScreen';
import { TrackingSmarterScreen } from './components/onboarding/education/TrackingSmarterScreen';
import { SymptomPatternsScreen } from './components/onboarding/education/SymptomPatternsScreen';
import { HormonalRhythmScreen } from './components/onboarding/education/HormonalRhythmScreen';
import { LHSurgeScreen } from './components/onboarding/education/LHSurgeScreen';
import { TemperatureOvulationScreen } from './components/onboarding/education/TemperatureOvulationScreen';
import { FertilityChangesDailyScreen } from './components/onboarding/education/FertilityChangesDailyScreen';
import { UnderstandingFertileWindowScreen } from './components/onboarding/education/UnderstandingFertileWindowScreen';
import { HowMAUVHelpsFertilityScreen } from './components/onboarding/education/HowMAUVHelpsFertilityScreen';
import { OvulationGoalScreen } from './components/onboarding/education/OvulationGoalScreen';
import { OvulationKeyScreen } from './components/onboarding/education/OvulationKeyScreen';
import { PinpointFertileDaysScreen } from './components/onboarding/education/PinpointFertileDaysScreen';
import { FertileWindowExplainScreen } from './components/onboarding/education/FertileWindowExplainScreen';
import { ManagePMSScreen } from './components/onboarding/education/ManagePMSScreen';

// === ONBOARDING: PERSONALIZATION ===
import { IntroduceAmaraScreen } from './components/onboarding/personalization/IntroduceAmaraScreen';
import { CreateAvatarScreen } from './components/onboarding/personalization/CreateAvatarScreen';
import { AvatarSelectionScreen } from './components/onboarding/personalization/AvatarSelectionScreen';
import { CustomizeFairyScreen } from './components/onboarding/personalization/CustomizeFairyScreen';
import { CustomizeRemindersScreen } from './components/onboarding/personalization/CustomizeRemindersScreen';

// === ONBOARDING: DEVICES ===
import { NotificationPermissionScreen } from './components/onboarding/devices/NotificationPermissionScreen';
import { DeviceIntegrationsScreen } from './components/onboarding/devices/DeviceIntegrationsScreen';
import { AppleHealthPermissionsScreen } from './components/onboarding/devices/AppleHealthPermissionsScreen';
import { AppleHealthPermissionsDetailScreen } from './components/onboarding/devices/AppleHealthPermissionsDetailScreen';
import { LinkSmartDeviceScreen } from './components/onboarding/devices/LinkSmartDeviceScreen';
import { LinkSmartDevicesScreen } from './components/onboarding/devices/LinkSmartDevicesScreen';
import { DeviceAppIntegrationsScreen } from './components/onboarding/devices/DeviceAppIntegrationsScreen';

// === ONBOARDING: PREMIUM ===
import { PremiumScreen } from './components/onboarding/premium/PremiumScreen';
import { MAUVPlusScreen } from './components/onboarding/premium/MAUVPlusScreen';
import { UnlockPlusScreen } from './components/onboarding/premium/UnlockPlusScreen';
import { UnlockPremiumModal } from './components/onboarding/premium/UnlockPremiumModal';
import { PurchaseSuccessScreen } from './components/onboarding/premium/PurchaseSuccessScreen';

// === ONBOARDING: COMPLETION ===
import { CongratulationsScreen } from './components/onboarding/completion/CongratulationsScreen';
import { PartnerCodeScreen } from './components/onboarding/completion/PartnerCodeScreen';

// === MAIN APP: DASHBOARD ===
import { HomeDashboard } from './components/dashboard/HomeDashboard';
import { HomeDashboardDark } from './components/dashboard/HomeDashboardDark';
import { RearrangeableHomeDashboard } from './components/dashboard/RearrangeableHomeDashboard';

// === MAIN APP: CALENDAR ===
import { CalendarView } from './components/calendar/CalendarView';
import { CalendarViewDark } from './components/calendar/CalendarViewDark';
import { CyclePhaseRing } from './components/calendar/CyclePhaseRing';

// === MAIN APP: TRACKING ===
import { SymptomTracker } from './components/tracking/SymptomTracker';
import { LogModal } from './components/tracking/LogModal';

// === MAIN APP: HEALTH ===
import { HealthInsights } from './components/health/HealthInsights';

// === MAIN APP: CHAT ===
import { AmaraAIChat } from './components/chat/AmaraAIChat';
import { AmaraAIChatDark } from './components/chat/AmaraAIChatDark';
import { TribalChat } from './components/chat/TribalChat';
import { TribalChatDark } from './components/chat/TribalChatDark';

// === PARTNER SCREENS ===
import { PartnerLink } from './components/partner/PartnerLink';
import { PartnerLinkDark } from './components/partner/PartnerLinkDark';
import { PartnerSettings } from './components/partner/PartnerSettings';
import { PartnerSharingSettings } from './components/partner/PartnerSharingSettings';
import { PartnerSharingSettingsDark } from './components/partner/PartnerSharingSettingsDark';
import { PartnerOnboarding } from './components/partner/PartnerOnboarding';
import { PartnerDashboard } from './components/partner/PartnerDashboard';

// === SETTINGS ===
import { Settings } from './components/Settings';
import { SettingsScreen } from './components/SettingsScreen';
import { SettingsScreenDark } from './components/SettingsScreenDark';

// === LEGAL ===
import { TermsOfServiceScreen } from './components/legal/TermsOfServiceScreen';
import { PrivacyPolicyScreen } from './components/legal/PrivacyPolicyScreen';

// === SHARED COMPONENTS ===
import { ScreenBoard } from './components/shared/ScreenBoard';
import { FloatingSymbolsBackground } from './components/shared/FloatingSymbolsBackground';
import { FloatingBackground } from './components/shared/FloatingBackground';
import { BottomNav } from './components/shared/BottomNav';
import { AmaraNavButton } from './components/shared/AmaraNavButton';
import { AmaraAvatar } from './components/shared/AmaraAvatar';
import { CircularProgress } from './components/shared/CircularProgress';
import { FeatureCard } from './components/shared/FeatureCard';
import { OnboardingSlide } from './components/shared/OnboardingSlide';
import { NotificationSettingsModal } from './components/shared/NotificationSettingsModal';

export type ScreenType = 'board' | 'splash' | 'onboarding' | 'device-integrations' | 'apple-health' | 'cycle-power' | 'premium' | 'social-login' | 'welcome' | 'testimonial' | 'partner-code' | 'support-features' | 'tracking-smarter' | 'symptom-patterns' | 'mauv-plus' | 'unlock-plus' | 'link-smart-device' | 'link-smart-devices' | 'purchase-success' | 'manage-pms' | 'setting-up-plan' | 'name-input' | 'birthday-input' | 'welcome-name' | 'pinpoint-fertile-days' | 'fertile-window-explain' | 'ovulation-goal' | 'ovulation-key' | 'customize-reminders' | 'main-goal' | 'lh-surge' | 'hormonal-rhythm' | 'health-conditions' | 'fertility-changes-daily' | 'how-mauv-helps-fertility' | 'understanding-fertile-window' | 'important-information' | 'last-period-start' | 'confirm-details' | 'period-frequency' | 'congratulations' | 'cycle-changes' | 'birth-control' | 'temperature-ovulation' | 'unlock-premium-modal' | 'notification-permission' | 'terms-agreement' | 'introduce-amara' | 'create-avatar' | 'avatar-selection' | 'customize-fairy' | 'apple-health-detail' | 'device-app-integrations' | 'home-dashboard' | 'calendar' | 'symptom-tracker' | 'insights' | 'settings' | 'amara-chat' | 'tribal-chat' | 'partner-link' | 'partner-settings' | 'partner-sharing-settings' | 'partner-onboarding' | 'partner-dashboard' | 'terms-of-service' | 'privacy-policy';

export default function App() {
  const [currentView, setCurrentView] = useState<ScreenType>('splash');
  const [userName, setUserName] = useState('Olivia');
  
  // Historical logs and cycle data state
  const [historicalLogs, setHistoricalLogs] = useState<HistoricalLogs>(() => {
    // Generate mock data for the past 60 days
    const logs: HistoricalLogs = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Simulate period tracking (every 28-30 days)
    const periodDays = [0, 1, 2, 3, 4, 28, 29, 30, 31, 32, 56, 57, 58, 59];
    
    for (let i = 0; i < 60; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = formatDate(date);
      
      logs[dateStr] = {};
      
      // Add flow data on period days
      if (periodDays.includes(i)) {
        logs[dateStr].flow = {
          categoryId: 'flow',
          selectedOptions: i % 28 === 0 || i % 28 === 1 ? ['medium'] : ['light'],
          timestamp: date,
        };
      }
      
      // Add random symptoms
      if (i <= 2 || (i >= 26 && i <= 30) || (i >= 54 && i <= 58)) {
        logs[dateStr].symptoms = {
          categoryId: 'symptoms',
          selectedOptions: ['cramps', 'fatigue'],
          timestamp: date,
        };
      }
      
      if (i >= 5 && i <= 10) {
        logs[dateStr].symptoms = {
          categoryId: 'symptoms',
          selectedOptions: ['bloating'],
          timestamp: date,
        };
      }
      
      // Add random mood data
      if (i % 3 === 0) {
        logs[dateStr].mood = {
          categoryId: 'mood',
          selectedOptions: i % 2 === 0 ? ['happy', 'energetic'] : ['calm'],
          timestamp: date,
        };
      }
      
      // Add random temperature data
      if (i % 2 === 0) {
        logs[dateStr].temp = {
          categoryId: 'temp',
          numericValue: 97.5 + (Math.random() * 1.5),
          timestamp: date,
        };
      }
    }
    
    return logs;
  });
  
  const [cycleData, setCycleData] = useState<CycleData>({
    lastPeriodStart: formatDate(new Date()), // Today
    averageCycleLength: 28,
    periodLength: 5,
  });

  const renderScreen = () => {
    switch (currentView) {
      // === SPLASH SCREEN ===
      case 'splash':
        return <SplashScreen onComplete={() => setCurrentView('onboarding')} />;
      
      // === PHASE 1: WELCOME & INTRODUCTION ===
      case 'onboarding':
        return <OnboardingScreen onBack={() => setCurrentView('board')} onNext={() => setCurrentView('welcome')} />;
      
      case 'welcome':
        return <WelcomeScreen onBack={() => setCurrentView('onboarding')} onGetStarted={() => setCurrentView('testimonial')} />;
      
      case 'testimonial':
        return <TestimonialScreen onBack={() => setCurrentView('welcome')} onNext={() => setCurrentView('social-login')} />;
      
      // === PHASE 2: ACCOUNT CREATION ===
      case 'social-login':
        return <SocialLoginScreen onBack={() => setCurrentView('testimonial')} onNext={() => setCurrentView('partner-code')} />;
      
      case 'partner-code':
        return <PartnerCodeScreen onBack={() => setCurrentView('social-login')} onNext={() => setCurrentView('name-input')} />;
      
      // === PHASE 3: PERSONAL INFORMATION ===
      case 'name-input':
        return <NameInputScreen onBack={() => setCurrentView('partner-code')} onNext={(name) => { setUserName(name); setCurrentView('birthday-input'); }} />;
      
      case 'birthday-input':
        return <BirthdayInputScreen onBack={() => setCurrentView('name-input')} onNext={() => setCurrentView('welcome-name')} />;
      
      case 'welcome-name':
        return <WelcomeNameScreen onBack={() => setCurrentView('birthday-input')} onContinue={() => setCurrentView('main-goal')} userName={userName} />;
      
      // === PHASE 4: HEALTH GOALS & CONDITIONS ===
      case 'main-goal':
        return <MainGoalScreen onBack={() => setCurrentView('welcome-name')} onNext={() => setCurrentView('health-conditions')} />;
      
      case 'health-conditions':
        return <HealthConditionsScreen onBack={() => setCurrentView('main-goal')} onNext={() => setCurrentView('birth-control')} />;
      
      case 'birth-control':
        return <BirthControlScreen onNext={() => setCurrentView('terms-agreement')} onPreferNotToShare={() => setCurrentView('terms-agreement')} />;
      
      // === PHASE 5: LEGAL & PRIVACY ===
      case 'terms-agreement':
        return <TermsAgreementScreen 
          onNext={() => setCurrentView('important-information')} 
          onBack={() => setCurrentView('birth-control')} 
          onViewTerms={() => setCurrentView('terms-of-service')}
          onViewPrivacy={() => setCurrentView('privacy-policy')}
        />; 
      
      case 'important-information':
        return <ImportantInformationScreen onAgree={() => setCurrentView('notification-permission')} />;
      
      case 'notification-permission':
        return <NotificationPermissionScreen onEnable={() => setCurrentView('device-integrations')} onNotNow={() => setCurrentView('device-integrations')} />;
      
      // === PHASE 6: DEVICE & APP INTEGRATIONS ===
      case 'device-integrations':
        return <DeviceIntegrationsScreen onBack={() => setCurrentView('notification-permission')} onAppleHealthClick={() => setCurrentView('apple-health')} onNext={() => setCurrentView('last-period-start')} />;
      
      case 'apple-health':
        return <AppleHealthPermissionsScreen onBack={() => setCurrentView('device-integrations')} />;
      
      case 'device-app-integrations':
        return <DeviceAppIntegrationsScreen onBack={() => setCurrentView('board')} onManagePermissions={() => setCurrentView('apple-health-detail')} />;
      
      case 'apple-health-detail':
        return <AppleHealthPermissionsDetailScreen onBack={() => setCurrentView('device-app-integrations')} onDisconnect={() => setCurrentView('device-app-integrations')} />;
      
      // === PHASE 7: CYCLE DATA COLLECTION ===
      case 'last-period-start':
        return <LastPeriodStartScreen onNext={() => setCurrentView('period-frequency')} onNotSure={() => setCurrentView('period-frequency')} />;
      
      case 'period-frequency':
        return <PeriodFrequencyScreen onNext={() => setCurrentView('cycle-changes')} />;
      
      case 'cycle-changes':
        return <CycleChangesScreen onNext={() => setCurrentView('confirm-details')} onSkip={() => setCurrentView('confirm-details')} />;
      
      case 'confirm-details':
        return <ConfirmDetailsScreen onConfirm={() => setCurrentView('setting-up-plan')} onEdit={() => setCurrentView('last-period-start')} />;
      
      case 'setting-up-plan':
        return <SettingUpPlanScreen onComplete={() => setCurrentView('cycle-power')} />;
      
      // === PHASE 8: EDUCATIONAL CONTENT - CYCLES ===
      case 'cycle-power':
        return <CyclePowerScreen onBack={() => setCurrentView('setting-up-plan')} />;
      
      case 'support-features':
        return <SupportFeaturesScreen onBack={() => setCurrentView('board')} onGetStarted={() => setCurrentView('tracking-smarter')} />;
      
      case 'tracking-smarter':
        return <TrackingSmarterScreen onBack={() => setCurrentView('support-features')} onStartJourney={() => setCurrentView('symptom-patterns')} />;
      
      case 'symptom-patterns':
        return <SymptomPatternsScreen onBack={() => setCurrentView('tracking-smarter')} onNext={() => setCurrentView('hormonal-rhythm')} />;
      
      // === PHASE 9: EDUCATIONAL CONTENT - HORMONES & FERTILITY ===
      case 'hormonal-rhythm':
        return <HormonalRhythmScreen onNext={() => setCurrentView('lh-surge')} />;
      
      case 'lh-surge':
        return <LHSurgeScreen onBack={() => setCurrentView('hormonal-rhythm')} onNext={() => setCurrentView('temperature-ovulation')} />;
      
      case 'temperature-ovulation':
        return <TemperatureOvulationScreen onNext={() => setCurrentView('fertility-changes-daily')} />;
      
      case 'fertility-changes-daily':
        return <FertilityChangesDailyScreen onNext={() => setCurrentView('understanding-fertile-window')} />;
      
      case 'understanding-fertile-window':
        return <UnderstandingFertileWindowScreen onNext={() => setCurrentView('how-mauv-helps-fertility')} />;
      
      case 'how-mauv-helps-fertility':
        return <HowMAUVHelpsFertilityScreen onNext={() => setCurrentView('ovulation-goal')} onSkip={() => setCurrentView('ovulation-goal')} />;
      
      // === PHASE 10: FERTILITY TRACKING SETUP ===
      case 'ovulation-goal':
        return <OvulationGoalScreen onNext={() => setCurrentView('ovulation-key')} />;
      
      case 'ovulation-key':
        return <OvulationKeyScreen onNext={() => setCurrentView('pinpoint-fertile-days')} />;
      
      case 'pinpoint-fertile-days':
        return <PinpointFertileDaysScreen onNext={() => setCurrentView('fertile-window-explain')} onSkip={() => setCurrentView('fertile-window-explain')} />;
      
      case 'fertile-window-explain':
        return <FertileWindowExplainScreen onNext={() => setCurrentView('manage-pms')} onSkip={() => setCurrentView('manage-pms')} />;
      
      // === PHASE 11: PERSONALIZATION ===
      case 'manage-pms':
        return <ManagePMSScreen onBack={() => setCurrentView('fertile-window-explain')} onNext={() => setCurrentView('customize-reminders')} />;
      
      case 'customize-reminders':
        return <CustomizeRemindersScreen onFinish={() => setCurrentView('introduce-amara')} />;
      
      case 'introduce-amara':
        return <IntroduceAmaraScreen onNext={() => setCurrentView('create-avatar')} />;
      
      case 'create-avatar':
        return <CreateAvatarScreen onCreateAvatar={() => setCurrentView('avatar-selection')} />;
      
      case 'avatar-selection':
        return <AvatarSelectionScreen onBack={() => setCurrentView('create-avatar')} onSelectAvatar={() => setCurrentView('mauv-plus')} onCustomize={() => setCurrentView('customize-fairy')} />;
      
      case 'customize-fairy':
        return <CustomizeFairyScreen onBack={() => setCurrentView('avatar-selection')} onSaveFairy={() => setCurrentView('mauv-plus')} />;
      
      // === PHASE 12: PREMIUM OFFERS ===
      case 'mauv-plus':
        return <MAUVPlusScreen onBack={() => setCurrentView('create-avatar')} onStartTrial={() => setCurrentView('unlock-plus')} />;
      
      case 'unlock-plus':
        return <UnlockPlusScreen onBack={() => setCurrentView('mauv-plus')} onStartTrial={() => setCurrentView('purchase-success')} />;
      
      case 'premium':
        return <PremiumScreen onBack={() => setCurrentView('board')} onStartTrial={() => setCurrentView('purchase-success')} onNotNow={() => setCurrentView('link-smart-device')} />;
      
      case 'unlock-premium-modal':
        return <UnlockPremiumModal onStartTrial={() => setCurrentView('purchase-success')} onNotNow={() => setCurrentView('link-smart-device')} />;
      
      case 'purchase-success':
        return <PurchaseSuccessScreen onContinue={() => setCurrentView('link-smart-device')} />;
      
      // === PHASE 13: SMART DEVICE INTEGRATION ===
      case 'link-smart-device':
        return <LinkSmartDeviceScreen onBack={() => setCurrentView('purchase-success')} onNext={() => setCurrentView('link-smart-devices')} onSkip={() => setCurrentView('congratulations')} />;
      
      case 'link-smart-devices':
        return <LinkSmartDevicesScreen onBack={() => setCurrentView('link-smart-device')} onNext={() => setCurrentView('congratulations')} onSkip={() => setCurrentView('congratulations')} />;
      
      // === PHASE 14: COMPLETION ===
      case 'congratulations':
        return <CongratulationsScreen onUnlock={() => setCurrentView('home-dashboard')} />;
      
      // === MAIN APP SCREENS ===
      case 'home-dashboard':
        return <HomeDashboard onNavigate={(screen) => setCurrentView(screen)} />;
      
      case 'calendar':
        return <CalendarView onBack={() => setCurrentView('home-dashboard')} onNavigate={(screen) => setCurrentView(screen)} />;
      
      case 'symptom-tracker':
        return <SymptomTracker onBack={() => setCurrentView('home-dashboard')} />;
      
      case 'insights':
        return <HealthInsights 
          onBack={() => setCurrentView('home-dashboard')} 
          onNavigate={(screen) => setCurrentView(screen)}
          historicalLogs={historicalLogs}
          cycleData={cycleData}
        />; 
      
      case 'settings':
        return <Settings onBack={() => setCurrentView('home-dashboard')} onNavigate={(screen) => setCurrentView(screen)} />;
      
      case 'amara-chat':
        return <AmaraAIChat onBack={() => setCurrentView('home-dashboard')} />;
      
      case 'tribal-chat':
        return <TribalChat onBack={() => setCurrentView('home-dashboard')} onNavigate={(screen) => setCurrentView(screen)} />;
      
      case 'partner-link':
        return <PartnerLink onBack={() => setCurrentView('home-dashboard')} onNavigate={(screen) => setCurrentView(screen)} />;
      
      case 'partner-settings':
        return <PartnerSettings onBack={() => setCurrentView('partner-link')} onNavigate={(screen) => setCurrentView(screen)} />;
      
      case 'partner-sharing-settings':
        return <PartnerSharingSettings onBack={() => setCurrentView('partner-settings')} onNavigate={(screen) => setCurrentView(screen)} />;
      
      case 'partner-onboarding':
        return <PartnerOnboarding onComplete={() => setCurrentView('partner-dashboard')} />;
      
      case 'partner-dashboard':
        return <PartnerDashboard onLogout={() => setCurrentView('board')} />;
      
      case 'terms-of-service':
        return <TermsOfServiceScreen onBack={() => setCurrentView('terms-agreement')} />;
      
      case 'privacy-policy':
        return <PrivacyPolicyScreen onBack={() => setCurrentView('terms-agreement')} />;
      
      default:
        return <ScreenBoard onSelectScreen={(screen) => setCurrentView(screen)} />;
    }
  };

  return (
    <>
      <FloatingSymbolsBackground />
      {renderScreen()}
    </>
  );
}