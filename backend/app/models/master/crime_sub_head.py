from sqlalchemy import Column, Integer, String, ForeignKey
from app.database.base import Base

from sqlalchemy.orm import relationship
class CrimeSubHead(Base):
    __tablename__ = "crime_sub_head"

    CrimeSubHeadID = Column(Integer, primary_key=True, index=True)

    CrimeHeadID = Column(
        Integer,
        ForeignKey("crime_head.CrimeHeadID"),
        nullable=False,
    )
    cases=relationship(
    "CaseMaster",
    back_populates="minor_head"
)

    CrimeHeadName = Column(String(200), nullable=False)

    SeqID = Column(Integer)