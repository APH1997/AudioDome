from .db import db, add_prefix_for_prod, environment, SCHEMA

class PlaylistComment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    playlist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('playlists.id')))
    content = db.Column(db.String(255), nullable=False)

    user = db.relationship(
        "User",
        back_populates="comments"
    )

    playlist = db.relationship(
        "Playlist",
        back_populates="comments"
    )

    def to_dict(self):
        return {
            'id': self.id,
            'author': self.user.to_dict_for_comment_card(),
            'content': self.content
        }
