import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { likeSongThunk, unlikeSongThunk } from "../../store/songs"

function LikeForm({song}){
    const dispatch = useDispatch()
    const user = useSelector(state => state.session)

    const isSongLiked = () => {
        for (let songId of user.user.likes) {
            if (songId === song.id) {
                return true
            }
        }
        return false
    }

    const [liked, setLiked] = useState(isSongLiked())

    const handleLike = () => {
        setLiked(true)
        dispatch(likeSongThunk(song.id, user.user.id))
    }

    const handleUnlike = () => {
        setLiked(false)
        dispatch(unlikeSongThunk(song.id, user.user.id))
    }
    return (

        <>
        {(liked && <i
                    class="fas fa-heart"
                    style={{color: "#1dcd20"}}
                    onClick={handleUnlike}></i>)
                || <i
                    class="far fa-heart"
                    onClick={handleLike}></i>}
        </>
    )
}

export default LikeForm
