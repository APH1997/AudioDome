"""empty message

Revision ID: cc5226c5056d
Revises: ffdc0a98111c
Create Date: 2023-05-05 15:58:41.062106

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'cc5226c5056d'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('playlists',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('name', sa.String(length=40), nullable=False),
    sa.Column('playlist_image', sa.String(length=255), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('songs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=255), nullable=True),
    sa.Column('artist', sa.String(length=255), nullable=True),
    sa.Column('aws_url', sa.String(length=255), nullable=True),
    sa.Column('uploader_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['uploader_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('playlist_songs',
    sa.Column('songs', sa.Integer(), nullable=False),
    sa.Column('playlists', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['playlists'], ['playlists.id'], ),
    sa.ForeignKeyConstraint(['songs'], ['songs.id'], ),
    sa.PrimaryKeyConstraint('songs', 'playlists')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('playlist_songs')
    op.drop_table('songs')
    op.drop_table('playlists')
    # ### end Alembic commands ###