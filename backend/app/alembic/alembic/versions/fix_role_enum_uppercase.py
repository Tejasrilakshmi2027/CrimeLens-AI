"""fix role enum uppercase

Revision ID: fix_role_enum_uppercase
Revises: c6a585053773
Create Date: 2024-01-22 20:10:00.000000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fix_role_enum_uppercase'
down_revision = 'c6a585053773'
branch_labels = None
depends_on = None


def upgrade():
    # Create the new enum type with uppercase values
    user_role_enum = sa.Enum('USER', 'OFFICER', 'ADMIN', name='userrole')
    user_role_enum.create(op.get_bind(), checkfirst=True)
    
    # Update existing data to use uppercase values
    op.execute("UPDATE users SET role = 'USER' WHERE role = 'user'")
    op.execute("UPDATE users SET role = 'OFFICER' WHERE role = 'officer'")
    op.execute("UPDATE users SET role = 'ADMIN' WHERE role = 'admin'")
    
    # Alter the column to use the new enum type
    op.alter_column('users', 'role',
                    existing_type=user_role_enum,
                    type_=user_role_enum,
                    existing_nullable=False)


def downgrade():
    # Revert to lowercase enum
    user_role_enum_old = sa.Enum('user', 'officer', 'admin', name='userrole')
    user_role_enum_old.create(op.get_bind(), checkfirst=True)
    
    # Update data back to lowercase
    op.execute("UPDATE users SET role = 'user' WHERE role = 'USER'")
    op.execute("UPDATE users SET role = 'officer' WHERE role = 'OFFICER'")
    op.execute("UPDATE users SET role = 'admin' WHERE role = 'ADMIN'")
    
    # Alter column back
    op.alter_column('users', 'role',
                    existing_type=user_role_enum_old,
                    type_=user_role_enum_old,
                    existing_nullable=False)
