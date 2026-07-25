"""
Database seeding script for Crime Lens AI
This script populates the database with sample data for testing
"""

import sys
import os
from pathlib import Path

# Add the backend directory to the path
backend_dir = Path(__file__).parent
sys.path.insert(0, str(backend_dir))

from sqlalchemy.orm import Session
from app.database import SessionLocal, engine
from app.models.user import User, UserRole
import bcrypt

def seed_users(db: Session):
    """Seed sample users and officers"""
    
    # Sample regular users
    users_data = [
        {
            "email": "citizen1@example.com",
            "username": "citizen1",
            "full_name": "John Doe",
            "hashed_password": bcrypt.hashpw("password123".encode('utf-8'), bcrypt.gensalt()).decode('utf-8'),
            "role": UserRole.USER,
        },
        {
            "email": "citizen2@example.com",
            "username": "citizen2",
            "full_name": "Jane Smith",
            "hashed_password": bcrypt.hashpw("password123".encode('utf-8'), bcrypt.gensalt()).decode('utf-8'),
            "role": UserRole.USER,
        },
        {
            "email": "citizen3@example.com",
            "username": "citizen3",
            "full_name": "Robert Johnson",
            "hashed_password": bcrypt.hashpw("password123".encode('utf-8'), bcrypt.gensalt()).decode('utf-8'),
            "role": UserRole.USER,
        },
    ]
    
    # Sample officers
    officers_data = [
        {
            "email": "rajesh.kumar@ksp.gov.in",
            "username": "rajesh_kumar",
            "full_name": "Rajesh Kumar",
            "hashed_password": bcrypt.hashpw("password123".encode('utf-8'), bcrypt.gensalt()).decode('utf-8'),
            "role": UserRole.OFFICER,
            "badge_number": "KA-2024-0892",
            "rank": "Inspector",
            "department": "Bangalore City Police",
            "phone": "+91 98765 43210",
            "assigned_station": "Central Police Station, Bangalore Urban",
            "cases_handled": 247,
            "solved_cases": 198,
        },
        {
            "email": "sunita.sharma@ksp.gov.in",
            "username": "sunita_sharma",
            "full_name": "Sunita Sharma",
            "hashed_password": bcrypt.hashpw("password123".encode('utf-8'), bcrypt.gensalt()).decode('utf-8'),
            "role": UserRole.OFFICER,
            "badge_number": "KA-2024-0893",
            "rank": "Sub-Inspector",
            "department": "Bangalore City Police",
            "phone": "+91 98765 43211",
            "assigned_station": "East Police Station, Bangalore Urban",
            "cases_handled": 156,
            "solved_cases": 142,
        },
        {
            "email": "ramesh.gupta@ksp.gov.in",
            "username": "ramesh_gupta",
            "full_name": "Ramesh Gupta",
            "hashed_password": bcrypt.hashpw("password123".encode('utf-8'), bcrypt.gensalt()).decode('utf-8'),
            "role": UserRole.OFFICER,
            "badge_number": "KA-2024-0894",
            "rank": "Inspector",
            "department": "Mysore City Police",
            "phone": "+91 98765 43212",
            "assigned_station": "North Police Station, Mysore",
            "cases_handled": 189,
            "solved_cases": 167,
        },
    ]
    
    # Create users
    for user_data in users_data:
        existing_user = db.query(User).filter(User.email == user_data["email"]).first()
        if not existing_user:
            user = User(**user_data)
            db.add(user)
            print(f"Created user: {user_data['username']}")
        else:
            print(f"User already exists: {user_data['username']}")
    
    # Create officers
    for officer_data in officers_data:
        existing_officer = db.query(User).filter(User.email == officer_data["email"]).first()
        if not existing_officer:
            officer = User(**officer_data)
            db.add(officer)
            print(f"Created officer: {officer_data['username']}")
        else:
            print(f"Officer already exists: {officer_data['username']}")
    
    db.commit()
    print("✅ Users and officers seeded successfully!")

def main():
    """Main seeding function"""
    print("🌱 Starting database seeding...")
    
    # Create database session
    db = SessionLocal()
    
    try:
        seed_users(db)
        print("\n✨ Database seeding completed successfully!")
    except Exception as e:
        print(f"❌ Error during seeding: {e}")
        db.rollback()
        raise
    finally:
        db.close()

if __name__ == "__main__":
    main()
