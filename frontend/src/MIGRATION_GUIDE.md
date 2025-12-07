# MAUV App - Complete Migration Guide

## 📦 Project Overview

This is a complete women's health tracking app with 61+ screens including:
- Full onboarding flow (49 screens)
- Home Dashboard with cycle tracking
- Interactive Calendar with logging
- Health Insights with analytics
- Amara AI Chat assistant
- Tribal Chat community
- Partner linking system
- Custom fairy avatar system

---

## 🚀 Quick Start - New Project Setup

### Step 1: Create Your New Project

```bash
# Using Vite (Recommended)
npm create vite@latest mauv-app -- --template react-ts
cd mauv-app

# OR using Create React App
npx create-react-app mauv-app --template typescript
cd mauv-app
```

### Step 2: Install Dependencies

```bash
npm install lucide-react@0.487.0 recharts react-hook-form@7.55.0 sonner@2.0.3 motion react-slick react-responsive-masonry react-dnd react-dnd-html5-backend re-resizable
```

### Step 3: Install Tailwind CSS v4.0

```bash
npm install tailwindcss@next @tailwindcss/vite@next
```

Add to `vite.config.ts`:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

---

## 📁 File Structure to Copy

Copy ALL files from Figma Make to your new project maintaining this structure:

```
src/
├── App.tsx                          # Main app component with routing
├── types.ts                         # TypeScript type definitions
├── utils/
│   └── healthAnalytics.ts          # Cycle calculations & analytics
├── styles/
│   └── globals.css                 # Tailwind config & custom tokens
├── components/
│   ├── HomeDashboard.tsx           # Main dashboard
│   ├── CalendarView.tsx            # Interactive calendar
│   ├── HealthInsights.tsx          # Health analytics
│   ├── AmaraAIChat.tsx             # AI chat interface
│   ├── TribalChat.tsx              # Community chat
│   ├── PartnerLink.tsx             # Partner features
│   ├── PartnerSettings.tsx         # Partner settings
│   ├── PartnerOnboarding.tsx       # Partner onboarding
│   ├── PartnerDashboard.tsx        # Partner dashboard
│   ├── Settings.tsx                # App settings
│   ├── SymptomTracker.tsx          # Symptom logging
│   ├── CyclePhaseRing.tsx          # Period circle graph
│   ├── FloatingBackground.tsx      # Animated background
│   ├── ScreenBoard.tsx             # Development board
│   ├── FloatingSymbolsBackground.tsx
│   ├── DeviceAppIntegrationsScreen.tsx
│   ├── figma/
│   │   └── ImageWithFallback.tsx   # Image component
│   ├── onboarding/
│   │   ├── SplashScreen.tsx
│   │   ├── OnboardingScreen.tsx
│   │   ├── WelcomeScreen.tsx
│   │   ├── TestimonialScreen.tsx
│   │   ├── SocialLoginScreen.tsx
│   │   ├── PartnerCodeScreen.tsx
│   │   ├── CyclePowerScreen.tsx
│   │   ├── PremiumScreen.tsx
│   │   ├── SupportFeaturesScreen.tsx
│   │   ├── TrackingSmarterScreen.tsx
│   │   ├── SymptomPatternsScreen.tsx
│   │   ├── MAUVPlusScreen.tsx
│   │   ├── UnlockPlusScreen.tsx
│   │   ├── LinkSmartDeviceScreen.tsx
│   │   ├── LinkSmartDevicesScreen.tsx
│   │   ├── PurchaseSuccessScreen.tsx
│   │   ├── ManagePMSScreen.tsx
│   │   ├── SettingUpPlanScreen.tsx
│   │   ├── NameInputScreen.tsx
│   │   ├── BirthdayInputScreen.tsx
│   │   ├── WelcomeNameScreen.tsx
│   │   ├── PinpointFertileDaysScreen.tsx
│   │   ├── FertileWindowExplainScreen.tsx
│   │   ├── OvulationGoalScreen.tsx
│   │   ├── OvulationKeyScreen.tsx
│   │   ├── CustomizeRemindersScreen.tsx
│   │   ├── MainGoalScreen.tsx
│   │   ├── LHSurgeScreen.tsx
│   │   ├── HormonalRhythmScreen.tsx
│   │   ├── HealthConditionsScreen.tsx
│   │   ├── FertilityChangesDailyScreen.tsx
│   │   ├── HowMAUVHelpsFertilityScreen.tsx
│   │   ├── UnderstandingFertileWindowScreen.tsx
│   │   ├── ImportantInformationScreen.tsx
│   │   ├── LastPeriodStartScreen.tsx
│   │   ├── ConfirmDetailsScreen.tsx
│   │   ├── PeriodFrequencyScreen.tsx
│   │   ├── CongratulationsScreen.tsx
│   │   ├── CycleChangesScreen.tsx
│   │   ├── BirthControlScreen.tsx
│   │   ├── TemperatureOvulationScreen.tsx
│   │   ├── UnlockPremiumModal.tsx
│   │   ├── NotificationPermissionScreen.tsx
│   │   ├── TermsAgreementScreen.tsx
│   │   ├── IntroduceAmaraScreen.tsx
│   │   ├── CreateAvatarScreen.tsx
│   │   ├── AvatarSelectionScreen.tsx
│   │   ├── CustomizeFairyScreen.tsx
│   │   ├── DeviceIntegrationsScreen.tsx
│   │   └── AppleHealthPermissionsScreen.tsx
│   │       AppleHealthPermissionsDetailScreen.tsx
│   └── legal/
│       ├── TermsOfServiceScreen.tsx
│       └── PrivacyPolicyScreen.tsx
└── assets/                          # Create this folder for images
```

---

## 🖼️ Handling Figma Assets

### Issue: `figma:asset` imports won't work outside Figma Make

**All files that use this pattern:**
```typescript
import img from "figma:asset/abc123.png"
```

### Solution: Download and relocate assets

1. **Identify all `figma:asset` imports** in your code
2. **Create an assets folder**: `src/assets/` or `public/images/`
3. **Download images** from Figma or use placeholders
4. **Update imports**:

```typescript
// OLD (Figma Make):
import amaraLogo from "figma:asset/amara-logo.png"

// NEW (Regular React):
import amaraLogo from "./assets/amara-logo.png"
// OR if in public folder:
const amaraLogo = "/images/amara-logo.png"
```

### Key Asset: Amara Logo (MAUV Butterfly)

This logo is used throughout the app. You'll need to:
1. Export the butterfly logo from Figma
2. Save as `amara-logo.png` 
3. Place in `src/assets/`
4. Update all imports

**Files using amara-logo:**
- `CalendarView.tsx`
- `HealthInsights.tsx`
- `AmaraAIChat.tsx`
- `HomeDashboard.tsx`

---

## 🎨 Styling Setup

### Import globals.css in your main file

In `src/main.tsx` or `src/index.tsx`:

```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/globals.css'  // ← Add this

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### Tailwind Configuration

The `globals.css` file contains all Tailwind v4.0 custom tokens. No separate `tailwind.config.js` is needed.

---

## 🔧 Required Code Changes

### 1. Update Image Imports

Search for all instances of `figma:asset` and replace:

```typescript
// Find all:
import.*from.*"figma:asset

// Replace pattern:
import imageName from "./assets/image-name.png"
```

### 2. Update SVG Imports

If you have SVG imports from `/imports` folder:
```typescript
// OLD:
import svgPaths from "./imports/svg-wg56ef214f"

// NEW: Place SVGs in assets and import
import svgPaths from "./assets/svg-wg56ef214f"
```

### 3. Check Route Typing

If using React Router instead of state-based routing, you'll need to:
- Install `react-router-dom`
- Replace the `currentView` state system with routes
- Update `ScreenType` navigation

---

## 🎯 Entry Point Setup

Your `App.tsx` is the main entry point with all routing logic built-in using state management.

### Modify App Start Screen

Change the initial screen in `App.tsx`:

```typescript
// Line ~75 in App.tsx
const [currentView, setCurrentView] = useState<ScreenType>('splash');

// Options:
// 'splash' - Start with splash screen
// 'onboarding' - Skip to onboarding
// 'home-dashboard' - Skip directly to main app
// 'board' - View development board
```

---

## 📦 Complete package.json

```json
{
  "name": "mauv-app",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "0.487.0",
    "recharts": "^2.12.0",
    "react-hook-form": "7.55.0",
    "sonner": "2.0.3",
    "motion": "^10.16.0",
    "react-slick": "^0.29.0",
    "react-responsive-masonry": "^2.1.7",
    "react-dnd": "^16.0.1",
    "react-dnd-html5-backend": "^16.0.1",
    "re-resizable": "^6.9.11"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0",
    "tailwindcss": "^4.0.0-alpha.25",
    "@tailwindcss/vite": "^4.0.0-alpha.25"
  }
}
```

---

## ✅ Migration Checklist

### Phase 1: Setup
- [ ] Create new React + TypeScript project
- [ ] Install all dependencies
- [ ] Setup Tailwind CSS v4.0
- [ ] Copy `package.json` dependencies

### Phase 2: Copy Files
- [ ] Copy entire `/components` folder
- [ ] Copy `/utils` folder
- [ ] Copy `/styles` folder
- [ ] Copy `types.ts`
- [ ] Copy `App.tsx`

### Phase 3: Assets
- [ ] Create `/assets` or `/public/images` folder
- [ ] Download Amara logo (butterfly)
- [ ] Download any other Figma assets
- [ ] Update all `figma:asset` imports

### Phase 4: Testing
- [ ] Run `npm install`
- [ ] Run `npm run dev`
- [ ] Test splash screen loads
- [ ] Test navigation through onboarding
- [ ] Test home dashboard
- [ ] Test calendar interactions
- [ ] Test insights calculations
- [ ] Test all 61 screens

### Phase 5: Optimization
- [ ] Add React Router (optional)
- [ ] Add state management (Redux/Zustand) if needed
- [ ] Add backend API integration
- [ ] Add real authentication
- [ ] Replace mock data with real data
- [ ] Add error boundaries
- [ ] Add loading states
- [ ] Optimize images

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot find module 'figma:asset'"
**Solution:** Replace all `figma:asset` imports with regular file imports

### Issue: Tailwind styles not applying
**Solution:** Ensure `globals.css` is imported in your main entry file and Tailwind plugin is in vite.config

### Issue: TypeScript errors for missing types
**Solution:** Ensure `types.ts` is in the correct location and imported properly

### Issue: Icons not rendering
**Solution:** Verify `lucide-react@0.487.0` is installed (specific version required)

### Issue: Recharts not displaying
**Solution:** Install recharts and ensure parent containers have defined height/width

---

## 🔐 Production Considerations

### Security
- Remove mock authentication
- Add proper JWT/session handling
- Secure API endpoints
- Add input validation
- Sanitize user data

### Data Persistence
- Replace localStorage with database (Supabase, Firebase, etc.)
- Add proper data migration scripts
- Implement backup strategies

### Performance
- Add code splitting
- Lazy load components
- Optimize images (WebP format)
- Add service worker for offline support
- Implement virtual scrolling for large lists

### Analytics
- Add user analytics (Mixpanel, Amplitude)
- Track screen views
- Monitor errors (Sentry)

---

## 📞 Need Help?

### Key Features Implemented:
1. ✅ 49 onboarding screens
2. ✅ Interactive period tracking with cycle phase ring
3. ✅ Calendar with day details modal
4. ✅ Health insights with real analytics
5. ✅ Amara AI chat interface
6. ✅ Tribal community chat
7. ✅ Partner linking system with 24 preset fairies
8. ✅ Custom avatar creation
9. ✅ Full symptom tracking
10. ✅ Beautiful animations and shadows
11. ✅ Responsive design (mobile-first)
12. ✅ Development progress board

### Color Scheme:
- **Primary:** Purple (#9333ea, #a855f7)
- **Secondary:** Pink (#ec4899, #f472b6)
- **Accent:** Teal, Blue, Orange (phase-specific)
- **Background:** Gradient purple-pink
- **Phase Colors:**
  - Menstrual: Red (#dc2626)
  - Follicular: Pink (#ec4899)
  - Ovulation: Purple (#a855f7)
  - Luteal: Blue (#3b82f6)

---

## 🎉 You're Ready!

Once you've completed the checklist above, your MAUV app will be fully functional in your new project. All 61 screens with beautiful animations, interactive features, and health analytics will be ready to use!

**Happy coding! 💜🦋**
