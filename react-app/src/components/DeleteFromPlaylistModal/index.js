import { useDispatch } from "react-redux"
import { deleteSongFromPlaylistThunk } from "../../store/playlist"
import { useParams } from "react-router-dom"
import { useModal } from '../../context/Modal'

const DeleteFromPlaylist = ({song, playlistId}) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    console.log(playlistId);
    const handleDelete = (e) => {
        e.preventDefault()
        let playlist_id = playlistId
        console.log(playlistId);
        let song_id = song.id
        dispatch(deleteSongFromPlaylistThunk(playlist_id, song_id))
        closeModal()
    }

    return (
        <div>
            <h2>ARE YOU SURE YOU WANT TO DELETE</h2>
            <button onClick={handleDelete}>
                Delete Song From Playlist
            </button>
            <button>
                Cancel
            </button>
        </div>
    )
}


export default DeleteFromPlaylist