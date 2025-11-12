from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config.config import settings
from config.database import create_db_and_tables
from routes.user_nav_routes import router as user_nav_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="FastAPI + SQLModel Demo Backend"
)

# CORS middleware for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # React dev server URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(user_nav_router, prefix="/api/v1", tags=["user-navigation"])

from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        await create_db_and_tables()
        print("✅ Database connection successful and tables created/verified")
    except Exception as e:
        print(f"⚠️  Database connection failed: {e}")
        print("📝 Application will start but database operations may fail")
        print("🔧 Please check your database configuration in .env file")
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="FastAPI + SQLModel Demo Backend",
    lifespan=lifespan
)

@app.get("/")
def read_root():
    return {"message": "FastAPI + SQLModel Backend", "version": settings.VERSION}

@app.get("/health")
def health_check():
    return {"status": "healthy"}