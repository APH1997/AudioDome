import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createPlaylistThunk, getAllPlaylistThunk } from "../../store/playlist"
import SongCard from "../SongCard"
import { getSongsThunk } from "../../store/songs"
import { useHistory } from "react-router-dom"
import "./CreatePlaylistForm.css"

const PlaylistForm = () => {
    const user = useSelector(state => state.session.user)
    const allSongsObj = useSelector(state => state.songs)
    const history = useHistory()
    const dispatch = useDispatch()
    const [checked, setChecked] = useState([])
    const [name, setName] = useState('')
    const [imgFile, setImageFile] = useState(null)
    const [error, setError] = useState(null)
    const [isUploading, setIsUploading] = useState(false)

    const allSongs = Object.values(allSongsObj)


    useEffect(() => {
        dispatch(getSongsThunk())
    }, [dispatch])


    if (!allSongs) {
        return null
    }

    const handleAddImage = (e) => {
        setImageFile(e.target.files[0])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!name) {
            setError("Name is required");
            return;
        }
        if (name.length > 100) {
            setError("Length of playlist Name must be at most 100 characters");
            return;
        }
        if (!checked.length) {
            setError("Please select at least one song");
            return;
        }
        if (imgFile === null) {
            setError('Image is required')
            return
        }

        setIsUploading(true)

        const formData = new FormData()

        formData.append('user_id', user.id)
        formData.append('name', name)
        formData.append('playlist_image', imgFile)
        formData.append('playlist_songs', checked.join(','))

        await dispatch(createPlaylistThunk(formData))

        setTimeout(() => setIsUploading(false), 3000)

        history.push('/')

    }

    const handelCheckBox = (e) => {
        if (e.target.checked) {
            setChecked([
                ...checked, e.target.value
            ])
        } else {
            setChecked(
                checked.filter((song) => song !== e.target.value)
            )
        }
    }


    return (
        <div className="wholepage">
            <form className="create-playlist-form" onSubmit={handleSubmit}>
                {error &&
                    <div className="error">
                        {error}
                    </div>}
                <div className="topOfPage">
                    <div className="playlistImage">
                        <input id="playlistImages"
                            type="file"
                            name="playlistPicture"
                            accept="image/*"
                            onChange={handleAddImage}
                            className="playlistImageBtn" />
                        <label htmlFor="playlistImages" className="upload-button">
                            <i className="fas fa-cloud-upload-alt"></i>
                            {imgFile ? "Picture Ready to Upload" : "Upload Photo"}
                        </label>

                    </div>
                    <div className="name-name">
                        <label>
                            Name
                            <input
                                id="playlistName"
                                placeholder={`My Playlist #${(user.playlists).length + 1}`}
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </label>
                    </div>
                </div>
                <div>
                    {allSongs.map(song =>
                        <div className="every-song">
                            <label>
                                {song?.title}
                                <input
                                    type="checkbox"
                                    name='song'
                                    value={song?.id}
                                    onChange={handelCheckBox}
                                />
                            </label>
                        </div>)}
                </div>
                <div className='SubmitPlaylistBtn'>
                    <button isabled={isUploading} className="create-playlist-button" type="submit">{isUploading ? "Creating playlist...": "Create Playlist" }</button>
                </div>
            </form>
        </div>
    )
}


export default PlaylistForm
