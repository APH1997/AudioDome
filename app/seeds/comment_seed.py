from app.models import db, PlaylistComments, environment, SCHEMA
from sqlalchemy.sql import text
from random import choice

def seed_comments(users, playlists):
    generic_comments = [
        "WOW!!",
        "This shmacks",
        "mid",
        "These tracks make me want to dance like nobody's watching. Pure joy!",
        "Loving the rhythm and melody of this playlist. It's addictive.",
        "Each song on this playlist is like a breath of fresh air. Beautiful and soothing.",
        "This playlist makes my morning commute enjoyable. Thanks for the good vibes.",
        "Can't resist singing along to these songs. They're so catchy!",
        "This playlist showcases the best of different genres. Love the diversity.",
        "These songs transport me to another world. Pure escapism.",
        "This playlist has a great balance of upbeat and mellow tracks. Perfect for any mood.",
        "Loving the selection of artists on this playlist. Such talent!",
        "These songs hit me right in the feels. Emotional and powerful.",
        "This playlist is on repeat mode. Can't tire of these amazing tunes.",
        "These tracks are like therapy for the soul. Instant relaxation.",
        "Loving the vibes of this playlist. Perfect for a lazy Sunday.",
        "Each song on this playlist has its own magic. Captivating and enchanting.",
        "This playlist is my source of inspiration. Gets my creative juices flowing.",
        "Can't help but sing my heart out to these songs. They're infectious!",
        "This playlist is a treasure trove of musical gems. Thank you for sharing your favorites.",
        "Loving the eclectic mix of songs on this playlist. It's like a musical adventure.",
        "These tunes bring back memories of carefree days. Nostalgic and wonderful.",
        "This playlist is a work of art. It deserves all the appreciation.",
        "Can't resist swaying to the rhythm of these songs. Pure bliss!",
        "This playlist has the perfect blend of upbeat and chill tracks. Great for any occasion.",
        "These songs have the power to uplift my mood instantly. Thank you for the positive vibes.",
        "Loving the diversity in this playlist. From rock to pop to jazz, it has it all.",
        "This playlist has introduced me to new artists and genres. Broadening my musical horizons.",
        "Can't help but smile while listening to these songs. They bring so much joy.",
        "This playlist is like a time machine. Takes me back to the good old days.",
        "These tracks make me want to hit the dance floor. They're so infectious!",
        "Loving the combination of old classics and modern hits on this playlist.",
        "This playlist has a perfect balance of fast-paced and slow songs. Keeps things interesting.",
        "Can't resist singing along to every track. These songs have become my favorites.",
        "This playlist has a magical charm. It transports me to another world.",
        "These tunes are perfect for a relaxing evening at home. Helps me unwind.",
        "Loving the energy and passion in these songs. They're full of life.",
        "This playlist has a song for every mood and occasion. It's my musical companion.",
        "These tracks make me want to turn up the volume and let loose. So much fun!",
        "This playlist is a true masterpiece. Each song flows seamlessly into the next.",
        "Can't help but get lost in the melodies of these songs. They're captivating.",
        "Loving the lyrics of these tracks. They resonate with me on a deep level.",
        "This playlist is my sanctuary. It provides solace in both good and bad times.",
        "These songs are like a burst of sunshine. They brighten up my day.",
        "This playlist has the perfect mix of old favorites and new discoveries. Keeps things fresh.",
        "Can't resist tapping my feet and nodding my head to these beats. They're infectious!",
        "Loving the diversity in this playlist. It celebrates music from all around the world.",
        "These tracks make me want to grab a guitar and start jamming. They're so inspiring.",
        "This playlist has the power to bring people together. Music knows no boundaries.",
        "Can't help but get lost in the melodies and harmonies of these songs. They're mesmerizing.",
        "This playlist is my escape from reality. It allows me to get lost in the music.",
        "These tunes are perfect for a romantic evening. Sets the mood just right.",
        "This playlist is a hidden gem. So glad I discovered it.",
    ]

    all_comments = [PlaylistComments(
        user = choice(users),
        playlist = choice(playlists),
        content = comment
    ) for comment in generic_comments]

    add = [db.session.add(comment) for comment in all_comments]

    db.session.commit()


def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
