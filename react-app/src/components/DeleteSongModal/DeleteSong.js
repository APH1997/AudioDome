import { useDispatch } from "react-redux"
import { removeSongThunk } from "../../store/songs"
import { useSelector } from "react-redux"



function DeleteSong({song}) {
    const dispatch = useDispatch()
    const stateSong = useSelector(state => state.songs)

    function handleDelete(){
        // we don't want to delete seeded songs from aws bucket, if it is in the range then do not remove from bucket
        //if it isn't in the range then we can remove from the bucket
        if(song.id >=1 && song.id <=3 ) console.log('Yes')
        else {
            dispatch(removeSongThunk(song.id))
        }
    }

    return (
        <>
        <h3>{`ARE YOU SURE YOU WANT TO REMOVE ${song.title}?`}</h3>
            <button onClick={handleDelete}>Delete Song</button>
            <button>Cancel</button>
        </>
    )
}

export default DeleteSong
