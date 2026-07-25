from pydantic import BaseModel, EmailStr
from typing import Optional, Literal
from datetime import datetime
from enum import Enum


class UserRole(str, Enum):
    USER = "USER"
    OFFICER = "OFFICER"
    ADMIN = "ADMIN"


class UserBase(BaseModel):
    email: EmailStr
    username: str
    full_name: Optional[str] = None


class UserCreate(UserBase):
    password: str
    role: Optional[UserRole] = UserRole.USER
    # Officer-specific fields
    badge_number: Optional[str] = None
    rank: Optional[str] = None
    department: Optional[str] = None
    phone: Optional[str] = None
    assigned_station: Optional[str] = None


class UserLogin(BaseModel):
    username: str
    password: str


class UserResponse(BaseModel):
    id: int
    email: str
    username: str
    full_name: Optional[str] = None
    role: UserRole
    badge_number: Optional[str] = None
    rank: Optional[str] = None
    department: Optional[str] = None
    phone: Optional[str] = None
    assigned_station: Optional[str] = None
    cases_handled: int = 0
    solved_cases: int = 0
    is_active: bool
    is_admin: bool
    created_at: datetime

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse


class TokenData(BaseModel):
    username: Optional[str] = None
