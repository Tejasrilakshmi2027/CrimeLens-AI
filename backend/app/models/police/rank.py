from sqlalchemy import Column,Integer,String
from sqlalchemy.orm import relationship

from app.database.base import Base


class Rank(Base):

    __tablename__="rank"

    RankID=Column(Integer,primary_key=True)

    RankName=Column(String(100))

    employees=relationship(
        "Employee",
        back_populates="rank"
    )