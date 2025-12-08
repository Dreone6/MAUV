# 🚀 SUPABASE SETUP - QUICK START GUIDE

## Step 1: Run Database Schema

1. Go to your Supabase project: https://nomvbhqjisbmgsxwgaoa.supabase.co
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the entire contents of `/app/SUPABASE_SCHEMA.sql`
5. Paste into the SQL Editor
6. Click **Run** (or press Cmd/Ctrl + Enter)
7. You should see: "Database schema created successfully!"

## Step 2: Configure Authentication

1. Go to **Authentication** → **Providers**
2. Enable these providers:
   - ✅ Email (already enabled by default)
   - ✅ Apple (add Client ID & Secret)
   - ✅ Google (add Client ID & Secret)
   - ✅ Facebook (add App ID & Secret)
   - ✅ Twitter (add API Key & Secret)

3. For each OAuth provider:
   - Click on the provider
   - Add your credentials
   - Set redirect URL: `https://your-app-url.com/auth/callback`

## Step 3: Test the Integration

1. Your app already has Supabase credentials configured
2. All hooks are created and ready
3. Once you run the schema, authentication will work

## Step 4: Enable Email Confirmations (Optional)

1. Go to **Authentication** → **Email Templates**
2. Customize confirmation email
3. Enable email verification if desired

## Next: Start Connecting Screens!

Once the database is created, we can:
- Connect authentication screens
- Wire onboarding data collection
- Add period tracking
- Enable real-time chat
- Test everything!

Your Supabase URL: https://nomvbhqjisbmgsxwgaoa.supabase.co
Project is ready to use!
