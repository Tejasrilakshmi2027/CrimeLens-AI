"""
Script to seed sample crime cases data for Karnataka State Police
"""
import sys
from pathlib import Path
from datetime import date, datetime, timedelta
import random

# Add the backend directory to the path
backend_dir = Path(__file__).parent
sys.path.insert(0, str(backend_dir))

from sqlalchemy import create_engine, text
import os
from dotenv import load_dotenv
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

def seed_cases():
    """Seed sample crime cases data"""
    engine = create_engine(DATABASE_URL)
    
    with engine.connect() as conn:
        trans = conn.begin()
        
        try:
            # First check if we have master data
            print("Checking master data...")
            
            # Check crime heads
            crime_heads = conn.execute(text("SELECT \"CrimeHeadID\", \"CrimeGroupName\" FROM crime_head LIMIT 5")).fetchall()
            print(f"Found {len(crime_heads)} crime heads")
            
            # Check districts
            districts = conn.execute(text("SELECT \"DistrictID\", \"DistrictName\" FROM district LIMIT 5")).fetchall()
            print(f"Found {len(districts)} districts")
            
            # Check units (police stations)
            units = conn.execute(text("SELECT \"UnitID\", \"UnitName\" FROM unit LIMIT 5")).fetchall()
            print(f"Found {len(units)} police stations")
            
            # Check case status
            case_statuses = conn.execute(text("SELECT \"CaseStatusID\", \"CaseStatusName\" FROM case_status")).fetchall()
            print(f"Found {len(case_statuses)} case statuses")
            
            # Check employees (officers)
            employees = conn.execute(text("SELECT \"EmployeeID\", \"FirstName\" FROM employee LIMIT 5")).fetchall()
            print(f"Found {len(employees)} officers")
            
            # Check if we already have cases
            existing_cases = conn.execute(text("SELECT COUNT(*) FROM case_master")).scalar()
            print(f"Existing cases in database: {existing_cases}")
            
            # Add more cases regardless (up to 200 total)
            target_cases = 200
            cases_to_add = target_cases - existing_cases
            
            if cases_to_add <= 0:
                print("Database already has 100+ cases. Skipping seed.")
                return
            
            # Generate sample cases
            print(f"Generating {cases_to_add} sample cases...")
            
            crime_categories = [
                "Theft", "Robbery", "Assault", "Fraud", "Cyber Crime",
                "Murder", "Rape", "Kidnapping", "Drug Offense", "Traffic Violation"
            ]
            
            districts_list = [
                "Bangalore Urban", "Bangalore Rural", "Mysuru", "Belagavi", 
                "Dharwad", "Davanagere", "Shivamogga", "Tumakuru", "Hassan", "Mangaluru"
            ]
            
            # District coordinates (approximate center points)
            district_coords = {
                "Bangalore Urban": (12.9716, 77.5946),
                "Bangalore Rural": (13.0827, 77.5833),
                "Mysuru": (12.3127, 76.6397),
                "Belagavi": (15.8497, 74.4977),
                "Dharwad": (15.4609, 75.0077),
                "Davanagere": (14.7148, 75.9657),
                "Shivamogga": (13.9296, 75.5661),
                "Tumakuru": (13.3409, 77.1009),
                "Hassan": (13.2167, 77.3500),
                "Mangaluru": (12.9141, 74.8560)
            }
            
            stations_list = ["Central Police Station", "North Police Station", "South Police Station", "East Police Station", "West Police Station"]
            
            officer_names = [
                "Rajesh Kumar", "Sunita Sharma", "Ramesh Gupta", "Priya Singh", 
                "Amit Patel", "Neha Reddy", "Vikram Joshi", "Anita Desai",
                "Suresh Nair", "Kavita Krishnan", "Deepak Verma", "Meena Iyer"
            ]
            
            statuses = ["Pending", "In Progress", "Solved", "Closed"]
            
            # Generate cases starting from existing count
            base_date = datetime.now() - timedelta(days=365)
            
            for i in range(existing_cases + 1, target_cases + 1):
                crime_no = f"CR{2024}{i:04d}"
                case_no = f"CASE-{2024}-{i:04d}"
                
                # Random date within last year
                days_offset = random.randint(0, 365)
                crime_date = base_date + timedelta(days=days_offset)
                
                # Random values
                crime_category = random.choice(crime_categories)
                district = random.choice(districts_list)
                station = random.choice(stations_list)
                status = random.choice(statuses)
                officer_name = random.choice(officer_names)
                
                # Get coordinates for the district
                base_lat, base_lon = district_coords.get(district, (12.9716, 77.5946))
                # Add small random offset for variety
                lat = base_lat + random.uniform(-0.5, 0.5)
                lon = base_lon + random.uniform(-0.5, 0.5)
                
                # Get IDs from master tables
                crime_head_id = conn.execute(
                    text(f"SELECT \"CrimeHeadID\" FROM crime_head WHERE \"CrimeGroupName\" LIKE '%{crime_category.split()[0]}%' LIMIT 1")
                ).scalar()
                
                if not crime_head_id:
                    crime_head_id = 1  # Default
                
                district_id = conn.execute(
                    text(f"SELECT \"DistrictID\" FROM district WHERE \"DistrictName\" = :district"),
                    {"district": district}
                ).scalar()
                
                if not district_id:
                    district_id = 1  # Default
                
                unit_id = conn.execute(
                    text(f"SELECT \"UnitID\" FROM unit WHERE \"DistrictID\" = :district_id LIMIT 1"),
                    {"district_id": district_id}
                ).scalar()
                
                if not unit_id:
                    unit_id = 1  # Default
                
                case_status_id = conn.execute(
                    text(f"SELECT \"CaseStatusID\" FROM case_status WHERE \"CaseStatusName\" = :status"),
                    {"status": status}
                ).scalar()
                
                if not case_status_id:
                    case_status_id = 1  # Default
                
                # Get officer ID
                officer_id = conn.execute(
                    text(f"SELECT \"EmployeeID\" FROM employee WHERE \"FirstName\" LIKE :officer_name LIMIT 1"),
                    {"officer_name": officer_name.split()[0]}
                ).scalar()
                
                if not officer_id:
                    officer_id = 1  # Default
                
                # Brief facts with officer name
                brief_facts = f"{crime_category} reported in {district}. Assigned to {officer_name}. Investigation is currently {status.lower()}."
                
                # Insert case
                conn.execute(text("""
                    INSERT INTO case_master (
                        "CrimeNo", "CaseNo", "CrimeRegisteredDate",
                        "PolicePersonID", "PoliceStationID", "CrimeMajorHeadID", "CaseStatusID",
                        "Latitude", "Longitude", "BriefFacts"
                    ) VALUES (
                        :crime_no, :case_no, :crime_date,
                        :officer_id, :unit_id, :crime_head_id, :case_status_id,
                        :lat, :lon, :brief_facts
                    )
                """), {
                    "crime_no": crime_no,
                    "case_no": case_no,
                    "crime_date": crime_date.date(),
                    "officer_id": officer_id,
                    "unit_id": unit_id,
                    "crime_head_id": crime_head_id,
                    "case_status_id": case_status_id,
                    "lat": lat,
                    "lon": lon,
                    "brief_facts": brief_facts
                })
            
            trans.commit()
            print(f"✅ Successfully seeded 100 sample cases")
            
            # Verify
            total_cases = conn.execute(text("SELECT COUNT(*) FROM case_master")).scalar()
            print(f"Total cases in database: {total_cases}")
            
        except Exception as e:
            trans.rollback()
            print(f"❌ Error seeding cases: {e}")
            raise

if __name__ == "__main__":
    seed_cases()
