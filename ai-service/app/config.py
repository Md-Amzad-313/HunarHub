"""
config.py
Centralised configuration for the HunarHub AI service.
Reads settings from environment variables with safe defaults.
"""

import os
from dotenv import load_dotenv

load_dotenv()

# Service
AI_SERVICE_HOST: str = os.getenv("AI_SERVICE_HOST", "0.0.0.0")
AI_SERVICE_PORT: int = int(os.getenv("AI_SERVICE_PORT", "8000"))
NODE_ENV: str = os.getenv("NODE_ENV", "development")

# Backend
BACKEND_URL: str = os.getenv("BACKEND_URL", "http://localhost:5000")

# App metadata
APP_TITLE = "HunarHub AI Service"
APP_DESCRIPTION = (
    "Python AI/ML microservice for HunarHub. "
    "Provides recommendation and ranking endpoints for the Node.js backend."
)
APP_VERSION = "0.1.0"
