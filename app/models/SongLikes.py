from .db import db


class Song_Like():
    __tablename__= 'song_likes'

    song_id = db.Column(db.Integer, db.ForeignKey('songs.id'))
    user_id =db.Column(db.Integer, db.ForeignKey('user.id'))
