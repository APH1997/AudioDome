from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.aws_helpers import ALLOWED_EXTENSIONS

class SongForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    artist = StringField('Artist', validators=[DataRequired()])
    aws_url = FileField("Song File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    uploader_id = IntegerField('Uploader Id', validators=[DataRequired()])
