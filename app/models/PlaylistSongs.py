from .db import db


class Playlist_Song():
    __tablename__= 'Playlist_Songs'

    song_id = db.Column(db.Integer, db.ForeignKey('songs.id'))
    playlist_id =db.Column(db.Integer, db.ForeignKey('playlists.id'))
