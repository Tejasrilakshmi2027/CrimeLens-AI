import re
import os

from app.ai.llm import ask_llm
from app.services.chat_memory import history
from app.utils.sql_validator import validate_sql


SCHEMA = """
Database Schema

Table case_master(
    "CaseMasterID",
    "CrimeNo",
    "CaseNo",
    "CrimeRegisteredDate",
    "PolicePersonID",
    "PoliceStationID",
    "CrimeMajorHeadID",
    "CrimeMinorHeadID",
    "CaseStatusID",
    "Latitude",
    "Longitude",
    "BriefFacts"
)

Table crime_head(
    "CrimeHeadID",
    "CrimeGroupName"
)

Table crime_sub_head(
    "CrimeSubHeadID",
    "CrimeHeadID",
    "CrimeHeadName"
)

Table case_status(
    "CaseStatusID",
    "CaseStatusName"
)

Table employee(
    "EmployeeID",
    "FirstName"
)

Table unit(
    "UnitID",
    "UnitName",
    "DistrictID"
)

Table district(
    "DistrictID",
    "DistrictName"
)

Relationships

case_master."CrimeMajorHeadID" = crime_head."CrimeHeadID"

case_master."CrimeMinorHeadID" = crime_sub_head."CrimeSubHeadID"

case_master."CaseStatusID" = case_status."CaseStatusID"

case_master."PolicePersonID" = employee."EmployeeID"

case_master."PoliceStationID" = unit."UnitID"

unit."DistrictID" = district."DistrictID"

Rules

1. PostgreSQL only.
2. Always use double quotes around column names.
3. Never invent table names.
4. Never invent column names.
5. Generate ONLY SELECT statements.
6. Return ONLY SQL.
7. Never return markdown.
8. Never return explanations.
9. If the current question depends on previous conversation, use the conversation context.
"""


def clean_sql(sql: str):
    sql = re.sub(r"```sql", "", sql, flags=re.IGNORECASE)
    sql = sql.replace("```", "")
    return sql.strip()


def generate_sql(question: str):
    # Check if API key is available
    if not os.getenv("GEMINI_API_KEY"):
        # Fallback to rule-based responses when API key is not configured
        return get_fallback_sql(question)

    conversation = ""

    for msg in history():
        conversation += f"{msg['role']}: {msg['content']}\n"

    prompt = f"""
You are an expert PostgreSQL SQL Generator.

{SCHEMA}

Conversation History:

{conversation}

Current User Question:

{question}

Instructions:

- Use the conversation history if the current question is a follow-up.
- Generate ONE PostgreSQL SELECT query.
- Always use quoted column names.
- Return ONLY SQL.
"""

    try:
        sql = ask_llm(prompt)
        sql = clean_sql(sql)
        validate_sql(sql)
        return sql
    except Exception as e:
        print(f"Error generating SQL with LLM: {e}")
        # Fallback to rule-based responses
        return get_fallback_sql(question)


def get_fallback_sql(question: str):
    """Provide fallback SQL queries based on common questions when LLM is not available"""
    question_lower = question.lower()
    
    # Rule-based fallback responses with simpler queries that match actual database structure
    if "top" in question_lower and "crime" in question_lower and ("categor" in question_lower or "type" in question_lower):
        return 'SELECT "CrimeGroupName" as "CrimeHeadName", COUNT(*) as count FROM crime_head LEFT JOIN case_master ON crime_head."CrimeHeadID" = case_master."CrimeMajorHeadID" GROUP BY "CrimeGroupName" ORDER BY count DESC LIMIT 10'
    
    elif "trend" in question_lower and "bangalore" in question_lower:
        return 'SELECT "CrimeRegisteredDate", COUNT(*) as count FROM case_master JOIN unit ON case_master."PoliceStationID" = unit."UnitID" JOIN district ON unit."DistrictID" = district."DistrictID" WHERE "DistrictName" LIKE \'%Bangalore%\' GROUP BY "CrimeRegisteredDate" ORDER BY "CrimeRegisteredDate" DESC LIMIT 12'
    
    elif "solved" in question_lower and ("district" in question_lower or "most" in question_lower):
        return 'SELECT district."DistrictName", COUNT(*) as solved_count FROM case_master JOIN unit ON case_master."PoliceStationID" = unit."UnitID" JOIN district ON unit."DistrictID" = district."DistrictID" JOIN case_status ON case_master."CaseStatusID" = case_status."CaseStatusID" WHERE "CaseStatusName" = \'Solved\' GROUP BY district."DistrictName" ORDER BY solved_count DESC LIMIT 10'
    
    elif "arrest" in question_lower and ("rate" in question_lower or "month" in question_lower):
        return 'SELECT COUNT(*) as total_cases, SUM(CASE WHEN "CaseStatusName" = \'Solved\' THEN 1 ELSE 0 END) as solved_cases FROM case_master JOIN case_status ON case_master."CaseStatusID" = case_status."CaseStatusID" WHERE "CrimeRegisteredDate" >= DATE_TRUNC(\'month\', CURRENT_DATE)'
    
    elif "total" in question_lower and ("case" in question_lower or "crime" in question_lower):
        return 'SELECT COUNT(*) as total_cases FROM case_master'
    
    elif "pending" in question_lower:
        return 'SELECT COUNT(*) as pending_cases FROM case_master JOIN case_status ON case_master."CaseStatusID" = case_status."CaseStatusID" WHERE "CaseStatusName" = \'Pending\''
    
    else:
        # Generic fallback - return total cases
        return 'SELECT COUNT(*) as total_cases FROM case_master'