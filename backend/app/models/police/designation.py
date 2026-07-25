from sqlalchemy import Column,Integer,String
from sqlalchemy.orm import relationship

from app.database.base import Base


class Designation(Base):

    __tablename__="designation"

    DesignationID=Column(Integer,primary_key=True)

    DesignationName=Column(String(150))

    employees=relationship(
        "Employee",
        back_populates="designation"
    )