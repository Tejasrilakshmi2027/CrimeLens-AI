from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.auth.utils import get_current_active_user
from app.models.user import User

from app.services.analytics_service import *

router = APIRouter()


@router.get("/")
def home():
    return {"message": "Crime Analytics API"}


@router.get("/category")
def category(db: Session = Depends(get_db), current_user: User = Depends(get_current_active_user)):
    return crime_by_category(db)


@router.get("/district")
def district(db: Session = Depends(get_db), current_user: User = Depends(get_current_active_user)):
    return crime_by_district(db)


@router.get("/station")
def station(db: Session = Depends(get_db), current_user: User = Depends(get_current_active_user)):
    return crime_by_station(db)


@router.get("/monthly")
def monthly(db: Session = Depends(get_db), current_user: User = Depends(get_current_active_user)):
    return monthly_trend(db)