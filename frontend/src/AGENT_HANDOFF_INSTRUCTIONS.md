# 🤖 MAUV APP - AGENT HANDOFF INSTRUCTIONS

**Project:** MAUV - Women's Health & Period Tracking App  
**Current Status:** Frontend Complete (61/61 Screens) - Ready for Backend Integration  
**Date:** December 6, 2025  

---

## 📋 QUICK OVERVIEW

This document provides specific instructions for handing off the MAUV app to different AI agents for backend development and planning.

**Two Agent Workflow:**
1. **ChatGPT-5** - SaaS Planning Assistant (Strategy & Architecture)
2. **Emmergent** - Agentic Agent (Execution & Implementation)

---

# 🎯 AGENT 1: ChatGPT-5 (SaaS Planning Assistant)

## **Role:** Strategic Planning & Architecture Design

### **What to Share:**
- `/MAUV_COMPLETE_ASSET_INVENTORY.md` (Complete asset list)
- `/AGENT_HANDOFF_INSTRUCTIONS.md` (This document)
- `/components/` folder structure
- `/types.ts` (TypeScript definitions)
- `/utils/healthAnalytics.ts` (Existing utilities)

---

## **PROMPT FOR ChatGPT-5:**

```
I'm building MAUV, a women's health and period tracking app. The frontend is 100% complete with 61 screens built in React + TypeScript + Tailwind CSS.

I need you to help me plan the backend architecture using Supabase (PostgreSQL, Authentication, Real-time, Storage).

CONTEXT:
- Read the attached MAUV_COMPLETE_ASSET_INVENTORY.md for full feature list
- Frontend screens are ready and waiting for backend integration
- Target: Production-ready SaaS app with authentication, data persistence, and payments

WHAT I NEED FROM YOU:

1. **Database Schema Design**
   - Design complete PostgreSQL schema for all features
   - Include Row Level Security (RLS) policies
   - Define relationships between tables
   - Plan indexes for performance

2. **Authentication Architecture**
   - Supabase Auth setup (email, social OAuth)
   - User roles & permissions
   - Session management strategy
   - Security best practices

3. **API Structure**
   - Supabase client configuration
   - Custom API endpoints needed
   - Real-time subscriptions strategy
   - Data fetching patterns

4. **Feature-by-Feature Implementation Plan**
   - Period tracking data flow
   - Health metrics storage & retrieval
   - Partner connection system
   - Subscription/payment integration
   - Avatar customization persistence
   - Reminder system architecture

5. **Integration Strategy**
   - How to connect frontend components to Supabase
   - React hooks architecture (useAuth, useUser, etc.)
   - State management approach
   - Error handling patterns

6. **Payment Integration**
   - Stripe or Supabase billing integration
   - Subscription tier management
   - Webhook handling
   - Trial period logic

7. **Security & Privacy**
   - HIPAA compliance considerations
   - Data encryption strategy
   - Privacy controls implementation
   - Audit logging

8. **Performance Optimization**
   - Caching strategy
   - Pagination approach
   - Real-time vs polling decisions
   - Image/file storage optimization

9. **Testing Strategy**
   - Unit test approach
   - Integration test plan
   - E2E testing scope
   - Security testing

10. **Deployment Plan**
    - Staging environment setup
    - Production deployment checklist
    - CI/CD pipeline recommendations
    - Monitoring & logging tools

DELIVERABLES I NEED:
- Complete database schema (SQL DDL)
- Supabase setup instructions
- File structure for /lib, /hooks, /types
- Step-by-step integration guide
- Security checklist
- Go-live deployment plan

Please provide a comprehensive, production-ready architecture plan.
```

---

### **Expected Output from ChatGPT-5:**

ChatGPT-5 should provide:
- ✅ Complete database schema design
- ✅ Supabase configuration details
- ✅ Authentication strategy
- ✅ API architecture
- ✅ Integration roadmap
- ✅ Security recommendations
- ✅ Testing strategy
- ✅ Deployment checklist

**Use this output to inform Emmergent's implementation.**

---

# 🛠️ AGENT 2: Emmergent (Agentic Execution Agent)

## **Role:** Backend Implementation & Execution

### **What to Share:**
- **Entire MAUV codebase** (all files)
- `/MAUV_COMPLETE_ASSET_INVENTORY.md`
- **ChatGPT-5's architectural plan** (from above)
- Database schema from ChatGPT-5
- Supabase project credentials (when ready)

---

## **PROMPT FOR Emmergent:**

```
I need you to implement the complete backend for MAUV, a women's health app with a fully built React frontend (61 screens).

CONTEXT:
- Frontend: 100% complete - React + TypeScript + Tailwind CSS
- Backend: Needs full Supabase integration (Auth, Database, Real-time, Storage)
- Goal: Production-ready SaaS application

YOU HAVE ACCESS TO:
1. Complete frontend codebase (all 180+ files)
2. MAUV_COMPLETE_ASSET_INVENTORY.md (detailed feature list)
3. Architectural plan from ChatGPT-5 (database schema, auth strategy, etc.)

YOUR MISSION:

PHASE 1: SUPABASE PROJECT SETUP
□ Create new Supabase project
□ Configure authentication providers:
  - Email/password
  - Apple OAuth
  - Google OAuth  
  - Facebook OAuth
  - Twitter/X OAuth
□ Set up database with provided schema
□ Implement Row Level Security (RLS) policies
□ Configure storage buckets for:
  - User avatars
  - Fairy avatar customizations
  - Exported reports

PHASE 2: DATABASE IMPLEMENTATION
Implement these tables (refer to schema from ChatGPT-5):
□ users (profiles, preferences, settings)
□ periods (period tracking data)
□ health_metrics (weight, temp, water, BMI)
□ symptoms (daily symptom logging)
□ moods (mood tracking)
□ partners (partner connections)
□ partner_sharing (privacy settings)
□ subscriptions (payment plans)
□ payment_methods (saved cards)
□ reminders (notification settings)
□ fairy_avatars (customization data)
□ device_integrations (Apple Health, etc.)

PHASE 3: AUTHENTICATION INTEGRATION
□ Create /lib/supabase/client.ts (Supabase client)
□ Create /lib/supabase/auth.ts (auth helper functions)
□ Create /hooks/useAuth.ts (authentication hook)
□ Create /hooks/useUser.ts (user data hook)
□ Connect login screens to Supabase Auth
□ Implement password reset flow
□ Set up OTP verification
□ Add session management
□ Implement logout functionality

PHASE 4: DATA PERSISTENCE
Create hooks for data management:
□ /hooks/usePeriodData.ts (period CRUD operations)
□ /hooks/useHealthMetrics.ts (health data CRUD)
□ /hooks/useSymptoms.ts (symptom tracking)
□ /hooks/usePartner.ts (partner features)
□ /hooks/useSubscription.ts (subscription management)
□ /hooks/useReminders.ts (reminder system)
□ /hooks/useAvatar.ts (fairy avatar persistence)

PHASE 5: CONNECT FRONTEND TO BACKEND
Update these screens with real data:
□ HomeDashboard.tsx - Load user's cycle data
□ CalendarView.tsx - Load period history & predictions
□ HealthTrackerScreen.tsx - Load health metrics from DB
□ SymptomTracker.tsx - Save symptoms to DB
□ PartnerDashboardScreen.tsx - Real partner data
□ SettingsScreen.tsx - Load/save all settings
□ BillingSubscriptionsScreen.tsx - Real subscription data
□ FairyAvatarCustomizationScreen.tsx - Save customizations

PHASE 6: REAL-TIME FEATURES
□ Partner chat messaging (real-time)
□ Cycle updates (real-time subscriptions)
□ Notification delivery
□ Live data synchronization

PHASE 7: PAYMENT INTEGRATION
□ Integrate Stripe or Supabase billing
□ Connect payment forms to payment processor
□ Implement subscription webhooks
□ Add subscription status checks
□ Implement trial period logic
□ Handle plan upgrades/downgrades

PHASE 8: STORAGE & FILES
□ Avatar image upload
□ Data export to PDF/CSV
□ File storage for user content
□ Image optimization

PHASE 9: SECURITY & VALIDATION
□ Implement all RLS policies
□ Add input validation
□ Sanitize user data
□ Add rate limiting
□ Implement CORS policies
□ Add error handling & logging

PHASE 10: TESTING
□ Test all authentication flows
□ Test CRUD operations for each feature
□ Test partner connection system
□ Test payment flows
□ Test real-time features
□ Security testing
□ Performance testing

PHASE 11: DEPLOYMENT
□ Set up environment variables
□ Configure production Supabase project
□ Deploy to Vercel/Netlify
□ Set up CI/CD pipeline
□ Configure monitoring (Sentry, LogRocket)
□ Set up analytics

DELIVERABLES:
✅ Fully functional backend
✅ All screens connected to real data
✅ Working authentication (all providers)
✅ Payment system live
✅ Real-time features working
✅ Deployed to production
✅ Documentation of what was built
✅ Testing report

IMPORTANT NOTES:
- Follow the architectural plan from ChatGPT-5 exactly
- Maintain type safety (TypeScript)
- Follow React best practices
- Ensure mobile responsiveness is maintained
- Keep the pink/purple branding
- Don't modify existing UI unless necessary
- Add loading states for all async operations
- Add error handling for all operations
- Log all errors for debugging

EXECUTION STYLE:
- Work systematically through phases
- Test each phase before moving to next
- Document any issues or blockers
- Provide progress updates
- Ask for clarification if architectural plan is unclear

Begin with Phase 1 and proceed through all phases until production deployment is complete.
```

---

### **Expected Output from Emmergent:**

Emmergent should deliver:
- ✅ Complete Supabase backend setup
- ✅ All database tables created with RLS
- ✅ Authentication working (all OAuth providers)
- ✅ All React hooks for data management
- ✅ Frontend connected to backend
- ✅ Payment system integrated
- ✅ Real-time features working
- ✅ Production deployment complete
- ✅ Testing completed
- ✅ Documentation

---

# 📤 HOW TO SHARE YOUR MAUV APP

## **Option 1: GitHub Repository (RECOMMENDED)**

### **Step 1: Initialize Git**
```bash
cd /path/to/mauv-app
git init
git add .
git commit -m "Initial commit: MAUV app frontend complete (61 screens)"
```

### **Step 2: Create GitHub Repository**
1. Go to https://github.com/new
2. Create new repository named "mauv-app"
3. Don't initialize with README (you have files already)
4. Copy the repository URL

### **Step 3: Push to GitHub**
```bash
git remote add origin https://github.com/YOUR_USERNAME/mauv-app.git
git branch -M main
git push -u origin main
```

### **Step 4: Share Repository**
- **Public repo:** Share URL directly: `https://github.com/YOUR_USERNAME/mauv-app`
- **Private repo:** Add collaborators in Settings → Collaborators

### **For Agents:**
- Share GitHub repository URL
- Agents can clone: `git clone https://github.com/YOUR_USERNAME/mauv-app.git`

---

## **Option 2: ZIP File Export**

### **What to Include:**
```
mauv-app.zip
├── /components (all component files)
├── /styles (globals.css)
├── /utils (utilities)
├── App.tsx
├── types.ts
├── package.json (if you have one)
├── MAUV_COMPLETE_ASSET_INVENTORY.md
├── AGENT_HANDOFF_INSTRUCTIONS.md
└── README.md
```

### **How to Create:**
```bash
# In your project directory
zip -r mauv-app.zip . -x "node_modules/*" -x ".git/*" -x "dist/*"
```

### **Share via:**
- Google Drive (share link)
- Dropbox (share link)
- WeTransfer (send file)
- Email attachment (if < 25MB)

---

## **Option 3: Cloud IDE (CodeSandbox/StackBlitz)**

### **CodeSandbox:**
1. Go to https://codesandbox.io/
2. Click "Create Sandbox"
3. Choose "Import from GitHub" or upload files
4. Share sandbox URL

### **StackBlitz:**
1. Go to https://stackblitz.com/
2. Click "New Project"
3. Choose "Import from GitHub"
4. Share project URL

**Benefits:**
- Live preview
- Immediate code access
- No setup required for agents
- Collaborative editing

---

## **Option 4: Figma Make Export (Current Platform)**

Since you're already in Figma Make:

### **Export Steps:**
1. Look for "Export" or "Share" button in Figma Make
2. Options might include:
   - Download as ZIP
   - Share project link
   - Export to GitHub
   - Generate shareable URL

### **Ask Figma Make:**
"How do I export or share this entire project with external collaborators?"

---

# 📋 RECOMMENDED SHARING WORKFLOW

## **Best Approach for Your Use Case:**

### **STEP 1: Organize Files First**
Before sharing, let's organize the code structure:
```
/mauv-app
  /src
    /components
      /onboarding (✅ already organized)
      /settings (✅ already organized)
      /partner (✅ already organized)
      /insights (✅ already organized)
      /legal (✅ already organized)
      /home (create)
      /calendar (create)
      /health (create)
      /chat (create)
      /shared (create)
      /modals (create)
      /backgrounds (create)
      /integrations (create)
      /ui (✅ already organized)
      /figma (✅ already organized)
    /hooks (create - ready for backend)
    /lib (create - ready for Supabase)
    /types (create - TypeScript types)
    /utils (existing)
    /styles (existing)
    App.tsx
    types.ts
  /docs
    MAUV_COMPLETE_ASSET_INVENTORY.md
    AGENT_HANDOFF_INSTRUCTIONS.md
    README.md
  package.json
  tsconfig.json
  .env.example (for Supabase keys)
```

### **STEP 2: Create Essential Documents**

**README.md:**
```markdown
# 🦋 MAUV - Women's Health App

Frontend: 100% Complete (61/61 Screens)
Status: Ready for Backend Integration

## Quick Start
See AGENT_HANDOFF_INSTRUCTIONS.md for AI agent instructions

## Documentation
- MAUV_COMPLETE_ASSET_INVENTORY.md - Full feature list
- AGENT_HANDOFF_INSTRUCTIONS.md - Agent setup guide

## Tech Stack
- React 18 + TypeScript
- Tailwind CSS v4
- Vite
- Supabase (pending integration)
```

**package.json:**
```json
{
  "name": "mauv-app",
  "version": "1.0.0",
  "description": "Women's health and period tracking app",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "lucide-react": "^0.487.0",
    "recharts": "^2.12.0",
    "react-hook-form": "^7.55.0",
    "sonner": "^2.0.3",
    "@supabase/supabase-js": "^2.39.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "typescript": "^5.5.3",
    "vite": "^5.4.2",
    "tailwindcss": "^4.0.0"
  }
}
```

**.env.example:**
```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Stripe Configuration (if using Stripe)
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key_here
```

### **STEP 3: Push to GitHub**
```bash
git init
git add .
git commit -m "MAUV app frontend complete - ready for backend integration"
git remote add origin https://github.com/YOUR_USERNAME/mauv-app.git
git push -u origin main
```

### **STEP 4: Share with Agents**

**To ChatGPT-5 (Planning):**
```
I've shared my MAUV app on GitHub: [YOUR_REPO_URL]

Key files to review:
1. /docs/MAUV_COMPLETE_ASSET_INVENTORY.md - Complete feature list
2. /docs/AGENT_HANDOFF_INSTRUCTIONS.md - Your specific instructions
3. /components/* - All 61 screens
4. /types.ts - Current TypeScript definitions

Please follow the instructions in AGENT_HANDOFF_INSTRUCTIONS.md to create the backend architecture plan.
```

**To Emmergent (Execution):**
```
Clone this repository: [YOUR_REPO_URL]

You have:
- Complete frontend (61 screens, 180+ files)
- Architecture plan from ChatGPT-5 (attach the plan)
- AGENT_HANDOFF_INSTRUCTIONS.md with your implementation guide

Execute all 11 phases to build and deploy the complete backend.

Start with Phase 1: Supabase Project Setup
```

---

# 🎯 WORKFLOW SUMMARY

```
1. YOU (Now)
   ↓
   Organize files → Push to GitHub → Create documentation

2. ChatGPT-5 (Planning Phase)
   ↓
   Reviews codebase → Designs architecture → Creates schema → Provides implementation plan

3. Emmergent (Execution Phase)
   ↓
   Clones repo → Implements backend → Connects frontend → Tests → Deploys

4. YOU (Final Review)
   ↓
   Test app → Review security → Approve for launch
```

---

# ✅ PRE-SHARING CHECKLIST

Before sharing with agents:

**Code Organization:**
- [ ] Files organized into logical folders
- [ ] All screens have proper exports
- [ ] TypeScript types are defined
- [ ] No broken imports

**Documentation:**
- [ ] MAUV_COMPLETE_ASSET_INVENTORY.md included
- [ ] AGENT_HANDOFF_INSTRUCTIONS.md included
- [ ] README.md created
- [ ] Comments added to complex code

**Configuration:**
- [ ] package.json with all dependencies
- [ ] tsconfig.json included
- [ ] .env.example with placeholder keys
- [ ] .gitignore (exclude node_modules, .env, dist)

**Repository:**
- [ ] Pushed to GitHub
- [ ] Repository is accessible
- [ ] README is visible
- [ ] All files uploaded

**Agent Instructions:**
- [ ] ChatGPT-5 prompt ready
- [ ] Emmergent prompt ready
- [ ] Repository URL ready to share
- [ ] Architectural requirements clear

---

# 🔗 SHARING LINKS FORMAT

**For ChatGPT-5:**
```
Repository: https://github.com/YOUR_USERNAME/mauv-app
Documentation: https://github.com/YOUR_USERNAME/mauv-app/blob/main/docs/MAUV_COMPLETE_ASSET_INVENTORY.md
Instructions: https://github.com/YOUR_USERNAME/mauv-app/blob/main/docs/AGENT_HANDOFF_INSTRUCTIONS.md
```

**For Emmergent:**
```
Clone Command: git clone https://github.com/YOUR_USERNAME/mauv-app.git
Main Branch: main
Entry Point: /App.tsx
Documentation: /docs/
```

---

# 📞 SUPPORT & QUESTIONS

**If Agents Need Clarification:**
- Refer to MAUV_COMPLETE_ASSET_INVENTORY.md for features
- Check component files for implementation details
- Review /types.ts for data structures
- Ask for specific screen functionality

**Common Questions from Agents:**

**Q: What authentication providers to support?**
A: Email/password, Apple, Google, Facebook, X (Twitter)

**Q: What database to use?**
A: Supabase (PostgreSQL)

**Q: What payment provider?**
A: Stripe recommended (or Supabase billing)

**Q: What hosting platform?**
A: Vercel or Netlify recommended

**Q: What's the target market?**
A: Women aged 18-45 tracking periods, fertility, and health

---

# 🚀 FINAL NOTES

**Success Criteria:**
- ✅ ChatGPT-5 provides complete architectural plan
- ✅ Emmergent successfully implements all 11 phases
- ✅ App is deployed and functional
- ✅ All 61 screens work with real data
- ✅ Authentication works with all providers
- ✅ Payments process successfully
- ✅ App is secure and performant
- ✅ Ready for user testing and launch

**Timeline Estimate:**
- Planning (ChatGPT-5): 1-2 hours
- Implementation (Emmergent): 40-80 hours (depending on agent capability)
- Testing & Refinement: 10-20 hours
- Total: ~50-100 hours

**You Are Ready To:**
1. Share codebase with agents
2. Get architectural plan from ChatGPT-5
3. Let Emmergent build the backend
4. Launch MAUV to production

---

**Document Version:** 1.0  
**Last Updated:** December 6, 2025  
**Status:** Ready for Agent Handoff  

Good luck with your MAUV app! 🦋💜

---

*End of Document*
