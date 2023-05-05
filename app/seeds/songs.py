from app.models import db, User, environment, SCHEMA, Song
from sqlalchemy.sql import text

def seed_songs():
    song1 = Song(
        title='Song One',
        artist='Song Artist One',
        aws_url='Amazon One',
        uploader_id=1
    )
    song2 = Song(
        title='Song Two',
        artist='Song Artist Two',
        aws_url='Amazon Two',
        uploader_id=2
    )
    song3 = Song(
        title='Song Three',
        artist='Song Artist Three',
        aws_url='Amazon Three',
        uploader_id=3
    )

    all_songs = [song1, song2, song3]
    add_songs = [db.session.add(song) for song in all_songs]
    db.session.commit()

def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(
            text('DELETE FROM songs')
        )
    db.session.commit()
