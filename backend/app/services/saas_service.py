"""
SAAS SERVICE
Orchestrates the customer onboarding flow:
1. Scan website (or accept manual entry)
2. Create tenant
3. Configure AI agent
4. Process payment (Stripe placeholder)
"""
from typing import Dict, Optional
from .tenant_service import tenant_service
from .scanner_service import scanner_service

class SaaSService:
    """Manages the SaaS onboarding and billing lifecycle."""
    
    def onboard_customer(self, 
                         business_name: str, 
                         email: str, 
                         industry: str, 
                         website: Optional[str] = None,
                         manual_config: Optional[Dict] = None) -> Dict:
        """
        Full onboarding flow for a new customer.
        Returns tenant ID and configuration status.
        """
        config = {}
        
        # Step 1: Auto-scan website if URL provided
        if website and not manual_config:
            scan_result = scanner_service.scan_website(website)
            config = scan_result
        elif manual_config:
            # Use manual configuration
            config = {
                "services": manual_config.get("services", []),
                "hours": manual_config.get("hours", "9am-5pm"),
                "personality": manual_config.get("personality", "professional"),
                "language": manual_config.get("language", "en"),
                "website_url": website
            }
        else:
            # Default config
            config = {
                "services": ["General Inquiry"],
                "hours": "9am-5pm",
                "personality": "professional",
                "language": "en",
                "website_url": website
            }
        
        # Step 2: Create tenant
        tenant_id = tenant_service.create_tenant(
            business_name=business_name,
            email=email,
            industry=industry,
            website=website or ""
        )
        
        # Step 3: Update tenant with AI config
        tenant_service.update_tenant(tenant_id, {
            "ai_config": config
        })
        
        # Step 4: (Placeholder) Stripe payment would go here
        # payment_result = stripe_service.create_subscription(...)
        
        return {
            "tenant_id": tenant_id,
            "status": "active",
            "config": config,
            "message": "Onboarding successful. AI Agent ready."
        }
    
    def get_tenant_dashboard_data(self, tenant_id: str) -> Dict:
        """Get all data needed for the tenant dashboard."""
        tenant = tenant_service.get_tenant(tenant_id)
        if not tenant:
            return {"error": "Tenant not found"}
        
        stats = tenant_service.get_tenant_stats(tenant_id)
        
        return {
            "business_name": tenant.get("business_name"),
            "plan": tenant.get("plan"),
            "stats": stats,
            "config": tenant.get("ai_config", {})
        }

# Singleton instance
saas_service = SaaSService()
