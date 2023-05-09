from flask import Blueprint, jsonify, redirect, request
from app.models import Song, db, User
from app.forms import SongForm, EditSongForm
from flask_login import login_required
from app.api.aws_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3


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
    print('IM IN THE CREATE ROUTE HELP')
    form = SongForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print("FORM.DATA IN /SONGS/NEW -------------",form.data)
        song = form.data["aws_url"]

        song.filename = get_unique_filename(song.filename)
        upload = upload_file_to_s3(song)

        if "url" not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message
            return upload["errors"]

        aws_url = upload["url"]
        print("aws_url =====================>",aws_url)

        new_song = Song(
            title = form.data['title'],
            artist = form.data['artist'],
            aws_url = aws_url,
            uploader_id = form.data['uploader_id']
        )

        print('new song obj =============================>', new_song)
        db.session.add(new_song)
        db.session.commit()
        redirect(f'/songs/{new_song.id}')
    else:
        return "Bad Data"

@song_routes.route('/<int:id>', methods=['PUT'])
def edit_song_by_id(id):
    song = Song.query.get(id)
    form = EditSongForm()
    print(form.data, "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit:
        song.title = form.data['title']
        song.artist = form.data['artist']
        db.session.commit()
        return song.to_dict()
    else:
        return "Bad Data"



@song_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_song_by_id(id):
    """Delete song from db as well as from
    AWS bucket IF it is not a seeded song"""

    song = Song.query.get(id)
    db.session.delete(song)
    db.session.commit()

    if not 1 <= song.id <= 3:
        remove_file_from_s3(song.aws_url)
        print('Song Deleted from AWS bucket')


    return jsonify({
        'message': 'Song deleted'
    })
