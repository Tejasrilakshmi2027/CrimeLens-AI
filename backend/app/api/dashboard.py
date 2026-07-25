from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.auth.utils import get_current_active_user
from app.models.user import User
from app.services.dashboard_service import (
    get_dashboard_summary,
    get_cases_by_crime_head,
    get_cases_by_district,
    get_recent_cases,
)

router = APIRouter()


@router.get("/summary")
def summary(db: Session = Depends(get_db), current_user: User = Depends(get_current_active_user)):
    return get_dashboard_summary(db)


@router.get("/crime-head")
def crime_head(db: Session = Depends(get_db), current_user: User = Depends(get_current_active_user)):
    return get_cases_by_crime_head(db)


@router.get("/district")
def district(db: Session = Depends(get_db), current_user: User = Depends(get_current_active_user)):
    return get_cases_by_district(db)


@router.get("/recent")
def recent(db: Session = Depends(get_db), current_user: User = Depends(get_current_active_user)):
    return get_recent_cases(db)