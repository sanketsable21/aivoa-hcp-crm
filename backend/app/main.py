from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.interactions import router as interaction_router
from app.routes.ai_routes import router as ai_router

from app.database import Base, engine
from app import models

app = FastAPI(title="AIVOA HCP CRM Backend")

# Create all database tables
Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(interaction_router)
app.include_router(ai_router)


@app.get("/")
def home():
    return {
        "message": "AIVOA HCP CRM Backend is running"
    }