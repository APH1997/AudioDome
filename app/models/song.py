from .db import db, add_prefix_for_prod, environment, SCHEMA
from .user import User
from .PlaylistSongs import playlist_songs
from .SongLikes import likes

class Song(db.Model):
    __tablename__ = 'songs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    artist = db.Column(db.String(255))
    aws_url = db.Column(db.String(255))
    uploader_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    song_image = db.Column(db.String(255), nullable=False)

    song_playlists = db.relationship(
        "Playlist",
        secondary=playlist_songs,
        back_populates='playlist_songs'
    )

    uploader = db.relationship(
        "User",
        overlaps="user_likes",
        back_populates="songs"
    )

    song_likes = db.relationship(
        "User",
        secondary=likes,
        overlaps="songs,uploader",
        back_populates="user_likes"
    )

    def to_dict(self):
        return {
            'id': self.id,
            'title' : self.title,
            'artist' : self.artist,
            'awsUrl' : self.aws_url,
            'uploader': self.uploader.username,
            'songImage': self.song_image
        }
