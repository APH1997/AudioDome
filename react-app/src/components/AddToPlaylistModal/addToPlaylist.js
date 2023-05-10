import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useModal } from '../../context/Modal'
import { useState } from "react"
import { addSongToPlaylistThunk } from "../../store/playlist"
import {useHistory} from 'react-router-dom'
import { useParams } from "react-router-dom"

function AddToPlaylist({ song }) {
    const dispatch = useDispatch()
    const statePlaylist = useSelector(state => state.session.user.playlists)
    const [checked, setChecked] = useState([])
    const history = useHistory()
    const {playlistId} = useParams()

    const { closeModal } = useModal()

    function isSongInPlaylist(playlist, song) {
        for (let currSong of playlist) {
            if (+currSong.id === +song.id) return false
        }
        return true
    }
    const handelCheckBox = (e) => {
        if (e.target.checked){
            setChecked([
                ...checked, e.target.value
            ])
        } else {
            setChecked(
                checked.filter((song) => song !== e.target.value)
            )
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let playlist_ids = checked.join(',')
        let song_id = song.id

        dispatch(addSongToPlaylistThunk(playlist_ids, song_id))
        closeModal()
        history.push(`/playlist/${playlistId}`)
    }


    return (
        <>
            <h2>Select a playlist</h2>
            <form onSubmit={handleSubmit} method="PUT">
                {statePlaylist.map(playlist =>
                    isSongInPlaylist(playlist.songs, song) && <div
                        className="select_playlist">{playlist.name}
                        <input type="checkbox" value={playlist.id} onChange={handelCheckBox}></input>
                    </div>
                )}
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default AddToPlaylist
