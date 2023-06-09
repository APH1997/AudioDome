from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .SongLikes import likes

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    bio = db.Column(db.String(1500))
    profile_image = db.Column(db.String(255))

    playlists = db.relationship(
        "Playlist",
        back_populates="user",
        cascade='delete-orphan, all'
    )

    songs = db.relationship(
        "Song",
        back_populates="uploader",
        cascade='delete-orphan, all'
    )

    user_likes = db.relationship(
        "Song",
        secondary=likes,
        overlaps="songs",
        back_populates="song_likes"
    )

    comments = db.relationship(
        "PlaylistComment",
        back_populates="user"
    )


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'username': self.username,
            'email': self.email,
            'bio': self.bio,
            'profileImage': self.profile_image,
            'playlists': [playlist.to_dict() for playlist in self.playlists],
            'likes': [song.id for song in self.user_likes],
            'songs': [song.to_dict() for song in self.songs]
        }

    def to_dict_for_comment_card(self):
        return {
            'id': self.id,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'username': self.username,
            'profileImage': self.profile_image,
        }
