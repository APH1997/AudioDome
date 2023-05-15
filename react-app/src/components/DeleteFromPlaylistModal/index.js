import { useDispatch } from "react-redux"
import { deleteSongFromPlaylistThunk } from "../../store/playlist"
import { useParams } from "react-router-dom"
import { useModal } from '../../context/Modal'
import { useHistory } from "react-router-dom"

const DeleteFromPlaylist = ({song, playlistId}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const handleDelete = (e) => {
        e.preventDefault()
        let playlist_id = playlistId
        let song_id = song.id
        dispatch(deleteSongFromPlaylistThunk(playlist_id, song_id))
        closeModal()
        history.push(`/playlist/${playlist_id}`)
    }

    return (
        <div>
            <h2>ARE YOU SURE YOU WANT TO DELETE</h2>
            <button className="modalbtn" onClick={handleDelete}>
                Delete Song From Playlist
            </button>
            <button className="modalbtn" onClick={() => closeModal()}>
                Cancel
            </button>
        </div>
    )
}


export default DeleteFromPlaylist
