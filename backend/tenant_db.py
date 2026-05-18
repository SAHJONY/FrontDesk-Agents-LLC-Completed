"""
MULTI-TENANT DATABASE MANAGER
Handles isolated storage for each customer (Business).
Ensures data privacy and individual configuration.
"""
import os
import json
import uuid
from datetime import datetime
from typing import Dict, List, Optional
from pathlib import Path

DB_PATH = Path("/root/.hermes/saas_db")
DB_PATH.mkdir(parents=True, exist_ok=True)

class TenantDB:
    def __init__(self):
        self.clients_file = DB_PATH / "clients.json"
        self._init_db()

    def _init_db(self):
        if not self.clients_file.exists():
            with open(self.clients_file, 'w') as f:
                json.dump({}, f)

    def _load_clients(self) -> Dict:
        try:
            with open(self.clients_file, 'r') as f:
                return json.load(f)
        except:
            return {}

    def _save_clients(self, data: Dict):
        with open(self.clients_file, 'w') as f:
            json.dump(data, f, indent=2)

    def create_client(self, email: str, business_name: str, industry: str, website: str, stripe_id: str) -> str:
        """Creates a new isolated tenant."""
        clients = self._load_clients()
        client_id = str(uuid.uuid4())
        
        clients[client_id] = {
            "id": client_id,
            "email": email,
            "business_name": business_name,
            "industry": industry,
            "website": website,
            "stripe_id": stripe_id,
            "created_at": datetime.now().isoformat(),
            "status": "active",
            # Customizable Settings
            "settings": {
                "business_hours": "9AM-5PM",
                "services": [],
                "ai_persona": "professional",
                "phone_forwarding": ""
            },
            # Isolated Call Logs
            "call_logs": []
        }
        self._save_clients(clients)
        return client_id

    def get_client(self, client_id: str) -> Optional[Dict]:
        clients = self._load_clients()
        return clients.get(client_id)

    def add_call_log(self, client_id: str, log_entry: Dict):
        """Adds a call log to a SPECIFIC client only."""
        clients = self._load_clients()
        if client_id in clients:
            if "call_logs" not in clients[client_id]:
                clients[client_id]["call_logs"] = []
            clients[client_id]["call_logs"].append(log_entry)
            self._save_clients(clients)
            return True
        return False

    def update_settings(self, client_id: str, settings: Dict):
        """Allows client to customize their AI agent."""
        clients = self._load_clients()
        if client_id in clients:
            clients[client_id]["settings"].update(settings)
            self._save_clients(clients)
            return True
        return False

    def get_all_clients(self) -> List[Dict]:
        """Admin view: List all tenants."""
        clients = self._load_clients()
        return list(clients.values())

# Global Instance
db = TenantDB()
