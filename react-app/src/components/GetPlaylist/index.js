import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllPlaylistThunk } from "../../store/playlist";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import SignupFormModal from "../SignupFormModal";
import './playlist.css'
import { NavLink } from "react-router-dom";

function GetAllPlaylist() {
    const dispatch = useDispatch()
    const history = useHistory()
    const allPlaylistsObj = useSelector(state => state.playlist.allPlaylists)
    const allPlaylists = Object.values(allPlaylistsObj)
    console.log(allPlaylists);

    function handleUserPageRedirect(e){


    }


    useEffect(() => {
        dispatch(getAllPlaylistThunk())
    },[dispatch])

        return (
            <div className="containerforHomePage">
            {allPlaylists.map(playlist => (
                <div key={playlist.id} className="playlistCardContainer">
                    <img  onClick={(e) => history.push(`/playlist/${playlist.id}`)} className="playlistImg" src={playlist.playlistImage} />
                    <p  onClick={(e) => history.push(`/playlist/${playlist.id}`)} id="playlistName">{playlist.name}</p>
                    <p id="playlistuserName" onClick={(e) => history.push(`/users/${playlist.creator[1]}`)}>Playlist by: {playlist.creator[0]}</p>
                </div>

            ))}
        </div>
    )
}


export default GetAllPlaylist
