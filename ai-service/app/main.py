"""
main.py
HunarHub AI Service – FastAPI application factory.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import APP_TITLE, APP_DESCRIPTION, APP_VERSION, BACKEND_URL
from app.routers.health_router import router as health_router

# ── Application instance ──────────────────────────────────────
app = FastAPI(
    title=APP_TITLE,
    description=APP_DESCRIPTION,
    version=APP_VERSION,
    docs_url="/docs",
    redoc_url="/redoc",
)

# ── CORS ──────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=[BACKEND_URL, "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ───────────────────────────────────────────────────
app.include_router(health_router)

# Phase 1+ routers (uncomment when implemented):
# from app.routers.recommendation_router import router as recommendation_router
# from app.routers.ranking_router import router as ranking_router
# app.include_router(recommendation_router, prefix="/recommendations")
# app.include_router(ranking_router, prefix="/rankings")


# ── Root ──────────────────────────────────────────────────────
@app.get("/", tags=["Root"])
def root():
    return {
        "message": "HunarHub AI Service",
        "docs": "/docs",
        "health": "/health",
        "version": APP_VERSION,
    }
