from flask import Blueprint, jsonify, redirect, request
from app.models import Playlist, db, User, Song
from app.forms import PlaylistForm
from flask_login import login_required
from app.api.aws_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3


playlist_routes = Blueprint('playlist',__name__)


@playlist_routes.route('/')
def get_all_playlists():
    playlist = Playlist.query.all()
    playlist_list = [pl.to_dict() for pl in playlist]
    return jsonify(playlist_list)


@playlist_routes.route('/<int:id>')
def get_playlist_by_id(id):
    playlist = Playlist.query.get(id)
    return playlist.to_dict()

@playlist_routes.route('/new', methods=['POST'])
@login_required
def create_playlist():
    print('I AM IN THE PLAYLIST ROUTE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    form = PlaylistForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data,'DATAAAAAAAAAAAAAAAAAAAA')
    if form.validate_on_submit():
        playlistPicture = form.data['playlist_image']

        playlistPicture.filename = get_unique_filename(playlistPicture.filename)
        upload = upload_file_to_s3(playlistPicture)

        if 'url' not in upload:
            return upload['errors']

        playlist_image = upload['url']

        new_playlist = Playlist(
            user_id = form.data['user_id'],
            name = form.data['name'],
            playlist_image = playlist_image
        )
        song_list = []
        for song_id in form.data['playlist_songs'].split(','):
            song = Song.query.get(song_id)
            song_list.append(song)

        print(song_list,'<==========================this is a list of songs')

        new_playlist.playlist_songs.extend(song_list)
        db.session.add(new_playlist)
        db.session.commit()
        redirect('/')
    else:
        return "Bad Data"


@playlist_routes.route('/<int:id>', methods=['PUT'])
def edit_playlist_by_id(id):
    playlist = Playlist.query.get(id)
    form = PlaylistForm()
    playlist.name = form.data['name']
    playlist.playlist_image = form.data['playlist_image']

    db.session.commit()

    return playlist.to_dict()


@playlist_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_playlist_by_id(id):
    playlist = Playlist.query.get(id)

    db.session.delete(playlist)
    db.session.commit()

    if not 1 <= playlist.id <= 3:
        remove_file_from_s3(playlist.playlist_image)
        print('Playlist Image Deleted from AWS bucket')

    return jsonify({
        'message': 'Playlist successfully deleted'
    })
