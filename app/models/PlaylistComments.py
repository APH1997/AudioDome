from .db import db, add_prefix_for_prod, environment, SCHEMA

comments = db.Table(
    'comments',
    db.Model.metadata,
    db.Column("playlists", db.Integer, db.ForeignKey(add_prefix_for_prod('playlists.id')), primary_key=True),
    db.Column("users", db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)
)

if environment == "production":
    comments.schema = SCHEMA
