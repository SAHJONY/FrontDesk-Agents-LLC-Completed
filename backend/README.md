# FrontDesk Agents Backend API

A professional, scalable FastAPI backend for the FrontDesk Agents SaaS platform.

## 🏗️ Architecture

```
backend/
├── app/
│   ├── __init__.py          # Package initialization
│   ├── main.py              # FastAPI app & routes
│   ├── core/
│   │   ├── __init__.py
│   │   └── config.py        # Environment & settings
│   ├── services/
│   │   ├── __init__.py
│   │   ├── tenant_service.py    # Multi-tenant DB logic
│   │   ├── scanner_service.py   # Website scanning
│   │   └── saas_service.py      # Onboarding orchestration
│   └── models/
│       └── __init__.py      # Pydantic models (future)
├── run.py                   # Entry point
├── requirements.txt         # Dependencies
└── README.md               # This file
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Set Environment Variables
Create a `.env` file:
```bash
DEBUG=True
STRIPE_SECRET_KEY=sk_test_...
NVIDIA_API_KEY=nv_...
TWILIO_SID=...
TWILIO_TOKEN=...
```

### 3. Run the Server
```bash
# Development (auto-reload)
python -m backend.run

# Production
uvicorn app.main:app --host 0.0.0.0 --port 8001
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Health check |
| `GET` | `/api/v1/health` | Detailed health status |
| `POST` | `/api/v1/onboard` | Onboard new customer |
| `GET` | `/api/v1/tenant/{id}/dashboard` | Get tenant dashboard data |
| `GET` | `/api/v1/tenants` | List all tenants (Admin) |

## 🔧 Services

### Tenant Service
- Multi-tenant data isolation
- File-based JSON storage (upgradable to Postgres)
- Call log management

### Scanner Service
- Autonomous website analysis
- Multi-language support (EN, ES, FR, DE)
- Service & hours extraction

### SaaS Service
- Onboarding orchestration
- Payment processing (Stripe placeholder)
- AI configuration

## 🧪 Testing

```bash
# Test health endpoint
curl http://localhost:8000/api/v1/health

# Test onboarding
curl -X POST http://localhost:8000/api/v1/onboard \
  -H "Content-Type: application/json" \
  -d '{"business_name":"Test Co","email":"test@example.com","industry":"Plumbing","website":"https://example.com"}'
```

## 📝 Notes

- **Data Directory**: All tenant data is stored in `./data/` by default.
- **Security**: Add authentication middleware before production deployment.
- **Scalability**: Ready for Postgres migration via SQLAlchemy.
