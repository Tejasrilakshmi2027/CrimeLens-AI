"""
Test dashboard summary query
"""
from sqlalchemy import create_engine, text
import os
from dotenv import load_dotenv
load_dotenv()

DATABASE_URL = os.getenv('DATABASE_URL')
engine = create_engine(DATABASE_URL)

with engine.connect() as conn:
    # Test dashboard summary
    total_cases = conn.execute(text('SELECT COUNT(*) FROM case_master')).scalar()
    
    pending_cases = conn.execute(text("""
        SELECT COUNT(*) FROM case_master cm
        JOIN case_status cs ON cm."CaseStatusID" = cs."CaseStatusID"
        WHERE cs."CaseStatusName" = 'Pending'
    """)).scalar()
    
    completed_cases = conn.execute(text("""
        SELECT COUNT(*) FROM case_master cm
        JOIN case_status cs ON cm."CaseStatusID" = cs."CaseStatusID"
        WHERE cs."CaseStatusName" = 'Completed' OR cs."CaseStatusName" = 'Solved'
    """)).scalar()
    
    arrests = conn.execute(text('SELECT COUNT(*) FROM case_master WHERE "CaseStatusID" IS NOT NULL')).scalar()
    
    print(f'Total cases: {total_cases}')
    print(f'Pending cases: {pending_cases}')
    print(f'Completed/Solved cases: {completed_cases}')
    print(f'Arrests: {arrests}')
