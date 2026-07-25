"""
Check case status names in database
"""
from sqlalchemy import create_engine, text
import os
from dotenv import load_dotenv
load_dotenv()

DATABASE_URL = os.getenv('DATABASE_URL')
engine = create_engine(DATABASE_URL)

with engine.connect() as conn:
    result = conn.execute(text('SELECT "CaseStatusID", "CaseStatusName" FROM case_status'))
    print('Case Statuses:')
    for row in result:
        print(f'  ID: {row[0]}, Name: {row[1]}')
