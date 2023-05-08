import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { getOnePlaylistThunk } from "../../store/playlist"
import SongCard from "../SongCard"

function PlaylistPage() {
    const dispatch = useDispatch()
    const { playlistId } = useParams()
    const singlePlaylistObj = useSelector(state => state.playlist.singlePlaylist)
    // const singlePlaylist = Object.values(singlePlaylistObj)
    // console.log(singlePlaylist);
    console.log(singlePlaylistObj);
    useEffect(() => {
        dispatch(getOnePlaylistThunk(playlistId))
    }, [dispatch])

    if (Object.values(singlePlaylistObj).length === 0){
        return null
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
                    <SongCard song={song} number={index+1} />
                </div>
            ))}
        </div>
    )
}


export default PlaylistPage
