"""
Update case statuses to have variety in the database
"""
from sqlalchemy import create_engine, text
import os
from dotenv import load_dotenv
load_dotenv()

DATABASE_URL = os.getenv('DATABASE_URL')
engine = create_engine(DATABASE_URL)

with engine.connect() as conn:
    trans = conn.begin()
    try:
        # Update some cases to have different statuses
        # Set 30% to Completed
        conn.execute(text("""
            UPDATE case_master 
            SET "CaseStatusID" = 2 
            WHERE "CaseMasterID" IN (
                SELECT "CaseMasterID" FROM case_master 
                WHERE "CaseStatusID" = 1 
                LIMIT 60
            )
        """))
        
        # Set 15% to Under Investigation  
        conn.execute(text("""
            UPDATE case_master 
            SET "CaseStatusID" = 3 
            WHERE "CaseMasterID" IN (
                SELECT "CaseMasterID" FROM case_master 
                WHERE "CaseStatusID" = 1 
                LIMIT 30
            )
        """))
        
        # Set 10% to Closed
        conn.execute(text("""
            UPDATE case_master 
            SET "CaseStatusID" = 4 
            WHERE "CaseMasterID" IN (
                SELECT "CaseMasterID" FROM case_master 
                WHERE "CaseStatusID" = 1 
                LIMIT 20
            )
        """))
        
        trans.commit()
        print("✅ Case statuses updated successfully")
        
        # Verify the changes
        result = conn.execute(text("""
            SELECT cs."CaseStatusName", COUNT(*) 
            FROM case_master cm 
            JOIN case_status cs ON cm."CaseStatusID" = cs."CaseStatusID"
            GROUP BY cs."CaseStatusName"
        """))
        print("Case status distribution:")
        for row in result:
            print(f"  {row[0]}: {row[1]}")
            
    except Exception as e:
        trans.rollback()
        print(f"❌ Error: {e}")
        raise
