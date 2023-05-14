from app.models import db, Playlist, environment, SCHEMA
from sqlalchemy.sql import text
from random import randint, sample, choice

def seed_playlist(seeded_users, seeded_songs):

    random_playlist_img = ["http://audiodome-songs.s3.amazonaws.com/33938413b56b4d9ca1be814fd3b3d906.jpg", "http://audiodome-songs.s3.amazonaws.com/9de87b09993648498937f8e1c6ccd1fe.jpg", "http://audiodome-songs.s3.amazonaws.com/60c77dde8e8f4699be314c9b2845681f.jpg", "http://audiodome-songs.s3.amazonaws.com/152d4801a81a4bfb870b12bee63b75c5.jpg", "http://audiodome-songs.s3.amazonaws.com/6bd28fa93d6747afb8f2e8340a83862d.jpg", "http://audiodome-songs.s3.amazonaws.com/32c3f02cecbc445f8c667310705eed9a.jpg", "http://audiodome-songs.s3.amazonaws.com/ad20d705d51f4f76b44032c746e374e9.jpg", "http://audiodome-songs.s3.amazonaws.com/25e050a19090485fb415a1258117e176.jpg", "http://audiodome-songs.s3.amazonaws.com/c5ef88ac42244d8aad7d1395029204a8.jpg"]

    Playlist1 = Playlist(
        user = seeded_users[0],
        name="Groove City",
        playlist_image="https://audiodome-songs.s3.us-east-2.amazonaws.com/41e16ec0a2e04b1180fbbc138ce271c1.jpg",
        playlist_songs = sample(seeded_songs, randint(0, len(seeded_songs)//2))
    )
    Playlist2 = Playlist(
        user = seeded_users[1],
        name="Otaku Melodies",
        playlist_image="https://audiodome-songs.s3.us-east-2.amazonaws.com/b9ca3b21496847baba0ec14a607d4e1d.jpg",
        playlist_songs = sample(seeded_songs, randint(0, len(seeded_songs)//2))
    )
    Playlist3 = Playlist(
        user = seeded_users[2],
        name="Soulful Seduction",
        playlist_image="https://audiodome-songs.s3.us-east-2.amazonaws.com/92a45d6305544259a8994be974a6e244.jpg",
        playlist_songs = sample(seeded_songs, randint(0, len(seeded_songs)//2))
    )
    Playlist4 = Playlist(
        user = seeded_users[4],
        name="Rnb Soul Smashes",
        playlist_image="http://audiodome-songs.s3.amazonaws.com/8a72efce3144447687c40cbaae2a3bbc.jpg",
        playlist_songs = [seeded_songs[3], seeded_songs[4], seeded_songs[5], seeded_songs[6],seeded_songs[7],seeded_songs[8],seeded_songs[9],seeded_songs[10],seeded_songs[11],seeded_songs[12],seeded_songs[13],seeded_songs[14],seeded_songs[15],seeded_songs[16],seeded_songs[17],seeded_songs[18],seeded_songs[19],seeded_songs[20],seeded_songs[21],seeded_songs[22],seeded_songs[23],seeded_songs[24],seeded_songs[25],seeded_songs[26],seeded_songs[27],seeded_songs[28],seeded_songs[29]]
    )
    Playlist5 = Playlist(
        user = seeded_users[4],
        name="Anime Bops",
        playlist_image="http://audiodome-songs.s3.amazonaws.com/c2a5509eedc54b309216f4a8f033a2dc.jpg",
        playlist_songs = [seeded_songs[30], seeded_songs[31], seeded_songs[32], seeded_songs[33],seeded_songs[34],seeded_songs[35],seeded_songs[36],seeded_songs[37],seeded_songs[38],seeded_songs[39]]
    )
    Playlist6 = Playlist(
        user = seeded_users[4],
        name="The Roof is on Fire",
        playlist_image="http://audiodome-songs.s3.amazonaws.com/f2a2a7398059443b9dd8f81031b83dc6.jpg",
        playlist_songs = [seeded_songs[40],seeded_songs[41],seeded_songs[42],seeded_songs[43]]
    )
    Playlist7 = Playlist(
        user = seeded_users[5],
        name="TrillDaBeast",
        playlist_image=choice(random_playlist_img),
        playlist_songs = sample(seeded_songs, randint(0, len(seeded_songs)))
    )
    Playlist8 = Playlist(
        user = seeded_users[5],
        name="Mellow Bebops",
        playlist_image=choice(random_playlist_img),
        playlist_songs = sample(seeded_songs, randint(0, len(seeded_songs)))
    )
    Playlist9 = Playlist(
        user = choice(seeded_users),
        name="Bebop Beats",
        playlist_image=choice(random_playlist_img),
        playlist_songs = sample(seeded_songs, randint(0, len(seeded_songs)))
    )
    Playlist10 = Playlist(
        user = choice(seeded_users),
        name="Sonic Lagoon",
        playlist_image=choice(random_playlist_img),
        playlist_songs = sample(seeded_songs, randint(0, len(seeded_songs)))
    )
    Playlist11 = Playlist(
        user = choice(seeded_users),
        name="Drive Fast Music",
        playlist_image=choice(random_playlist_img),
        playlist_songs = sample(seeded_songs, randint(0, len(seeded_songs)))
    )
    Playlist12 = Playlist(
        user = choice(seeded_users),
        name="I can't pause it mom, it's ONLINE",
        playlist_image=choice(random_playlist_img),
        playlist_songs = sample(seeded_songs, randint(0, len(seeded_songs)))
    )
    Playlist13 = Playlist(
        user = choice(seeded_users),
        name="Bo's BoomBox",
        playlist_image=choice(random_playlist_img),
        playlist_songs = sample(seeded_songs, randint(0, len(seeded_songs)))
    )


    db.session.add(Playlist1)
    db.session.add(Playlist2)
    db.session.add(Playlist3)
    db.session.add(Playlist4)
    db.session.add(Playlist5)
    db.session.add(Playlist6)
    db.session.add(Playlist7)
    db.session.add(Playlist8)
    db.session.add(Playlist9)
    db.session.add(Playlist10)
    db.session.add(Playlist11)
    db.session.add(Playlist12)
    db.session.add(Playlist13)
    db.session.commit()

def undo_playlist():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM playlists"))

    db.session.commit()
