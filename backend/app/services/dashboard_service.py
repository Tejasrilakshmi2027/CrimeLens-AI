from sqlalchemy import text
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.crime.case_master import CaseMaster
from app.models.master.case_status import CaseStatus

def get_cases_by_crime_head(db):

    sql = text("""
        SELECT
            ch."CrimeGroupName" AS crime,
            COUNT(cm."CaseMasterID") AS total

        FROM crime_head ch

        LEFT JOIN case_master cm
            ON ch."CrimeHeadID" = cm."CrimeMajorHeadID"

        GROUP BY ch."CrimeGroupName"

        ORDER BY total DESC;
    """)

    result = db.execute(sql).mappings().all()

    return [dict(r) for r in result]

def get_crime_head():
    db = SessionLocal()

    sql = text("""
        SELECT
            ch."CrimeGroupName" AS crime,
            COUNT(*) AS count
        FROM case_master cm
        JOIN crime_head ch
            ON cm."CrimeMajorHeadID" = ch."CrimeHeadID"
        GROUP BY ch."CrimeGroupName"
        ORDER BY count DESC;
    """)

    result = db.execute(sql).mappings().all()
    db.close()

    return result

def get_dashboard_summary(db: Session):

    total_cases = db.query(CaseMaster).count()

    pending_cases = (
        db.query(CaseMaster)
        .join(CaseStatus)
        .filter(CaseStatus.CaseStatusName == "Pending")
        .count()
    )

    completed_cases = (
        db.query(CaseMaster)
        .join(CaseStatus)
        .filter(CaseStatus.CaseStatusName.in_(["Completed", "Closed"]))
        .count()
    )

    # Count cases under investigation as active cases
    investigation_cases = (
        db.query(CaseMaster)
        .join(CaseStatus)
        .filter(CaseStatus.CaseStatusName == "Under Investigation")
        .count()
    )

    # Use completed + closed cases as arrests (simplified metric)
    arrests = completed_cases

    return {
        "total_cases": total_cases,
        "pending_cases": pending_cases,
        "completed_cases": completed_cases,
        "arrests": arrests,
        "investigation_cases": investigation_cases
    }
def get_district_stats():

    db = SessionLocal()

    sql = text("""
        SELECT
            d."DistrictName" AS district,
            COUNT(*) AS count
        FROM case_master cm
        JOIN unit u
            ON cm."PoliceStationID" = u."UnitID"
        JOIN district d
            ON u."DistrictID" = d."DistrictID"
        GROUP BY d."DistrictName"
        ORDER BY count DESC;
    """)

    result = db.execute(sql).mappings().all()

    db.close()

    return result
from sqlalchemy import text
from app.database import SessionLocal

from sqlalchemy import text
from sqlalchemy.orm import Session


def get_recent_cases(db: Session):

    sql = text("""
        SELECT
            cm."CrimeNo" AS crime_number,
            cm."CaseNo" AS case_number,
            csh."CrimeHeadName" AS crime_type,
            d."DistrictName" AS district,
            e."FirstName" AS officer,
            cs."CaseStatusName" AS status,
            TO_CHAR(cm."CrimeRegisteredDate", 'YYYY-MM-DD') AS date

        FROM case_master cm

        LEFT JOIN crime_sub_head csh
            ON cm."CrimeMinorHeadID" = csh."CrimeSubHeadID"

        LEFT JOIN case_status cs
            ON cm."CaseStatusID" = cs."CaseStatusID"

        LEFT JOIN employee e
            ON cm."PolicePersonID" = e."EmployeeID"

        LEFT JOIN unit u
            ON cm."PoliceStationID" = u."UnitID"

        LEFT JOIN district d
            ON u."DistrictID" = d."DistrictID"

        ORDER BY cm."CrimeRegisteredDate" DESC

        LIMIT 10;
    """)

    result = db.execute(sql).mappings().all()

    return [dict(row) for row in result]
def get_cases_by_district(db):

    sql = text("""
        SELECT
            d."DistrictName" AS district,
            COUNT(cm."CaseMasterID") AS total

        FROM district d

        LEFT JOIN unit u
            ON d."DistrictID"=u."DistrictID"

        LEFT JOIN case_master cm
            ON u."UnitID"=cm."PoliceStationID"

        GROUP BY d."DistrictName"

        ORDER BY total DESC;
    """)

    result = db.execute(sql).mappings().all()

    return [dict(r) for r in result]