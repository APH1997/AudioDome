from app.models import db, User, environment, SCHEMA, Song
from sqlalchemy.sql import text
from random import choice, sample, randint

def seed_songs(seeded_users):
    song1 = Song(
        title='Beat 140',
        artist='T-Pain',
        aws_url='https://audiodome-songs.s3.us-east-2.amazonaws.com/3f7003990c2f44ca9c9e5275e21afedc.mp3',
        uploader = seeded_users[0],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image ="https://audiodome-songs.s3.us-east-2.amazonaws.com/939637464ec44c48bb952f71909c3b45.jpeg"
    )
    song2 = Song(
        title='The Floor is Lava',
        artist='Jack Roybal',
        aws_url='https://audiodome-songs.s3.us-east-2.amazonaws.com/a48141dc79af400d9e2e8837071d05a8.mp3',
        uploader = seeded_users[1],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image ="https://audiodome-songs.s3.us-east-2.amazonaws.com/13f385f90ce74e72afd7e4338ef40a18.png"
    )
    song3 = Song(
        title='Sample',
        artist='Dom',
        aws_url='https://audiodome-songs.s3.us-east-2.amazonaws.com/d20c1dfd8246499c92689fa7af778411.mp3',
        uploader = seeded_users[2],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image ="https://audiodome-songs.s3.us-east-2.amazonaws.com/85d4da4f07fa45e9ae567d4d4738bfe1.jpg"
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
