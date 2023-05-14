from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo',
        first_name='first One',
        last_name='Last One',
        bio='',
        profile_image='',
        email='demo@aa.io',
        password='password')
    marnie = User(
        username='marnie',
        first_name='first Two',
        last_name='Last Two',
        bio='',
        profile_image='',
        email='marnie@aa.io',
        password='password')
    bobbie = User(
        username='bobbie',
        first_name='first Three',
        last_name='Last Three',
        bio='',
        profile_image='',
        email='bobbie@aa.io',
        password='password')
    demoo = User(
        username='demoo',
        first_name='Demoo',
        last_name='User',
        bio='Hello, I am the demoo user',
        profile_image='',
        email='demoo@aa.io',
        password='password')
    Prince = User (
        username='Prince',
        first_name='Domenik',
        last_name='Moody',
        bio='Hello Im Domenik Moody, also known as Prince to his gamer friends and Dom to other friends, im a multi-talented individual with a passion for video games, music, and art. Born and raised in Norfolk, VA, I developed an early love for gaming, spending countless hours exploring virtual worlds and honing my skills in various game genres. Aside from gaming, Im also an avid music lover, with a particular affinity for R&B. He enjoys discovering new artists and tracks, and often creates playlists to match his moods and activities. When Im not playing video games or listening to music, I can be found sketching and drawing, with a talent for creating intricate designs and illustrations. In addition to my personal interests, im also a valuable member of the team that built the site this bio is on, contributing his skills and expertise to ensure the site is user-friendly and visually appealing. With his passion for gaming, music, and art, as well as his technical know-how, Im is a well-rounded and dynamic individual with a bright future ahead of me.',
        profile_image='https://audiodome-songs.s3.us-east-2.amazonaws.com/6e914103ce8248ef978db5cc493e6d00.jpg',
        email='Prince@aa.io',
        password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(demoo)
    db.session.add(Prince)
    db.session.commit()

    return [demo, marnie, bobbie, demoo, Prince]


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
