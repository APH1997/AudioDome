import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { likeSongThunk } from "../../store/songs"

function LikeForm({song}){
    const dispatch = useDispatch()
    const [liked, setLiked] = useState(false)
    const user = useSelector(state => state.session)
    const handleLike = () => {
        setLiked(true)
        // console.log("The song is liked")
        // console.log(song.title)
        // console.log(user)
        dispatch(likeSongThunk(song.id, user.id))
    }

    const handleUnlike = () => {
        setLiked(false)
        // console.log("The song is unliked")
        // console.log(song.title)

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
