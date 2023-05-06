from flask import Blueprint, jsonify, redirect
from app.models import Playlist, db, User
from app.forms import PlaylistForm
from flask_login import login_required

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

@playlist_routes.route('/new')
@login_required
def create_playlist():
    form = PlaylistForm()
    if form.validate_on_submit():
        new_playlist = Playlist(
            name = form.data['name'],
            playlist_image = form.data['playlist_image']
        )
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

    return jsonify({
        'message': 'Playlist successfully deleted'
    })
