import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useUser } from './useUser';

type Symptom = {
  id: string;
  user_id: string;
  log_date: string;
  cramps?: number;
  headache?: number;
  bloating?: number;
  fatigue?: number;
  breast_tenderness?: number;
  nausea?: number;
  acne?: number;
  back_pain?: number;
  custom_symptoms?: any[];
  notes?: string;
  created_at?: string;
  updated_at?: string;
};

type SymptomInsert = {
  log_date: string;
  cramps?: number;
  headache?: number;
  bloating?: number;
  fatigue?: number;
  breast_tenderness?: number;
  nausea?: number;
  acne?: number;
  back_pain?: number;
  custom_symptoms?: any[];
  notes?: string;
};

export function useSymptoms(startDate?: Date, endDate?: Date) {
  const { profile } = useUser();
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (profile) {
      fetchSymptoms();
    } else {
      setLoading(false);
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
      console.error('Error fetching symptoms:', err);
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
