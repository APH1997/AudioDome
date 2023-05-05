from app.models import db, Playlist, environment, SCHEMA
from sqlalchemy.sql import text

def seed_playlist(seeded_users, seeded_songs):
    Playlist1 = Playlist(
        user = seeded_users[0],
        name="Groove City",
        playlist_image="awsURLgoesHERE!!!!",
        playlist_songs = [seeded_songs[0], seeded_songs[1]]
    )
    Playlist2 = Playlist(
        user = seeded_users[1],
        name="Otaku Melodies",
        playlist_image="awsURLstillgoesHERE!!!!",
        playlist_songs =[seeded_songs[0], seeded_songs[2]]
    )
    Playlist3 = Playlist(
        user = seeded_users[2],
        name="Soulful Seduction",
        playlist_image="awsURLgoesHEREforsure!!!!",
        playlist_songs = [seeded_songs[1], seeded_songs[2]]
    )


    db.session.add(Playlist1)
    db.session.add(Playlist2)
    db.session.add(Playlist3)
    db.session.commit()

def undo_playlist():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM playlists"))

    db.session.commit()
