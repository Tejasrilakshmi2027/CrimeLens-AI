from sqlalchemy import text


def execute_sql(db, sql):

    result = db.execute(text(sql))

    columns = result.keys()

    rows = result.fetchall()

    return [
        dict(zip(columns, row))
        for row in rows
    ]