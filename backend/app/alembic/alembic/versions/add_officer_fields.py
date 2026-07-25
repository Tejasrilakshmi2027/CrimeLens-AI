"""add officer fields to users

Revision ID: add_officer_fields
Revises: add_users_table
Create Date: 2024-07-24 10:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = 'add_officer_fields'
down_revision: Union[str, None] = 'add_users_table'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Create enum type
    user_role_enum = postgresql.ENUM('USER', 'OFFICER', 'ADMIN', name='userrole', create_type=True)
    user_role_enum.create(op.get_bind())
    
    # Add new columns (role as nullable first)
    op.add_column('users', sa.Column('role', sa.Enum('USER', 'OFFICER', 'ADMIN', name='userrole'), nullable=True))
    op.add_column('users', sa.Column('badge_number', sa.String(length=100), nullable=True))
    op.add_column('users', sa.Column('rank', sa.String(length=100), nullable=True))
    op.add_column('users', sa.Column('department', sa.String(length=255), nullable=True))
    op.add_column('users', sa.Column('phone', sa.String(length=20), nullable=True))
    op.add_column('users', sa.Column('assigned_station', sa.String(length=255), nullable=True))
    op.add_column('users', sa.Column('cases_handled', sa.Integer(), nullable=False, server_default='0'))
    op.add_column('users', sa.Column('solved_cases', sa.Integer(), nullable=False, server_default='0'))
    
    # Update existing users to have USER role
    op.execute("UPDATE users SET role = 'USER' WHERE role IS NULL")
    
    # Make role column non-nullable
    op.alter_column('users', 'role', nullable=False)
    
    # Create unique constraint for badge_number
    op.create_unique_constraint('uq_users_badge_number', 'users', ['badge_number'])


def downgrade() -> None:
    # Drop columns
    op.drop_constraint('uq_users_badge_number', 'users', type_='unique')
    op.drop_column('users', 'solved_cases')
    op.drop_column('users', 'cases_handled')
    op.drop_column('users', 'assigned_station')
    op.drop_column('users', 'phone')
    op.drop_column('users', 'department')
    op.drop_column('users', 'rank')
    op.drop_column('users', 'badge_number')
    op.drop_column('users', 'role')
    
    # Drop enum type
    user_role_enum = postgresql.ENUM('user', 'officer', 'admin', name='userrole', create_type=False)
    user_role_enum.drop(op.get_bind())
