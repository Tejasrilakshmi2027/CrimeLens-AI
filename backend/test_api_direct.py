"""
Test dashboard API directly without authentication
"""
from sqlalchemy import create_engine, text
import os
from dotenv import load_dotenv
load_dotenv()

DATABASE_URL = os.getenv('DATABASE_URL')
engine = create_engine(DATABASE_URL)

# Test the service function directly
from app.services.dashboard_service import get_dashboard_summary
from app.database import SessionLocal

db = SessionLocal()
try:
    summary = get_dashboard_summary(db)
    print("Dashboard Summary from service:")
    print(f"  Total Cases: {summary['total_cases']}")
    print(f"  Pending Cases: {summary['pending_cases']}")
    print(f"  Completed Cases: {summary['completed_cases']}")
    print(f"  Arrests: {summary['arrests']}")
    print(f"  Investigation Cases: {summary.get('investigation_cases', 'N/A')}")
finally:
    db.close()
