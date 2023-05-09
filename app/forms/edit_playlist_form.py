from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed
from app.api.aws_helpers import ALLOWED_IMAGES

class EditPlaylistForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    playlist_image = FileField("Playlist Image", validators=[FileAllowed(list(ALLOWED_IMAGES))])
