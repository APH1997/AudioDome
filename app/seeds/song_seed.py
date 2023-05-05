from app.models import db, User, environment, SCHEMA, Song
from sqlalchemy.sql import text
from random import choice, sample, randint

def seed_songs(seeded_users):
    song1 = Song(
        title='Song One',
        artist='Song Artist One',
        aws_url='Amazon One',
        uploader = seeded_users[0],
        song_likes = sample(seeded_users, randint(0, len(seeded_users)))
    )
    song2 = Song(
        title='Song Two',
        artist='Song Artist Two',
        aws_url='Amazon Two',
        uploader = seeded_users[1],
        song_likes = sample(seeded_users, randint(0, len(seeded_users)))
    )
    song3 = Song(
        title='Song Three',
        artist='Song Artist Three',
        aws_url='Amazon Three',
        uploader = seeded_users[2],
        song_likes = sample(seeded_users, randint(0, len(seeded_users)))
    )

    all_songs = [song1, song2, song3]
    add_songs = [db.session.add(song) for song in all_songs]
    db.session.commit()

    return all_songs

def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(
            text('DELETE FROM songs')
        )
    db.session.commit()
