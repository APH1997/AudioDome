from flask import Blueprint, jsonify, redirect
from app.models import Song, db, User
from app.forms import SongForm
from flask_login import login_required

song_routes = Blueprint('song',__name__)

@song_routes.route('/')
def get_all_song():
    songs = Song.query.all()
    songs_list = [song.to_dict() for song in songs]
    return jsonify(songs_list)


@song_routes.route('/<int:id>')
def get_song_by_id(id):
    song = Song.query.get(id)
    return song.to_dict()

@song_routes.route('/new', methods=['POST'])
@login_required
def create_song_by_id():
    form = SongForm()
    if form.validate_on_submit:
        new_song = Song(
            title = form.data['title'],
            artist = form.data['artist'],
            aws_url = form.data['aws_url'],
            uploader_id = form.data['uploader_id']
        )
        db.session.add(new_song)
        db.session.commit()
        redirect(f'/songs/{new_song.id}')
    else:
        return "Bad Data"

@song_routes.route('/<int:id>', methods=['PUT'])
def edit_song_by_id(id):
    song = Song.query.get(id)
    form = SongForm()
    song.title = form.data['title']
    song.artist = form.data['artist']
    song.aws_url = form.data['aws_url']
    song.uploader_id = form.data['uploader_id']

    db.session.commit()

    return song.to_dict()


@song_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_song_by_id(id):
    song = Song.query.get(id)

    db.session.delete(song)

    db.session.commit()

    return jsonify({
        'message': 'Song deleted'
    })
