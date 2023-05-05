from .db import db, add_prefix_for_prod

playlist_songs = db.Table(
    'playlist_songs',
    db.Model.metadata,
    db.Column("songs", db.Integer, db.ForeignKey(add_prefix_for_prod('songs.id')), primary_key=True),
    db.Column("playlists", db.Integer, db.ForeignKey(add_prefix_for_prod('playlists.id')), primary_key=True)
)

