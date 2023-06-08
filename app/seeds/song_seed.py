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
    song4 = Song(
        title='Un-Break My Heart',
        artist='Toni Braxton',
        aws_url='http://audiodome-songs.s3.amazonaws.com/a080f65873c3453d935217f8c6255d73.mp3',
        uploader = seeded_users[4],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image = "http://audiodome-songs.s3.amazonaws.com/adc3d4ebdcf84b188a5be09510d52353.jpg"
    )
    song5 = Song(
        title='Can We Talk',
        artist='Tevin Campbell',
        aws_url='http://audiodome-songs.s3.amazonaws.com/e4bb9cd54ad64927be43af611e17b86f.mp3',
        uploader = seeded_users[4],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image = "http://audiodome-songs.s3.amazonaws.com/5d9bc8bef11b4d9692c3012b8b8484cc.jpg"
    )
    song6 = Song(
        title='U Got It Bad',
        artist='Usher',
        aws_url='http://audiodome-songs.s3.amazonaws.com/291a01b7a41d4f2d93b05728eb08eab9.mp3',
        uploader = seeded_users[4],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image = 'http://audiodome-songs.s3.amazonaws.com/f16b0e52ef574b13a41a87302dba1878.jpg'
    )
    song7 = Song(
        title='Back at One',
        artist='Brian Mcknight',
        aws_url='http://audiodome-songs.s3.amazonaws.com/68f748db49324c2fa969e531e5d6287a.mp3',
        uploader = seeded_users[4],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image = 'http://audiodome-songs.s3.amazonaws.com/7be18f1fd0554bb3914af8ef1599ab9e.jpg'
    )
    song8 = Song(
        title='Ribbon in the Sky',
        artist='Stevie Wonder',
        aws_url='http://audiodome-songs.s3.amazonaws.com/fcb91935bb564b35b0ad6239e15b4199.mp3',
        uploader = seeded_users[4],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image = 'http://audiodome-songs.s3.amazonaws.com/880a3a824c384b9e8c2e615dd9af5006.jpg'
    )
    song9 = Song(
        title='Killing Me Softly With His Song',
        artist='Fugees',
        aws_url='http://audiodome-songs.s3.amazonaws.com/b42ed28c6a7d48f4a589d3acbd00f278.mp3',
        uploader = seeded_users[4],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image = 'http://audiodome-songs.s3.amazonaws.com/3becc57df7a0479daa9c30f9acadb76d.jpg'
    )
    song10 = Song(
        title='Diary',
        artist='Alicia Keys',
        aws_url='http://audiodome-songs.s3.amazonaws.com/a584eb993b494264be57b9d3f449fc75.mp3',
        uploader = seeded_users[4],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image = 'http://audiodome-songs.s3.amazonaws.com/747e3c6d66214718a71468818d64bc8a.jpg'
    )
    song11 = Song(
        title='If I ever Fall In Love (original Acappella Edit)',
        artist='Shai',
        aws_url='http://audiodome-songs.s3.amazonaws.com/f31ba0ec58b4471caf3595a0d7b9266f.mp3',
        uploader = seeded_users[4],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image = 'http://audiodome-songs.s3.amazonaws.com/cab69e6dd4954973b0ada5489011f06f.jpg'
    )
    song12 = Song(
        title='A Long Walk',
        artist='Jill Scott',
        aws_url='http://audiodome-songs.s3.amazonaws.com/2c8580152fb14337a883530dab1a5a75.mp3',
        uploader = seeded_users[4],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image = 'http://audiodome-songs.s3.amazonaws.com/09ae07f97dda46f1b5141bfbd966acc8.jpg'
    )
    song13 = Song(
        title='Roni',
        artist='Bobby Brown',
        aws_url='http://audiodome-songs.s3.amazonaws.com/a348f3e88dfa4e57990aa82a338bac02.mp3',
        uploader = seeded_users[4],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image = 'http://audiodome-songs.s3.amazonaws.com/db82823b901644128cdb55e4c2b69037.jpg'
    )
    song14 = Song(
        title='The closer I get to You ',
        artist='Luther Vandross feat. Beyonce Knowles',
        aws_url='http://audiodome-songs.s3.amazonaws.com/b2491b4281bc4027b6fd20041dec13f5.mp3',
        uploader = seeded_users[4],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image = 'http://audiodome-songs.s3.amazonaws.com/4f5838150ded40f18f61ccafd9fbdb66.jpg'
    )
    song15 = Song(
        title='Sexual Healing',
        artist='Marvin Gaye',
        aws_url='http://audiodome-songs.s3.amazonaws.com/0f7d1ca92bdd43f28728eca138fd717f.mp3',
        uploader = seeded_users[4],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image = 'http://audiodome-songs.s3.amazonaws.com/ff7908b286464220942657dfc09c6abd.jpg'
    )
    song16 = Song(
        title='Love T.K.O',
        artist='Teddy Pendergrass',
        aws_url='http://audiodome-songs.s3.amazonaws.com/9ee4cb46510d4167a336850710997133.mp3',
        uploader = seeded_users[4],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image = 'http://audiodome-songs.s3.amazonaws.com/5cba78c80ff346b6b131f638763505c4.jpg'
    )
    song17 = Song(
        title='Lets Stay Together',
        artist='Al Green',
        aws_url='http://audiodome-songs.s3.amazonaws.com/3025534ec1864f7ab6bfea70efdd72a3.mp3',
        uploader = seeded_users[4],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image = 'http://audiodome-songs.s3.amazonaws.com/b7c86a780b6e404a91b3e29934b4168d.jpg'
    )
    song18 = Song(
        title='If You Think Youre Lonely Now',
        artist='Bobby  Womack',
        aws_url='http://audiodome-songs.s3.amazonaws.com/75d5159967dc487ea98c755132860a66.mp3',
        uploader = seeded_users[4],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image = 'http://audiodome-songs.s3.amazonaws.com/a632a954d0db44088674d2dde36bf95d.jpg'
    )
    song19 = Song(
        title='Superstition',
        artist='Stevie Wonder',
        aws_url='http://audiodome-songs.s3.amazonaws.com/480faf06e6f24c0da1626a1db875b155.mp3',
        uploader = seeded_users[4],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image = 'http://audiodome-songs.s3.amazonaws.com/e8f186ea772c4135ab30f00693a88448.jpg'
    )
    song20 = Song(
        title='Close the Door',
        artist='Teddy Pendergrass',
        aws_url='http://audiodome-songs.s3.amazonaws.com/04757a0bba404c3a86df37bd206ace8f.mp3',
        uploader = seeded_users[4],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image = 'http://audiodome-songs.s3.amazonaws.com/56ed639c140c4f22959d8842fa8972ee.jpg'
    )
    song21 = Song(
        title='Sweet Thing',
        artist='Rufus & Chaka Khan',
        aws_url='http://audiodome-songs.s3.amazonaws.com/2cce44077f96442ab19cdfbe36dfd097.mp3',
        uploader = seeded_users[4],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image = 'http://audiodome-songs.s3.amazonaws.com/fee9777960ad42f78d6ccbd927c0d04d.jpg'
    )
    song22 = Song(
        title='Before I Let Go',
        artist='Frankie Beverly And Maze',
        aws_url='http://audiodome-songs.s3.amazonaws.com/d279973312ef43608b11f5b78559d13d.mp3',
        uploader = seeded_users[4],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image = 'http://audiodome-songs.s3.amazonaws.com/0e15a72d5a8f4e26af8bf1ea079669f0.jpg'
    )
    song23 = Song(
        title='ButterFlies',
        artist='Michael Jackson ',
        aws_url='http://audiodome-songs.s3.amazonaws.com/b0ace0129f9a48b5991fe71e7b3a053a.mp3',
        uploader = seeded_users[4],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image = 'http://audiodome-songs.s3.amazonaws.com/2dff5637d3eb4d51bdd554a53ab5e6f5.jpg'
    )
    song24 = Song(
        title='Smooth Operator',
        artist='Sade',
        aws_url='http://audiodome-songs.s3.amazonaws.com/b368ab6a1b3843058b2722e766c8c361.mp3',
        uploader = seeded_users[4],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image = 'http://audiodome-songs.s3.amazonaws.com/6069cf89d369412682511285feb474d1.jpg'
    )
    song25 = Song(
        title='No Ordinary Love',
        artist='Sade',
        aws_url='http://audiodome-songs.s3.amazonaws.com/955e461a79d646f39506486604f47697.mp3',
        uploader = seeded_users[4],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image = 'http://audiodome-songs.s3.amazonaws.com/17c8069c29564588b9e9f4cfdaf6d77e.jpg'
    )
    song26 = Song(
        title='Tyrone ',
        artist='Erykah Badu',
        aws_url='http://audiodome-songs.s3.amazonaws.com/fe412ba3e0d04ffe9d55b682e740cb2a.mp3',
        uploader = seeded_users[4],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image = 'http://audiodome-songs.s3.amazonaws.com/a97f4d6e48b64b909b118ec3714f41a3.jpg'
    )
    song27 = Song(
        title='Im Goin Down',
        artist='Mary J. Blige',
        aws_url='http://audiodome-songs.s3.amazonaws.com/bb78a548560d4039a9063d62c1e9127d.mp3',
        uploader = seeded_users[4],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image = 'http://audiodome-songs.s3.amazonaws.com/bc4213c2a46a490aa9bad3f806e410e9.jpg'
    )
    song28 = Song(
        title='Computer Love',
        artist='Zapp & Roger',
        aws_url='http://audiodome-songs.s3.amazonaws.com/39890114d53a48c093ffe9003e91b068.mp3',
        uploader = seeded_users[4],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image = 'http://audiodome-songs.s3.amazonaws.com/65cc33ba0c574d93a49509fbbdee0741.jpg'
    )
    song29 = Song(
        title='I Will Always Love You ',
        artist='Whitney Houston',
        aws_url='http://audiodome-songs.s3.amazonaws.com/e4cf42f01678439095df8d73c95f0945.mp3',
        uploader = seeded_users[4],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image = 'http://audiodome-songs.s3.amazonaws.com/a67332ae8cd84caaa8baf3a23b8fcf62.jpg'
    )
    song30 = Song(
        title='You Give Good Love',
        artist='Whitney Houston',
        aws_url='http://audiodome-songs.s3.amazonaws.com/6f4649a404424318b6634a4e1a66c026.mp3',
        uploader = seeded_users[4],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image = 'http://audiodome-songs.s3.amazonaws.com/5b3608a1d9c141c48d5079f9ac962d89.jpg'
    )
    song31 = Song(
        title='Cowboy Bebop Tank!',
        artist='Seatbelts',
        aws_url='http://audiodome-songs.s3.amazonaws.com/b1784a5880e64649a07186d8ccb7868e.mp3',
        uploader = seeded_users[4],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image = 'http://audiodome-songs.s3.amazonaws.com/3b6fbfd26214414cae646fb8c4c3c06e.jpg'
    )
    song32 = Song(
        title='GoodMorning World',
        artist='Burnout Syndromes',
        aws_url='http://audiodome-songs.s3.amazonaws.com/afe8695587344d5cb158dc3cd0c6986f.mp3',
        uploader = seeded_users[4],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image = 'http://audiodome-songs.s3.amazonaws.com/9f590c64481c453fa7da33826f979cb7.jpg'
    )
    song33 = Song(
        title='KaiKai Kitan',
        artist='Eve',
        aws_url='http://audiodome-songs.s3.amazonaws.com/4deaa87ffba7480cb2828fac0a8d97de.mp3',
        uploader = seeded_users[4],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image = 'http://audiodome-songs.s3.amazonaws.com/00ce486aed82436592a96a6ae1d7435e.jpg'
    )
    song34 = Song(
        title='Lost in Paradise fear AKLO',
        artist='Ali',
        aws_url='http://audiodome-songs.s3.amazonaws.com/87f245267aa1486f94361461f7506749.mp3',
        uploader = seeded_users[4],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image = 'http://audiodome-songs.s3.amazonaws.com/b74008f4e935429ab1df01087e286d7c.jpg'
    )
    song35 = Song(
        title='Through The Night',
        artist='Arimachi Masahiko',
        aws_url='http://audiodome-songs.s3.amazonaws.com/af7f607fa73341f0b4e7c2a3e021bc38.mp3',
        uploader = seeded_users[4],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image = 'http://audiodome-songs.s3.amazonaws.com/c2f50a9d15e44dcc8b4cba3e4c474bc9.jpg'
    )
    song36 = Song(
        title='BattleCry',
        artist='Nujabes',
        aws_url='http://audiodome-songs.s3.amazonaws.com/c4e9220e78694dde9d4433e5c2e361e8.mp3',
        uploader = seeded_users[4],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image = 'http://audiodome-songs.s3.amazonaws.com/74ce799fb75548b2813b53f0d8aff8c2.jpg'
    )
    song37 = Song(
        title='Cruel Angel Thesis',
        artist='Yoko Takahashi',
        aws_url='http://audiodome-songs.s3.amazonaws.com/05e49561432448f39aa30135401614c4.mp3',
        uploader = seeded_users[4],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image = 'http://audiodome-songs.s3.amazonaws.com/542329afcfdf42c8b8f66c80daa17082.jpg'
    )
    song38 = Song(
        title='Unravel',
        artist='Per Fredrik Asly',
        aws_url='http://audiodome-songs.s3.amazonaws.com/e3fca9a72d37418dbd58bb214ba1d4cb.mp3',
        uploader = seeded_users[4],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image = 'http://audiodome-songs.s3.amazonaws.com/7b1911e797e44914838cb3d3df0d72ff.jpg'
    )
    song39 = Song(
        title='advent: One-Winged Angel',
        artist='Nobuo Uematsu',
        aws_url='http://audiodome-songs.s3.amazonaws.com/7431d085d3f44286a3c3f1946dbf1193.mp3',
        uploader = seeded_users[4],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image = 'http://audiodome-songs.s3.amazonaws.com/6f5dd132fbfe4bb88e20286c5fdda865.jpg'
    )
    song40 = Song(
        title='Mixed Nuts',
        artist='Hige Dandism',
        aws_url='http://audiodome-songs.s3.amazonaws.com/65839f23f0ab4989ad80708158b061c5.mp3',
        uploader = seeded_users[4],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image = 'http://audiodome-songs.s3.amazonaws.com/326f0114bab74330a3a0c01c30b53ee7.jpg'
    )
    song41 = Song(
        title='Be Your Girl (Kaytranada Edition)',
        artist='Teedra Moses',
        aws_url='http://audiodome-songs.s3.amazonaws.com/dc0edda1041b4757bc67eb0bb48cb07e.mp3',
        uploader = seeded_users[4],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image = 'http://audiodome-songs.s3.amazonaws.com/5ac1fd48d2e84e87a1e503e893d5fae9.jpg'
    )
    song42 = Song(
        title='Am I wrong(feat. ScHoolboy Q)',
        artist='Anderson Paak',
        aws_url='http://audiodome-songs.s3.amazonaws.com/be4304ac5b8b4e4a8598648446b16657.mp3',
        uploader = seeded_users[4],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image = 'http://audiodome-songs.s3.amazonaws.com/ce21689c8259429caa9277f19a5845c5.jpg'
    )
    song43 = Song(
        title='From the Back',
        artist='Pat Lok & Party Pupils',
        aws_url='http://audiodome-songs.s3.amazonaws.com/ac8a6237ab43474a9659ea26aef2b7fe.mp3',
        uploader = seeded_users[4],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image = 'http://audiodome-songs.s3.amazonaws.com/7b9e9fdc58d445d2a0107a23369128aa.jpg'
    )
    song44 = Song(
        title='My High',
        artist='Disclosure, Amine, slowthai',
        aws_url='http://audiodome-songs.s3.amazonaws.com/8baa78ef20ce40f08be5c977b3e32acb.mp3',
        uploader = seeded_users[4],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image = 'http://audiodome-songs.s3.amazonaws.com/85e3a4b61bcd4d69b3d39e137614ef3a.jpg'
    )
    song45= Song(
        title='kanaria',
        artist='Kanaria',
        aws_url='http://audiodome-songs.s3.amazonaws.com/18b4ece64f18475787fe7c306573a4a7.mp3',
        uploader = seeded_users[3],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image ="http://audiodome-songs.s3.amazonaws.com/0bc63f85407d4f848a524edaa7819e06.jpeg"
    )
    song46 = Song(
        title='Backlight',
        artist='Uta',
        aws_url='http://audiodome-songs.s3.amazonaws.com/a8b035239edc4b24acd1233a3382171c.mp3',
        uploader = seeded_users[3],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image ="http://audiodome-songs.s3.amazonaws.com/42948d623dc5495190e8464eb995356a.jpeg"
    )
    song47 = Song(
        title='Spicy',
        artist='Aespa',
        aws_url='http://audiodome-songs.s3.amazonaws.com/82c7636a75e645389c2c3ebaad61135e.mp3',
        uploader = seeded_users[2],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image ="http://audiodome-songs.s3.amazonaws.com/1ad2a70897c544898d08af140d9dc373.jpeg"
    )
    song48 = Song(
        title='KURURURURURIN',
        artist='KRURURURUURR',
        aws_url='http://audiodome-songs.s3.amazonaws.com/bd27ea5a74d4400b8edd90be59ee2dc8.mp3',
        uploader = seeded_users[0],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image ="http://audiodome-songs.s3.amazonaws.com/9f26e778c519466bba6c448a6dec2fae.jpeg"
    )
    song49 = Song(
        title='OMG',
        artist='NewJeans',
        aws_url='http://audiodome-songs.s3.amazonaws.com/e77880be963145a798117340525a1414.mp3',
        uploader = seeded_users[1],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image ="http://audiodome-songs.s3.amazonaws.com/58e1025317b048859c3e21f9581577da.jpg"
    )
    song50 = Song(
        title='Wannabe',
        artist='Itzy',
        aws_url='http://audiodome-songs.s3.amazonaws.com/41a97cc7086c416ea5e9b9a6360e3e2b.mp3',
        uploader = seeded_users[2],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image ="http://audiodome-songs.s3.amazonaws.com/4aa03b14d85c4ff690478b9ade517075.jpeg"
    )
    song51 = Song(
        title="Mulan - I'll Make A Man Out Of You",
        artist='Donny Osmond',
        aws_url='http://audiodome-songs.s3.amazonaws.com/6a0bbe6a70f14fcdb2ede1b91a947c8b.mp3',
        uploader = seeded_users[5],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image ="http://audiodome-songs.s3.amazonaws.com/b2b0b58c58a64a9784cc53a1a5b58e80.jpeg"
    )
    song52 = Song(
        title="Aladdin - Prince Ali",
        artist='Will Smith',
        aws_url='http://audiodome-songs.s3.amazonaws.com/2985ddfd552b4f07b6bde980dd3a9f97.mp3',
        uploader = seeded_users[5],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image ="http://audiodome-songs.s3.amazonaws.com/5e666d827ced411fad49f98a801aaced.png"
    )
    song53 = Song(
        title="Lion King - Hakuna Matata",
        artist='Timon and Pumbaa Ft. Simba',
        aws_url='http://audiodome-songs.s3.amazonaws.com/62b3ca5df6334b8f8c9289482095bb92.mp3',
        uploader = seeded_users[5],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image ="http://audiodome-songs.s3.amazonaws.com/d247d15dccf64d52b81fe7514600c2c5.jpg"
    )
    song54 = Song(
        title="Initial D - Forever Young",
        artist='Bob Dylan',
        aws_url='http://audiodome-songs.s3.amazonaws.com/6871de8cfbef4457b83b568859874c1d.mp3',
        uploader = seeded_users[5],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image ="http://audiodome-songs.s3.amazonaws.com/6c6fe03190b241b5839bb1c0ea776ea5.png"
    )
    song55 = Song(
        title="Initial D - Rage Your Dream",
        artist='Move',
        aws_url='http://audiodome-songs.s3.amazonaws.com/a6bb4c412cb74e69a6e7e480fa5b6754.mp3',
        uploader = seeded_users[5],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image ="http://audiodome-songs.s3.amazonaws.com/6c6fe03190b241b5839bb1c0ea776ea5.png"
    )
    song56 = Song(
        title="Initial D - Night of Fire",
        artist='Niko',
        aws_url='http://audiodome-songs.s3.amazonaws.com/829e6cdbc2dc407c84c666eefe5a334c.mp3',
        uploader = seeded_users[5],
        song_likes = sample(seeded_users, randint(0, len(seeded_users))),
        song_image ="http://audiodome-songs.s3.amazonaws.com/6c6fe03190b241b5839bb1c0ea776ea5.png"
    )


    all_songs = [song1, song2, song3, song4, song5, song6, song7, song8, song9, song10, song11, song12, song13, song14, song15, song16, song17, song18, song19, song20, song21, song22, song23, song24, song25, song26, song27, song28, song29, song30, song31, song32, song33, song34, song35, song36, song37, song38, song39, song40, song41, song42, song43, song44, song45, song46, song47, song48, song49, song50, song51, song52, song53, song54, song55, song56]
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
