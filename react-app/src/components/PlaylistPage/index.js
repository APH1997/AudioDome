import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { deletePlaylistThunk, getOnePlaylistThunk } from "../../store/playlist"
import SongCard from "../SongCard"
import { useHistory } from "react-router-dom"
import OpenModalButton from "../OpenModalButton"
import { BsThreeDots } from 'react-icons/bs'
import PlaylistMenu from "../PlaylistMenuModal"
import { getPlaylistSongsThunk } from "../../store/currentSong"
import {IoPlay, IoPlaySkipBack, IoPlaySkipForward, IoPause} from 'react-icons/io5'


function PlaylistPage() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { playlistId } = useParams()
    const user = useSelector(state => state.session)
    const singlePlaylistObj = useSelector(state => state.playlist.singlePlaylist)
    const singlePlaylistLength = singlePlaylistObj.songs?.length

    console.log("USER:", user)
    console.log("PLAYLIST:", singlePlaylistObj)
    useEffect(() => {
        dispatch(getOnePlaylistThunk(playlistId))
    }, [dispatch, singlePlaylistLength])

    const handleSongPlayer = () => {
        dispatch(getPlaylistSongsThunk(playlistId))
    }

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
            <button className="buttons"onClick={handleSongPlayer}>
            <IoPlay />
            </button>

            {singlePlaylistObj.userId === user.user.id && <div className="playlist-menu-dots">
                <OpenModalButton
                buttonText={<BsThreeDots />}
                modalComponent={<PlaylistMenu playlistId={playlistId}/>}
                />
            </div>}

            {singlePlaylistObj.songs.map((song, index) => (
                <div>
                    <SongCard song={song} number={index + 1} playlistId={playlistId} />
                </div>
            ))}

        </div>
    )
}


export default PlaylistPage
