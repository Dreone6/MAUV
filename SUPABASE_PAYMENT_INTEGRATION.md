# 💳 MAUV - PAYMENT INTEGRATION (STRIPE)

**Project:** MAUV Women's Health App  
**Payment Provider:** Stripe  
**Date:** December 6, 2025  

---

## 📋 SUBSCRIPTION PLANS

### **Free Tier**
- Basic period tracking
- Calendar view
- Simple predictions
- Limited AI queries (5/month)

### **MAUV Plus (Premium)**
**Monthly:** $9.99/month  
**Yearly:** $79.99/year (save 33%)

**Features:**
- Advanced predictions
- Unlimited AI assistance
- Health insights & analytics
- Partner features
- Custom reminders
- Ad-free experience
- Data export
- Priority support

---

## 🔧 STRIPE SETUP

### **1. Create Stripe Products**

```bash
# Create MAUV Plus Monthly
stripe products create \
  --name="MAUV Plus Monthly" \
  --description="Premium features billed monthly"

# Create price
stripe prices create \
  --product=prod_XXX \
  --unit-amount=999 \
  --currency=usd \
  --recurring[interval]=month

# Create MAUV Plus Yearly
stripe products create \
  --name="MAUV Plus Yearly" \
  --description="Premium features billed yearly"

# Create price
stripe prices create \
  --product=prod_YYY \
  --unit-amount=7999 \
  --currency=usd \
  --recurring[interval]=year
```

### **2. Enable Stripe Billing Portal**

In Stripe Dashboard:
1. Go to Settings → Billing → Customer portal
2. Enable portal
3. Configure cancellation behavior
4. Set invoice history to 12 months

---

## 🎯 BACKEND IMPLEMENTATION

### **Payment Routes (`/backend/routes/payments.py`)**

```python
from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import JSONResponse
import stripe
import os
from supabase import create_client

router = APIRouter(prefix="/api/payments", tags=["payments"])

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
supabase = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_SERVICE_KEY")
)

# Create Checkout Session
@router.post("/create-checkout-session")
async def create_checkout_session(request: Request):
    try:
        body = await request.json()
        user_id = body.get("userId")
        price_id = body.get("priceId")  # Monthly or yearly price ID
        
        # Get or create Stripe customer
        user = supabase.table("users").select("email").eq("id", user_id).single().execute()
        
        # Check if customer exists
        existing_sub = supabase.table("subscriptions").select("stripe_customer_id").eq("user_id", user_id).execute()
        
        customer_id = None
        if existing_sub.data and existing_sub.data[0].get("stripe_customer_id"):
            customer_id = existing_sub.data[0]["stripe_customer_id"]
        else:
            # Create new customer
            customer = stripe.Customer.create(
                email=user.data["email"],
                metadata={"supabase_user_id": user_id}
            )
            customer_id = customer.id
        
        # Create checkout session
        session = stripe.checkout.Session.create(
            customer=customer_id,
            payment_method_types=["card"],
            line_items=[{
                "price": price_id,
                "quantity": 1,
            }],
            mode="subscription",
            success_url=f"{os.getenv('FRONTEND_URL')}/payment/success?session_id={{CHECKOUT_SESSION_ID}}",
            cancel_url=f"{os.getenv('FRONTEND_URL')}/payment/canceled",
            subscription_data={
                "trial_period_days": 7,  # 7-day free trial
                "metadata": {"supabase_user_id": user_id}
            },
            metadata={"supabase_user_id": user_id}
        )
        
        return {"sessionId": session.id, "url": session.url}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Get subscription status
@router.get("/subscription/{user_id}")
async def get_subscription(user_id: str):
    try:
        result = supabase.table("subscriptions").select("*").eq("user_id", user_id).execute()
        
        if not result.data:
            return {"status": "free", "subscription": None}
        
        return {"status": "active", "subscription": result.data[0]}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Create billing portal session
@router.post("/create-portal-session")
async def create_portal_session(request: Request):
    try:
        body = await request.json()
        user_id = body.get("userId")
        
        # Get Stripe customer ID
        result = supabase.table("subscriptions").select("stripe_customer_id").eq("user_id", user_id).single().execute()
        
        if not result.data:
            raise HTTPException(status_code=404, detail="No subscription found")
        
        session = stripe.billing_portal.Session.create(
            customer=result.data["stripe_customer_id"],
            return_url=f"{os.getenv('FRONTEND_URL')}/settings/billing",
        )
        
        return {"url": session.url}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Cancel subscription
@router.post("/cancel-subscription")
async def cancel_subscription(request: Request):
    try:
        body = await request.json()
        user_id = body.get("userId")
        
        # Get subscription
        result = supabase.table("subscriptions").select("stripe_subscription_id").eq("user_id", user_id).single().execute()
        
        if not result.data:
            raise HTTPException(status_code=404, detail="No subscription found")
        
        # Cancel at period end
        stripe.Subscription.modify(
            result.data["stripe_subscription_id"],
            cancel_at_period_end=True
        )
        
        # Update database
        supabase.table("subscriptions").update({
            "cancel_at_period_end": True
        }).eq("user_id", user_id).execute()
        
        return {"success": True}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Stripe Webhook
@router.post("/webhook")
async def stripe_webhook(request: Request):
    try:
        payload = await request.body()
        sig_header = request.headers.get("stripe-signature")
        webhook_secret = os.getenv("STRIPE_WEBHOOK_SECRET")
        
        event = stripe.Webhook.construct_event(
            payload, sig_header, webhook_secret
        )
        
        # Handle different event types
        if event["type"] == "checkout.session.completed":
            session = event["data"]["object"]
            await handle_checkout_complete(session)
        
        elif event["type"] == "customer.subscription.updated":
            subscription = event["data"]["object"]
            await handle_subscription_updated(subscription)
        
        elif event["type"] == "customer.subscription.deleted":
            subscription = event["data"]["object"]
            await handle_subscription_deleted(subscription)
        
        elif event["type"] == "invoice.payment_succeeded":
            invoice = event["data"]["object"]
            await handle_payment_succeeded(invoice)
        
        elif event["type"] == "invoice.payment_failed":
            invoice = event["data"]["object"]
            await handle_payment_failed(invoice)
        
        return {"success": True}
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Webhook handlers
async def handle_checkout_complete(session):
    user_id = session["metadata"]["supabase_user_id"]
    subscription_id = session["subscription"]
    customer_id = session["customer"]
    
    # Get subscription details
    subscription = stripe.Subscription.retrieve(subscription_id)
    
    # Determine plan type
    plan_type = "monthly" if subscription["items"]["data"][0]["plan"]["interval"] == "month" else "yearly"
    
    # Insert/update subscription in database
    supabase.table("subscriptions").upsert({
        "user_id": user_id,
        "stripe_subscription_id": subscription_id,
        "stripe_customer_id": customer_id,
        "plan_type": plan_type,
        "plan_tier": "plus",
        "status": subscription["status"],
        "current_period_start": subscription["current_period_start"],
        "current_period_end": subscription["current_period_end"],
        "trial_start": subscription.get("trial_start"),
        "trial_end": subscription.get("trial_end"),
        "amount_cents": subscription["items"]["data"][0]["plan"]["amount"],
        "currency": subscription["items"]["data"][0]["plan"]["currency"],
    }).execute()
    
    # Update user subscription tier
    supabase.table("users").update({
        "subscription_tier": "plus",
        "subscription_status": "active"
    }).eq("id", user_id).execute()

async def handle_subscription_updated(subscription):
    subscription_id = subscription["id"]
    
    supabase.table("subscriptions").update({
        "status": subscription["status"],
        "current_period_start": subscription["current_period_start"],
        "current_period_end": subscription["current_period_end"],
        "cancel_at_period_end": subscription["cancel_at_period_end"],
    }).eq("stripe_subscription_id", subscription_id).execute()

async def handle_subscription_deleted(subscription):
    subscription_id = subscription["id"]
    
    # Update subscription status
    result = supabase.table("subscriptions").update({
        "status": "canceled",
        "canceled_at": subscription["canceled_at"],
    }).eq("stripe_subscription_id", subscription_id).execute()
    
    # Downgrade user to free tier
    if result.data:
        user_id = result.data[0]["user_id"]
        supabase.table("users").update({
            "subscription_tier": "free",
            "subscription_status": "active"
        }).eq("id", user_id).execute()

async def handle_payment_succeeded(invoice):
    # Log successful payment
    pass

async def handle_payment_failed(invoice):
    subscription_id = invoice["subscription"]
    
    # Update subscription status
    supabase.table("subscriptions").update({
        "status": "past_due"
    }).eq("stripe_subscription_id", subscription_id).execute()
```

---

## 🎨 FRONTEND IMPLEMENTATION

### **Install Stripe.js**

```bash
cd /app/frontend
yarn add @stripe/stripe-js @stripe/react-stripe-js
```

### **Stripe Provider (`App.tsx`)**

```typescript
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function App() {
  return (
    <Elements stripe={stripePromise}>
      {/* Your app components */}
    </Elements>
  );
}
```

### **useSubscription Hook**

**`/hooks/useSubscription.ts`**

```typescript
import { useState, useEffect } from 'react';
import { useUser } from './useUser';

export function useSubscription() {
  const { profile } = useUser();
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (profile) {
      fetchSubscription();
    }
  }, [profile]);

  async function fetchSubscription() {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/payments/subscription/${profile!.id}`);
      const data = await response.json();
      setSubscription(data.subscription);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  async function createCheckoutSession(priceId: string) {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/payments/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: profile!.id, priceId }),
      });

      const { url } = await response.json();
      window.location.href = url; // Redirect to Stripe Checkout
    } catch (err) {
      throw err;
    }
  }

  async function manageBilling() {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/payments/create-portal-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: profile!.id }),
      });

      const { url } = await response.json();
      window.location.href = url; // Redirect to Stripe Billing Portal
    } catch (err) {
      throw err;
    }
  }

  async function cancelSubscription() {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/payments/cancel-subscription`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: profile!.id }),
      });

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
    isTrialing: subscription?.trial_end && new Date(subscription.trial_end) > new Date(),
    createCheckoutSession,
    manageBilling,
    cancelSubscription,
    refetch: fetchSubscription,
  };
}
```

---

## 🔒 WEBHOOK CONFIGURATION

### **1. Set up Stripe Webhook**

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. URL: `https://your-domain.com/api/payments/webhook`
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy webhook signing secret to `.env`

### **2. Test with Stripe CLI**

```bash
stripe listen --forward-to localhost:8001/api/payments/webhook
```

---

## ✅ TESTING CHECKLIST

- [ ] Test subscription creation (monthly plan)
- [ ] Test subscription creation (yearly plan)
- [ ] Test 7-day free trial
- [ ] Test successful payment
- [ ] Test failed payment
- [ ] Test subscription cancellation
- [ ] Test subscription reactivation
- [ ] Test billing portal access
- [ ] Test webhook events
- [ ] Test user downgrade to free tier

---

**Price IDs (from Stripe Dashboard):**
- Monthly: `price_monthly_xxx`
- Yearly: `price_yearly_xxx`

Store these in frontend constants or fetch from backend.
