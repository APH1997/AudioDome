import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllPlaylistThunk } from "../../store/playlist";

function GetAllPlaylist() {
    const dispatch = useDispatch()
    const allPlaylistsObj = useSelector(state => state.playlist.allPlaylists)
    const allPlaylists = Object.values(allPlaylistsObj)
    console.log(allPlaylists);

    useEffect(() => {
        dispatch(getAllPlaylistThunk())
    },[dispatch])

    return (
        <div>
            {allPlaylists.map(playlist => (
                <div key={playlist.id} className="playlistCardContainer">
                    <img className="playlistImg" src={playlist.playlistImage} />
                    <div>{playlist.name}</div>
                    {playlist.songs.map(song => (
                        <ul>
                            <li> {song.title}</li>
                        </ul>
                    ))}
                </div>
            ))}
        </div>
    )
}


export default GetAllPlaylist
