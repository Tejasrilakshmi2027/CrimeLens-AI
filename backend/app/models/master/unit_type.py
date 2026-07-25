from sqlalchemy import Column, Integer, String, Boolean

from app.database.base import Base
from sqlalchemy.orm import relationship

class UnitType(Base):

    __tablename__="unit_type"

    UnitTypeID=Column(Integer,primary_key=True)

    LookupValue=Column(String(100))

    units=relationship(
        "Unit",
        back_populates="unit_type"
    )