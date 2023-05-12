import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { likeSongThunk, unlikeSongThunk } from "../../store/songs"
import { getSongsThunk } from "../../store/songs"
import { getUserByIdThunk } from "../../store/session"

function LikeForm({song}){
    const dispatch = useDispatch()
    const user = useSelector(state => state.session)
    const likes = user.user.likes

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

    useEffect(() => {
        dispatch(getUserByIdThunk(user.user.id))
        },[liked])

    return (

        <>
        {(liked && <td><i
                    class="fas fa-heart"
                    style={{color: "#1dcd20"}}
                    onClick={handleUnlike}></i></td>)
                || <td><i
                    class="far fa-heart"
                    onClick={handleLike}></i></td>}
        </>
    )
}

export default LikeForm
