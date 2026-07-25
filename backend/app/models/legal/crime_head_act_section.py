from sqlalchemy import Column, Integer, String, ForeignKey

from app.database.base import Base


class CrimeHeadActSection(Base):
    __tablename__ = "crime_head_act_section"

    CrimeHeadID = Column(
        Integer,
        ForeignKey("crime_head.CrimeHeadID"),
        primary_key=True
    )

    ActCode = Column(
        String(20),
        ForeignKey("act.ActCode"),
        primary_key=True
    )

    SectionCode = Column(
        String(20),
        ForeignKey("section.SectionCode"),
        primary_key=True
    )