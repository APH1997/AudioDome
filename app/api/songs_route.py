from flask import Blueprint, jsonify
from app.models import Song, db

song_routes = Blueprint('auth',__name__)

@song_routes.route('/')
def get_all_song():
    songs = Song.query.all()
    songs_list = [song.to_dict() for song in songs]
    return jsonify(songs_list)


@song_routes.route('/<int:id>')
def get_song_by_id(id):
    song = Song.query.get(id)
    return song.to_dict()


@song_routes.route('/<int:id>', methods=['PUT'])
def edit_song_by_id(id):
    song = Song.query.get(id)
