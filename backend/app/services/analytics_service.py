from sqlalchemy import text


# -----------------------------
# Crime by Crime Head
# -----------------------------
def crime_by_category(db):

    sql = text("""
        SELECT
            ch."CrimeGroupName" AS category,
            COUNT(cm."CaseMasterID") AS total
        FROM crime_head ch
        LEFT JOIN case_master cm
            ON ch."CrimeHeadID" = cm."CrimeMajorHeadID"
        GROUP BY ch."CrimeGroupName"
        ORDER BY total DESC;
    """)

    result = db.execute(sql).mappings().all()

    return [dict(r) for r in result]


# -----------------------------
# Crime by District
# -----------------------------
def crime_by_district(db):

    sql = text("""
        SELECT
            d."DistrictName" AS district,
            COUNT(cm."CaseMasterID") AS total
        FROM district d
        LEFT JOIN unit u
            ON d."DistrictID" = u."DistrictID"
        LEFT JOIN case_master cm
            ON u."UnitID" = cm."PoliceStationID"
        GROUP BY d."DistrictName"
        ORDER BY total DESC;
    """)

    result = db.execute(sql).mappings().all()

    return [dict(r) for r in result]


# -----------------------------
# Crime by Police Station
# -----------------------------
def crime_by_station(db):

    sql = text("""
        SELECT
            u."UnitName" AS station,
            COUNT(cm."CaseMasterID") AS total
        FROM unit u
        LEFT JOIN case_master cm
            ON u."UnitID" = cm."PoliceStationID"
        GROUP BY u."UnitName"
        ORDER BY total DESC;
    """)

    result = db.execute(sql).mappings().all()

    return [dict(r) for r in result]


# -----------------------------
# Monthly Trend
# -----------------------------
def monthly_trend(db):

    sql = text("""
        SELECT
            EXTRACT(MONTH FROM cm."CrimeRegisteredDate") AS month_num,
            EXTRACT(YEAR FROM cm."CrimeRegisteredDate") AS year,
            TO_CHAR(
                cm."CrimeRegisteredDate",
                'Mon'
            ) AS month,
            COUNT(*) AS total_cases,
            SUM(CASE WHEN cs."CaseStatusName" = 'Solved' THEN 1 ELSE 0 END) AS solved_cases,
            SUM(CASE WHEN cs."CaseStatusName" = 'Pending' OR cs."CaseStatusName" = 'In Progress' THEN 1 ELSE 0 END) AS pending_cases
        FROM case_master cm
        LEFT JOIN case_status cs ON cm."CaseStatusID" = cs."CaseStatusID"
        WHERE cm."CrimeRegisteredDate" IS NOT NULL
        GROUP BY
            EXTRACT(MONTH FROM cm."CrimeRegisteredDate"),
            EXTRACT(YEAR FROM cm."CrimeRegisteredDate"),
            TO_CHAR(cm."CrimeRegisteredDate", 'Mon')
        ORDER BY
            EXTRACT(YEAR FROM cm."CrimeRegisteredDate"),
            EXTRACT(MONTH FROM cm."CrimeRegisteredDate")
        LIMIT 12;
    """)

    result = db.execute(sql).mappings().all()

    return [dict(r) for r in result]