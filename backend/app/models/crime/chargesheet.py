from sqlalchemy import Column, Integer, Date, ForeignKey
from sqlalchemy.orm import relationship

from app.database.base import Base


class Chargesheet(Base):
    __tablename__ = "chargesheet"

    ChargesheetID = Column(Integer, primary_key=True, index=True)

    CaseMasterID = Column(
        Integer,
        ForeignKey("case_master.CaseMasterID")
    )

    FilingDate = Column(Date)

    case = relationship(
        "CaseMaster",
        back_populates="chargesheets"
    )