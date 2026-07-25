from sqlalchemy import Column, Integer, String
from app.database.base import Base


class Religion(Base):
    __tablename__ = "religion"

    ReligionID = Column(Integer, primary_key=True, index=True)
    ReligionName = Column(String(100), nullable=False)