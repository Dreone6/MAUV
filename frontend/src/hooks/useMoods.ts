import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useUser } from './useUser';

type Mood = {
  id: string;
  user_id: string;
  log_date: string;
  happy?: boolean;
  sad?: boolean;
  anxious?: boolean;
  irritable?: boolean;
  calm?: boolean;
  energetic?: boolean;
  tired?: boolean;
  focused?: boolean;
  energy_level?: number;
  sleep_quality?: number;
  sleep_hours?: number;
  notes?: string;
  created_at?: string;
  updated_at?: string;
};

type MoodInsert = {
  log_date: string;
  happy?: boolean;
  sad?: boolean;
  anxious?: boolean;
  irritable?: boolean;
  calm?: boolean;
  energetic?: boolean;
  tired?: boolean;
  focused?: boolean;
  energy_level?: number;
  sleep_quality?: number;
  sleep_hours?: number;
  notes?: string;
};

export function useMoods(startDate?: Date, endDate?: Date) {
  const { profile } = useUser();
  const [moods, setMoods] = useState<Mood[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (profile) {
      fetchMoods();
    } else {
      setLoading(false);
    }
  }, [profile, startDate, endDate]);

  async function fetchMoods() {
    try {
      setLoading(true);
      let query = supabase
        .from('moods')
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
      setMoods(data || []);
    } catch (err) {
      setError(err as Error);
      console.error('Error fetching moods:', err);
    } finally {
      setLoading(false);
    }
  }

  async function logMood(moodData: MoodInsert) {
    try {
      const { data, error } = await supabase
        .from('moods')
        .upsert({ ...moodData, user_id: profile!.id })
        .select()
        .single();

      if (error) throw error;
      
      setMoods(prev => {
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
    moods,
    loading,
    error,
    logMood,
    refetch: fetchMoods,
  };
}
