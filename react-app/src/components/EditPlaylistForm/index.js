import { useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getOnePlaylistThunk, updatePlaylistThunk } from "../../store/playlist"


function EditPlaylistForm() {
    const {playlistId} = useParams()
    const dispatch = useDispatch()
    const playlist = useSelector(state => state.playlist.singlePlaylist)

    const [name, setName] = useState(playlist.name)
    const [imageFile, setImageFile] = useState(null)

    useEffect(() => {
        dispatch(getOnePlaylistThunk(playlistId))
    }, [dispatch])

    useEffect(() => {
        if (playlist) {
            setName(playlist.name)
        }
    }, [playlist, playlistId])


    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("name",name)
        if (imageFile){
            formData.append("playlist_image", imageFile)
        }

        await dispatch(updatePlaylistThunk(formData, playlistId))
    }

    if (!Object.values(playlist).length) return null
    console.log(imageFile)
    return (
        <>
            <form method="PUT" onSubmit={handleSubmit}>
                <label>
                    Name
                    <input
                    type="text"
                    value={name || ''}
                    onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label>
                    Change Playlist Image
                    <input
                    type="file"
                    name="playlistImage"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    />
                </label>

                <button type="submit">Update Playlist</button>

            </form>
        </>
    )
}

export default EditPlaylistForm