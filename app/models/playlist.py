from .db import db, environment, SCHEMA, add_prefix_for_prod



class Playlist(db.Model, UserMixin):
    __tablename__ = 'playlists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    name = db.Column(db.String(40), nullable=False)
    playlist_image = db.Column(db.String(255), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'name': self.name,
            'playlistImage': self.playlist_image
        }
