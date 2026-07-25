from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    ForeignKey
)

from sqlalchemy.orm import relationship

from app.database.base import Base


class Court(Base):

    __tablename__="court"

    CourtID=Column(Integer,primary_key=True)

    CourtName=Column(String(200))

    cases=relationship(
        "CaseMaster",
        back_populates="court"
    )