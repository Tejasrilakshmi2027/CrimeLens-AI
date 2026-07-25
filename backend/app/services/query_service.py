from sqlalchemy import text
from sqlalchemy.orm import Session


from sqlalchemy import text

def execute_sql(db, sql):

    result = db.execute(text(sql))

    return result.mappings().all()