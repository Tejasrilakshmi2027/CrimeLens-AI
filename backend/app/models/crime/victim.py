from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database.base import Base


class Victim(Base):
    __tablename__ = "victim"

    VictimID = Column(Integer, primary_key=True, index=True)

    CaseMasterID = Column(
        Integer,
        ForeignKey("case_master.CaseMasterID")
    )

    Name = Column(String(150))

    Age = Column(Integer)

    Gender = Column(String(10))

    case = relationship(
        "CaseMaster",
        back_populates="victims"
    )