from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base, Application
from pydantic import BaseModel
from typing import Optional
from datetime import date

# Create FastAPI app
app = FastAPI()

#Enable CORS so React can talk to this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  #React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database setup - using SQLite for simplicity
DATABASE_URL = "sqlite:///./internships.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create tables
Base.metadata.create_all(bind=engine)

# Pydantic models for request/response
class ApplicationCreate(BaseModel):
    company: str
    position: str
    status: str
    location: str
    date_applied: Optional[date] = None
    salary_range: Optional[str] = None
    notes: Optional[str] = None

class ApplicationResponse(ApplicationCreate):
    id: int

# Routes
@app.get("/")
def read_root():
    return {"message": "Internship Tracker API"}

@app.get("/applications")
def get_applications():
    db = SessionLocal()
    applications = db.query(Application).all()
    db.close()
    return applications

@app.post("/applications")
def create_application(app_data: ApplicationCreate):
    db = SessionLocal()
    new_app = Application(
        company=app_data.company,
        position=app_data.position,
        status=app_data.status,
        location=app_data.location,
        date_applied=app_data.date_applied,
        salary_range=app_data.salary_range,
        notes=app_data.notes
    )
    db.add(new_app)
    db.commit()
    db.refresh(new_app)
    db.close()
    return new_app

@app.put("/applications/{app_id}")
def update_applicaton(app_id: int, app_date: ApplicationCreate):
    db = SessionLocal()
    application = db.query(Application).filter(Application.id == app_id).first()
    if not application:
        db.close()
        raise HTTPException(status_code=404, detail="Application not found")
    
    application.company = app_data.company
    application.position = app_data.position
    application.status = app_data.status
    application.location = app_data.location
    application.date_applied = app_data.date_applied
    application.salary_range = app_data.salary_range
    application.notes = app_data.notes

    db.commit()
    db.close()
    return application

@app.delete("/applications/{app_id}")
def delete_application(app_id: int):
    db = SessionLocal()
    application = db.query(Application).filter(Application.id == app_id).first()
    if not application:
        db.close()
        raise HTTPException(status_code=404, detail="Application not found")
    
    db.delete(application)
    db.commit()
    db.close()
    return {"message": "Application deleted"}