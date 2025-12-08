import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useUser } from './useUser';

type HealthMetric = {
  id: string;
  user_id: string;
  log_date: string;
  weight_kg?: number;
  weight_lb?: number;
  bmi?: number;
  height_cm?: number;
  temperature_celsius?: number;
  temperature_fahrenheit?: number;
  water_intake_ml?: number;
  water_intake_oz?: number;
  water_goal_ml?: number;
  notes?: string;
  created_at?: string;
  updated_at?: string;
};

type HealthMetricInsert = {
  log_date: string;
  weight_kg?: number;
  weight_lb?: number;
  height_cm?: number;
  temperature_celsius?: number;
  temperature_fahrenheit?: number;
  water_intake_ml?: number;
  water_intake_oz?: number;
  water_goal_ml?: number;
  notes?: string;
};

export function useHealthMetrics(startDate?: Date, endDate?: Date) {
  const { profile } = useUser();
  const [metrics, setMetrics] = useState<HealthMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (profile) {
      fetchMetrics();
    } else {
      setLoading(false);
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
      console.error('Error fetching health metrics:', err);
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
