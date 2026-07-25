import re

FORBIDDEN = {
    "DROP",
    "DELETE",
    "UPDATE",
    "ALTER",
    "INSERT",
    "CREATE",
    "TRUNCATE",
}

def validate_sql(sql: str):

    sql = sql.strip().lower()

    if not sql.startswith("select"):
        raise Exception("Only SELECT statements are allowed.")

    blocked = [
        "insert",
        "update",
        "delete",
        "drop",
        "truncate",
        "alter",
        "create",
        "grant",
        "revoke",
    ]

    for word in blocked:
        if word in sql:
            raise Exception(f"Unsafe SQL detected: {word}")

    return sql