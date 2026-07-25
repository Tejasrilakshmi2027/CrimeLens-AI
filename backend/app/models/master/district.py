from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship

from app.database.base import Base

class District(Base):

    __tablename__="district"

    DistrictID=Column(Integer,primary_key=True)

    DistrictName=Column(String(100))

    StateID=Column(Integer,ForeignKey("state.StateID"))

    state=relationship(
        "State",
        back_populates="districts"
    )

    units=relationship(
        "Unit",
        back_populates="district"
    )