import { useDispatch } from "react-redux"
import { removeSongThunk } from "../../store/songs"
import { useSelector } from "react-redux"
import {useModal} from '../../context/Modal'


function DeleteSong({song}) {
    const dispatch = useDispatch()
    const stateSong = useSelector(state => state.songs)
    const {closeModal} = useModal()
    function handleDelete(){
        // we don't want to delete seeded songs from aws bucket, if it is in the range then do not remove from bucket
        //if it isn't in the range then we can remove from the bucket
        dispatch(removeSongThunk(song.id))
        closeModal()
    }

    return (
        <>
        <h3>{`ARE YOU SURE YOU WANT TO REMOVE ${song.title}?`}</h3>
            <button className="modalbtn" onClick={handleDelete}>Delete Song</button>
            <button className="modalbtn" onClick={() => closeModal()}>Cancel</button>
        </>
    )
}

export default DeleteSong
