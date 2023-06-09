import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllPlaylistThunk } from "../../store/playlist";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import SignupFormModal from "../SignupFormModal";
import './playlist.css'

function GetAllPlaylist() {
    const dispatch = useDispatch()
    const history = useHistory()
    const allPlaylistsObj = useSelector(state => state.playlist.allPlaylists)
    const allPlaylists = Object.values(allPlaylistsObj)
    

    useEffect(() => {
        dispatch(getAllPlaylistThunk())
    }, [dispatch])

    return (
        <div className="wholepageplaylist">
            <h1>PLAYLIST ARCHIVE</h1>
        <div className="containerforHomePage">
            {allPlaylists.map(playlist => (
                <div key={playlist.id} className="playlistCardContainer" onClick={(e) => history.push(`/playlist/${playlist.id}`)}>
                    <img className="playlistImg" src={playlist.playlistImage} />
                    <div className="playlistCardText">
                        <p id="playlistName">{playlist.name}</p>
                        <p id="playlistuserName">Playlist by: {playlist.creator}</p>
                    </div>
                </div>
            ))}
        </div>
        </div>
    )
}


export default GetAllPlaylist
