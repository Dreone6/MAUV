import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useUser } from './useUser';

type Partner = {
  id: string;
  user_id: string;
  partner_user_id?: string;
  connection_code: string;
  status: string;
  shared_data?: any;
  connected_at?: string;
  created_at?: string;
  updated_at?: string;
};

export function usePartner() {
  const { profile } = useUser();
  const [partner, setPartner] = useState<Partner | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (profile) {
      fetchPartner();
    } else {
      setLoading(false);
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
        .maybeSingle();

      if (error) throw error;
      setPartner(data);
    } catch (err) {
      setError(err as Error);
      console.error('Error fetching partner:', err);
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
      const { data: existingPartner, error: findError } = await supabase
        .from('partners')
        .select('*')
        .eq('connection_code', code)
        .eq('status', 'pending')
        .single();

      if (findError) throw new Error('Invalid or expired code');

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
