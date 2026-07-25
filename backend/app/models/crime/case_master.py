from sqlalchemy import (
    Column,
    Integer,
    String,
    Date,
    DateTime,
    Numeric,
    Text,
    ForeignKey,
)

from sqlalchemy.orm import relationship
from app.database.base import Base


class CaseMaster(Base):
    __tablename__ = "case_master"

    # -------------------------
    # Primary Key
    # -------------------------
    CaseMasterID = Column(Integer, primary_key=True, index=True)

    # -------------------------
    # FIR Details
    # -------------------------
    CrimeNo = Column(String(25), unique=True, nullable=False)
    CaseNo = Column(String(20), nullable=False)
    CrimeRegisteredDate = Column(Date)

    # -------------------------
    # Foreign Keys
    # -------------------------
    PolicePersonID = Column(
        Integer,
        ForeignKey("employee.EmployeeID"),
        nullable=True
    )

    PoliceStationID = Column(
        Integer,
        ForeignKey("unit.UnitID"),
        nullable=True
    )

    CaseCategoryID = Column(
        Integer,
        ForeignKey("case_category.CaseCategoryID"),
        nullable=True
    )

    GravityOffenceID = Column(
        Integer,
        ForeignKey("gravity_offence.GravityOffenceID"),
        nullable=True
    )

    CrimeMajorHeadID = Column(
        Integer,
        ForeignKey("crime_head.CrimeHeadID"),
        nullable=True
    )

    CrimeMinorHeadID = Column(
        Integer,
        ForeignKey("crime_sub_head.CrimeSubHeadID"),
        nullable=True
    )

    CaseStatusID = Column(
        Integer,
        ForeignKey("case_status.CaseStatusID"),
        nullable=True
    )

    CourtID = Column(
        Integer,
        ForeignKey("court.CourtID"),
        nullable=True
    )

    # -------------------------
    # Incident Details
    # -------------------------
    IncidentFromDate = Column(DateTime)
    IncidentToDate = Column(DateTime)
    InfoReceivedPSDate = Column(DateTime)

    Latitude = Column(Numeric(10, 7))
    Longitude = Column(Numeric(10, 7))

    BriefFacts = Column(Text)

    # ==================================================
    # MASTER RELATIONSHIPS
    # ==================================================

    employee = relationship(
        "Employee",
        back_populates="cases"
    )

    station = relationship(
        "Unit",
        back_populates="cases"
    )

    court = relationship(
        "Court",
        back_populates="cases"
    )

    category = relationship(
        "CaseCategory",
        back_populates="cases"
    )

    gravity = relationship(
        "GravityOffence",
        back_populates="cases"
    )

    major_head = relationship(
        "CrimeHead",
        back_populates="cases"
    )

    minor_head = relationship(
        "CrimeSubHead",
        back_populates="cases"
    )

    status = relationship(
        "CaseStatus",
        back_populates="cases"
    )

    # ==================================================
    # CHILD TABLE RELATIONSHIPS
    # ==================================================

    complainants = relationship(
        "Complainant",
        back_populates="case",
        cascade="all, delete-orphan"
    )

    victims = relationship(
        "Victim",
        back_populates="case",
        cascade="all, delete-orphan"
    )

    accused = relationship(
        "Accused",
        back_populates="case",
        cascade="all, delete-orphan"
    )

    arrests = relationship(
        "Arrest",
        back_populates="case",
        cascade="all, delete-orphan"
    )

    chargesheets = relationship(
        "Chargesheet",
        back_populates="case",
        cascade="all, delete-orphan"
    )