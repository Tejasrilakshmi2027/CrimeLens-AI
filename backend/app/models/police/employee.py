from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database.base import Base


class Employee(Base):

    __tablename__ = "employee"

    EmployeeID = Column(Integer, primary_key=True)

    EmployeeName = Column(String(150))

    RankID = Column(Integer, ForeignKey("rank.RankID"))

    DesignationID = Column(Integer, ForeignKey("designation.DesignationID"))

    rank = relationship(
        "Rank",
        back_populates="employees"
    )

    designation = relationship(
        "Designation",
        back_populates="employees"
    )

    cases = relationship(
        "CaseMaster",
        back_populates="employee"
    )