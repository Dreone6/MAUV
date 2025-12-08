# 💳 STRIPE INTEGRATION COMPLETE - SETUP GUIDE

## ✅ What's Been Integrated:

**Frontend:**
- Stripe.js installed
- Publishable key configured in `.env`
- useSubscription hook ready

**Backend:**
- Stripe Python SDK installed
- Payment routes created (`/api/payments`)
- Webhook handlers ready
- Secret key configured

---

## 🔧 REQUIRED SETUP STEPS:

### Step 1: Get Supabase Service Role Key

Your backend needs the service role key to create subscriptions:

1. Go to: https://nomvbhqjisbmgsxwgaoa.supabase.co
2. Click **Settings** (gear icon, bottom left)
3. Click **API**
4. Under **Project API keys**, find **service_role** key
5. Click the **eye icon** to reveal it
6. Copy the key (starts with `eyJh...`)
7. Add to `/app/backend/.env`:
   ```
   SUPABASE_SERVICE_KEY=eyJh...your_key_here
   ```

### Step 2: Create Stripe Products & Prices

1. Go to Stripe Dashboard: https://dashboard.stripe.com/products
2. Click **+ Add Product**

**Product 1: MAUV Plus Monthly**
- Name: `MAUV Plus Monthly`
- Description: `Premium features billed monthly`
- Pricing: Recurring
- Price: `$9.99` USD
- Billing period: `Monthly`
- Click **Save product**
- **Copy the Price ID** (starts with `price_...`)

**Product 2: MAUV Plus Yearly**
- Name: `MAUV Plus Yearly`
- Description: `Premium features billed yearly (save 33%)`
- Pricing: Recurring
- Price: `$79.99` USD
- Billing period: `Yearly`
- Click **Save product**
- **Copy the Price ID** (starts with `price_...`)

### Step 3: Update Price IDs in Frontend

Create `/app/frontend/src/config/stripe.ts`:
```typescript
export const STRIPE_PRICE_IDS = {
  monthly: 'price_YOUR_MONTHLY_PRICE_ID',
  yearly: 'price_YOUR_YEARLY_PRICE_ID',
};
```

### Step 4: Set Up Stripe Webhook (For Production)

1. Go to: https://dashboard.stripe.com/webhooks
2. Click **Add endpoint**
3. Endpoint URL: `https://your-backend-url.com/api/payments/webhook`
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Click **Add endpoint**
6. Copy the **Signing secret** (starts with `whsec_...`)
7. Add to `/app/backend/.env`:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

---

## 🎯 Payment Endpoints Ready:

- `POST /api/payments/create-checkout-session` - Start subscription
- `GET /api/payments/subscription/{user_id}` - Get subscription status
- `POST /api/payments/create-portal-session` - Manage billing
- `POST /api/payments/cancel-subscription` - Cancel subscription
- `POST /api/payments/webhook` - Stripe webhook handler

---

## 🧪 How to Test (After Setup):

1. Run the database schema in Supabase
2. Add service role key to backend
3. Create Stripe products and get price IDs
4. Test subscription flow in your app
5. Use Stripe test cards: `4242 4242 4242 4242`

---

## 💡 Features Included:

- ✅ 7-day free trial
- ✅ Monthly & yearly plans
- ✅ Stripe Checkout
- ✅ Billing portal for managing subscriptions
- ✅ Automatic subscription status updates
- ✅ Webhook handling for all events
- ✅ Customer creation
- ✅ Payment method management

---

**Stripe integration is complete! Just need to:**
1. Add Supabase service role key
2. Create Stripe products
3. Test subscription flow

All code is ready to go! 🚀
