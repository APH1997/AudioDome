import React, { createContext, useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createSongThunk, getSongsThunk } from '../../store/songs'
import './CreateSongForm.css'

function CreateSongForm() {
    const currentUser = useSelector(state => state.session.user);
    const songs = useSelector(state => state.songs)
    const songLength = Object.values(songs).length
    const history = useHistory()
    const dispatch = useDispatch()
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [currSongLength, setCurrSongLength] = useState(songLength)
    const [file, setFile] = useState(null)
    const [imgFile, setImageFile] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        dispatch(getSongsThunk())
    }, [dispatch, songLength])

    function handleFileUpload(e) {
        setFile(e.target.files[0])
    }
    const handleAddImage = (e) => {
        setImageFile(e.target.files[0])
    }
    /*----------------------ANY VALIDATION WOULD DO HERE AS WELL FOR THE FORM FOR HANDLESUBMIT-------------------- */
    const HandleSubmit = async (e) => {
        e.preventDefault()
        if (!title) {
            setError('Title is required')
            return
        }
        if (!artist) {
            setError('Artist is required')
            return
        }

        history.push('/songs/all')
        setCurrSongLength(+songLength)
        const formData = new FormData()
        formData.append("title", title)
        formData.append("artist", artist)
        formData.append("aws_url", file)
        formData.append("uploader_id", currentUser.id)
        formData.append('song_image', imgFile)
        await dispatch(createSongThunk(formData))
        console.log('song lengths', songLength, currSongLength)
    }
    return (
        <form onSubmit={HandleSubmit} encType="multipart/form-data">
            {error &&
                <div className="error">
                    {error}
                </div>}
            <div>

                <label>
                    <input id="song-upload" type="file" name="song" accept="audio/*" onChange={handleFileUpload} className='SongUploadbtn' />
                    <label htmlFor="song-upload" className="uploadbutton">
                        <i className="fas fa-cloud-upload-alt"></i>
                        {file ? "Song Ready to Upload" : "Upload Song"}
                    </label>
                </label>
            </div>
            <label>
                <input id="songImages" type="file" name="songPicture" accept='"image/*' onChange={handleAddImage} className='SongPicupload' />
                <label htmlFor="songImages" className="uploadbutton">
                    <i className="fas fa-cloud-upload-alt"></i>
                    {imgFile ? "Picture Ready to Upload" : "Upload Picture"}
                </label>
            </label>
            <label>
                <div>Title</div>
                <input id="song-title" type="text" value={title} placeholder='Song Title' onChange={(e) => setTitle(e.target.value)} />
            </label>
            <label>
                <div>Artist</div>
                <input id="artist-name" type="text" value={artist} placeholder='Artist Time' onChange={(e) => setArtist(e.target.value)} />
            </label>
            <div className='SubmitSongBtn'>
                <button className="create-song-button" type="submit">Submit Song</button>
            </div>
        </form>
    )
}

export default CreateSongForm
