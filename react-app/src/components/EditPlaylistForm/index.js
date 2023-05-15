import { useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getOnePlaylistThunk, updatePlaylistThunk } from "../../store/playlist"
import { useHistory } from "react-router-dom"
import "./editPlaylist.css"

function EditPlaylistForm() {
    const {playlistId} = useParams()
    const dispatch = useDispatch()
    const playlist = useSelector(state => state.playlist.singlePlaylist)
    const [isUploading, setIsUploading] = useState(false)
    const history = useHistory()


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
        setIsUploading(true)
        const formData = new FormData()
        formData.append("name",name)
        if (imageFile){
            formData.append("playlist_image", imageFile)
        }



        await dispatch(updatePlaylistThunk(formData, playlistId))

        setTimeout(() => setIsUploading(false), 3000)

        history.push(`/playlist/${playlistId}`)
    }

    if (!Object.values(playlist).length) return null

    return (
        <>
            <form id="edit-playlist-form" method="PUT" onSubmit={handleSubmit}>
                <label>
                    Name
                    <input
                    type="text"
                    value={name || ''}
                    onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label id="outer-label-edit-playlist">
                    Change Playlist Image
                    <input
                    type="file"
                    name="playlistImage"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    className='SongPicupload' />
                    <label htmlFor="playlistImage" className="uploadbutton" id="inner-label-edit-playlist">
                        <i className="fas fa-cloud-upload-alt"></i>
                        {imageFile ? "Picture Ready to Upload" : "Upload Picture"}
                    </label>
                </label>

                <button className="modalbtn" type="submit">{isUploading ? "Updating..." : "Update Playlist"}</button>

            </form>
        </>
    )
}

export default EditPlaylistForm
