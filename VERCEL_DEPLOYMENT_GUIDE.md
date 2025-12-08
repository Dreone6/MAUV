# 🚀 DEPLOY MAUV TO VERCEL - STEP BY STEP

## ✅ Everything is Ready for Deployment!

---

## 📋 **OPTION 1: Deploy via Vercel Dashboard** (EASIEST - 5 minutes)

### Step 1: Go to Vercel
1. Open: https://vercel.com
2. Click **"Sign Up"** or **"Log In"**
3. Sign up with GitHub (recommended)

### Step 2: Import Project
1. Click **"Add New..."** → **"Project"**
2. Click **"Import Git Repository"**
3. Enter your GitHub repo: `https://github.com/Dreone6/MAUV.git`
4. Click **"Import"**

### Step 3: Configure Project
1. **Framework Preset:** Vite
2. **Root Directory:** `frontend`
3. **Build Command:** `yarn build`
4. **Output Directory:** `build`
5. **Install Command:** `yarn install`

### Step 4: Add Environment Variables
Click **"Environment Variables"** and add these:

```
VITE_SUPABASE_URL = https://nomvbhqjisbmgsxwgaoa.supabase.co
```
```
VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vbXZiaHFqaXNibWdzeHdnYW9hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxNTE1MjUsImV4cCI6MjA4MDcyNzUyNX0.1qVii2NPeHpYsy7abn5_gH54P1-yRvT4wBakm_OsJDA
```
```
VITE_STRIPE_PUBLISHABLE_KEY = pk_live_51RWR5eHSDI56Von2VW5j59tqTCKYQ8lPoQKQ4qmCm9cGEulT9iN4LQmz7HIX0d6a65GkAc8fM6FC0U7taf1kkkT700X75rSSxq
```
```
VITE_BACKEND_URL = https://your-backend-url.com
```

### Step 5: Deploy!
1. Click **"Deploy"**
2. Wait 2-3 minutes for build
3. You'll get URL like: `https://mauv-app.vercel.app`

### Step 6: Get QR Code
1. Copy your Vercel URL
2. Go to: https://www.qr-code-generator.com
3. Paste URL
4. Download QR code
5. Scan with your phone!

---

## 📋 **OPTION 2: Deploy via GitHub** (AUTOMATED)

### Step 1: Push Code to GitHub
```bash
cd /app
git add .
git commit -m "MAUV app ready for deployment"
git push origin main
```

### Step 2: Connect GitHub to Vercel
1. Go to https://vercel.com/new
2. Click **"Import Git Repository"**
3. Select your MAUV repo
4. Follow steps 3-5 from Option 1 above

---

## 📋 **OPTION 3: Vercel CLI** (FASTEST - if you have CLI)

```bash
# Install Vercel CLI
npm install -g vercel

# From /app directory
cd /app/frontend
vercel login
vercel --prod

# Follow prompts, add environment variables when asked
```

---

## ⚠️ **Important Notes:**

### **Root Directory:**
- Set to `frontend` (not `/app`)
- This tells Vercel where your React app is

### **Backend Deployment:**
Your FastAPI backend needs separate deployment:
- Deploy to: Railway, Render, or Fly.io
- Or keep using Emergent's backend
- Update `VITE_BACKEND_URL` with deployed backend URL

### **For Now:**
- Frontend on Vercel ← DO THIS NOW
- Backend stays on Emergent (working URL)
- Update backend URL in Vercel env vars later

---

## 🎯 **Quick Start (Recommended):**

1. **Push to GitHub first** (if not done):
   ```bash
   cd /app
   git add .
   git commit -m "MAUV ready for Vercel"
   git push
   ```

2. **Go to Vercel** → Import from GitHub

3. **Add 3 env variables** (Supabase URL, Supabase Key, Stripe Key)

4. **Deploy!**

5. **Get your URL** → Generate QR code → Test on phone!

---

## 📱 **After Deployment:**

You'll have:
- ✅ Live URL: `https://your-app.vercel.app`
- ✅ Auto-deployments on every git push
- ✅ Free SSL certificate
- ✅ Global CDN
- ✅ Mobile-ready

---

**Want me to help you push to GitHub first, or do you want to deploy directly?** 🚀
