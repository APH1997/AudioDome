from .db import db, add_prefix_for_prod, environment, SCHEMA

playlist_songs = db.Table(
    'playlist_songs',
    db.Model.metadata,
    db.Column("songs", db.Integer, db.ForeignKey(add_prefix_for_prod('songs.id')), primary_key=True),
    db.Column("playlists", db.Integer, db.ForeignKey(add_prefix_for_prod('playlists.id')), primary_key=True)
)

if environment == "production":
    playlist_songs.schema = SCHEMA
