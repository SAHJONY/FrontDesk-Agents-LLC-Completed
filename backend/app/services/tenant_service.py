"""
TENANT SERVICE
Manages multi-tenant data isolation, business configurations, and call logs.
Ensures strict data privacy between customers.
"""
import os
import json
import uuid
from datetime import datetime
from typing import Optional, List, Dict, Any
from pathlib import Path

class TenantService:
    """Handles CRUD operations for tenants and their isolated data."""
    
    def __init__(self, data_dir: str = "./data"):
        self.data_dir = Path(data_dir)
        self.data_dir.mkdir(exist_ok=True)
        self.tenants_file = self.data_dir / "tenants.json"
        self.logs_dir = self.data_dir / "call_logs"
        self.logs_dir.mkdir(exist_ok=True)
        self._init_tenants()
    
    def _init_tenants(self):
        """Initialize tenants file if it doesn't exist."""
        if not self.tenants_file.exists():
            self._save_tenants({})
    
    def _load_tenants(self) -> Dict:
        try:
            with open(self.tenants_file, 'r') as f:
                return json.load(f)
        except (FileNotFoundError, json.JSONDecodeError):
            return {}
    
    def _save_tenants(self, tenants: Dict):
        with open(self.tenants_file, 'w') as f:
            json.dump(tenants, f, indent=2)
    
    def create_tenant(self, business_name: str, email: str, industry: str, website: str) -> str:
        """Create a new tenant and return their ID."""
        tenants = self._load_tenants()
        tenant_id = str(uuid.uuid4())[:8]  # Short ID for usability
        
        tenants[tenant_id] = {
            "id": tenant_id,
            "business_name": business_name,
            "email": email,
            "industry": industry,
            "website": website,
            "created_at": datetime.now().isoformat(),
            "status": "active",
            "plan": "professional",
            "config": {
                "hours": "9am-5pm",
                "services": [],
                "ai_personality": "professional"
            }
        }
        self._save_tenants(tenants)
        return tenant_id
    
    def get_tenant(self, tenant_id: str) -> Optional[Dict]:
        """Get tenant by ID."""
        tenants = self._load_tenants()
        return tenants.get(tenant_id)
    
    def update_tenant(self, tenant_id: str, updates: Dict) -> bool:
        """Update tenant configuration."""
        tenants = self._load_tenants()
        if tenant_id in tenants:
            tenants[tenant_id].update(updates)
            self._save_tenants(tenants)
            return True
        return False
    
    def add_call_log(self, tenant_id: str, call_data: Dict):
        """Append a call log for a specific tenant."""
        log_file = self.logs_dir / f"{tenant_id}.jsonl"
        call_data["timestamp"] = datetime.now().isoformat()
        with open(log_file, 'a') as f:
            f.write(json.dumps(call_data) + "\n")
    
    def get_tenant_stats(self, tenant_id: str) -> Dict:
        """Calculate real-time stats for a tenant."""
        log_file = self.logs_dir / f"{tenant_id}.jsonl"
        if not log_file.exists():
            return {"total_calls": 0, "total_revenue": 0, "success_rate": 0}
        
        total_calls = 0
        total_revenue = 0
        successful = 0
        
        with open(log_file, 'r') as f:
            for line in f:
                if line.strip():
                    call = json.loads(line)
                    total_calls += 1
                    if call.get("status") in ["Completed", "Booked"]:
                        successful += 1
                    # Extract revenue if available (simplified)
                    saved = call.get("saved", "$0")
                    if saved:
                        try:
                            total_revenue += float(saved.replace("$", "").replace(",", ""))
                        except:
                            pass
        
        return {
            "total_calls": total_calls,
            "total_revenue": total_revenue,
            "success_rate": round((successful / total_calls * 100), 1) if total_calls > 0 else 0
        }

# Singleton instance
tenant_service = TenantService()
