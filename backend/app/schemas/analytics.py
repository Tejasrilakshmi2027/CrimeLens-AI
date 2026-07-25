from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db

from app.services.analytics_service import (
    crime_by_category,
    crime_by_district,
    crime_by_station,
    monthly_trend,
)

router = APIRouter()


@router.get("/")
def home():
    return {
        "message": "Crime Analytics API"
    }


@router.get("/category")
def category(db: Session = Depends(get_db)):
    return crime_by_category(db)


@router.get("/district")
def district(db: Session = Depends(get_db)):
    return crime_by_district(db)


@router.get("/station")
def station(db: Session = Depends(get_db)):
    return crime_by_station(db)


@router.get("/monthly")
def monthly(db: Session = Depends(get_db)):
    return monthly_trend(db)