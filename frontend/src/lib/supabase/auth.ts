import { supabase } from './client';
import { Provider } from '@supabase/supabase-js';

// Email/Password Sign Up
export async function signUpWithEmail(
  email: string,
  password: string,
  userData?: {
    firstName?: string;
    lastName?: string;
    birthday?: string;
  }
) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData,
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) throw error;

  // Create user profile
  if (data.user) {
    const { error: profileError } = await supabase.from('users').insert({
      auth_id: data.user.id,
      email: data.user.email!,
      first_name: userData?.firstName,
      last_name: userData?.lastName,
      birthday: userData?.birthday,
    });

    if (profileError) throw profileError;
  }

  return data;
}

// Email/Password Sign In
export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

// Social OAuth Sign In
export async function signInWithOAuth(provider: Provider) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });

  if (error) throw error;
  return data;
}

// Sign Out
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// Password Reset Request
export async function requestPasswordReset(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  });

  if (error) throw error;
}

// Update Password
export async function updatePassword(newPassword: string) {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) throw error;
}

// Verify OTP
export async function verifyOtp(email: string, token: string) {
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: 'email',
  });

  if (error) throw error;
  return data;
}

// Get Current Session
export async function getCurrentSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

// Get Current User
export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user;
}
