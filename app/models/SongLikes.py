from .db import db, add_prefix_for_prod


likes = db.Table(
    'likes',
    db.Model.metadata,
    db.Column("songs", db.Integer, db.ForeignKey(add_prefix_for_prod('songs.id')), primary_key=True),
    db.Column("users", db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)
)
