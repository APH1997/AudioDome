import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { deletePlaylistThunk, getOnePlaylistThunk } from "../../store/playlist"
import SongCard from "../SongCard"
import { useHistory } from "react-router-dom"
import OpenModalButton from "../OpenModalButton"
import { BsThreeDots } from 'react-icons/bs'
import PlaylistMenu from "../PlaylistMenuModal"
import { getPlaylistSongsThunk, playOneSongThunk} from "../../store/currentSong"
import { IoPlay, IoPlaySkipBack, IoPlaySkipForward, IoPause } from 'react-icons/io5'
import "../SongCard/songcards.css"


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

    const handelClick = (song) => {
        dispatch(playOneSongThunk(song.id))
    }

    return (
        <div>
            <div className="playlistImage">
                <img src={singlePlaylistObj.playlistImage} />
            </div>
            <div className="playlistName">
                {singlePlaylistObj.name}
            </div>

            <div className="playlist-play-options">
                <button className="buttons" onClick={handleSongPlayer}>
                    <IoPlay />
                </button>

                {singlePlaylistObj.userId === user.user.id && <div className="playlist-menu-dots">
                    <OpenModalButton
                        buttonText={<BsThreeDots />}
                        modalComponent={<PlaylistMenu playlistId={playlistId} />}
                        />
                </div>}
            </div>

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
                        {singlePlaylistObj.songs.map((song, index) => (
                            <tr className='number-play' onClick={e => handelClick(song)} >
                                <SongCard fromPlaylist={true} song={song} number={index + 1} playlistId={playlistId}/>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>





        </div>
    )
}


export default PlaylistPage
