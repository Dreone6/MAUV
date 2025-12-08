import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useUser } from './useUser';

type TribalMessage = {
  id: string;
  user_id?: string;
  message_text: string;
  likes_count: number;
  is_flagged: boolean;
  is_deleted: boolean;
  created_at?: string;
  updated_at?: string;
};

type MessageInsert = {
  message_text: string;
};

export function useTribalChat() {
  const { profile } = useUser();
  const [messages, setMessages] = useState<TribalMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchMessages();
    subscribeToMessages();
  }, []);

  async function fetchMessages() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('tribal_messages')
        .select('*')
        .eq('is_deleted', false)
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      setMessages(data || []);
    } catch (err) {
      setError(err as Error);
      console.error('Error fetching tribal messages:', err);
    } finally {
      setLoading(false);
    }
  }

  function subscribeToMessages() {
    const subscription = supabase
      .channel('tribal_messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'tribal_messages',
        },
        (payload) => {
          setMessages(prev => [payload.new as TribalMessage, ...prev]);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }

  async function sendMessage(messageData: MessageInsert) {
    try {
      const { data, error } = await supabase
        .from('tribal_messages')
        .insert({
          ...messageData,
          user_id: profile?.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      throw err;
    }
  }

  async function likeMessage(messageId: string) {
    try {
      // Increment likes count
      const message = messages.find(m => m.id === messageId);
      if (!message) return;

      const { data, error } = await supabase
        .from('tribal_messages')
        .update({ likes_count: message.likes_count + 1 })
        .eq('id', messageId)
        .select()
        .single();

      if (error) throw error;
      setMessages(messages.map(m => m.id === messageId ? data : m));
      return data;
    } catch (err) {
      throw err;
    }
  }

  async function deleteMessage(messageId: string) {
    try {
      const { error } = await supabase
        .from('tribal_messages')
        .update({ is_deleted: true })
        .eq('id', messageId)
        .eq('user_id', profile!.id);

      if (error) throw error;
      setMessages(messages.filter(m => m.id !== messageId));
    } catch (err) {
      throw err;
    }
  }

  return {
    messages,
    loading,
    error,
    sendMessage,
    likeMessage,
    deleteMessage,
    refetch: fetchMessages,
  };
}
