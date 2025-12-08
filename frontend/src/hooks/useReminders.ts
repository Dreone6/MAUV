import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useUser } from './useUser';

type Reminder = {
  id: string;
  user_id: string;
  reminder_type: string;
  title: string;
  message?: string;
  time_of_day: string;
  days_before?: number;
  recurring?: boolean;
  repeat_pattern?: string;
  repeat_days?: any;
  enabled: boolean;
  created_at?: string;
  updated_at?: string;
};

type ReminderInsert = {
  reminder_type: string;
  title: string;
  message?: string;
  time_of_day: string;
  days_before?: number;
  recurring?: boolean;
  repeat_pattern?: string;
  repeat_days?: any;
  enabled?: boolean;
};

export function useReminders() {
  const { profile } = useUser();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (profile) {
      fetchReminders();
    } else {
      setLoading(false);
    }
  }, [profile]);

  async function fetchReminders() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('reminders')
        .select('*')
        .eq('user_id', profile!.id)
        .order('time_of_day', { ascending: true });

      if (error) throw error;
      setReminders(data || []);
    } catch (err) {
      setError(err as Error);
      console.error('Error fetching reminders:', err);
    } finally {
      setLoading(false);
    }
  }

  async function addReminder(reminder: ReminderInsert) {
    try {
      const { data, error } = await supabase
        .from('reminders')
        .insert({ ...reminder, user_id: profile!.id })
        .select()
        .single();

      if (error) throw error;
      setReminders([...reminders, data]);
      return data;
    } catch (err) {
      throw err;
    }
  }

  async function updateReminder(id: string, updates: Partial<Reminder>) {
    try {
      const { data, error } = await supabase
        .from('reminders')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setReminders(reminders.map(r => r.id === id ? data : r));
      return data;
    } catch (err) {
      throw err;
    }
  }

  async function deleteReminder(id: string) {
    try {
      const { error } = await supabase
        .from('reminders')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setReminders(reminders.filter(r => r.id !== id));
    } catch (err) {
      throw err;
    }
  }

  async function toggleReminder(id: string, enabled: boolean) {
    return updateReminder(id, { enabled });
  }

  return {
    reminders,
    loading,
    error,
    addReminder,
    updateReminder,
    deleteReminder,
    toggleReminder,
    refetch: fetchReminders,
  };
}
