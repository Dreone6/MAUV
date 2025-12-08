import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useUser } from './useUser';

type AmaraMessage = {
  id: string;
  user_id: string;
  message_type: 'user' | 'amara';
  message_text: string;
  ai_context?: any;
  ai_model?: string;
  created_at?: string;
};

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
    } else {
      setLoading(false);
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
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  }

  function subscribeToMessages() {
    if (!profile) return;

    const subscription = supabase
      .channel('amara_messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'amara_chats',
          filter: `user_id=eq.${profile.id}`,
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
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/chat/amara`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text, userId: profile!.id }),
        }
      );

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
