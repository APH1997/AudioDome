from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class PlaylistForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    playlist_image = StringField("Playlist Image")
