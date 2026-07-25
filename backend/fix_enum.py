"""
Script to fix the user role enum in PostgreSQL
"""
import sys
from pathlib import Path

# Add the backend directory to the path
backend_dir = Path(__file__).parent
sys.path.insert(0, str(backend_dir))

from sqlalchemy import create_engine, text

# Get database URL from environment
import os
from dotenv import load_dotenv
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

def fix_enum():
    """Fix the userrole enum to use uppercase values"""
    engine = create_engine(DATABASE_URL)
    
    with engine.connect() as conn:
        # Start a transaction
        trans = conn.begin()
        
        try:
            # First, alter the column to be text type temporarily
            conn.execute(text("ALTER TABLE users ALTER COLUMN role TYPE VARCHAR(10)"))
            
            # Update the data to uppercase
            conn.execute(text("UPDATE users SET role = 'USER' WHERE role = 'user'"))
            conn.execute(text("UPDATE users SET role = 'OFFICER' WHERE role = 'officer'"))
            conn.execute(text("UPDATE users SET role = 'ADMIN' WHERE role = 'admin'"))
            
            # Drop the old enum type
            conn.execute(text("DROP TYPE IF EXISTS userrole"))
            
            # Create the new enum type with uppercase values
            conn.execute(text("CREATE TYPE userrole AS ENUM ('USER', 'OFFICER', 'ADMIN')"))
            
            # Alter the column back to enum type
            conn.execute(text("ALTER TABLE users ALTER COLUMN role TYPE userrole USING role::userrole"))
            
            # Commit the transaction
            trans.commit()
            
            print("✅ Successfully fixed user role enum to uppercase values")
            
            # Verify the changes
            result = conn.execute(text("SELECT id, username, role FROM users"))
            print("\nCurrent users:")
            for row in result:
                print(f"ID: {row[0]}, Username: {row[1]}, Role: {row[2]}")
                
        except Exception as e:
            trans.rollback()
            print(f"❌ Error fixing enum: {e}")
            raise

if __name__ == "__main__":
    fix_enum()
