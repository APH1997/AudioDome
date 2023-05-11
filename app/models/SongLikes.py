from .db import db, add_prefix_for_prod, environment, SCHEMA


likes = db.Table(
    'likes',
    db.Model.metadata,
    db.Column("songs", db.Integer, db.ForeignKey(add_prefix_for_prod('songs.id')), primary_key=True),
    db.Column("users", db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)
)

if environment == "production":
    likes.schema = SCHEMA
