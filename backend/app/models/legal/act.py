from sqlalchemy import Column, String, Boolean
from app.database.base import Base


class Act(Base):
    __tablename__ = "act"

    ActCode = Column(String(20), primary_key=True)
    ActDescription = Column(String(300), nullable=False)
    ShortName = Column(String(100))
    Active = Column(Boolean, default=True)