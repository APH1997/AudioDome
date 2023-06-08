import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import SongCard from "../SongCard"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import UserProileModal from "../EditUserModal"
import { BsThreeDots } from 'react-icons/bs'
import OpenModalButton from "../OpenModalButton"
import { useEffect } from "react"
import { getUserByIdThunk } from "../../store/session"
import './userpage.css'
import GetAllSongs from "../GetAllSongs"
import { playOneSongThunk } from "../../store/currentSong"

const UserPage = () => {
    const { userId } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const pageUser = useSelector(state => state.session.userPage)
    console.log(pageUser, 'pageuser');
    useEffect(() => {
        dispatch(getUserByIdThunk(userId))
    }, [dispatch])
    if (!pageUser) {
        return null
    }

    const handelClick = (song) => {
        dispatch(playOneSongThunk(song.id))
    }

    return (
        <div>
            {pageUser?.id == userId &&
                <div className="username">
                    {pageUser?.firstName}{' '}{pageUser?.lastName}
                </div>
            }
            <div className="banner">
                <div className="user-profile-pic">
                    <img src={pageUser?.profileImage === null ? "https://static1.squarespace.com/static/5898e29c725e25e7132d5a5a/58aa11bc9656ca13c4524c68/58aa11e99656ca13c45253e2/1487540713345/600x400-Image-Placeholder.jpg?format=original" : pageUser?.profileImage} />
                </div>
                <div className="username">
                    {pageUser?.bio === null ? "ADD A BIO  TO YOUR ACCOUNT !!!!!" : pageUser?.bio}
                </div>
            </div>
            <div className="username-button">
                <h1 className="username">
                    {pageUser?.username}
                    {user?.id == userId && <span className="user-profile-menu-dots">
                        <OpenModalButton
                            buttonText={<BsThreeDots />}
                            modalComponent={<UserProileModal />}
                        />
                    </span>}
                </h1>
            </div>
            <div className="username">
                <h3>
                    {pageUser?.playlists?.length === 0 ? 'CREATE SOME PLAYLISTS TO SPICE THINGS UP' : 'PLAYLISTS'}
                </h3>
            </div>

            <div className="playlist-area">
                {pageUser?.playlists.map(playlist => (
                    <div key={playlist.id} className="playlistCardContainer" onClick={(e) => history.push(`/playlist/${playlist.id}`)}>
                        <img className="playlistImg" src={playlist.playlistImage} />
                        <p id="playlistName">{playlist.name}</p>
                        <p id="playlistuserName">Playlist by: {playlist.creator}</p>
                    </div>
                ))}
            </div>
            <div className="uploaded-songs-area">
                <h3>YOUR UPLOADS</h3>
                <div className='all-songs-container'>
                    <table className='all-songs-container-headers'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Cover</th>
                                <th>Title</th>
                                <th>Artist</th>
                                <th colSpan={3}>Uploaded By</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pageUser.songs.map(song => (
                                <tr key={song?.id}>
                                    <td>{song?.id}</td>
                                    <td><img className='song-img' src={song.songImage} alt="Song Cover" /></td>
                                    <td>{song?.title}</td>
                                    <td>{song?.artist}</td>
                                    <td>{song?.uploader}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}


export default UserPage
