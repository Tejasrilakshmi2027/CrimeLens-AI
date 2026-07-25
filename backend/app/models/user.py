from sqlalchemy import Column, Integer, String, Boolean, DateTime, func, Enum as SQLEnum
from sqlalchemy.orm import relationship
import enum

from app.database.base import Base


class UserRole(enum.Enum):
    USER = "USER"
    OFFICER = "OFFICER"
    ADMIN = "ADMIN"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    username = Column(String(1000), unique=True, nullable=False, index=True)
    hashed_password = Column(String(1000), nullable=False)
    full_name = Column(String(1000))
    
    # Officer-specific fields
    role = Column(SQLEnum(UserRole), default=UserRole.USER, nullable=False)
    badge_number = Column(String(100), unique=True, nullable=True)
    rank = Column(String(100), nullable=True)
    department = Column(String(255), nullable=True)
    phone = Column(String(20), nullable=True)
    assigned_station = Column(String(255), nullable=True)
    
    # Statistics
    cases_handled = Column(Integer, default=0)
    solved_cases = Column(Integer, default=0)
    
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
