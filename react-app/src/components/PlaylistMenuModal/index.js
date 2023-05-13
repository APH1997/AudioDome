import { useDispatch } from "react-redux"
import { deletePlaylistThunk } from "../../store/playlist"
import {useModal} from '../../context/Modal'
import { useHistory } from "react-router-dom"
import './playlistmodal.css'

function PlaylistMenu({playlistId}) {
    const history = useHistory()
    const dispatch = useDispatch()
    const {closeModal} = useModal()

    const handleDelete = (e) => {
        dispatch(deletePlaylistThunk(playlistId))
        closeModal()
        history.push('/')
    }

    const handleUpdate = () => {
        closeModal()
        history.push(`/playlist/${playlistId}/edit`)
    }

    return (
        <div className="manage-playlist-modal">
            <h3>Manage your playlist</h3>
            <button onClick={handleUpdate}>Update Playlist</button>
            <button onClick={handleDelete}>Delete Playlist</button>
        </div>
    )
}

export default PlaylistMenu
