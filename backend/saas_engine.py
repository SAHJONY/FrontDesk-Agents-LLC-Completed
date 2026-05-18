"""
FRONTDESK AGENTS - SAAS & BILLING ENGINE
Handles: Customer Onboarding, Stripe Payments, Agent Configuration.
"""
import os
import json
import stripe
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import uvicorn
from datetime import datetime

# --- Configuration ---
STRIPE_SECRET_KEY = os.getenv("STRIPE_SECRET_KEY", "sk_test_YOUR_KEY_HERE") # Replace in production
STRIPE_WEBHOOK_SECRET = os.getenv("STRIPE_WEBHOOK_SECRET", "whsec_YOUR_SECRET")
stripe.api_key = STRIPE_SECRET_KEY

app = FastAPI(title="Frontdesk SaaS Engine")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

# --- Database (JSON for now, upgrade to Postgres later) ---
CUSTOMERS_DB = "/root/frontdesk-agents-nexus/configs/customers.json"
AGENTS_DB = "/root/frontdesk-agents-nexus/configs/agents.json"

def load_json(path: str) -> dict:
    if not os.path.exists(path):
        return {}
    with open(path, 'r') as f:
        return json.load(f)

def save_json(path: str, data: dict):
    with open(path, 'w') as f:
        json.dump(data, f, indent=2)

# --- Models ---
class CustomerOnboarding(BaseModel):
    business_name: str
    owner_email: str
    industry: str  # plumber, electrician, hvac
    phone_number: Optional[str] = None
    stripe_customer_id: Optional[str] = None

class PaymentIntentRequest(BaseModel):
    customer_id: str
    amount: int  # In cents (e.g., 29900 for $299)

# --- Endpoints ---

@app.post("/api/saas/onboard")
async def onboard_customer(data: CustomerOnboarding):
    """Step 1: Create a customer record and generate a Stripe Payment Link."""
    customers = load_json(CUSTOMERS_DB)
    
    # Generate unique ID
    customer_id = f"cust_{data.business_name.lower().replace(' ', '_')}_{datetime.now().timestamp()}"
    
    # Create Stripe Customer
    try:
        stripe_customer = stripe.Customer.create(
            email=data.owner_email,
            name=data.business_name,
            metadata={"industry": data.industry}
        )
        
        # Create a Payment Link for $299 (One-time setup or First Month)
        # In production, you'd use a Price ID from Stripe Dashboard
        price_data = stripe.Price.create(
            unit_amount=29900, # $299.00
            currency="usd",
            recurring={"interval": "month"},
            product_data={"name": f"{data.industry.capitalize()} AI Agent - Pro Plan"}
        )
        
        session = stripe.checkout.Session.create(
            customer=stripe_customer.id,
            payment_method_types=["card"],
            line_items=[{"price": price_data.id, "quantity": 1}],
            mode="subscription",
            success_url=f"https://www.frontdeskagents.com/dashboard?session_id={{CHECKOUT_SESSION_ID}}",
            cancel_url="https://www.frontdeskagents.com/pricing?canceled=true",
            metadata={"customer_id": customer_id, "industry": data.industry}
        )
        
        # Save temporary customer data
        customers[customer_id] = {
            "business_name": data.business_name,
            "owner_email": data.owner_email,
            "industry": data.industry,
            "status": "pending_payment",
            "stripe_session_id": session.id,
            "payment_url": session.url,
            "created_at": datetime.now().isoformat()
        }
        save_json(CUSTOMERS_DB, customers)
        
        return {"payment_url": session.url, "customer_id": customer_id}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/saas/webhook")
async def stripe_webhook(request: Request):
    """Step 2: Stripe calls this when payment is successful."""
    payload = await request.body()
    sig_header = request.headers.get('stripe-signature')
    
    try:
        event = stripe.Webhook.construct_event(payload, sig_header, STRIPE_WEBHOOK_SECRET)
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid webhook")

    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        customer_id = session['metadata']['customer_id']
        
        # Activate Customer
        customers = load_json(CUSTOMERS_DB)
        if customer_id in customers:
            customers[customer_id]['status'] = 'active'
            customers[customer_id]['stripe_customer_id'] = session['customer']
            customers[customer_id]['paid_at'] = datetime.now().isoformat()
            
            # Auto-Create Agent Configuration
            agents = load_json(AGENTS_DB)
            agents[customer_id] = {
                "business_name": customers[customer_id]['business_name'],
                "industry": customers[customer_id]['industry'],
                "status": "active",
                "prompt_template": f"default_{customers[customer_id]['industry']}",
                "phone_number": None # Assign later
            }
            save_json(AGENTS_DB, agents)
            save_json(CUSTOMERS_DB, customers)
            
    return {"status": "success"}

@app.get("/api/saas/customers")
async def list_customers():
    return load_json(CUSTOMERS_DB)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8002)
