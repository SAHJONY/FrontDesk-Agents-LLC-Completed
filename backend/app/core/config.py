"""
CORE CONFIGURATION
Manages environment variables and global settings.
"""
import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    """Application settings loaded from environment variables."""
    
    # App Settings
    APP_NAME: str = "FrontDesk Agents API"
    APP_VERSION: str = "2.0.0"
    DEBUG: bool = os.getenv("DEBUG", "False").lower() == "true"
    
    # API Settings
    API_PREFIX: str = "/api/v1"
    CORS_ORIGINS: list = [
        "http://localhost:3000",
        "https://www.frontdeskagents.com",
        "https://frontdesk-agents-nexus.vercel.app"
    ]
    
    # Database (File-based for now, ready for Postgres)
    DATA_DIR: str = os.getenv("DATA_DIR", "./data")
    
    # External APIs
    STRIPE_SECRET_KEY: str = os.getenv("STRIPE_SECRET_KEY", "")
    NVIDIA_API_KEY: str = os.getenv("NVIDIA_API_KEY", "")
    TWILIO_SID: str = os.getenv("TWILIO_SID", "")
    TWILIO_TOKEN: str = os.getenv("TWILIO_TOKEN", "")
    
    # Model Rotation
    PRIMARY_MODEL: str = os.getenv("PRIMARY_MODEL", "nvidia/llama-3.1-nemotron-70b-instruct")
    FALLBACK_MODEL: str = os.getenv("FALLBACK_MODEL", "meta/llama-3.1-8b-instruct")

settings = Settings()
