from .db import db
from .user import User

class Songs(db.Model):
    __tablename__ = 'songs'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    artist = db.Column(db.String(255))
    aws_url = db.Column(db.String(255))
    uploader_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def to_dict(self):
        return {
            'id': self.id,
            'title' : self.title,
            'artist' : self.artist,
            'aws_url' : self.aws_url,
            'uploader_id': self.uploader_id
        }
