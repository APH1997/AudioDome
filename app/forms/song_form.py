from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.aws_helpers import ALLOWED_EXTENSIONS, ALLOWED_IMAGES

class SongForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    artist = StringField('Artist', validators=[DataRequired()])
    aws_url = FileField("Song File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    song_image = FileField("Song Image", validators=[FileRequired(), FileAllowed(list(ALLOWED_IMAGES))])
    uploader_id = IntegerField('Uploader Id', validators=[DataRequired()])
