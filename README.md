# AudioDome
      
Buckle up, buckaroo, you're about to venture into the AUDIODOME


Check out [AudioDome](https://audiodome.onrender.com/)

## Index

[Database Scheme](https://github.com/APH1997/AudioDome/wiki/Database-Schema) |
[User Stories](https://github.com/APH1997/AudioDome/wiki/User-Stories) |

## Technologies Used

<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" /><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" /><img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" /><img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" /><img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" /><img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" /><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /><img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" /><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" /><img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" /><img src="https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=whit" />

## Splash Page
![Splash](https://github.com/APH1997/AudioDome/assets/117539908/087ec7e1-931b-4df8-bb3e-3c2b75e10231)

## Songs
![Songs](https://github.com/APH1997/AudioDome/assets/117539908/8affce15-d63a-40e9-8af6-1a957d36e42f)

## Playlists
![Playlist](https://github.com/APH1997/AudioDome/assets/117539908/3eabdd74-705b-45c5-86c6-935823a18522)


## Getting started
1. Clone this repository:

   `
   https://github.com/APH1997/AudioDome
   `
2. Install denpendencies into the Backed and the Frontend by making a terminal for each one and then run the following:

   * `pipenv install -r requirements.txt (for backend)`
   * `npm install (for frontend)`

3. Create a **.env** file using the **.envexample** provided 

4. Set up your database with information from your .env and then run the following to create your database, migrate, and seed: 
 
   * `pipenv run flask db migrate`
   * `pipenv run flask db upgrade` 
   * `pipenv run flask seed all`

5. Start the app for both backend and frontend using:

   * `pipenv run flask run(backend)`
   * `npm start(frontend)`

6. Now you can use the Demo User or Create an account

## Amazon Web Services S3
* For setting up your AWS refer to this [guide](https://github.com/jdrichardsappacad/aws-s3-pern-demo)

***

# Features 

## Songs
* Users can create a Songs
* Users can read/view other Songs
* Users can update their Songs
* Users can delete their Songs

## Playlists
* Users can create a Playlists
* Users can read/view other Playlists
* Users can update their Playlists with Songs
* Users can delete their Playlists
* Users can remove Songs from their Playlists

## Likes
Logged-in Users can
* Users can like songs
* Users can unlike songs

## AWS
Logged-in Users can
* Upload images of their Songs/Playlists to AWS S3
