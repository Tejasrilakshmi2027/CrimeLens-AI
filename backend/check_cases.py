"""
Check current cases in database
"""
import sys
from pathlib import Path

backend_dir = Path(__file__).parent
sys.path.insert(0, str(backend_dir))

from sqlalchemy import create_engine, text
import os
from dotenv import load_dotenv
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

def check_cases():
    engine = create_engine(DATABASE_URL)
    
    with engine.connect() as conn:
        total = conn.execute(text("SELECT COUNT(*) FROM case_master")).scalar()
        print(f"Total cases: {total}")
        
        if total > 0:
            result = conn.execute(text("SELECT \"CrimeNo\", \"CrimeRegisteredDate\" FROM case_master LIMIT 5"))
            print("Sample cases:")
            for row in result:
                print(f"  {row[0]} - {row[1]}")

if __name__ == "__main__":
    check_cases()
