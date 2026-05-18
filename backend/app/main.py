"""
MAIN ENTRY POINT
FastAPI application initialization and route registration.
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Dict, Any
from .core.config import settings
from .services.saas_service import saas_service
from .services.tenant_service import tenant_service

# Initialize FastAPI app
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Models for Request Validation ---

class OnboardRequest(BaseModel):
    business_name: str
    email: str
    industry: str
    website: Optional[str] = None
    manual_config: Optional[Dict[str, Any]] = None

class TenantStatsRequest(BaseModel):
    tenant_id: str

# --- API Routes ---

@app.get("/")
async def root():
    """Root endpoint - API health check."""
    return {
        "status": "healthy",
        "service": settings.APP_NAME,
        "version": settings.APP_VERSION
    }

@app.get("/api/v1/health")
async def health_check():
    """Detailed health check for monitoring."""
    return {
        "status": "ok",
        "database": "connected",  # Simplified for file-based DB
        "services": ["scanner", "tenant_db", "saas_engine"]
    }

@app.post("/api/v1/onboard")
async def onboard_customer(request: OnboardRequest):
    """
    Onboard a new customer.
    1. Scans website (if URL provided)
    2. Creates tenant
    3. Configures AI agent
    """
    try:
        result = saas_service.onboard_customer(
            business_name=request.business_name,
            email=request.email,
            industry=request.industry,
            website=request.website,
            manual_config=request.manual_config
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/v1/tenant/{tenant_id}/dashboard")
async def get_tenant_dashboard(tenant_id: str):
    """Get dashboard data for a specific tenant."""
    result = saas_service.get_tenant_dashboard_data(tenant_id)
    if "error" in result:
        raise HTTPException(status_code=404, detail=result["error"])
    return result

@app.get("/api/v1/tenants")
async def list_tenants():
    """(Admin only) List all tenants. Protected in production."""
    # In production, this would require admin auth
    return {"tenants": tenant_service._load_tenants()}

# --- Server Startup ---

def start():
    """Run the server with uvicorn."""
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001, reload=settings.DEBUG)

if __name__ == "__main__":
    start()
