import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { deletePlaylistThunk, getOnePlaylistThunk } from "../../store/playlist"
import SongCard from "../SongCard"
import { useHistory } from "react-router-dom"

function PlaylistPage() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { playlistId } = useParams()
    const user = useSelector(state => state.session)
    const singlePlaylistObj = useSelector(state => state.playlist.singlePlaylist)

    console.log("USER:", user)
    console.log("PLAYLIST:", singlePlaylistObj)
    useEffect(() => {
        dispatch(getOnePlaylistThunk(playlistId))
    }, [dispatch])

    if (Object.values(singlePlaylistObj).length === 0) {
        return null
    }

    const handleDelete = (e) => {

        dispatch(deletePlaylistThunk(playlistId))
        history.push('/')
    }

    return (
        <div>
            <div className="playlistImage">
                <img src={singlePlaylistObj.playlistImage} />
            </div>
            <div className="playlistName">
                {singlePlaylistObj.name}
            </div>
            {singlePlaylistObj.songs.map((song, index) => (
                <div>
                    <SongCard song={song} number={index + 1} />
                </div>
            ))}
            {singlePlaylistObj.userId === user.user.id && <button onClick={handleDelete}>Delete Playlist</button>}
        </div>
    )
}


export default PlaylistPage
