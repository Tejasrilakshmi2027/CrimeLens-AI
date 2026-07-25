from sqlalchemy import Column, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship

from app.database.base import Base


class Section(Base):
    __tablename__ = "section"

    SectionCode = Column(String(20), primary_key=True)

    ActCode = Column(
        String(20),
        ForeignKey("act.ActCode"),
        nullable=False
    )

    SectionDescription = Column(String(500))

    Active = Column(Boolean, default=True)

    act = relationship("Act")