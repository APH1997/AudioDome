import { useDispatch } from "react-redux"
import { deletePlaylistThunk } from "../../store/playlist"
import {useModal} from '../../context/Modal'
import { useHistory } from "react-router-dom"

function PlaylistMenu({playlistId}) {
    const history = useHistory()
    const dispatch = useDispatch()
    const {closeModal} = useModal()

    const handleDelete = (e) => {
        dispatch(deletePlaylistThunk(playlistId))
        closeModal()
        history.push('/')
    }

    return (
        <div>
            <h3>Manage your playlist</h3>
            <button>Update Playlist</button>
            <button onClick={handleDelete}>Delete Playlist</button>
        </div>
    )
}

export default PlaylistMenu
