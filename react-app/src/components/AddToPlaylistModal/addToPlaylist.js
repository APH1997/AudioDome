import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useModal } from '../../context/Modal'
import { useEffect, useState } from "react"
import { addSongToPlaylistThunk } from "../../store/playlist"
import {useHistory} from 'react-router-dom'
import { useParams } from "react-router-dom"
import { getUserByIdThunk } from "../../store/session"
import './playlistmodal.css'

function AddToPlaylist({ song }) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
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
        history.push(`/users/${user.id}`)
    }

    useEffect(() => {
        dispatch(getUserByIdThunk(user.id))
    }, [dispatch])

    return (
        <div className="add-to-playlist-modal">
            <h2>Select a playlist</h2>
            <form onSubmit={handleSubmit} method="PUT">
                {user.playlists.map(playlist =>
                    isSongInPlaylist(playlist.songs, song) && <><label
                        htmlFor={`playlist${playlist.id}`}
                        className="select_playlist">
                            {playlist.name}
                        </label>
                        <input name={`playlist${playlist.id}`} type="checkbox" value={playlist.id} onChange={handelCheckBox}></input>
                        </>
                )}
                <button className="SubmitAddtoPlaylist" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddToPlaylist
