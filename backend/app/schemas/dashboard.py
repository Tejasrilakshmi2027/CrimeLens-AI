from pydantic import BaseModel


class DashboardSummary(BaseModel):
    total_cases: int
    total_accused: int
    total_victims: int
    total_police_stations: int
    total_districts: int