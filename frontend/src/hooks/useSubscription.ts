import { useState, useEffect } from 'react';
import { useUser } from './useUser';

type Subscription = {
  id: string;
  user_id: string;
  plan_type: string;
  plan_tier: string;
  status: string;
  stripe_subscription_id?: string;
  stripe_customer_id?: string;
  current_period_start?: string;
  current_period_end?: string;
  cancel_at_period_end?: boolean;
  trial_start?: string;
  trial_end?: string;
  amount_cents?: number;
  currency?: string;
  created_at?: string;
  updated_at?: string;
};

export function useSubscription() {
  const { profile } = useUser();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (profile) {
      fetchSubscription();
    } else {
      setLoading(false);
    }
  }, [profile]);

  async function fetchSubscription() {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/payments/subscription/${profile!.id}`
      );
      const data = await response.json();
      setSubscription(data.subscription);
    } catch (err) {
      setError(err as Error);
      console.error('Error fetching subscription:', err);
    } finally {
      setLoading(false);
    }
  }

  async function createCheckoutSession(priceId: string) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/payments/create-checkout-session`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: profile!.id, priceId }),
        }
      );

      const { url } = await response.json();
      window.location.href = url;
    } catch (err) {
      throw err;
    }
  }

  async function manageBilling() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/payments/create-portal-session`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: profile!.id }),
        }
      );

      const { url } = await response.json();
      window.location.href = url;
    } catch (err) {
      throw err;
    }
  }

  async function cancelSubscription() {
    try {
      await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/payments/cancel-subscription`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: profile!.id }),
        }
      );

      await fetchSubscription();
    } catch (err) {
      throw err;
    }
  }

  return {
    subscription,
    loading,
    error,
    isPremium: profile?.subscription_tier === 'plus',
    isTrialing:
      subscription?.trial_end && new Date(subscription.trial_end) > new Date(),
    createCheckoutSession,
    manageBilling,
    cancelSubscription,
    refetch: fetchSubscription,
  };
}
