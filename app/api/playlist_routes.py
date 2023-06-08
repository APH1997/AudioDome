from flask import Blueprint, jsonify, redirect, request
from app.models import Playlist, db, User, Song, PlaylistComment
from app.forms import PlaylistForm, EditPlaylistForm, AddSongToPlaylistForm, CommentForm
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
    form = PlaylistForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        playlistPicture = form.data['playlist_image']
        playlistPicture.filename = get_unique_filename(playlistPicture.filename)
        upload = upload_file_to_s3(playlistPicture)

        if 'url' not in upload:

            return jsonify(upload['errors'])

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


        new_playlist.playlist_songs.extend(song_list)
        db.session.add(new_playlist)
        db.session.commit()
        redirect('/')
    else:
        return jsonify({"message": "Bad Data"})


@playlist_routes.route('/<int:id>', methods=['PUT'])
def edit_playlist_by_id(id):
    playlist = Playlist.query.get(id)
    form = EditPlaylistForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if form.data['playlist_image']:
                image = form.data['playlist_image']
                image.filename = get_unique_filename(image.filename)
                upload = upload_file_to_s3(image)

                if 'url' not in upload:
                    return upload['errors']
                playlist_image = upload['url']

                playlist.playlist_image = playlist_image
        playlist.name = form.data['name']

        db.session.commit()
        return playlist.to_dict()
    else:
        return "BAD DATA IN EDIT PLAYLIST ROUTE"

@playlist_routes.route('/add', methods=['PUT'])
@login_required
def add_song_to_playlists():
    form = AddSongToPlaylistForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        playlistList = form.data['playlist_ids'].split(',')
        playlists = [Playlist.query.get(id) for id in playlistList]
        song = Song.query.get(form.data['song_id'])

        added = [playlist.playlist_songs.append(song) for playlist in playlists]

        db.session.commit()
    return jsonify("success or failure who knows")

@playlist_routes.route('/<int:playlist_id>/delete/<int:song_id>', methods=['DELETE'])
@login_required
def remove_song_from_playlist(playlist_id, song_id):
    playlist = Playlist.query.get(playlist_id)
    playlist.playlist_songs = [songs for songs in playlist.playlist_songs if songs.id != song_id]
    db.session.commit()

    return jsonify({
        'message': f'{playlist.playlist_songs} has been updated'
    })

@playlist_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_playlist_by_id(id):

    playlist = Playlist.query.get(id)

    db.session.delete(playlist)
    db.session.commit()


    return jsonify({
        'message': 'Playlist successfully deleted'
    })

@playlist_routes.route('/<int:playlistId>/user/<int:userId>', methods=['POST'])
@login_required
def create_comment(playlistId, userId):
    """
    Takes comment form data and creates comment
    Returns the playlist in a dictionary with updated comments
    """
    playlist = Playlist.query.get(playlistId)
    user = User.query.get(userId)

    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_comment = PlaylistComment(
            user = user,
            playlist = playlist,
            content = form.data['content']
        )
        db.session.add(new_comment)
        db.session.commit()

        return playlist.to_dict()

    return form.errors

@playlist_routes.route('/comments/<int:commentId>', methods=['PUT'])
@login_required
def edit_comment(commentId):
    """
    Queries for comment by id
    Validates form data and overwrites comment content
    returns playlist in a dictionary with updated comments
    """
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = PlaylistComment.query.get(commentId)
        comment.content = form.data['content']
        db.session.commit()

        playlist = Playlist.query.get(comment.playlist_id)

        return playlist.to_dict()
    return form.errors
