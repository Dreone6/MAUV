import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useUser } from './useUser';

type FairyAvatar = {
  id: string;
  user_id: string;
  preset_id?: string;
  skin_tone?: string;
  hair_style?: string;
  hair_color?: string;
  wing_style?: string;
  wing_color?: string;
  outfit?: string;
  accessories?: any[];
  avatar_config: any;
  created_at?: string;
  updated_at?: string;
};

type AvatarConfig = {
  preset_id?: string;
  skin_tone?: string;
  hair_style?: string;
  hair_color?: string;
  wing_style?: string;
  wing_color?: string;
  outfit?: string;
  accessories?: any[];
};

export function useAvatar() {
  const { profile } = useUser();
  const [avatar, setAvatar] = useState<FairyAvatar | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (profile) {
      fetchAvatar();
    } else {
      setLoading(false);
    }
  }, [profile]);

  async function fetchAvatar() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('fairy_avatars')
        .select('*')
        .eq('user_id', profile!.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error; // Ignore "not found"
      setAvatar(data);
    } catch (err) {
      setError(err as Error);
      console.error('Error fetching avatar:', err);
    } finally {
      setLoading(false);
    }
  }

  async function saveAvatar(config: AvatarConfig) {
    try {
      const avatarData = {
        user_id: profile!.id,
        ...config,
        avatar_config: config,
      };

      const { data, error } = await supabase
        .from('fairy_avatars')
        .upsert(avatarData)
        .select()
        .single();

      if (error) throw error;
      setAvatar(data);
      return data;
    } catch (err) {
      throw err;
    }
  }

  async function updateAvatar(updates: Partial<AvatarConfig>) {
    try {
      const newConfig = { ...avatar?.avatar_config, ...updates };
      
      const { data, error } = await supabase
        .from('fairy_avatars')
        .update({ ...updates, avatar_config: newConfig })
        .eq('user_id', profile!.id)
        .select()
        .single();

      if (error) throw error;
      setAvatar(data);
      return data;
    } catch (err) {
      throw err;
    }
  }

  return {
    avatar,
    loading,
    error,
    saveAvatar,
    updateAvatar,
    refetch: fetchAvatar,
  };
}
