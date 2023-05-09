from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.aws_helpers import ALLOWED_IMAGES


class PlaylistForm(FlaskForm):
    user_id = IntegerField('User Id', validators=[DataRequired()])
    name = StringField("Name", validators=[DataRequired()])
    playlist_image = FileField("Playlist Image", validators=[FileRequired(), FileAllowed(list(ALLOWED_IMAGES))])
    playlist_songs = StringField('Playlist Songs')
