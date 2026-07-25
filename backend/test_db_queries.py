"""
Test database queries for dashboard and analytics
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
    print(f'Total cases: {total_cases}')
    
    # Test analytics by category
    result = conn.execute(text("""
        SELECT ch."CrimeGroupName" AS category, COUNT(cm."CaseMasterID") AS total 
        FROM crime_head ch 
        LEFT JOIN case_master cm ON ch."CrimeHeadID" = cm."CrimeMajorHeadID" 
        GROUP BY ch."CrimeGroupName" 
        ORDER BY total DESC
    """))
    print('Crime by category:')
    for row in result:
        print(f'  {row.category}: {row.total}')
    
    # Test analytics by district
    result = conn.execute(text("""
        SELECT d."DistrictName" AS district, COUNT(cm."CaseMasterID") AS total 
        FROM district d 
        LEFT JOIN unit u ON d."DistrictID" = u."DistrictID" 
        LEFT JOIN case_master cm ON u."UnitID" = cm."PoliceStationID" 
        GROUP BY d."DistrictName" 
        ORDER BY total DESC
    """))
    print('Crime by district:')
    for row in result:
        print(f'  {row.district}: {row.total}')
    
    # Test analytics by station
    result = conn.execute(text("""
        SELECT u."UnitName" AS station, COUNT(cm."CaseMasterID") AS total 
        FROM unit u 
        LEFT JOIN case_master cm ON u."UnitID" = cm."PoliceStationID" 
        GROUP BY u."UnitName" 
        ORDER BY total DESC
    """))
    print('Crime by station:')
    for row in result:
        print(f'  {row.station}: {row.total}')
