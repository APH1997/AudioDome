from app.models import db, Playlist, environment, SCHEMA
from sqlalchemy.sql import text

def seed_playlist(seeded_users, seeded_songs):
    Playlist1 = Playlist(
        user = seeded_users[0],
        name="Groove City",
        playlist_image="https://audiodome-songs.s3.us-east-2.amazonaws.com/41e16ec0a2e04b1180fbbc138ce271c1.jpg",
        playlist_songs = [seeded_songs[0], seeded_songs[1]]
    )
    Playlist2 = Playlist(
        user = seeded_users[1],
        name="Otaku Melodies",
        playlist_image="https://audiodome-songs.s3.us-east-2.amazonaws.com/b9ca3b21496847baba0ec14a607d4e1d.jpg",
        playlist_songs =[seeded_songs[0], seeded_songs[2]]
    )
    Playlist3 = Playlist(
        user = seeded_users[2],
        name="Soulful Seduction",
        playlist_image="https://audiodome-songs.s3.us-east-2.amazonaws.com/92a45d6305544259a8994be974a6e244.jpg",
        playlist_songs = [seeded_songs[1], seeded_songs[2]]
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


    db.session.add(Playlist1)
    db.session.add(Playlist2)
    db.session.add(Playlist3)
    db.session.add(Playlist4)
    db.session.add(Playlist5)
    db.session.add(Playlist6)
    db.session.commit()

def undo_playlist():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM playlists"))

    db.session.commit()
