"""
Test analytics API endpoints
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

def test_analytics():
    engine = create_engine(DATABASE_URL)
    
    with engine.connect() as conn:
        print("Testing analytics queries...")
        
        # Test monthly trend
        print("\n--- Monthly Trend ---")
        result = conn.execute(text("""
            SELECT
                EXTRACT(MONTH FROM cm."CrimeRegisteredDate") AS month_num,
                EXTRACT(YEAR FROM cm."CrimeRegisteredDate") AS year,
                TO_CHAR(cm."CrimeRegisteredDate", 'Mon') AS month,
                COUNT(*) AS total_cases,
                SUM(CASE WHEN cs."CaseStatusName" = 'Solved' THEN 1 ELSE 0 END) AS solved_cases,
                SUM(CASE WHEN cs."CaseStatusName" = 'Pending' OR cs."CaseStatusName" = 'In Progress' THEN 1 ELSE 0 END) AS pending_cases
            FROM case_master cm
            LEFT JOIN case_status cs ON cm."CaseStatusID" = cs."CaseStatusID"
            WHERE cm."CrimeRegisteredDate" IS NOT NULL
            GROUP BY EXTRACT(MONTH FROM cm."CrimeRegisteredDate"), EXTRACT(YEAR FROM cm."CrimeRegisteredDate"), TO_CHAR(cm."CrimeRegisteredDate", 'Mon')
            ORDER BY EXTRACT(YEAR FROM cm."CrimeRegisteredDate"), EXTRACT(MONTH FROM cm."CrimeRegisteredDate")
            LIMIT 12
        """))
        
        for row in result:
            print(f"  {row[2]} {int(row[1])}: Total={row[3]}, Solved={row[4]}, Pending={row[5]}")
        
        # Test crime by category
        print("\n--- Crime by Category ---")
        result = conn.execute(text("""
            SELECT ch."CrimeGroupName" AS category, COUNT(cm."CaseMasterID") AS total
            FROM crime_head ch
            LEFT JOIN case_master cm ON ch."CrimeHeadID" = cm."CrimeMajorHeadID"
            GROUP BY ch."CrimeGroupName"
            ORDER BY total DESC
        """))
        
        for row in result:
            print(f"  {row[0]}: {row[1]}")
        
        # Test crime by district
        print("\n--- Crime by District ---")
        result = conn.execute(text("""
            SELECT d."DistrictName" AS district, COUNT(cm."CaseMasterID") AS total
            FROM district d
            LEFT JOIN unit u ON d."DistrictID" = u."DistrictID"
            LEFT JOIN case_master cm ON u."UnitID" = cm."PoliceStationID"
            GROUP BY d."DistrictName"
            ORDER BY total DESC
        """))
        
        for row in result:
            print(f"  {row[0]}: {row[1]}")

if __name__ == "__main__":
    test_analytics()
