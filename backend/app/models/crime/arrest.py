from sqlalchemy import Column, Integer, Date, ForeignKey
from sqlalchemy.orm import relationship

from app.database.base import Base


class Arrest(Base):
    __tablename__ = "arrest"

    ArrestID = Column(Integer, primary_key=True, index=True)

    CaseMasterID = Column(
        Integer,
        ForeignKey("case_master.CaseMasterID")
    )

    ArrestDate = Column(Date)

    case = relationship(
        "CaseMaster",
        back_populates="arrests"
    )