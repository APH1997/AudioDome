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
        username='Demo User',
        first_name='Demoo',
        last_name='User',
        bio='Hello, I am the demo user',
        profile_image='',
        email='demoo@aa.io',
        password='password')
    Prince = User (
        username='Prince',
        first_name='Domenik',
        last_name='Moody',
        bio='Domenik Moody, aka Prince/Dom, is a gamer and music lover. He enjoys R&B, drawing, and was part of the team that built this site.',
        profile_image='https://audiodome-songs.s3.us-east-2.amazonaws.com/6e914103ce8248ef978db5cc493e6d00.jpg',
        email='Prince@aa.io',
        password='password')
    Francis = User (
        username='ReverseFades',
        first_name='Francis',
        last_name='Huynh',
        bio='',
        profile_image='',
        email='Francis@aa.io',
        password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(demoo)
    db.session.add(Prince)
    db.session.add(Francis)
    db.session.commit()

    return [demo, marnie, bobbie, demoo, Prince, Francis]


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
