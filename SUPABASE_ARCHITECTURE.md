# 🏗️ MAUV - COMPLETE SUPABASE ARCHITECTURE

**Project:** MAUV Women's Health App  
**Backend:** Supabase (PostgreSQL + Auth + Real-time + Storage)  
**Date:** December 6, 2025  

---

## 📋 TABLE OF CONTENTS

1. [Database Schema](#database-schema)
2. [Authentication Setup](#authentication-setup)
3. [Row Level Security (RLS)](#row-level-security)
4. [API Structure](#api-structure)
5. [React Hooks](#react-hooks)
6. [Real-time Features](#real-time-features)
7. [Storage Buckets](#storage-buckets)
8. [Payment Integration](#payment-integration)
9. [Security & Privacy](#security--privacy)
10. [Performance Optimization](#performance-optimization)

---

## 🗄️ DATABASE SCHEMA

### **Core Tables Overview**

```
users (profiles)
├── periods
├── symptoms
├── moods
├── health_metrics
├── reminders
├── fairy_avatars
├── subscriptions
├── payment_methods
├── partners
├── partner_sharing_settings
├── device_integrations
├── amara_chats
└── tribal_messages
```

### **1. users (User Profiles)**

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  birthday DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  onboarding_completed BOOLEAN DEFAULT FALSE,
  
  -- Settings
  language VARCHAR(10) DEFAULT 'en',
  timezone VARCHAR(50) DEFAULT 'UTC',
  theme VARCHAR(20) DEFAULT 'light', -- 'light' | 'dark' | 'auto'
  notifications_enabled BOOLEAN DEFAULT TRUE,
  biometric_enabled BOOLEAN DEFAULT FALSE,
  
  -- Privacy
  data_sharing_enabled BOOLEAN DEFAULT FALSE,
  analytics_enabled BOOLEAN DEFAULT TRUE,
  
  -- Subscription
  subscription_tier VARCHAR(20) DEFAULT 'free', -- 'free' | 'plus' | 'premium'
  subscription_status VARCHAR(20) DEFAULT 'active',
  trial_ends_at TIMESTAMP WITH TIME ZONE,
  
  CONSTRAINT users_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$')
);

CREATE INDEX idx_users_auth_id ON users(auth_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_subscription_tier ON users(subscription_tier);
```

### **2. periods (Period Tracking)**

```sql
CREATE TABLE periods (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE,
  flow_intensity VARCHAR(20), -- 'light' | 'medium' | 'heavy'
  
  -- Cycle predictions
  predicted_end_date DATE,
  is_predicted BOOLEAN DEFAULT FALSE,
  
  -- Metadata
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT periods_dates_check CHECK (end_date IS NULL OR end_date >= start_date)
);

CREATE INDEX idx_periods_user_id ON periods(user_id);
CREATE INDEX idx_periods_start_date ON periods(start_date);
CREATE INDEX idx_periods_user_date ON periods(user_id, start_date DESC);
```

### **3. symptoms (Daily Symptom Tracking)**

```sql
CREATE TABLE symptoms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  log_date DATE NOT NULL,
  
  -- Physical symptoms
  cramps INTEGER CHECK (cramps BETWEEN 0 AND 10),
  headache INTEGER CHECK (headache BETWEEN 0 AND 10),
  bloating INTEGER CHECK (bloating BETWEEN 0 AND 10),
  fatigue INTEGER CHECK (fatigue BETWEEN 0 AND 10),
  breast_tenderness INTEGER CHECK (breast_tenderness BETWEEN 0 AND 10),
  nausea INTEGER CHECK (nausea BETWEEN 0 AND 10),
  acne INTEGER CHECK (acne BETWEEN 0 AND 10),
  back_pain INTEGER CHECK (back_pain BETWEEN 0 AND 10),
  
  -- Custom symptoms (JSON array)
  custom_symptoms JSONB DEFAULT '[]'::jsonb,
  
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, log_date)
);

CREATE INDEX idx_symptoms_user_id ON symptoms(user_id);
CREATE INDEX idx_symptoms_log_date ON symptoms(log_date);
CREATE INDEX idx_symptoms_user_date ON symptoms(user_id, log_date DESC);
```

### **4. moods (Mood Tracking)**

```sql
CREATE TABLE moods (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  log_date DATE NOT NULL,
  
  -- Mood states (can select multiple)
  happy BOOLEAN DEFAULT FALSE,
  sad BOOLEAN DEFAULT FALSE,
  anxious BOOLEAN DEFAULT FALSE,
  irritable BOOLEAN DEFAULT FALSE,
  calm BOOLEAN DEFAULT FALSE,
  energetic BOOLEAN DEFAULT FALSE,
  tired BOOLEAN DEFAULT FALSE,
  focused BOOLEAN DEFAULT FALSE,
  
  -- Energy level (1-10)
  energy_level INTEGER CHECK (energy_level BETWEEN 1 AND 10),
  
  -- Sleep quality (1-10)
  sleep_quality INTEGER CHECK (sleep_quality BETWEEN 1 AND 10),
  sleep_hours DECIMAL(3,1),
  
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, log_date)
);

CREATE INDEX idx_moods_user_id ON moods(user_id);
CREATE INDEX idx_moods_log_date ON moods(log_date);
CREATE INDEX idx_moods_user_date ON moods(user_id, log_date DESC);
```

### **5. health_metrics (Weight, BMI, Temperature, Water)**

```sql
CREATE TABLE health_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  log_date DATE NOT NULL,
  
  -- Weight tracking
  weight_kg DECIMAL(5,2),
  weight_lb DECIMAL(5,2),
  
  -- BMI (calculated)
  bmi DECIMAL(4,2),
  height_cm DECIMAL(5,2),
  
  -- Basal Body Temperature (BBT)
  temperature_celsius DECIMAL(4,2),
  temperature_fahrenheit DECIMAL(4,2),
  
  -- Water intake
  water_intake_ml INTEGER,
  water_intake_oz INTEGER,
  water_goal_ml INTEGER DEFAULT 2000,
  
  -- Metadata
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, log_date)
);

CREATE INDEX idx_health_metrics_user_id ON health_metrics(user_id);
CREATE INDEX idx_health_metrics_log_date ON health_metrics(log_date);
CREATE INDEX idx_health_metrics_user_date ON health_metrics(user_id, log_date DESC);
```

### **6. reminders (Notifications)**

```sql
CREATE TABLE reminders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  reminder_type VARCHAR(50) NOT NULL, -- 'period' | 'ovulation' | 'pill' | 'water' | 'custom'
  title VARCHAR(200) NOT NULL,
  message TEXT,
  
  -- Scheduling
  time_of_day TIME NOT NULL, -- e.g., '09:00:00'
  days_before INTEGER, -- For period/ovulation reminders
  recurring BOOLEAN DEFAULT TRUE,
  
  -- Recurrence pattern
  repeat_pattern VARCHAR(20), -- 'daily' | 'weekly' | 'monthly' | 'custom'
  repeat_days JSONB, -- [0,1,2,3,4,5,6] for days of week
  
  enabled BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_reminders_user_id ON reminders(user_id);
CREATE INDEX idx_reminders_enabled ON reminders(enabled);
CREATE INDEX idx_reminders_type ON reminders(reminder_type);
```

### **7. fairy_avatars (Avatar Customization)**

```sql
CREATE TABLE fairy_avatars (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  
  -- Avatar configuration
  preset_id VARCHAR(50), -- null if custom
  
  -- Customization options (JSON)
  skin_tone VARCHAR(50),
  hair_style VARCHAR(50),
  hair_color VARCHAR(50),
  wing_style VARCHAR(50),
  wing_color VARCHAR(50),
  outfit VARCHAR(50),
  accessories JSONB DEFAULT '[]'::jsonb,
  
  -- Complete config (for easy retrieval)
  avatar_config JSONB NOT NULL,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_fairy_avatars_user_id ON fairy_avatars(user_id);
```

### **8. subscriptions (Payment Plans)**

```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  plan_type VARCHAR(20) NOT NULL, -- 'monthly' | 'yearly'
  plan_tier VARCHAR(20) NOT NULL, -- 'plus' | 'premium'
  
  status VARCHAR(20) NOT NULL, -- 'active' | 'canceled' | 'expired' | 'past_due'
  
  -- Stripe IDs
  stripe_subscription_id VARCHAR(100) UNIQUE,
  stripe_customer_id VARCHAR(100),
  
  -- Dates
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  canceled_at TIMESTAMP WITH TIME ZONE,
  
  -- Pricing
  amount_cents INTEGER NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  
  -- Trial
  trial_start TIMESTAMP WITH TIME ZONE,
  trial_end TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe_id ON subscriptions(stripe_subscription_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
```

### **9. payment_methods (Saved Cards)**

```sql
CREATE TABLE payment_methods (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  -- Stripe payment method ID
  stripe_payment_method_id VARCHAR(100) UNIQUE NOT NULL,
  
  -- Card details (from Stripe)
  card_brand VARCHAR(20), -- 'visa' | 'mastercard' | 'amex'
  card_last4 VARCHAR(4),
  card_exp_month INTEGER,
  card_exp_year INTEGER,
  
  is_default BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_payment_methods_user_id ON payment_methods(user_id);
CREATE INDEX idx_payment_methods_stripe_id ON payment_methods(stripe_payment_method_id);
```

### **10. partners (Partner Connections)**

```sql
CREATE TABLE partners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  partner_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  -- Connection
  connection_code VARCHAR(20) UNIQUE NOT NULL,
  status VARCHAR(20) DEFAULT 'pending', -- 'pending' | 'active' | 'inactive'
  
  -- Sharing permissions (JSON)
  shared_data JSONB DEFAULT '{"periods": true, "symptoms": false, "moods": false, "fertility": true}'::jsonb,
  
  connected_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT partners_not_self CHECK (user_id != partner_user_id)
);

CREATE INDEX idx_partners_user_id ON partners(user_id);
CREATE INDEX idx_partners_partner_user_id ON partners(partner_user_id);
CREATE INDEX idx_partners_connection_code ON partners(connection_code);
CREATE INDEX idx_partners_status ON partners(status);
```

### **11. device_integrations (Apple Health, etc.)**

```sql
CREATE TABLE device_integrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  device_type VARCHAR(50) NOT NULL, -- 'apple_health' | 'google_fit' | 'fitbit'
  status VARCHAR(20) DEFAULT 'connected', -- 'connected' | 'disconnected' | 'error'
  
  -- Permissions
  permissions JSONB DEFAULT '{"read": [], "write": []}'::jsonb,
  
  -- Sync info
  last_sync_at TIMESTAMP WITH TIME ZONE,
  sync_enabled BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, device_type)
);

CREATE INDEX idx_device_integrations_user_id ON device_integrations(user_id);
CREATE INDEX idx_device_integrations_status ON device_integrations(status);
```

### **12. amara_chats (AI Chat History)**

```sql
CREATE TABLE amara_chats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  message_type VARCHAR(20) NOT NULL, -- 'user' | 'amara'
  message_text TEXT NOT NULL,
  
  -- AI metadata
  ai_context JSONB, -- Summarized cycle data sent to AI
  ai_model VARCHAR(50),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_amara_chats_user_id ON amara_chats(user_id);
CREATE INDEX idx_amara_chats_created_at ON amara_chats(created_at DESC);
CREATE INDEX idx_amara_chats_user_date ON amara_chats(user_id, created_at DESC);
```

### **13. tribal_messages (Community Chat)**

```sql
CREATE TABLE tribal_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  
  message_text TEXT NOT NULL,
  
  -- Reactions
  likes_count INTEGER DEFAULT 0,
  
  -- Moderation
  is_flagged BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_tribal_messages_user_id ON tribal_messages(user_id);
CREATE INDEX idx_tribal_messages_created_at ON tribal_messages(created_at DESC);
CREATE INDEX idx_tribal_messages_flagged ON tribal_messages(is_flagged) WHERE is_flagged = TRUE;
```

---

## 🔐 ROW LEVEL SECURITY (RLS)

### **Enable RLS on All Tables**

```sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE periods ENABLE ROW LEVEL SECURITY;
ALTER TABLE symptoms ENABLE ROW LEVEL SECURITY;
ALTER TABLE moods ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE fairy_avatars ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE device_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE amara_chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE tribal_messages ENABLE ROW LEVEL SECURITY;
```

### **RLS Policies**

#### **Users Table**

```sql
-- Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid() = auth_id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = auth_id);

-- Users can insert their profile on signup
CREATE POLICY "Users can insert own profile"
  ON users FOR INSERT
  WITH CHECK (auth.uid() = auth_id);
```

#### **Periods Table**

```sql
-- Users can view their own periods
CREATE POLICY "Users can view own periods"
  ON periods FOR SELECT
  USING (user_id IN (
    SELECT id FROM users WHERE auth_id = auth.uid()
  ));

-- Partners can view shared periods
CREATE POLICY "Partners can view shared periods"
  ON periods FOR SELECT
  USING (
    user_id IN (
      SELECT p.user_id FROM partners p
      WHERE p.partner_user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
        AND p.status = 'active'
        AND (p.shared_data->>'periods')::boolean = TRUE
    )
  );

-- Users can insert their own periods
CREATE POLICY "Users can insert own periods"
  ON periods FOR INSERT
  WITH CHECK (user_id IN (
    SELECT id FROM users WHERE auth_id = auth.uid()
  ));

-- Users can update their own periods
CREATE POLICY "Users can update own periods"
  ON periods FOR UPDATE
  USING (user_id IN (
    SELECT id FROM users WHERE auth_id = auth.uid()
  ));

-- Users can delete their own periods
CREATE POLICY "Users can delete own periods"
  ON periods FOR DELETE
  USING (user_id IN (
    SELECT id FROM users WHERE auth_id = auth.uid()
  ));
```

#### **Symptoms, Moods, Health Metrics (Similar Pattern)**

```sql
-- Apply same policies for symptoms
CREATE POLICY "Users can manage own symptoms" ON symptoms
  FOR ALL USING (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));

-- Apply same policies for moods
CREATE POLICY "Users can manage own moods" ON moods
  FOR ALL USING (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));

-- Apply same policies for health_metrics
CREATE POLICY "Users can manage own health_metrics" ON health_metrics
  FOR ALL USING (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));
```

#### **AMARA Chats**

```sql
CREATE POLICY "Users can manage own chats" ON amara_chats
  FOR ALL USING (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));
```

#### **Tribal Messages**

```sql
-- All users can view non-deleted messages
CREATE POLICY "Users can view tribal messages" ON tribal_messages
  FOR SELECT USING (is_deleted = FALSE);

-- Users can insert their own messages
CREATE POLICY "Users can insert own messages" ON tribal_messages
  FOR INSERT WITH CHECK (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));

-- Users can update their own messages
CREATE POLICY "Users can update own messages" ON tribal_messages
  FOR UPDATE USING (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));
```

---

## 🔑 AUTHENTICATION SETUP

### **Supabase Auth Configuration**

**Providers to Enable:**
- ✅ Email/Password
- ✅ Apple OAuth
- ✅ Google OAuth
- ✅ Facebook OAuth
- ✅ Twitter/X OAuth

**Email Templates:**
- Welcome email
- Email verification
- Password reset
- Magic link

**Security Settings:**
- Enable email verification: `true`
- Enable MFA: `true` (optional)
- Password requirements: Min 8 chars, 1 uppercase, 1 number, 1 special
- Session timeout: 7 days
- Refresh token rotation: `true`

---

## 📦 STORAGE BUCKETS

### **Bucket Configuration**

```sql
-- Create storage buckets
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('avatars', 'avatars', TRUE),
  ('fairy-assets', 'fairy-assets', TRUE),
  ('user-exports', 'user-exports', FALSE),
  ('profile-pictures', 'profile-pictures', TRUE);
```

### **Storage Policies**

```sql
-- Avatars: Public read, authenticated write
CREATE POLICY "Avatar images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload avatars"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');

-- User exports: Private
CREATE POLICY "Users can access own exports"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'user-exports' AND auth.uid()::text = (storage.foldername(name))[1]);
```

---

## 📚 DATABASE FUNCTIONS

### **Calculate BMI**

```sql
CREATE OR REPLACE FUNCTION calculate_bmi(weight_kg DECIMAL, height_cm DECIMAL)
RETURNS DECIMAL AS $$
BEGIN
  IF height_cm IS NULL OR height_cm <= 0 THEN
    RETURN NULL;
  END IF;
  RETURN ROUND((weight_kg / ((height_cm / 100) * (height_cm / 100)))::NUMERIC, 2);
END;
$$ LANGUAGE plpgsql IMMUTABLE;
```

### **Predict Next Period**

```sql
CREATE OR REPLACE FUNCTION predict_next_period(p_user_id UUID)
RETURNS TABLE(predicted_start DATE, predicted_end DATE) AS $$
DECLARE
  avg_cycle_length INTEGER;
  last_period_start DATE;
  avg_period_length INTEGER;
BEGIN
  -- Calculate average cycle length from last 3 periods
  SELECT 
    ROUND(AVG(EXTRACT(day FROM (lead(start_date) OVER (ORDER BY start_date) - start_date))))::INTEGER,
    MAX(start_date),
    ROUND(AVG(EXTRACT(day FROM (end_date - start_date))))::INTEGER
  INTO avg_cycle_length, last_period_start, avg_period_length
  FROM periods
  WHERE user_id = p_user_id AND end_date IS NOT NULL
  ORDER BY start_date DESC
  LIMIT 3;
  
  IF avg_cycle_length IS NULL THEN
    avg_cycle_length := 28; -- Default
  END IF;
  
  IF avg_period_length IS NULL THEN
    avg_period_length := 5; -- Default
  END IF;
  
  RETURN QUERY
  SELECT 
    (last_period_start + avg_cycle_length)::DATE AS predicted_start,
    (last_period_start + avg_cycle_length + avg_period_length)::DATE AS predicted_end;
END;
$$ LANGUAGE plpgsql;
```

### **Get Cycle Phase**

```sql
CREATE OR REPLACE FUNCTION get_cycle_phase(p_user_id UUID, p_date DATE DEFAULT CURRENT_DATE)
RETURNS VARCHAR AS $$
DECLARE
  last_period_start DATE;
  avg_cycle_length INTEGER;
  days_since_period INTEGER;
BEGIN
  SELECT start_date INTO last_period_start
  FROM periods
  WHERE user_id = p_user_id AND start_date <= p_date
  ORDER BY start_date DESC
  LIMIT 1;
  
  IF last_period_start IS NULL THEN
    RETURN 'unknown';
  END IF;
  
  days_since_period := p_date - last_period_start;
  
  -- Assume 28-day cycle
  IF days_since_period <= 5 THEN
    RETURN 'menstrual';
  ELSIF days_since_period <= 13 THEN
    RETURN 'follicular';
  ELSIF days_since_period <= 16 THEN
    RETURN 'ovulation';
  ELSE
    RETURN 'luteal';
  END IF;
END;
$$ LANGUAGE plpgsql;
```

---

## 🔄 DATABASE TRIGGERS

### **Auto-update timestamps**

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_periods_updated_at BEFORE UPDATE ON periods
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ... (apply to all other tables)
```

### **Auto-calculate BMI**

```sql
CREATE OR REPLACE FUNCTION auto_calculate_bmi()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.weight_kg IS NOT NULL AND NEW.height_cm IS NOT NULL THEN
    NEW.bmi := calculate_bmi(NEW.weight_kg, NEW.height_cm);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calculate_bmi_on_insert_update
  BEFORE INSERT OR UPDATE ON health_metrics
  FOR EACH ROW EXECUTE FUNCTION auto_calculate_bmi();
```

---

## 🎯 INDEXES FOR PERFORMANCE

```sql
-- Composite indexes for common queries
CREATE INDEX idx_periods_user_date_range ON periods(user_id, start_date, end_date);
CREATE INDEX idx_symptoms_user_date_range ON symptoms(user_id, log_date);
CREATE INDEX idx_health_metrics_user_date_range ON health_metrics(user_id, log_date);

-- Indexes for partner queries
CREATE INDEX idx_partners_active ON partners(user_id, partner_user_id) WHERE status = 'active';

-- Indexes for real-time subscriptions
CREATE INDEX idx_tribal_messages_recent ON tribal_messages(created_at DESC) WHERE is_deleted = FALSE;
CREATE INDEX idx_amara_chats_recent ON amara_chats(user_id, created_at DESC);
```

---

**Next:** See `SUPABASE_API_STRUCTURE.md` for API endpoints and React hooks.
