"""
health_router.py
FastAPI router for the /health endpoint.
"""

from datetime import datetime, timezone
from fastapi import APIRouter

router = APIRouter(tags=["Health"])


@router.get("/health", summary="Health Check")
def health_check():
    """
    Returns the current status of the AI service.
    Used by the Node.js backend and monitoring tools.
    """
    return {
        "success": True,
        "message": "HunarHub AI Service is running",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "version": "0.1.0",
        "models_loaded": False,   # Phase 1: set True when ML models are loaded
        "capabilities": {
            "recommendations": "not implemented (Phase 1)",
            "ranking": "not implemented (Phase 1)",
        },
    }
