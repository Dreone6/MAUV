-- ============================================
-- MAUV APP - SUPABASE DATABASE SCHEMA
-- Run this in Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- TABLE 1: USERS
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_id UUID UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  birthday DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  onboarding_completed BOOLEAN DEFAULT FALSE,
  language VARCHAR(10) DEFAULT 'en',
  timezone VARCHAR(50) DEFAULT 'UTC',
  theme VARCHAR(20) DEFAULT 'light',
  notifications_enabled BOOLEAN DEFAULT TRUE,
  biometric_enabled BOOLEAN DEFAULT FALSE,
  data_sharing_enabled BOOLEAN DEFAULT FALSE,
  analytics_enabled BOOLEAN DEFAULT TRUE,
  subscription_tier VARCHAR(20) DEFAULT 'free',
  subscription_status VARCHAR(20) DEFAULT 'active',
  trial_ends_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_users_auth_id ON users(auth_id);
CREATE INDEX idx_users_email ON users(email);

-- TABLE 2: PERIODS
CREATE TABLE IF NOT EXISTS periods (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE,
  flow_intensity VARCHAR(20),
  predicted_end_date DATE,
  is_predicted BOOLEAN DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_periods_user_id ON periods(user_id);
CREATE INDEX idx_periods_start_date ON periods(start_date);

-- TABLE 3: SYMPTOMS
CREATE TABLE IF NOT EXISTS symptoms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  log_date DATE NOT NULL,
  cramps INTEGER,
  headache INTEGER,
  bloating INTEGER,
  fatigue INTEGER,
  breast_tenderness INTEGER,
  nausea INTEGER,
  acne INTEGER,
  back_pain INTEGER,
  custom_symptoms JSONB DEFAULT '[]'::jsonb,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, log_date)
);

CREATE INDEX idx_symptoms_user_id ON symptoms(user_id);

-- TABLE 4: MOODS
CREATE TABLE IF NOT EXISTS moods (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  log_date DATE NOT NULL,
  happy BOOLEAN DEFAULT FALSE,
  sad BOOLEAN DEFAULT FALSE,
  anxious BOOLEAN DEFAULT FALSE,
  irritable BOOLEAN DEFAULT FALSE,
  calm BOOLEAN DEFAULT FALSE,
  energetic BOOLEAN DEFAULT FALSE,
  tired BOOLEAN DEFAULT FALSE,
  focused BOOLEAN DEFAULT FALSE,
  energy_level INTEGER,
  sleep_quality INTEGER,
  sleep_hours DECIMAL(3,1),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, log_date)
);

CREATE INDEX idx_moods_user_id ON moods(user_id);

-- TABLE 5: HEALTH METRICS
CREATE TABLE IF NOT EXISTS health_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  log_date DATE NOT NULL,
  weight_kg DECIMAL(5,2),
  weight_lb DECIMAL(5,2),
  bmi DECIMAL(4,2),
  height_cm DECIMAL(5,2),
  temperature_celsius DECIMAL(4,2),
  temperature_fahrenheit DECIMAL(4,2),
  water_intake_ml INTEGER,
  water_intake_oz INTEGER,
  water_goal_ml INTEGER DEFAULT 2000,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, log_date)
);

CREATE INDEX idx_health_metrics_user_id ON health_metrics(user_id);

-- TABLE 6: REMINDERS
CREATE TABLE IF NOT EXISTS reminders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  reminder_type VARCHAR(50) NOT NULL,
  title VARCHAR(200) NOT NULL,
  message TEXT,
  time_of_day TIME NOT NULL,
  days_before INTEGER,
  recurring BOOLEAN DEFAULT TRUE,
  repeat_pattern VARCHAR(20),
  repeat_days JSONB,
  enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_reminders_user_id ON reminders(user_id);

-- TABLE 7: FAIRY AVATARS
CREATE TABLE IF NOT EXISTS fairy_avatars (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  preset_id VARCHAR(50),
  skin_tone VARCHAR(50),
  hair_style VARCHAR(50),
  hair_color VARCHAR(50),
  wing_style VARCHAR(50),
  wing_color VARCHAR(50),
  outfit VARCHAR(50),
  accessories JSONB DEFAULT '[]'::jsonb,
  avatar_config JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABLE 8: SUBSCRIPTIONS
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  plan_type VARCHAR(20) NOT NULL,
  plan_tier VARCHAR(20) NOT NULL,
  status VARCHAR(20) NOT NULL,
  stripe_subscription_id VARCHAR(100) UNIQUE,
  stripe_customer_id VARCHAR(100),
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  canceled_at TIMESTAMP WITH TIME ZONE,
  amount_cents INTEGER NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  trial_start TIMESTAMP WITH TIME ZONE,
  trial_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABLE 9: PAYMENT METHODS
CREATE TABLE IF NOT EXISTS payment_methods (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  stripe_payment_method_id VARCHAR(100) UNIQUE NOT NULL,
  card_brand VARCHAR(20),
  card_last4 VARCHAR(4),
  card_exp_month INTEGER,
  card_exp_year INTEGER,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABLE 10: PARTNERS
CREATE TABLE IF NOT EXISTS partners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  partner_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  connection_code VARCHAR(20) UNIQUE NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  shared_data JSONB DEFAULT '{"periods": true, "symptoms": false}'::jsonb,
  connected_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABLE 11: DEVICE INTEGRATIONS
CREATE TABLE IF NOT EXISTS device_integrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  device_type VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'connected',
  permissions JSONB DEFAULT '{}'::jsonb,
  last_sync_at TIMESTAMP WITH TIME ZONE,
  sync_enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, device_type)
);

-- TABLE 12: AMARA CHATS
CREATE TABLE IF NOT EXISTS amara_chats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  message_type VARCHAR(20) NOT NULL,
  message_text TEXT NOT NULL,
  ai_context JSONB,
  ai_model VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_amara_chats_user_id ON amara_chats(user_id);

-- TABLE 13: TRIBAL MESSAGES
CREATE TABLE IF NOT EXISTS tribal_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  message_text TEXT NOT NULL,
  likes_count INTEGER DEFAULT 0,
  is_flagged BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ENABLE RLS
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

-- RLS POLICIES
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = auth_id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = auth_id);
CREATE POLICY "Users can insert own profile" ON users FOR INSERT WITH CHECK (auth.uid() = auth_id);
CREATE POLICY "Users can manage own periods" ON periods FOR ALL USING (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));
CREATE POLICY "Users can manage own symptoms" ON symptoms FOR ALL USING (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));
CREATE POLICY "Users can manage own moods" ON moods FOR ALL USING (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));
CREATE POLICY "Users can manage own health metrics" ON health_metrics FOR ALL USING (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));
CREATE POLICY "Users can manage own reminders" ON reminders FOR ALL USING (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));
CREATE POLICY "Users can manage own avatar" ON fairy_avatars FOR ALL USING (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));
CREATE POLICY "Users can manage own chats" ON amara_chats FOR ALL USING (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));
CREATE POLICY "Users can view tribal messages" ON tribal_messages FOR SELECT USING (is_deleted = FALSE);
CREATE POLICY "Users can insert own messages" ON tribal_messages FOR INSERT WITH CHECK (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));

SELECT 'Database schema created successfully!' AS status;
