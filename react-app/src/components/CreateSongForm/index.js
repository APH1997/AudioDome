import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createSongThunk } from '../../store/songs'

function CreateSongForm(){
    const history = useHistory()
    const dispatch = useDispatch()
    const [title , setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [file, setFile] = useState(null)

    function handleFileUpload(e){
        setFile(e.target.files[0])
    }
    /*----------------------ANY VALIDATION WOULD DO HERE AS WELL FOR THE FORM FOR HANDLESUBMIT-------------------- */
    const HandleSubmit = async (e) => {
        e.preventDefault()
        const newSong = await dispatch(createSongThunk())
        history.push("/")
    }
    return (
        <form onSubmit={HandleSubmit}>
            <label>
                <div>Upload A Song</div>
                <input id="song-upload" type="file" name="song" accept="audio/*" onChange={handleFileUpload}/>
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
