from app.models import db, Playlist, environment, SCHEMA
from sqlalchemy.sql import text

def seed_playlist():
    Playlist1 = Playlist(user_id=1, name="Groove City",playlist_image="awsURLgoesHERE!!!!" )
    Playlist2 = Playlist(user_id=2, name="Otaku Melodies",playlist_image="awsURLstillgoesHERE!!!!" )
    Playlist3 = Playlist(user_id=3, name="Soulful Seduction",playlist_image="awsURLgoesHEREforsure!!!!" )


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
