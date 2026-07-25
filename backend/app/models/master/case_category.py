from sqlalchemy import Column, Integer, String
from app.database.base import Base

from sqlalchemy.orm import relationship
class CaseCategory(Base):
    __tablename__ = "case_category"

    CaseCategoryID = Column(Integer, primary_key=True, index=True)

    LookupValue = Column(String(100), nullable=False)
    cases=relationship(
    "CaseMaster",
    back_populates="category"
)