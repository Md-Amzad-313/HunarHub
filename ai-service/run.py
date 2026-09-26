"""
run.py
Entry point for the HunarHub AI service.
Run with: python run.py
Or via uvicorn: uvicorn app.main:app --reload --port 8000
"""

import uvicorn
from app.config import AI_SERVICE_HOST, AI_SERVICE_PORT, NODE_ENV

if __name__ == "__main__":
    print(f"[AI SERVICE] Starting HunarHub AI Service on {AI_SERVICE_HOST}:{AI_SERVICE_PORT}")
    print(f"[AI SERVICE] Environment: {NODE_ENV}")
    print(f"[AI SERVICE] Docs: http://localhost:{AI_SERVICE_PORT}/docs")

    uvicorn.run(
        "app.main:app",
        host=AI_SERVICE_HOST,
        port=AI_SERVICE_PORT,
        reload=(NODE_ENV == "development"),
        log_level="info",
    )
