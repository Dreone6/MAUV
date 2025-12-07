# 🔌 MAUV - SUPABASE API STRUCTURE & REACT HOOKS

**Project:** MAUV Women's Health App  
**Date:** December 6, 2025  

---

## 📁 FILE STRUCTURE

```
/app/frontend/
├── src/
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts          # Supabase client initialization
│   │   │   ├── auth.ts            # Auth helper functions
│   │   │   ├── database.ts        # Database helper functions
│   │   │   └── storage.ts         # Storage helper functions
│   ├── hooks/
│   │   ├── useAuth.ts             # Authentication hook
│   │   ├── useUser.ts             # User profile hook
│   │   ├── usePeriods.ts          # Period tracking hook
│   │   ├── useSymptoms.ts         # Symptoms tracking hook
│   │   ├── useMoods.ts            # Mood tracking hook
│   │   ├── useHealthMetrics.ts    # Health metrics hook
│   │   ├── useReminders.ts        # Reminders hook
│   │   ├── useAvatar.ts           # Fairy avatar hook
│   │   ├── useSubscription.ts     # Subscription management hook
│   │   ├── usePartner.ts          # Partner features hook
│   │   ├── useAmaraChat.ts        # AMARA AI chat hook
│   │   └── useTribalChat.ts       # Tribal chat hook
│   ├── types/
│   │   ├── database.types.ts      # Supabase generated types
│   │   ├── auth.types.ts          # Authentication types
│   │   └── api.types.ts           # API response types
│   └── utils/
│       ├── supabase-helpers.ts    # Helper utilities
│       └── date-helpers.ts        # Date formatting utilities
```

---

## 🔧 SUPABASE CLIENT SETUP

### **`/lib/supabase/client.ts`**

```typescript
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

// Export types
export type SupabaseClient = typeof supabase;
```

---

## 🔐 AUTHENTICATION HELPERS

### **`/lib/supabase/auth.ts`**

```typescript
import { supabase } from './client';
import { Provider } from '@supabase/supabase-js';

// Email/Password Sign Up
export async function signUpWithEmail(email: string, password: string, userData?: {
  firstName?: string;
  lastName?: string;
  birthday?: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData,
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) throw error;

  // Create user profile
  if (data.user) {
    const { error: profileError } = await supabase.from('users').insert({
      auth_id: data.user.id,
      email: data.user.email!,
      first_name: userData?.firstName,
      last_name: userData?.lastName,
      birthday: userData?.birthday,
    });

    if (profileError) throw profileError;
  }

  return data;
}

// Email/Password Sign In
export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

// Social OAuth Sign In
export async function signInWithOAuth(provider: Provider) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });

  if (error) throw error;
  return data;
}

// Sign Out
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// Password Reset Request
export async function requestPasswordReset(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  });

  if (error) throw error;
}

// Update Password
export async function updatePassword(newPassword: string) {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) throw error;
}

// Verify OTP
export async function verifyOtp(email: string, token: string) {
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: 'email',
  });

  if (error) throw error;
  return data;
}

// Get Current Session
export async function getCurrentSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

// Get Current User
export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user;
}
```

---

## 🪝 REACT HOOKS

### **1. useAuth Hook**

**`/hooks/useAuth.ts`**

```typescript
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import * as authHelpers from '@/lib/supabase/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return {
    user,
    session,
    loading,
    isAuthenticated: !!user,
    signUp: authHelpers.signUpWithEmail,
    signIn: authHelpers.signInWithEmail,
    signInWithOAuth: authHelpers.signInWithOAuth,
    signOut: authHelpers.signOut,
    requestPasswordReset: authHelpers.requestPasswordReset,
    updatePassword: authHelpers.updatePassword,
    verifyOtp: authHelpers.verifyOtp,
  };
}
```

### **2. useUser Hook**

**`/hooks/useUser.ts`**

```typescript
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from './useAuth';
import { Database } from '@/types/database.types';

type UserProfile = Database['public']['Tables']['users']['Row'];

export function useUser() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    fetchProfile();
  }, [user]);

  async function fetchProfile() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('auth_id', user!.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile(updates: Partial<UserProfile>) {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('auth_id', user!.id)
        .select()
        .single();

      if (error) throw error;
      setProfile(data);
      return data;
    } catch (err) {
      throw err;
    }
  }

  return {
    profile,
    loading,
    error,
    updateProfile,
    refetch: fetchProfile,
  };
}
```

### **3. usePeriods Hook**

**`/hooks/usePeriods.ts`**

```typescript
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useUser } from './useUser';
import { Database } from '@/types/database.types';

type Period = Database['public']['Tables']['periods']['Row'];
type PeriodInsert = Database['public']['Tables']['periods']['Insert'];

export function usePeriods() {
  const { profile } = useUser();
  const [periods, setPeriods] = useState<Period[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (profile) {
      fetchPeriods();
    }
  }, [profile]);

  async function fetchPeriods() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('periods')
        .select('*')
        .eq('user_id', profile!.id)
        .order('start_date', { ascending: false });

      if (error) throw error;
      setPeriods(data || []);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  async function addPeriod(period: PeriodInsert) {
    try {
      const { data, error } = await supabase
        .from('periods')
        .insert({ ...period, user_id: profile!.id })
        .select()
        .single();

      if (error) throw error;
      setPeriods([data, ...periods]);
      return data;
    } catch (err) {
      throw err;
    }
  }

  async function updatePeriod(id: string, updates: Partial<Period>) {
    try {
      const { data, error } = await supabase
        .from('periods')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setPeriods(periods.map(p => p.id === id ? data : p));
      return data;
    } catch (err) {
      throw err;
    }
  }

  async function deletePeriod(id: string) {
    try {
      const { error } = await supabase
        .from('periods')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setPeriods(periods.filter(p => p.id !== id));
    } catch (err) {
      throw err;
    }
  }

  async function predictNextPeriod() {
    try {
      const { data, error } = await supabase
        .rpc('predict_next_period', { p_user_id: profile!.id });

      if (error) throw error;
      return data;
    } catch (err) {
      throw err;
    }
  }

  return {
    periods,
    loading,
    error,
    addPeriod,
    updatePeriod,
    deletePeriod,
    predictNextPeriod,
    refetch: fetchPeriods,
  };
}
```

### **4. useSymptoms Hook**

**`/hooks/useSymptoms.ts`**

```typescript
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useUser } from './useUser';
import { Database } from '@/types/database.types';

type Symptom = Database['public']['Tables']['symptoms']['Row'];
type SymptomInsert = Database['public']['Tables']['symptoms']['Insert'];

export function useSymptoms(startDate?: Date, endDate?: Date) {
  const { profile } = useUser();
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (profile) {
      fetchSymptoms();
    }
  }, [profile, startDate, endDate]);

  async function fetchSymptoms() {
    try {
      setLoading(true);
      let query = supabase
        .from('symptoms')
        .select('*')
        .eq('user_id', profile!.id);

      if (startDate) {
        query = query.gte('log_date', startDate.toISOString().split('T')[0]);
      }
      if (endDate) {
        query = query.lte('log_date', endDate.toISOString().split('T')[0]);
      }

      query = query.order('log_date', { ascending: false });

      const { data, error } = await query;

      if (error) throw error;
      setSymptoms(data || []);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  async function logSymptoms(symptomData: SymptomInsert) {
    try {
      const { data, error } = await supabase
        .from('symptoms')
        .upsert({ ...symptomData, user_id: profile!.id })
        .select()
        .single();

      if (error) throw error;
      
      setSymptoms(prev => {
        const existing = prev.findIndex(s => s.log_date === data.log_date);
        if (existing >= 0) {
          const updated = [...prev];
          updated[existing] = data;
          return updated;
        }
        return [data, ...prev];
      });
      
      return data;
    } catch (err) {
      throw err;
    }
  }

  return {
    symptoms,
    loading,
    error,
    logSymptoms,
    refetch: fetchSymptoms,
  };
}
```

### **5. useHealthMetrics Hook**

**`/hooks/useHealthMetrics.ts`**

```typescript
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useUser } from './useUser';
import { Database } from '@/types/database.types';

type HealthMetric = Database['public']['Tables']['health_metrics']['Row'];
type HealthMetricInsert = Database['public']['Tables']['health_metrics']['Insert'];

export function useHealthMetrics(startDate?: Date, endDate?: Date) {
  const { profile } = useUser();
  const [metrics, setMetrics] = useState<HealthMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (profile) {
      fetchMetrics();
    }
  }, [profile, startDate, endDate]);

  async function fetchMetrics() {
    try {
      setLoading(true);
      let query = supabase
        .from('health_metrics')
        .select('*')
        .eq('user_id', profile!.id);

      if (startDate) {
        query = query.gte('log_date', startDate.toISOString().split('T')[0]);
      }
      if (endDate) {
        query = query.lte('log_date', endDate.toISOString().split('T')[0]);
      }

      query = query.order('log_date', { ascending: false });

      const { data, error } = await query;

      if (error) throw error;
      setMetrics(data || []);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  async function logMetric(metricData: HealthMetricInsert) {
    try {
      const { data, error } = await supabase
        .from('health_metrics')
        .upsert({ ...metricData, user_id: profile!.id })
        .select()
        .single();

      if (error) throw error;
      
      setMetrics(prev => {
        const existing = prev.findIndex(m => m.log_date === data.log_date);
        if (existing >= 0) {
          const updated = [...prev];
          updated[existing] = data;
          return updated;
        }
        return [data, ...prev];
      });
      
      return data;
    } catch (err) {
      throw err;
    }
  }

  return {
    metrics,
    loading,
    error,
    logMetric,
    refetch: fetchMetrics,
  };
}
```

### **6. useAmaraChat Hook**

**`/hooks/useAmaraChat.ts`**

```typescript
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useUser } from './useUser';
import { Database } from '@/types/database.types';

type AmaraMessage = Database['public']['Tables']['amara_chats']['Row'];

export function useAmaraChat() {
  const { profile } = useUser();
  const [messages, setMessages] = useState<AmaraMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (profile) {
      fetchMessages();
      subscribeToMessages();
    }
  }, [profile]);

  async function fetchMessages() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('amara_chats')
        .select('*')
        .eq('user_id', profile!.id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  function subscribeToMessages() {
    const subscription = supabase
      .channel('amara_messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'amara_chats',
          filter: `user_id=eq.${profile!.id}`,
        },
        (payload) => {
          setMessages(prev => [...prev, payload.new as AmaraMessage]);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }

  async function sendMessage(text: string) {
    try {
      setSending(true);

      // Insert user message
      const { data: userMessage, error: userError } = await supabase
        .from('amara_chats')
        .insert({
          user_id: profile!.id,
          message_type: 'user',
          message_text: text,
        })
        .select()
        .single();

      if (userError) throw userError;

      // Call AMARA AI backend
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat/amara`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, userId: profile!.id }),
      });

      if (!response.ok) throw new Error('Failed to get AI response');

      const { response: aiResponse } = await response.json();

      // Insert AMARA response
      const { data: amaraMessage, error: amaraError } = await supabase
        .from('amara_chats')
        .insert({
          user_id: profile!.id,
          message_type: 'amara',
          message_text: aiResponse,
          ai_model: 'claude-3.7-sonnet',
        })
        .select()
        .single();

      if (amaraError) throw amaraError;

      return amaraMessage;
    } catch (err) {
      throw err;
    } finally {
      setSending(false);
    }
  }

  async function clearHistory() {
    try {
      const { error } = await supabase
        .from('amara_chats')
        .delete()
        .eq('user_id', profile!.id);

      if (error) throw error;
      setMessages([]);
    } catch (err) {
      throw err;
    }
  }

  return {
    messages,
    loading,
    error,
    sending,
    sendMessage,
    clearHistory,
    refetch: fetchMessages,
  };
}
```

### **7. usePartner Hook**

**`/hooks/usePartner.ts`**

```typescript
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useUser } from './useUser';
import { Database } from '@/types/database.types';

type Partner = Database['public']['Tables']['partners']['Row'];

export function usePartner() {
  const { profile } = useUser();
  const [partner, setPartner] = useState<Partner | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (profile) {
      fetchPartner();
    }
  }, [profile]);

  async function fetchPartner() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .eq('user_id', profile!.id)
        .eq('status', 'active')
        .single();

      if (error && error.code !== 'PGRST116') throw error; // Ignore "not found"
      setPartner(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  async function generateConnectionCode() {
    try {
      const code = Math.random().toString(36).substring(2, 10).toUpperCase();
      
      const { data, error } = await supabase
        .from('partners')
        .insert({
          user_id: profile!.id,
          connection_code: code,
          status: 'pending',
        })
        .select()
        .single();

      if (error) throw error;
      return code;
    } catch (err) {
      throw err;
    }
  }

  async function connectWithCode(code: string) {
    try {
      // Find partner by code
      const { data: existingPartner, error: findError } = await supabase
        .from('partners')
        .select('*')
        .eq('connection_code', code)
        .eq('status', 'pending')
        .single();

      if (findError) throw new Error('Invalid or expired code');

      // Update to active and set partner_user_id
      const { data, error } = await supabase
        .from('partners')
        .update({
          partner_user_id: profile!.id,
          status: 'active',
          connected_at: new Date().toISOString(),
        })
        .eq('id', existingPartner.id)
        .select()
        .single();

      if (error) throw error;
      setPartner(data);
      return data;
    } catch (err) {
      throw err;
    }
  }

  async function updateSharingSettings(settings: Record<string, boolean>) {
    try {
      const { data, error } = await supabase
        .from('partners')
        .update({ shared_data: settings })
        .eq('id', partner!.id)
        .select()
        .single();

      if (error) throw error;
      setPartner(data);
      return data;
    } catch (err) {
      throw err;
    }
  }

  async function disconnectPartner() {
    try {
      const { error } = await supabase
        .from('partners')
        .update({ status: 'inactive' })
        .eq('id', partner!.id);

      if (error) throw error;
      setPartner(null);
    } catch (err) {
      throw err;
    }
  }

  return {
    partner,
    loading,
    error,
    isConnected: !!partner && partner.status === 'active',
    generateConnectionCode,
    connectWithCode,
    updateSharingSettings,
    disconnectPartner,
    refetch: fetchPartner,
  };
}
```

---

## 🎯 ENVIRONMENT VARIABLES

### **`.env` (Frontend)**

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Backend API
VITE_BACKEND_URL=http://localhost:8001

# Stripe (for payments)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### **`.env` (Backend)**

```env
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key-here

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# AI
EMERGENT_LLM_KEY=your-emergent-key-here
```

---

**Next:** See `SUPABASE_IMPLEMENTATION_GUIDE.md` for step-by-step integration instructions.
