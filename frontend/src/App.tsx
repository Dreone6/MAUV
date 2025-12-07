import { CreateAvatarScreen } from './components/onboarding/CreateAvatarScreen';
import { AvatarSelectionScreen } from './components/onboarding/AvatarSelectionScreen';
import { CustomizeFairyScreen } from './components/onboarding/CustomizeFairyScreen';
import { DeviceIntegrationsScreen } from './components/onboarding/DeviceIntegrationsScreen';
import { AppleHealthPermissionsScreen } from './components/onboarding/AppleHealthPermissionsScreen';
import { TermsOfServiceScreen } from './components/legal/TermsOfServiceScreen';
import { PrivacyPolicyScreen } from './components/legal/PrivacyPolicyScreen';
import { ScreenBoard } from './components/ScreenBoard';
import { FloatingSymbolsBackground } from './components/FloatingSymbolsBackground';
import { AppleHealthPermissionsDetailScreen } from './components/onboarding/AppleHealthPermissionsDetailScreen';
import { useState } from 'react';
import { SplashScreen } from './components/onboarding/SplashScreen';
import { OnboardingScreen } from './components/onboarding/OnboardingScreen';
import { WelcomeScreen } from './components/onboarding/WelcomeScreen';
import { TestimonialScreen } from './components/onboarding/TestimonialScreen';
import { SocialLoginScreen } from './components/onboarding/SocialLoginScreen';
import { PartnerCodeScreen } from './components/onboarding/PartnerCodeScreen';
import { CyclePowerScreen } from './components/onboarding/CyclePowerScreen';
import { PremiumScreen } from './components/onboarding/PremiumScreen';
import { SupportFeaturesScreen } from './components/onboarding/SupportFeaturesScreen';
import { TrackingSmarterScreen } from './components/onboarding/TrackingSmarterScreen';
import { SymptomPatternsScreen } from './components/onboarding/SymptomPatternsScreen';
import { MAUVPlusScreen } from './components/onboarding/MAUVPlusScreen';
import { UnlockPlusScreen } from './components/onboarding/UnlockPlusScreen';
import { LinkSmartDeviceScreen } from './components/onboarding/LinkSmartDeviceScreen';
import { LinkSmartDevicesScreen } from './components/onboarding/LinkSmartDevicesScreen';
import { PurchaseSuccessScreen } from './components/onboarding/PurchaseSuccessScreen';
import { ManagePMSScreen } from './components/onboarding/ManagePMSScreen';
import { SettingUpPlanScreen } from './components/onboarding/SettingUpPlanScreen';
import { NameInputScreen } from './components/onboarding/NameInputScreen';
import { BirthdayInputScreen } from './components/onboarding/BirthdayInputScreen';
import { WelcomeNameScreen } from './components/onboarding/WelcomeNameScreen';
import { PinpointFertileDaysScreen } from './components/onboarding/PinpointFertileDaysScreen';
import { FertileWindowExplainScreen } from './components/onboarding/FertileWindowExplainScreen';
import { OvulationGoalScreen } from './components/onboarding/OvulationGoalScreen';
import { OvulationKeyScreen } from './components/onboarding/OvulationKeyScreen';
import { CustomizeRemindersScreen } from './components/onboarding/CustomizeRemindersScreen';
import { MainGoalScreen } from './components/onboarding/MainGoalScreen';
import { LHSurgeScreen } from './components/onboarding/LHSurgeScreen';
import { HormonalRhythmScreen } from './components/onboarding/HormonalRhythmScreen';
import { HealthConditionsScreen } from './components/onboarding/HealthConditionsScreen';
import { FertilityChangesDailyScreen } from './components/onboarding/FertilityChangesDailyScreen';
import { HowMauvHelpsFertilityScreen } from './components/onboarding/HowMauvHelpsFertilityScreen';
import { UnderstandingFertileWindowScreen } from './components/onboarding/UnderstandingFertileWindowScreen';
import { ImportantInformationScreen } from './components/onboarding/ImportantInformationScreen';
import { LastPeriodStartScreen } from './components/onboarding/LastPeriodStartScreen';
import { ConfirmDetailsScreen } from './components/onboarding/ConfirmDetailsScreen';
import { PeriodFrequencyScreen } from './components/onboarding/PeriodFrequencyScreen';
import { CongratulationsScreen } from './components/onboarding/CongratulationsScreen';
import { CycleChangesScreen } from './components/onboarding/CycleChangesScreen';
import { BirthControlScreen } from './components/onboarding/BirthControlScreen';
import { TemperatureOvulationScreen } from './components/onboarding/TemperatureOvulationScreen';
import { UnlockPremiumModal } from './components/onboarding/UnlockPremiumModal';
import { NotificationPermissionScreen } from './components/onboarding/NotificationPermissionScreen';
import { TermsAgreementScreen } from './components/onboarding/TermsAgreementScreen';
import { IntroduceAmaraScreen } from './components/onboarding/IntroduceAmaraScreen';
import { DeviceAppIntegrationsScreen } from './components/DeviceAppIntegrationsScreen';
import { HomeDashboard } from './components/HomeDashboard';
import { CalendarView } from './components/CalendarView';
import { SymptomTracker } from './components/SymptomTracker';
import { HealthInsights } from './components/HealthInsights';
import { Settings } from './components/Settings';
import { AmaraAIChat } from './components/AmaraAIChat';
import { TribalChat } from './components/TribalChat';
import { PartnerLink } from './components/PartnerLink';
import { PartnerSettings } from './components/PartnerSettings';
import { PartnerSharingSettings } from './components/PartnerSharingSettings';
import { PartnerOnboarding } from './components/PartnerOnboarding';
import { PartnerDashboard } from './components/PartnerDashboard';
import { HistoricalLogs, CycleData } from './types';
import { formatDate } from './utils/healthAnalytics';

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
        return <HowMauvHelpsFertilityScreen onNext={() => setCurrentView('ovulation-goal')} onSkip={() => setCurrentView('ovulation-goal')} />;
      
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