from sqlalchemy import Column,Integer,String,ForeignKey
from sqlalchemy.orm import relationship

from app.database.base import Base


class Unit(Base):

    __tablename__="unit"

    UnitID=Column(Integer,primary_key=True)

    UnitName=Column(String(200))

    DistrictID=Column(Integer,ForeignKey("district.DistrictID"))

    UnitTypeID=Column(Integer,ForeignKey("unit_type.UnitTypeID"))

    district=relationship(
        "District",
        back_populates="units"
    )

    unit_type=relationship(
        "UnitType",
        back_populates="units"
    )

    cases=relationship(
        "CaseMaster",
        back_populates="station"
    )