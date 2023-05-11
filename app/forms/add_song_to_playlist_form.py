from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class AddSongToPlaylistForm(FlaskForm):
     playlist_ids = StringField("Playlist ids", validators=[DataRequired()])
     song_id = IntegerField("Song Id", validators=[DataRequired()])
