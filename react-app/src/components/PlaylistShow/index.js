import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { getOnePlaylistThunk } from "../../store/playlist"
import SongCard from "../SongCard"

function PlaylistShow() {
    const dispatch = useDispatch()
    const { playlistId } = useParams()
    const singlePlaylistObj = useSelector(state => state.playlist.singlePlaylist)
    useEffect(() => {
        dispatch(getOnePlaylistThunk(playlistId))
    }, [dispatch])


    if (Object.values(singlePlaylistObj).length === 0){
        return null
    }

    return (
        <div>
            {singlePlaylistObj.songs.map((song, index) => (
                <div>
                    <SongCard song={song} number={index+1} playlistId={playlistId} />
                </div>
            ))}
        </div>
    )
}


export default PlaylistShow
