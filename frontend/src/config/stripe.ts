// Stripe Configuration
export const STRIPE_CONFIG = {
  prices: {
    monthly: 'price_1Sbxh0HSDI56Von2ew82Nuv1',
    yearly: 'price_1SbxjkHSDI56Von2lsovsJlT',
  },
  trial_days: 14,
  pricing: {
    monthly: {
      amount: 5.99,
      currency: 'USD',
      interval: 'month',
      displayName: 'MAUV Pro - Monthly',
    },
    yearly: {
      amount: 35.99,
      currency: 'USD',
      interval: 'year',
      displayName: 'MAUV Pro - Annual (Save 50%)',
      savings: 'Save $35.89/year',
    },
  },
};
