# 🚀 MAUV - SUPABASE IMPLEMENTATION GUIDE

**Project:** MAUV Women's Health App  
**Date:** December 6, 2025  

---

## 📋 PHASE-BY-PHASE IMPLEMENTATION

### **PHASE 1: SUPABASE PROJECT SETUP** ✅

#### **Step 1.1: Create Supabase Project**

1. Go to https://supabase.com
2. Click "New Project"
3. Organization: Choose or create
4. Project Name: `mauv-production`
5. Database Password: Generate strong password
6. Region: Choose closest to users
7. Pricing Plan: Pro (for production)

#### **Step 1.2: Get Project Credentials**

1. Go to Project Settings → API
2. Copy:
   - **Project URL**: `https://xxx.supabase.co`
   - **anon public key**: `eyJh...`
   - **service_role key**: `eyJh...` (keep secret!)

3. Create `/app/frontend/.env`:
```env
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_BACKEND_URL=http://localhost:8001
```

4. Create `/app/backend/.env`:
```env
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key
```

#### **Step 1.3: Run Database Schema**

1. Go to Supabase Dashboard → SQL Editor
2. Copy entire schema from `SUPABASE_ARCHITECTURE.md`
3. Run all table creation statements
4. Run all RLS policies
5. Run all functions and triggers
6. Run all indexes

#### **Step 1.4: Configure Authentication**

1. Go to Authentication → Providers
2. Enable:
   - ✅ Email (default enabled)
   - ✅ Apple
   - ✅ Google
   - ✅ Facebook
   - ✅ Twitter

3. For each provider:
   - Add Client ID
   - Add Client Secret
   - Set redirect URLs

4. Configure email templates:
   - Go to Authentication → Email Templates
   - Customize confirmation, recovery, magic link emails

#### **Step 1.5: Set up Storage**

1. Go to Storage → Create bucket
2. Create buckets:
   - `avatars` (public)
   - `fairy-assets` (public)
   - `user-exports` (private)
   - `profile-pictures` (public)

3. Set storage policies (from architecture doc)

---

### **PHASE 2: FRONTEND SETUP** ✅

#### **Step 2.1: Install Dependencies**

```bash
cd /app/frontend
yarn add @supabase/supabase-js
yarn add @stripe/stripe-js @stripe/react-stripe-js
```

#### **Step 2.2: Create Supabase Client**

Create `/app/frontend/src/lib/supabase/client.ts` (from API structure doc)

#### **Step 2.3: Create Auth Helpers**

Create `/app/frontend/src/lib/supabase/auth.ts` (from API structure doc)

#### **Step 2.4: Create React Hooks**

Create these files in `/app/frontend/src/hooks/`:
- `useAuth.ts`
- `useUser.ts`
- `usePeriods.ts`
- `useSymptoms.ts`
- `useMoods.ts`
- `useHealthMetrics.ts`
- `useReminders.ts`
- `useAvatar.ts`
- `useSubscription.ts`
- `usePartner.ts`
- `useAmaraChat.ts`
- `useTribalChat.ts`

(Full code in `SUPABASE_API_STRUCTURE.md`)

#### **Step 2.5: Generate TypeScript Types**

```bash
npx supabase gen types typescript --project-id "your-project-ref" > src/types/database.types.ts
```

---

### **PHASE 3: BACKEND SETUP** ✅

#### **Step 3.1: Install Python Dependencies**

```bash
cd /app/backend
pip install supabase stripe emergentintegrations
pip freeze > requirements.txt
```

#### **Step 3.2: Create Payment Routes**

Create `/app/backend/routes/payments.py` (from payment integration doc)

#### **Step 3.3: Update Server.py**

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.chat import router as chat_router
from routes.payments import router as payments_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router)
app.include_router(payments_router)
```

---

### **PHASE 4: CONNECT AUTHENTICATION** ✅

#### **Step 4.1: Create Auth Screens**

Update these screens to use `useAuth` hook:
- `SocialLoginScreen.tsx`
- `EmailSignInScreen.tsx`
- `EmailSignupScreen.tsx`
- `ForgotPasswordScreen.tsx`
- `ResetPasswordScreen.tsx`
- `OTPVerificationScreen.tsx`

#### **Step 4.2: Protect Routes**

Create `/app/frontend/src/components/ProtectedRoute.tsx`:

```typescript
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/welcome" />;

  return <>{children}</>;
}
```

#### **Step 4.3: Test Authentication**

- [ ] Test email signup
- [ ] Test email login
- [ ] Test Apple OAuth
- [ ] Test Google OAuth
- [ ] Test Facebook OAuth
- [ ] Test Twitter OAuth
- [ ] Test password reset
- [ ] Test OTP verification

---

### **PHASE 5: CONNECT ONBOARDING DATA** ✅

#### **Step 5.1: Update User Profile Screens**

**NameInputScreen.tsx**:
```typescript
import { useUser } from '@/hooks/useUser';

export function NameInputScreen({ onNext }) {
  const { updateProfile } = useUser();

  async function handleSubmit(firstName: string, lastName: string) {
    await updateProfile({ first_name: firstName, last_name: lastName });
    onNext(firstName);
  }
  // ...
}
```

**BirthdayInputScreen.tsx**:
```typescript
import { useUser } from '@/hooks/useUser';

export function BirthdayInputScreen({ onNext }) {
  const { updateProfile } = useUser();

  async function handleSubmit(birthday: string) {
    await updateProfile({ birthday });
    onNext();
  }
  // ...
}
```

#### **Step 5.2: Update Cycle Data Collection**

**LastPeriodStartScreen.tsx**:
```typescript
import { usePeriods } from '@/hooks/usePeriods';

export function LastPeriodStartScreen({ onNext }) {
  const { addPeriod } = usePeriods();

  async function handleSubmit(startDate: Date) {
    await addPeriod({ start_date: startDate.toISOString().split('T')[0] });
    onNext();
  }
  // ...
}
```

#### **Step 5.3: Mark Onboarding Complete**

**CongratulationsScreen.tsx**:
```typescript
import { useUser } from '@/hooks/useUser';

export function CongratulationsScreen({ onUnlock }) {
  const { updateProfile } = useUser();

  async function handleComplete() {
    await updateProfile({ onboarding_completed: true });
    onUnlock();
  }
  // ...
}
```

---

### **PHASE 6: CONNECT MAIN APP FEATURES** ✅

#### **Step 6.1: Home Dashboard**

```typescript
import { usePeriods } from '@/hooks/usePeriods';
import { useSymptoms } from '@/hooks/useSymptoms';
import { useUser } from '@/hooks/useUser';

export function HomeDashboard() {
  const { profile } = useUser();
  const { periods, predictNextPeriod } = usePeriods();
  const { symptoms } = useSymptoms();

  // Use real data to populate dashboard
  // ...
}
```

#### **Step 6.2: Calendar View**

```typescript
import { usePeriods } from '@/hooks/usePeriods';
import { useSymptoms } from '@/hooks/useSymptoms';

export function CalendarView() {
  const { periods } = usePeriods();
  const { symptoms } = useSymptoms();

  // Display real period data on calendar
  // ...
}
```

#### **Step 6.3: Symptom Tracker**

```typescript
import { useSymptoms } from '@/hooks/useSymptoms';
import { useMoods } from '@/hooks/useMoods';

export function SymptomTracker() {
  const { logSymptoms } = useSymptoms();
  const { logMood } = useMoods();

  async function handleSubmit(data) {
    await logSymptoms(data.symptoms);
    await logMood(data.mood);
  }
  // ...
}
```

#### **Step 6.4: Health Insights**

```typescript
import { useHealthMetrics } from '@/hooks/useHealthMetrics';

export function HealthInsights() {
  const { metrics, logMetric } = useHealthMetrics();

  // Display charts with real data
  // ...
}
```

#### **Step 6.5: Settings**

```typescript
import { useUser } from '@/hooks/useUser';
import { useSubscription } from '@/hooks/useSubscription';

export function Settings() {
  const { profile, updateProfile } = useUser();
  const { subscription, manageBilling } = useSubscription();

  // Real settings data
  // ...
}
```

---

### **PHASE 7: CONNECT AI CHAT** ✅

#### **Step 7.1: Update AMARA Chat**

```typescript
import { useAmaraChat } from '@/hooks/useAmaraChat';

export function AmaraAIChat() {
  const { messages, sendMessage, sending } = useAmaraChat();

  async function handleSend(text: string) {
    await sendMessage(text);
  }

  // Display real-time messages
  // ...
}
```

---

### **PHASE 8: CONNECT PARTNER FEATURES** ✅

#### **Step 8.1: Partner Connection**

```typescript
import { usePartner } from '@/hooks/usePartner';

export function PartnerLink() {
  const { generateConnectionCode, connectWithCode } = usePartner();

  async function handleGenerate() {
    const code = await generateConnectionCode();
    // Show code to user
  }

  async function handleConnect(code: string) {
    await connectWithCode(code);
  }
  // ...
}
```

#### **Step 8.2: Partner Dashboard**

```typescript
import { usePartner } from '@/hooks/usePartner';
import { usePeriods } from '@/hooks/usePeriods';

export function PartnerDashboard() {
  const { partner, isConnected } = usePartner();
  const { periods } = usePeriods(); // Will show partner's data if shared

  // Display partner's cycle data based on permissions
  // ...
}
```

---

### **PHASE 9: CONNECT PAYMENTS** ✅

#### **Step 9.1: Subscription Screens**

```typescript
import { useSubscription } from '@/hooks/useSubscription';

export function MAUVPlusScreen() {
  const { createCheckoutSession } = useSubscription();

  async function handleMonthly() {
    await createCheckoutSession('price_monthly_xxx');
  }

  async function handleYearly() {
    await createCheckoutSession('price_yearly_xxx');
  }
  // ...
}
```

#### **Step 9.2: Billing Management**

```typescript
import { useSubscription } from '@/hooks/useSubscription';

export function BillingSubscriptionsScreen() {
  const { subscription, manageBilling, cancelSubscription } = useSubscription();

  // Display real subscription data
  // ...
}
```

---

### **PHASE 10: TESTING** ✅

#### **Test Checklist:**

**Authentication:**
- [ ] Email signup works
- [ ] Email login works
- [ ] All OAuth providers work
- [ ] Password reset works
- [ ] OTP verification works
- [ ] Session persistence works

**Onboarding:**
- [ ] User profile data saves
- [ ] Period data saves
- [ ] Health conditions save
- [ ] Avatar saves
- [ ] Reminders save

**Main Features:**
- [ ] Home dashboard loads real data
- [ ] Calendar shows real periods
- [ ] Symptom logging works
- [ ] Health metrics save
- [ ] Period predictions work

**Partner Features:**
- [ ] Code generation works
- [ ] Code connection works
- [ ] Data sharing works
- [ ] Permissions work

**Payments:**
- [ ] Checkout works
- [ ] Subscription activates
- [ ] Trial period works
- [ ] Cancellation works
- [ ] Billing portal works

**AI Chat:**
- [ ] Messages send/receive
- [ ] Real-time updates work
- [ ] Chat history persists

---

### **PHASE 11: DEPLOYMENT** ✅

#### **Step 11.1: Environment Setup**

**Production Frontend `.env`:**
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-production-anon-key
VITE_BACKEND_URL=https://api.mauv.app
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

**Production Backend `.env`:**
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-production-service-key
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
EMERGENT_LLM_KEY=your-key
FRONTEND_URL=https://app.mauv.com
```

#### **Step 11.2: Deploy Backend**

```bash
# Using Render, Railway, or similar
# Set environment variables
# Deploy from GitHub
```

#### **Step 11.3: Deploy Frontend**

```bash
# Using Vercel or Netlify
cd /app/frontend
yarn build
# Deploy dist/ folder
```

#### **Step 11.4: Configure Stripe Webhook**

1. Go to Stripe Dashboard
2. Add production webhook endpoint: `https://api.mauv.app/api/payments/webhook`
3. Copy signing secret to backend `.env`

#### **Step 11.5: Final Checks**

- [ ] All environment variables set
- [ ] Supabase RLS policies enabled
- [ ] Stripe webhook configured
- [ ] OAuth redirects updated
- [ ] Error monitoring set up (Sentry)
- [ ] Analytics configured

---

## 🎯 SUCCESS CRITERIA

✅ User can sign up with email or social OAuth  
✅ User can complete full onboarding flow  
✅ User data persists in Supabase  
✅ All CRUD operations work  
✅ Real-time features work  
✅ Payments process successfully  
✅ Partner features work  
✅ AI chat works  
✅ App is deployed and accessible  

---

**Ready to start implementation!** 🚀
