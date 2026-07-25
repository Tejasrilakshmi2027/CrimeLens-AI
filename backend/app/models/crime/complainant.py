from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database.base import Base


class Complainant(Base):
    __tablename__ = "complainant"

    ComplainantID = Column(Integer, primary_key=True, index=True)

    CaseMasterID = Column(
        Integer,
        ForeignKey("case_master.CaseMasterID")
    )

    Name = Column(String(150))

    Phone = Column(String(20))

    Address = Column(String(255))

    case = relationship(
        "CaseMaster",
        back_populates="complainants"
    )