from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class SongForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    artist = StringField('Artist', validators=[DataRequired()])
    aws_url = StringField('Aws Url', validators=[DataRequired()])
    uploader_id = IntegerField('Uploader Id', validators=[DataRequired()])
