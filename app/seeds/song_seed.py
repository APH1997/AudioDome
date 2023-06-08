from app.models import db, User, environment, SCHEMA, Song
from sqlalchemy.sql import text
from random import choice, sample, randint

def seed_songs(seeded_users):
    song1 = Song(
        title='kanaria',
        artist='Kanaria',
        aws_url='http://audiodome-songs.s3.amazonaws.com/18b4ece64f18475787fe7c306573a4a7.mp3',
        uploader = seeded_users[3],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image ="http://audiodome-songs.s3.amazonaws.com/0bc63f85407d4f848a524edaa7819e06.jpeg"
    )
    song2 = Song(
        title='Backlight',
        artist='Uta',
        aws_url='http://audiodome-songs.s3.amazonaws.com/a8b035239edc4b24acd1233a3382171c.mp3',
        uploader = seeded_users[3],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image ="http://audiodome-songs.s3.amazonaws.com/42948d623dc5495190e8464eb995356a.jpeg"
    )
    song3 = Song(
        title='Spicy',
        artist='Aespa',
        aws_url='http://audiodome-songs.s3.amazonaws.com/82c7636a75e645389c2c3ebaad61135e.mp3',
        uploader = seeded_users[2],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),   
        song_image ="http://audiodome-songs.s3.amazonaws.com/1ad2a70897c544898d08af140d9dc373.jpeg"
    )
    song1 = Song(
        title='KURURURURURIN',
        artist='KRURURURUURR',
        aws_url='http://audiodome-songs.s3.amazonaws.com/bd27ea5a74d4400b8edd90be59ee2dc8.mp3',
        uploader = seeded_users[0],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image ="http://audiodome-songs.s3.amazonaws.com/9f26e778c519466bba6c448a6dec2fae.jpeg"
    )
    song2 = Song(
        title='OMG',
        artist='NewJeans',
        aws_url='http://audiodome-songs.s3.amazonaws.com/e77880be963145a798117340525a1414.mp3',
        uploader = seeded_users[1],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image ="http://audiodome-songs.s3.amazonaws.com/58e1025317b048859c3e21f9581577da.jpg"
    )
    song3 = Song(
        title='Wannabe',
        artist='Itzy',
        aws_url='http://audiodome-songs.s3.amazonaws.com/41a97cc7086c416ea5e9b9a6360e3e2b.mp3',
        uploader = seeded_users[2],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image ="http://audiodome-songs.s3.amazonaws.com/4aa03b14d85c4ff690478b9ade517075.jpeg"
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
