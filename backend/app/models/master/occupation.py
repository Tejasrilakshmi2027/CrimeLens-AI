from sqlalchemy import Column, Integer, String
from app.database.base import Base


class Occupation(Base):
    __tablename__ = "occupation"

    OccupationID = Column(
        Integer,
        primary_key=True,
        index=True
    )

    OccupationName = Column(
        String(150),
        nullable=False
    )