from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship
from app.database.base import Base

class CrimeHead(Base):
    __tablename__ = "crime_head"

    CrimeHeadID = Column(Integer, primary_key=True)

    CrimeGroupName = Column(String(200))
    Active = Column(Boolean, default=True)

    cases = relationship(
        "CaseMaster",
        back_populates="major_head"
    )