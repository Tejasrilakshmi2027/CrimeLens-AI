from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from typing import Optional

from app.models.user import User
from app.schemas.auth import UserCreate, UserLogin
from app.auth.utils import get_password_hash, verify_password, create_access_token


def get_user_by_email(db: Session, email: str) -> Optional[User]:
    """Get user by email."""
    return db.query(User).filter(User.email == email).first()


def get_user_by_username(db: Session, username: str) -> Optional[User]:
    """Get user by username."""
    return db.query(User).filter(User.username == username).first()


def get_user_by_id(db: Session, user_id: int) -> Optional[User]:
    """Get user by ID."""
    return db.query(User).filter(User.id == user_id).first()


def create_user(db: Session, user: UserCreate) -> User:
    """Create a new user."""
    # Validate username (no spaces, alphanumeric)
    if ' ' in user.username:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username cannot contain spaces"
        )
    
    # Validate phone number format if provided
    if user.phone:
        # Remove all non-digit characters for validation
        phone_digits = ''.join(c for c in user.phone if c.isdigit())
        if len(phone_digits) < 10:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Phone number must be at least 10 digits"
            )
    
    # Check if email already exists
    if get_user_by_email(db, user.email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Check if username already exists
    if get_user_by_username(db, user.username):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already taken"
        )
    
    # Check if badge number already exists (for officers)
    if user.badge_number:
        existing_badge = db.query(User).filter(User.badge_number == user.badge_number).first()
        if existing_badge:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Badge number already registered"
            )
    
    # Create new user
    # Truncate password to 72 characters (bcrypt limitation)
    truncated_password = user.password[:72]
    hashed_password = get_password_hash(truncated_password)
    db_user = User(
        email=user.email,
        username=user.username,
        full_name=user.full_name,
        hashed_password=hashed_password,
        role=user.role,
        badge_number=user.badge_number,
        rank=user.rank,
        department=user.department,
        phone=user.phone,
        assigned_station=user.assigned_station
    )
    
    try:
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Database error: {str(e)}"
        )
    
    return db_user


def authenticate_user(db: Session, username: str, password: str) -> Optional[User]:
    """Authenticate user with username and password."""
    user = get_user_by_username(db, username)
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user


def login_user(db: Session, user_credentials: UserLogin) -> dict:
    """Login user and return access token."""
    user = authenticate_user(db, user_credentials.username, user_credentials.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(data={"sub": str(user.id)})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user
    }
