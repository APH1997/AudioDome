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
    },[dispatch])

    // if(Object.values(pageUser).length === 0){
    //     return(
    //         <div>Loading</div>
    //     )
    // }

    return (
        <div>
            {pageUser?.id == userId && <div>
                {pageUser?.firstName}{' '}{pageUser?.lastName}
            </div>
            }
            <div className="user-profile-pic">
                <img src={pageUser?.profileImage}/>
            </div>
            <div>
                {pageUser?.username}
            </div>
            <div>
                {pageUser?.bio}
            </div>


            <div>
                PLAYLIST
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
                modalComponent={<UserProileModal/>}
                />
            </div>}
        </div>
    )
}


export default UserPage
