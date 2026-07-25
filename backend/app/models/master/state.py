from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.database.base import Base


class State(Base):
    __tablename__ = "state"

    StateID = Column(Integer, primary_key=True, index=True)
    StateName = Column(String(100), nullable=False)

    districts = relationship(
        "District",
        back_populates="state"
    )