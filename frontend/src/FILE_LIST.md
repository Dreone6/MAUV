# Complete File List for MAUV App Export

## 📋 All Files to Copy (In Order)

### Configuration Files (Create these first)
1. `package.json` - Use EXPORT_PACKAGE.json as template
2. `vite.config.ts` - Use VITE_CONFIG.txt
3. `tsconfig.json` - Use TSCONFIG.txt
4. `.gitignore` (create new)

---

### Root Level Files
1. `App.tsx` ⭐ MAIN ENTRY POINT
2. `types.ts` ⭐ TYPE DEFINITIONS

---

### Utils Folder (`/utils`)
1. `utils/healthAnalytics.ts` ⭐ CORE ANALYTICS

---

### Styles Folder (`/styles`)
1. `styles/globals.css` ⭐ TAILWIND + CUSTOM TOKENS

---

### Components Folder (`/components`)

#### Main App Screens (12 files)
1. `components/HomeDashboard.tsx` ⭐
2. `components/CalendarView.tsx` ⭐
3. `components/HealthInsights.tsx` ⭐
4. `components/AmaraAIChat.tsx`
5. `components/TribalChat.tsx`
6. `components/PartnerLink.tsx`
7. `components/PartnerSettings.tsx`
8. `components/PartnerOnboarding.tsx`
9. `components/PartnerDashboard.tsx`
10. `components/Settings.tsx`
11. `components/SymptomTracker.tsx`
12. `components/DeviceAppIntegrationsScreen.tsx`

#### Support Components (4 files)
13. `components/CyclePhaseRing.tsx` ⭐ (Period circle graph)
14. `components/FloatingBackground.tsx`
15. `components/FloatingSymbolsBackground.tsx`
16. `components/ScreenBoard.tsx` (Development board)

#### Figma Components (`/components/figma`)
17. `components/figma/ImageWithFallback.tsx` ⭐

---

### Onboarding Screens (`/components/onboarding`) - 49 Files

#### Core Onboarding (5 files)
1. `components/onboarding/SplashScreen.tsx` ⭐
2. `components/onboarding/OnboardingScreen.tsx`
3. `components/onboarding/WelcomeScreen.tsx`
4. `components/onboarding/TestimonialScreen.tsx`
5. `components/onboarding/SocialLoginScreen.tsx`

#### Premium & Features (8 files)
6. `components/onboarding/PartnerCodeScreen.tsx`
7. `components/onboarding/CyclePowerScreen.tsx`
8. `components/onboarding/PremiumScreen.tsx`
9. `components/onboarding/SupportFeaturesScreen.tsx`
10. `components/onboarding/TrackingSmarterScreen.tsx`
11. `components/onboarding/SymptomPatternsScreen.tsx`
12. `components/onboarding/MAUVPlusScreen.tsx`
13. `components/onboarding/UnlockPlusScreen.tsx`

#### Device Integration (4 files)
14. `components/onboarding/LinkSmartDeviceScreen.tsx`
15. `components/onboarding/LinkSmartDevicesScreen.tsx`
16. `components/onboarding/DeviceIntegrationsScreen.tsx`
17. `components/onboarding/AppleHealthPermissionsScreen.tsx`
18. `components/onboarding/AppleHealthPermissionsDetailScreen.tsx`

#### Setup & Personalization (6 files)
19. `components/onboarding/PurchaseSuccessScreen.tsx`
20. `components/onboarding/ManagePMSScreen.tsx`
21. `components/onboarding/SettingUpPlanScreen.tsx`
22. `components/onboarding/NameInputScreen.tsx`
23. `components/onboarding/BirthdayInputScreen.tsx`
24. `components/onboarding/WelcomeNameScreen.tsx`

#### Fertility & Goals (8 files)
25. `components/onboarding/PinpointFertileDaysScreen.tsx`
26. `components/onboarding/FertileWindowExplainScreen.tsx`
27. `components/onboarding/OvulationGoalScreen.tsx`
28. `components/onboarding/OvulationKeyScreen.tsx`
29. `components/onboarding/CustomizeRemindersScreen.tsx`
30. `components/onboarding/MainGoalScreen.tsx`
31. `components/onboarding/LHSurgeScreen.tsx`
32. `components/onboarding/HormonalRhythmScreen.tsx`

#### Health & Tracking (10 files)
33. `components/onboarding/HealthConditionsScreen.tsx`
34. `components/onboarding/FertilityChangesDailyScreen.tsx`
35. `components/onboarding/HowMAUVHelpsFertilityScreen.tsx`
36. `components/onboarding/UnderstandingFertileWindowScreen.tsx`
37. `components/onboarding/ImportantInformationScreen.tsx`
38. `components/onboarding/LastPeriodStartScreen.tsx`
39. `components/onboarding/ConfirmDetailsScreen.tsx`
40. `components/onboarding/PeriodFrequencyScreen.tsx`
41. `components/onboarding/CongratulationsScreen.tsx`
42. `components/onboarding/CycleChangesScreen.tsx`

#### Final Setup (8 files)
43. `components/onboarding/BirthControlScreen.tsx`
44. `components/onboarding/TemperatureOvulationScreen.tsx`
45. `components/onboarding/UnlockPremiumModal.tsx`
46. `components/onboarding/NotificationPermissionScreen.tsx`
47. `components/onboarding/TermsAgreementScreen.tsx`
48. `components/onboarding/IntroduceAmaraScreen.tsx`
49. `components/onboarding/CreateAvatarScreen.tsx`
50. `components/onboarding/AvatarSelectionScreen.tsx`
51. `components/onboarding/CustomizeFairyScreen.tsx`

---

### Legal Screens (`/components/legal`) - 2 Files
1. `components/legal/TermsOfServiceScreen.tsx`
2. `components/legal/PrivacyPolicyScreen.tsx`

---

## 📊 Summary

**Total Files:** 80+ files
- Configuration: 4 files
- Root: 2 files
- Utils: 1 file
- Styles: 1 file
- Main Components: 17 files
- Onboarding: 51 files
- Legal: 2 files
- Documentation: 4 files

**⭐ = Critical/Core files (must copy first)**

---

## 🎯 Copy Priority Order

### Phase 1: Foundation (Copy First)
1. Configuration files (package.json, vite.config.ts, tsconfig.json)
2. types.ts
3. utils/healthAnalytics.ts
4. styles/globals.css

### Phase 2: Core App (Copy Second)
5. App.tsx
6. components/figma/ImageWithFallback.tsx
7. components/HomeDashboard.tsx
8. components/CalendarView.tsx
9. components/HealthInsights.tsx
10. components/CyclePhaseRing.tsx

### Phase 3: Support Features (Copy Third)
11. All other main components
12. Support components (FloatingBackground, etc.)

### Phase 4: Onboarding Flow (Copy Fourth)
13. components/onboarding/SplashScreen.tsx
14. All other onboarding screens

### Phase 5: Legal & Extras (Copy Last)
15. Legal screens
16. ScreenBoard.tsx

---

## 🚨 Critical Dependencies Between Files

### App.tsx depends on:
- ALL component imports
- types.ts
- utils/healthAnalytics.ts

### HomeDashboard.tsx depends on:
- CyclePhaseRing.tsx
- FloatingBackground.tsx
- types.ts
- utils/healthAnalytics.ts

### CalendarView.tsx depends on:
- types.ts
- utils/healthAnalytics.ts

### HealthInsights.tsx depends on:
- types.ts
- utils/healthAnalytics.ts
- FloatingBackground.tsx

---

## 💾 Quick Copy Script

If you want to script the copy process:

```bash
# Create directory structure
mkdir -p src/components/onboarding
mkdir -p src/components/figma
mkdir -p src/components/legal
mkdir -p src/utils
mkdir -p src/styles
mkdir -p src/assets

# Then manually copy each file maintaining the structure above
```

---

## ✅ Verification Checklist

After copying all files:

- [ ] All 80+ files copied
- [ ] Directory structure matches
- [ ] No missing imports
- [ ] All dependencies installed
- [ ] Assets folder created
- [ ] Image imports updated
- [ ] App compiles without errors
- [ ] Can navigate through all screens
