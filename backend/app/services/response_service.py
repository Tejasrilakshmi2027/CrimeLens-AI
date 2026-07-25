def format_response(question: str, rows):
    question_lower = question.lower()

    if not rows:
        return "No matching records found in the database. Try asking about total cases, crime categories, or district statistics."

    # Handle different types of queries with appropriate formatting
    if "top" in question_lower and ("categor" in question_lower or "type" in question_lower):
        return format_crime_categories(rows)
    
    elif "trend" in question_lower:
        return format_trend_data(rows)
    
    elif "solved" in question_lower and ("district" in question_lower or "most" in question_lower):
        return format_district_stats(rows, "solved")
    
    elif "total" in question_lower and ("case" in question_lower or "crime" in question_lower):
        return format_count_stats(rows, "total")
    
    elif "pending" in question_lower:
        return format_count_stats(rows, "pending")
    
    elif "arrest" in question_lower:
        return format_arrest_stats(rows)
    
    # Default: format as case details
    return format_case_details(rows)


def format_crime_categories(rows):
    """Format crime category results"""
    output = ["Here are the top crime categories:\n"]
    for row in rows:
        category = row.get('CrimeHeadName', row.get('category', 'Unknown'))
        count = row.get('count', row.get('total', 0))
        output.append(f"- {category}: {count} cases")
    return "\n".join(output)


def format_trend_data(rows):
    """Format trend/time-series data"""
    output = ["Here's the crime trend data:\n"]
    for row in rows:
        date = row.get('CrimeRegisteredDate', row.get('date', row.get('month', 'Unknown')))
        count = row.get('count', row.get('total', 0))
        output.append(f"- {date}: {count} cases")
    return "\n".join(output)


def format_district_stats(rows, stat_type):
    """Format district-wise statistics"""
    output = [f"Here are the districts with most {stat_type} cases:\n"]
    for row in rows:
        district = row.get('DistrictName', row.get('district', 'Unknown'))
        count = row.get('solved_count', row.get('count', row.get('total', 0)))
        output.append(f"- {district}: {count} cases")
    return "\n".join(output)


def format_count_stats(rows, stat_type):
    """Format simple count statistics"""
    if rows and len(rows) > 0:
        count = rows[0].get('total_cases', rows[0].get('pending_cases', rows[0].get('count', 0)))
        return f"There are currently {count} {stat_type} cases in the database."
    return "No count data available."


def format_arrest_stats(rows):
    """Format arrest/solved rate statistics"""
    if rows and len(rows) > 0:
        total = rows[0].get('total_cases', rows[0].get('total', 0))
        solved = rows[0].get('solved_cases', rows[0].get('solved', 0))
        if total > 0:
            rate = (solved / total) * 100
            return f"Out of {total} total cases, {solved} have been solved. The current resolution rate is {rate:.1f}%."
        return f"Total cases: {total}, Solved: {solved}"
    return "No arrest statistics available."


def format_case_details(rows):
    """Format detailed case information"""
    output = []
    
    for row in rows:
        output.append(
            f"""
**Crime No**: {row.get('CrimeNo', row.get('crime_number', '-'))}
**Case No**: {row.get('CaseNo', row.get('case_number', '-'))}
**Status**: {row.get('CaseStatusName', row.get('Status', '-'))}
**Officer**: {row.get('FirstName', row.get('Officer', '-'))}
**District**: {row.get('DistrictName', row.get('District', '-'))}
**Registered**: {row.get('CrimeRegisteredDate', row.get('date', '-'))}
**Brief Facts**: {row.get('BriefFacts', row.get('description', '-'))}
---
"""
        )

    return "\n".join(output)