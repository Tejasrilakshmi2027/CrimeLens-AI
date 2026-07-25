from sqlalchemy import Column, Integer, String
from app.database.base import Base
from sqlalchemy.orm import relationship

class CaseStatus(Base):
    __tablename__ = "case_status"

    CaseStatusID = Column(
        Integer,
        primary_key=True,
        index=True
    )

    CaseStatusName = Column(
        String(100),
        nullable=False
    )
    cases=relationship(
    "CaseMaster",
    back_populates="status"
)