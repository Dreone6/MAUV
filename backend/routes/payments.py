from fastapi import APIRouter, HTTPException, Request, Header
from fastapi.responses import JSONResponse
import stripe
import os
from supabase import create_client, Client

router = APIRouter(prefix="/api/payments", tags=["payments"])

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_SERVICE_KEY")
supabase: Client = create_client(supabase_url, supabase_key) if supabase_url and supabase_key else None

@router.post("/create-checkout-session")
async def create_checkout_session(request: Request):
    try:
        body = await request.json()
        user_id = body.get("userId")
        price_id = body.get("priceId")
        
        if not user_id or not price_id:
            raise HTTPException(status_code=400, detail="Missing userId or priceId")
        
        user_email = "user@example.com"
        if supabase:
            user_result = supabase.table("users").select("email").eq("id", user_id).execute()
            if user_result.data:
                user_email = user_result.data[0]["email"]
        
        customer_id = None
        if supabase:
            existing_sub = supabase.table("subscriptions").select("stripe_customer_id").eq("user_id", user_id).execute()
            if existing_sub.data and existing_sub.data[0].get("stripe_customer_id"):
                customer_id = existing_sub.data[0]["stripe_customer_id"]
        
        if not customer_id:
            customer = stripe.Customer.create(
                email=user_email,
                metadata={"supabase_user_id": user_id}
            )
            customer_id = customer.id
        
        session = stripe.checkout.Session.create(
            customer=customer_id,
            payment_method_types=["card"],
            line_items=[{"price": price_id, "quantity": 1}],
            mode="subscription",
            success_url=f"{os.getenv('FRONTEND_URL')}/payment-success?session_id={{CHECKOUT_SESSION_ID}}",
            cancel_url=f"{os.getenv('FRONTEND_URL')}/settings",
            subscription_data={
                "trial_period_days": 7,
                "metadata": {"supabase_user_id": user_id}
            },
            metadata={"supabase_user_id": user_id}
        )
        
        return {"sessionId": session.id, "url": session.url}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/subscription/{user_id}")
async def get_subscription(user_id: str):
    try:
        if not supabase:
            return {"status": "free", "subscription": None}
        
        result = supabase.table("subscriptions").select("*").eq("user_id", user_id).execute()
        
        if not result.data:
            return {"status": "free", "subscription": None}
        
        return {"status": "active", "subscription": result.data[0]}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/create-portal-session")
async def create_portal_session(request: Request):
    try:
        body = await request.json()
        user_id = body.get("userId")
        
        if not supabase:
            raise HTTPException(status_code=500, detail="Supabase not configured")
        
        result = supabase.table("subscriptions").select("stripe_customer_id").eq("user_id", user_id).execute()
        
        if not result.data:
            raise HTTPException(status_code=404, detail="No subscription found")
        
        session = stripe.billing_portal.Session.create(
            customer=result.data[0]["stripe_customer_id"],
            return_url=f"{os.getenv('FRONTEND_URL')}/settings",
        )
        
        return {"url": session.url}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/webhook")
async def stripe_webhook(request: Request, stripe_signature: str = Header(None)):
    try:
        payload = await request.body()
        webhook_secret = os.getenv("STRIPE_WEBHOOK_SECRET")
        
        if not webhook_secret or webhook_secret.startswith("whsec_your"):
            event = stripe.Event.construct_from(await request.json(), stripe.api_key)
        else:
            event = stripe.Webhook.construct_event(payload, stripe_signature, webhook_secret)
        
        if event["type"] == "checkout.session.completed":
            await handle_checkout_complete(event["data"]["object"])
        elif event["type"] == "customer.subscription.updated":
            await handle_subscription_updated(event["data"]["object"])
        elif event["type"] == "customer.subscription.deleted":
            await handle_subscription_deleted(event["data"]["object"])
        
        return {"success": True}
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

async def handle_checkout_complete(session):
    if not supabase:
        return
    
    user_id = session["metadata"]["supabase_user_id"]
    subscription_id = session["subscription"]
    customer_id = session["customer"]
    
    subscription = stripe.Subscription.retrieve(subscription_id)
    plan_type = "monthly" if subscription["items"]["data"][0]["plan"]["interval"] == "month" else "yearly"
    
    supabase.table("subscriptions").upsert({
        "user_id": user_id,
        "stripe_subscription_id": subscription_id,
        "stripe_customer_id": customer_id,
        "plan_type": plan_type,
        "plan_tier": "plus",
        "status": subscription["status"],
        "current_period_start": subscription["current_period_start"],
        "current_period_end": subscription["current_period_end"],
        "amount_cents": subscription["items"]["data"][0]["plan"]["amount"],
    }).execute()
    
    supabase.table("users").update({
        "subscription_tier": "plus",
        "subscription_status": "active"
    }).eq("id", user_id).execute()

async def handle_subscription_updated(subscription):
    if not supabase:
        return
    
    supabase.table("subscriptions").update({
        "status": subscription["status"],
        "cancel_at_period_end": subscription["cancel_at_period_end"],
    }).eq("stripe_subscription_id", subscription["id"]).execute()

async def handle_subscription_deleted(subscription):
    if not supabase:
        return
    
    result = supabase.table("subscriptions").update({
        "status": "canceled",
    }).eq("stripe_subscription_id", subscription["id"]).execute()
    
    if result.data:
        user_id = result.data[0]["user_id"]
        supabase.table("users").update({
            "subscription_tier": "free"
        }).eq("id", user_id).execute()
