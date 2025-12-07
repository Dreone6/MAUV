# 🚀 MAUV App - Quick Start Guide

## Copy-Paste Ready Commands

### 1️⃣ Create New Project (Choose One)

**Option A: Vite (Recommended - Faster)**
```bash
npm create vite@latest mauv-app -- --template react-ts
cd mauv-app
```

**Option B: Create React App**
```bash
npx create-react-app mauv-app --template typescript
cd mauv-app
```

---

### 2️⃣ Install All Dependencies (One Command)

```bash
npm install lucide-react@0.487.0 recharts react-hook-form@7.55.0 sonner@2.0.3 motion react-slick slick-carousel react-responsive-masonry react-dnd react-dnd-html5-backend re-resizable tailwindcss@next @tailwindcss/vite@next
```

---

### 3️⃣ Create Directory Structure

```bash
mkdir -p src/components/onboarding src/components/figma src/components/legal src/utils src/styles src/assets
```

---

### 4️⃣ Setup Vite Config

Create `vite.config.ts` in project root:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
  },
})
```

---

### 5️⃣ Copy Files from Figma Make

**Critical files to copy first (in order):**

1. ✅ `types.ts` → `src/types.ts`
2. ✅ `utils/healthAnalytics.ts` → `src/utils/healthAnalytics.ts`
3. ✅ `styles/globals.css` → `src/styles/globals.css`
4. ✅ `components/figma/ImageWithFallback.tsx` → `src/components/figma/ImageWithFallback.tsx`
5. ✅ `App.tsx` → `src/App.tsx`

**Then copy all other components:**
- All files from `/components` → `src/components`
- All files from `/components/onboarding` → `src/components/onboarding`
- All files from `/components/legal` → `src/components/legal`

---

### 6️⃣ Setup Entry Point

Update `src/main.tsx`:

```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

---

### 7️⃣ Handle Image Assets

**Create asset file:**
`src/assets/amara-logo.png` ← Export MAUV butterfly logo here

**Find and replace in ALL files:**

```bash
# Search for:
import.*from.*"figma:asset

# Replace with:
import imageName from "../assets/image-name.png"
```

**Files that need image updates:**
- `src/App.tsx`
- `src/components/CalendarView.tsx`
- `src/components/HealthInsights.tsx`
- `src/components/AmaraAIChat.tsx`
- `src/components/HomeDashboard.tsx`

**Quick fix example:**
```typescript
// OLD:
import amaraLogo from "figma:asset/amara-logo.png";

// NEW:
import amaraLogo from "../assets/amara-logo.png";
```

---

### 8️⃣ Update package.json Scripts

Add these scripts to `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

---

### 9️⃣ Run the App!

```bash
npm run dev
```

**App should open at:** `http://localhost:3000`

---

## 🎯 What Should Happen

1. ✅ Splash screen appears with MAUV logo
2. ✅ Animates to onboarding flow
3. ✅ Click through 49 onboarding screens
4. ✅ Reach Home Dashboard with cycle tracking
5. ✅ Navigate between Calendar, Insights, Amara Chat, etc.

---

## 🐛 Quick Troubleshooting

### Error: "Cannot find module 'figma:asset'"
**Fix:** Replace all `figma:asset` imports with regular imports (see step 7)

### Error: Tailwind styles not working
**Fix:** Ensure `globals.css` is imported in `main.tsx`

### Error: Module not found
**Fix:** Check all file paths match the directory structure

### Error: Type errors
**Fix:** Ensure `types.ts` is in `src/types.ts`

### Icons not showing
**Fix:** Verify `lucide-react@0.487.0` specific version is installed

---

## 📂 Final Directory Structure

```
mauv-app/
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   │   └── amara-logo.png          ← Add this
│   ├── components/
│   │   ├── figma/
│   │   │   └── ImageWithFallback.tsx
│   │   ├── legal/
│   │   │   ├── TermsOfServiceScreen.tsx
│   │   │   └── PrivacyPolicyScreen.tsx
│   │   ├── onboarding/
│   │   │   └── [49 screen files]
│   │   ├── HomeDashboard.tsx
│   │   ├── CalendarView.tsx
│   │   ├── HealthInsights.tsx
│   │   └── [other components]
│   ├── styles/
│   │   └── globals.css
│   ├── utils/
│   │   └── healthAnalytics.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── types.ts
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## ⚡ Speed Run (For Experienced Devs)

```bash
# 1. Create project
npm create vite@latest mauv-app -- --template react-ts && cd mauv-app

# 2. Install deps
npm install lucide-react@0.487.0 recharts react-hook-form@7.55.0 sonner@2.0.3 motion react-slick slick-carousel react-responsive-masonry react-dnd react-dnd-html5-backend re-resizable tailwindcss@next @tailwindcss/vite@next

# 3. Create structure
mkdir -p src/components/{onboarding,figma,legal} src/utils src/styles src/assets

# 4. Setup vite.config.ts (copy from VITE_CONFIG.txt)

# 5. Copy all files from Figma Make maintaining structure

# 6. Update src/main.tsx to import './styles/globals.css'

# 7. Replace all figma:asset imports with real paths

# 8. Add amara-logo.png to src/assets/

# 9. npm run dev

# Done! 🎉
```

---

## 🎨 App Features You'll Have

- ✅ 49 interactive onboarding screens
- ✅ Home dashboard with live cycle tracking
- ✅ Interactive calendar with day logging
- ✅ Health insights with analytics
- ✅ Amara AI chat interface
- ✅ Tribal community chat
- ✅ Partner linking with 24 fairy avatars
- ✅ Custom avatar creator
- ✅ Symptom tracker
- ✅ Beautiful animations
- ✅ Responsive mobile-first design
- ✅ Purple-pink color scheme
- ✅ 3D shadows on buttons
- ✅ Development progress board

---

## 💡 Pro Tips

1. **Start with 'board' screen** to see all 61 screens at once:
   ```typescript
   // In App.tsx line 75
   const [currentView, setCurrentView] = useState<ScreenType>('board');
   ```

2. **Skip onboarding in development:**
   ```typescript
   const [currentView, setCurrentView] = useState<ScreenType>('home-dashboard');
   ```

3. **Test specific screen:**
   ```typescript
   const [currentView, setCurrentView] = useState<ScreenType>('calendar');
   ```

---

## 📞 Need the Migration Guide?

See `MIGRATION_GUIDE.md` for comprehensive details on:
- Complete file list
- Asset handling
- Production considerations
- Security best practices
- Performance optimization
- Common issues & solutions

---

## ✨ You're All Set!

Your MAUV women's health app with all 61 screens is ready to go! 💜🦋
