import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createSongThunk } from '../../store/songs'

function CreateSongForm(){
    const history = useHistory()
    const dispatch = useDispatch()
    const [title , setTitle] = useState('');
    const [artist, setArtist] = useState('');

    return (
        <form>
            <label htmlFor="song-upload">Upload a Song</label>
            <input id="song-upload" type="file" name="song" accept=".mp3,.wav,.mp4" onChange={handleFileUpload}/>
        </form>
    )
}
