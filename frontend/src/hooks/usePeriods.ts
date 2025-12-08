import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useUser } from './useUser';

type Period = {
  id: string;
  user_id: string;
  start_date: string;
  end_date?: string;
  flow_intensity?: string;
  predicted_end_date?: string;
  is_predicted?: boolean;
  notes?: string;
  created_at?: string;
  updated_at?: string;
};

type PeriodInsert = {
  start_date: string;
  end_date?: string;
  flow_intensity?: string;
  notes?: string;
};

export function usePeriods() {
  const { profile } = useUser();
  const [periods, setPeriods] = useState<Period[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (profile) {
      fetchPeriods();
    } else {
      setLoading(false);
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
      console.error('Error fetching periods:', err);
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

  return {
    periods,
    loading,
    error,
    addPeriod,
    updatePeriod,
    deletePeriod,
    refetch: fetchPeriods,
  };
}
