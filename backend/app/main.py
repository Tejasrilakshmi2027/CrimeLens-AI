from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.base import Base
from app.database.session import engine

import app.models

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Crime Lens AI API",
    version="1.0.0",
    description="Crime Intelligence & Analytics Platform"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "Crime Lens AI Backend Running",
        "status": "OK"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


# ---------------- Dashboard ----------------

from app.api.dashboard import router as dashboard_router

app.include_router(
    dashboard_router,
    prefix="/api/dashboard",
    tags=["Dashboard"]
)


# ---------------- Chatbot ----------------

from app.api.chatbot import router as chatbot_router

app.include_router(
    chatbot_router,
    prefix="/api/chatbot",
    tags=["Chatbot"]
)


# ---------------- Analytics ----------------

try:
    from app.api.analytics import router as analytics_router

    app.include_router(
        analytics_router,
        prefix="/api/analytics",
        tags=["Analytics"]
    )

except Exception:
    pass


# ---------------- Authentication ----------------

from app.api.auth import router as auth_router

app.include_router(
    auth_router,
    prefix="/api",
    tags=["Authentication"]
)


# ---------------- Crime ----------------

from app.api.crime import router as crime_router

app.include_router(
    crime_router,
    prefix="/api",
    tags=["Crime"]
)