from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class EditSongForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    artist = StringField('Artist', validators=[DataRequired()])
