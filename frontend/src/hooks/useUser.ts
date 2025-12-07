import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from './useAuth';

type UserProfile = {
  id: string;
  auth_id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  birthday?: string;
  created_at?: string;
  updated_at?: string;
  onboarding_completed?: boolean;
  language?: string;
  timezone?: string;
  theme?: string;
  notifications_enabled?: boolean;
  subscription_tier?: string;
  subscription_status?: string;
};

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
