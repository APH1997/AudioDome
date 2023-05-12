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

const UserPage = () => {
    const { userId } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const pageUser = useSelector(state => state.session.userPage)
    console.log(pageUser);

    useEffect(() => {
        dispatch(getUserByIdThunk(userId))
    }, [dispatch])

    // if(Object.values(pageUser).length === 0){
    //     return(
    //         <div>Loading</div>
    //     )
    // }

    return (
        <div>
            {pageUser?.id == userId &&
                <div className="user-name">
                    {pageUser?.firstName}{' '}{pageUser?.lastName}
                </div>
            }
            <div className="user-profile-pic">
                <img src={pageUser?.profileImage === null ? "https://static1.squarespace.com/static/5898e29c725e25e7132d5a5a/58aa11bc9656ca13c4524c68/58aa11e99656ca13c45253e2/1487540713345/600x400-Image-Placeholder.jpg?format=original" : pageUser?.profileImage} />
            </div>
            <div>
                <h1 className="username">
                    {pageUser?.username}
                </h1>
            </div>
            <div>
                {pageUser?.bio === null ? "ADD A BIO  TO YOUR ACCOUNT !!!!!" : pageUser?.bio}
            </div>

            <div>
                {pageUser?.playlist === null ? 'ADD SOME PLAYLIST TO YOUR ACCOUNT TO SPICE IT UP' : 'PLAYLIST'}
                {pageUser?.playlists.map(playlist => (
                    <div key={playlist.id} className="playlistCardContainer" onClick={(e) => history.push(`/playlist/${playlist.id}`)}>
                        <img className="playlistImg" src={playlist.playlistImage} />
                        <p id="playlistName">{playlist.name}</p>
                        <p id="playlistuserName">Playlist by: {playlist.creator}</p>
                    </div>
                ))}
            </div>
            {user?.id == userId && <div className="user-profile-menu-dots">
                <OpenModalButton
                    buttonText={<BsThreeDots />}
                    modalComponent={<UserProileModal />}
                />
            </div>}
        </div>
    )
}


export default UserPage
