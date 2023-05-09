import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createPlaylistThunk, getAllPlaylistThunk } from "../../store/playlist"
import SongCard from "../SongCard"
import { getSongsThunk } from "../../store/songs"

const PlaylistForm = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const allSongsObj = useSelector(state => state.songs)
    const [name, setName] = useState('')
    const [imgFile, setImageFile] = useState(null)
    const allSongs = Object.values(allSongsObj)
    console.log(user, 'This is the User');
    console.log(allSongs, 'SONGSSSSS');


    useEffect(() => {
        dispatch(getSongsThunk())
    }, [dispatch])

    if (!allSongs) {
        return null
    }

    const handleAddSong = async (songInfo) => {

        const playlistInfo = {
            name: songInfo.title
        }

        await dispatch(createPlaylistThunk(playlistInfo))
        console.log('HAVE TO MAKE A THUNK FOR THIS FIRST');
    }

    return (
        <form>
            <div className="topOfPage">
                <div className="playlistImage">
                    <img src='data:image/png;base64,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' />
                </div>
                <div className="publicPlaylist">
                    PUBLIC PLAYLIST
                </div>
                <label>
                    <input
                    id="playlistName"
                    placeholder={`My Playlist #{(user.playlists).length + 1}`}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}/>
                </label>
            </div>
            <div>
                {allSongs.length > 0 && allSongs.map(song =>
                    <div>
                        {song?.title} {' '}{song?.artist} {' '} {song?.uploader}
                        {' '}
                        <button
                            onClick={() => handleAddSong(song)}>
                            Add
                        </button>
                    </div>
                )}
            </div>
        </form>
    )
}


export default PlaylistForm
