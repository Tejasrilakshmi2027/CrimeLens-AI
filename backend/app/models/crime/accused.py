from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database.base import Base


class Accused(Base):
    __tablename__ = "accused"

    AccusedID = Column(Integer, primary_key=True, index=True)

    CaseMasterID = Column(
        Integer,
        ForeignKey("case_master.CaseMasterID")
    )

    Name = Column(String(150))

    Age = Column(Integer)

    case = relationship(
        "CaseMaster",
        back_populates="accused"
    )