# 🗺️ MAUV APP - COMPLETE SCREEN FLOW MAP

## 📱 CURRENT USER JOURNEY (All 61+ Screens)

---

## 🌟 **START: APP LAUNCH**

```
📱 SPLASH SCREEN (3 seconds)
   └─> Purple/pink gradient, "MAUV PERSONAL TRACKER", floating particles
       │
       ▼ (auto-advance after 3 seconds)
```

---

## 📖 **PHASE 1: WELCOME & INTRODUCTION** (4 screens)

```
1️⃣ ONBOARDING SCREEN
   └─> Generic onboarding intro
       │
       ▼ Click "Next"
       
2️⃣ WELCOME SCREEN  
   └─> App introduction, features overview
       │
       ▼ Click "Get Started"
       
3️⃣ TESTIMONIAL SCREEN
   └─> User reviews, social proof
       │
       ▼ Click "Next"
```

---

## 🔐 **PHASE 2: AUTHENTICATION** (9 screens)

```
4️⃣ SOCIAL LOGIN SCREEN ⚠️ (OAuth error currently)
   └─> Buttons: Apple, Google, Facebook, X, Email
       │
       ├─> Click "Apple" → Apple OAuth
       ├─> Click "Google" → Google OAuth  
       ├─> Click "Facebook" → Facebook OAuth
       ├─> Click "X" → Twitter OAuth
       │
       ├─> Click "Email" ▼
       │
5️⃣ EMAIL SIGNUP SCREEN
   └─> Email, Password, Terms checkbox
       │
       ▼ Click "Sign Up"
       
   OR (if existing user)
   
6️⃣ EMAIL SIGN IN SCREEN
   └─> Email, Password, Remember me
       │
       ├─> Click "Forgot Password?" ▼
       │
7️⃣ FORGOT PASSWORD SCREEN
   └─> Enter email for reset
       │
       ▼ Click "Send Reset Link"
       
8️⃣ RESET PASSWORD SCREEN
   └─> Enter new password (from email link)
       │
       ▼ Click "Reset Password"
       
9️⃣ OTP VERIFICATION SCREEN
   └─> 6-digit code entry
       │
       ▼ Enter code
       
🔟 PASSWORD UPDATED SUCCESS SCREEN
   └─> Confirmation message
       │
       ▼ Click "Continue"
```

---

## 👤 **PHASE 3: PERSONAL INFORMATION** (6 screens)

```
11 PARTNER CODE SCREEN (optional)
   └─> Enter partner connection code (or skip)
       │
       ├─> Enter code OR Skip ▼
       
12 NAME INPUT SCREEN ✅ (working on mobile!)
   └─> "What name do you prefer to be called?"
       │
       ▼ Type name, Click "Continue"
       
13 BIRTHDAY INPUT SCREEN
   └─> Month/Day/Year picker with scrollable wheels
       │
       ▼ Click "Continue"
       
14 WELCOME NAME SCREEN
   └─> "Welcome, [Name]!" personalized greeting
       │
       ▼ Click "Continue"
       
15 CONFIRM DETAILS SCREEN
   └─> Review name, birthday, etc.
       │
       ├─> Click "Edit" → Go back
       └─> Click "Confirm" ▼
       
16 TERMS AGREEMENT SCREEN
   └─> Checkbox: "I agree to Terms & Privacy"
       │
       ├─> Click "View Terms" → Terms of Service screen
       ├─> Click "View Privacy" → Privacy Policy screen
       └─> Click "Continue" ▼
```

---

## 🎯 **PHASE 4: HEALTH GOALS & CONDITIONS** (3 screens)

```
17 MAIN GOAL SCREEN
   └─> Select: Track cycle, Get pregnant, Understand body, etc.
       │
       ▼ Select option, Click "Next"
       
18 HEALTH CONDITIONS SCREEN
   └─> Select: PCOS, Endometriosis, None, etc.
       │
       ▼ Select conditions, Click "Next"
       
19 BIRTH CONTROL SCREEN
   └─> Select birth control type (or skip)
       │
       ├─> Select type OR "Prefer not to share" ▼
```

---

## 🩸 **PHASE 5: CYCLE DATA COLLECTION** (5 screens)

```
20 IMPORTANT INFORMATION SCREEN
   └─> Educational content about data privacy
       │
       ▼ Click "I Understand"
       
21 NOTIFICATION PERMISSION SCREEN
   └─> Request push notification access
       │
       ├─> Click "Enable" OR "Not Now" ▼
       
22 DEVICE INTEGRATIONS SCREEN
   └─> Apple Health, Google Fit options
       │
       ├─> Click "Apple Health" → Apple Health Permissions
       └─> Click "Skip" ▼
       
23 LAST PERIOD START SCREEN 🩸
   └─> Calendar picker: "When did your last period start?"
       │
       ├─> Select date OR "Not Sure" ▼
       
24 PERIOD FREQUENCY SCREEN
   └─> "How long is your typical cycle?" (slider 21-35 days)
       │
       ▼ Adjust slider, Click "Next"
       
25 CYCLE CHANGES SCREEN
   └─> Education about cycle variations
       │
       ├─> Click "Next" OR "Skip" ▼
       
26 CONFIRM DETAILS SCREEN
   └─> Review cycle data entered
       │
       ├─> Click "Edit" → Go back
       └─> Click "Confirm" ▼
       
27 SETTING UP PLAN SCREEN
   └─> Loading screen "Setting up your personalized plan..."
       │
       ▼ (auto-advance after animation)
```

---

## 📚 **PHASE 6: EDUCATIONAL CONTENT** (15 screens)

```
28 CYCLE POWER SCREEN
   └─> "Understanding your cycle power"
       
29 SUPPORT FEATURES SCREEN
   └─> Overview of app support features
       
30 TRACKING SMARTER SCREEN
   └─> Smart tracking intro
       
31 SYMPTOM PATTERNS SCREEN
   └─> Symptom tracking education
       
32 HORMONAL RHYTHM SCREEN
   └─> Hormone cycle education
       
33 LH SURGE SCREEN
   └─> LH surge explanation
       
34 TEMPERATURE OVULATION SCREEN
   └─> BBT tracking info
       
35 FERTILITY CHANGES DAILY SCREEN
   └─> Daily fertility changes
       
36 UNDERSTANDING FERTILE WINDOW SCREEN
   └─> Fertile window education
       
37 HOW MAUV HELPS FERTILITY SCREEN
   └─> MAUV fertility features
       
38 OVULATION GOAL SCREEN
   └─> Set ovulation tracking goals
       
39 OVULATION KEY SCREEN
   └─> Key ovulation facts
       
40 PINPOINT FERTILE DAYS SCREEN
   └─> Fertile day identification
       
41 FERTILE WINDOW EXPLAIN SCREEN
   └─> Detailed fertile window info
       
42 MANAGE PMS SCREEN
   └─> PMS management tips
       
   │
   ▼ (Each screen has "Next" or "Skip" button)
```

---

## 🎨 **PHASE 7: PERSONALIZATION** (5 screens)

```
43 INTRODUCE AMARA SCREEN
   └─> Meet AMARA AI assistant
       │
       ▼ Click "Next"
       
44 CREATE AVATAR SCREEN
   └─> "Create your fairy avatar"
       │
       ▼ Click "Create Avatar"
       
45 AVATAR SELECTION SCREEN
   └─> Choose from 24 preset fairy avatars
       │
       ├─> Click preset → Select avatar
       └─> Click "Customize" ▼
       
46 CUSTOMIZE FAIRY SCREEN
   └─> Full customization: skin, hair, wings, outfit
       │
       ▼ Click "Save Fairy"
       
47 CUSTOMIZE REMINDERS SCREEN
   └─> Set up period, ovulation, pill reminders
       │
       ▼ Click "Finish"
```

---

## 📱 **PHASE 8: DEVICE INTEGRATIONS** (6 screens)

```
48 DEVICE INTEGRATIONS SCREEN (appears earlier too)
   └─> Apple Health, Google Fit, Fitbit
       │
       ├─> Click "Apple Health" ▼
       
49 APPLE HEALTH PERMISSIONS SCREEN
   └─> Request Apple Health access
       │
       ▼ Click "Allow" or "Back"
       
50 APPLE HEALTH DETAIL SCREEN
   └─> Detailed permissions breakdown
       │
       ▼ Click "Confirm"
       
51 LINK SMART DEVICE SCREEN
   └─> Connect one smart device
       │
       ├─> Click "Link Device" OR "Skip" ▼
       
52 LINK SMART DEVICES SCREEN (plural)
   └─> Connect multiple devices
       │
       ├─> Select devices OR "Skip" ▼
       
53 DEVICE APP INTEGRATIONS SCREEN
   └─> Manage all connected devices
       │
       ▼ Click "Continue"
```

---

## 💎 **PHASE 9: PREMIUM SUBSCRIPTION** (5 screens)

```
54 PREMIUM SCREEN
   └─> "Unlock MAUV Pro features"
       │
       ├─> Click "Start Trial" ▼
       
55 MAUV PLUS SCREEN
   └─> Premium features list
       │
       ▼ Click "Start Trial"
       
56 UNLOCK PLUS SCREEN
   └─> Final premium pitch
       │
       ├─> Click "Start 14-Day Trial" ▼
       
57 UNLOCK PREMIUM MODAL (can appear anytime)
   └─> Popup for premium upgrade
       │
       ├─> Click "Start Trial" OR "Not Now" ▼
       
58 PURCHASE SUCCESS SCREEN
   └─> "Welcome to MAUV Pro!" confirmation
       │
       ▼ Click "Continue"
```

---

## 🎊 **PHASE 10: COMPLETION** (2 screens)

```
59 PARTNER CODE SCREEN (optional, can appear earlier)
   └─> Enter partner connection code
       │
       ├─> Enter code OR Skip ▼
       
60 CONGRATULATIONS SCREEN 🎉
   └─> "You're all set!" celebration
       │
       ▼ Click "Start Using MAUV"
       │
       ▼
```

---

## 🏠 **MAIN APP** (Post-Onboarding)

```
📱 HOME DASHBOARD
   └─> Cycle ring, period calendar, widgets
       │
       ├─> Bottom Nav: 5 tabs ▼

┌─────────────────────────────────────────────┐
│  HOME  │  CALENDAR  │  LOG  │  CHAT  │  ⚙️  │
└─────────────────────────────────────────────┘

HOME TAB:
  └─> HomeDashboard
      HomeDashboardDark
      RearrangeableHomeDashboard

CALENDAR TAB:
  └─> CalendarView
      CalendarViewDark
      CyclePhaseRing

LOG TAB (opens modal):
  └─> SymptomTracker
      LogModal

CHAT TAB:
  └─> AmaraAIChat (AI assistant)
      AmaraAIChatDark
      TribalChat (community)
      TribalChatDark

SETTINGS TAB:
  └─> 31 Settings Screens:
      - AccountSettingsScreen
      - PersonalInfoScreen
      - PreferencesScreen
      - BillingSubscriptionsScreen
      - PaymentMethodsScreen
      - LinkedAccountsScreen
      - HelpSupportScreen
      - FAQScreen
      - (23+ more settings screens)

PARTNER FEATURES:
  └─> PartnerLink
      PartnerDashboard
      PartnerSettings
      PartnerSharingSettings

LEGAL:
  └─> TermsOfServiceScreen
      PrivacyPolicyScreen
```

---

## 🎯 **SUMMARY BY PHASE:**

| Phase | Screens | Skippable? | Current Issues |
|-------|---------|------------|----------------|
| 1. Welcome | 4 | Yes | Working |
| 2. Authentication | 9 | No | OAuth needs enabling |
| 3. Personal Info | 6 | No | Working ✅ |
| 4. Health Goals | 3 | Some | Need to wire |
| 5. Cycle Data | 5 | No | Need to wire |
| 6. Education | 15 | Yes (all) | Too long? |
| 7. Personalization | 5 | Some | Need to wire |
| 8. Devices | 6 | Yes (all) | Optional |
| 9. Premium | 5 | Yes | Need to wire |
| 10. Completion | 2 | No | Working |

---

## ⚡ **COMMON REARRANGEMENTS:**

### **A) Shorter Onboarding (Skip Education)**
Skip all 15 education screens → Go straight from cycle setup to personalization

### **B) Skip Device Integrations**
Remove all Apple Health/smart device screens (6 screens)

### **C) Move Premium Earlier**
Show premium offer right after name/birthday (create urgency)

### **D) Simplify Authentication**
Just use email signup, skip social OAuth for now

---

## 🤔 **QUESTIONS FOR YOU:**

1. **Which screens feel too long or unnecessary?**
   - Education section has 15 screens - too much?
   - Device integrations (6 screens) - needed?

2. **When should premium appear?**
   - Current: Near end of onboarding
   - Alternative: Right after basic info
   - Alternative: After first use

3. **Partner code screen - when?**
   - Current: After social login
   - Alternative: At the end
   - Alternative: Remove from onboarding, add to settings

4. **Any screens you want to combine or split?**

---

## ✏️ **HOW TO TELL ME CHANGES:**

Just say something like:

**Example 1:**
"Skip all the education screens (fertility, ovulation, etc.). Go straight from cycle data to avatar creation."

**Example 2:**
"Move premium offer right after birthday screen. I want users to see pricing early."

**Example 3:**
"Remove device integration screens entirely. Make them optional in settings instead."

---

**What changes would you like to make to the flow?** 📝✨
