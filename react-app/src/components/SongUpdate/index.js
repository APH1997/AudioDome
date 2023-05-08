import { useParams, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { soloSongThunk } from "../../store/songs";
import { useEffect, useState } from "react";
import { editSongThunk } from "../../store/songs";

const UpdateSongForm = () => {
    const { songId } = useParams()
    const history = useHistory()
    const song = useSelector(state => state.singleSong)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(soloSongThunk(songId))
    }, [dispatch, songId])

    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');

    useEffect(() => {
        if (song[songId]) {
            setTitle(song[songId].title);
            setArtist(song[songId].artist);
        }
    }, [song, songId])

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleArtistChange = (e) => {
        setArtist(e.target.value);
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const songInfo = {
            id: songId,
            title: title,
            artist: artist,
        }
        console.log(songInfo)
        await dispatch(editSongThunk(songInfo))
        history.push('/')
    }

    if (!song[songId]) return null

    return (
        <form onSubmit={onSubmit}>
            <label>
                <div>Title</div>
                <input id="song-title" type="text" value={title} placeholder='Song Title' onChange={handleTitleChange} />
            </label>
            <label>
                <div>Artist</div>
                <input id="artist-name" type="text" value={artist} placeholder='Artist Time' onChange={handleArtistChange} />
            </label>
            <div className='SubmitSongBtn'>
                <button className="create-song-button" type="submit">Update Song</button>
            </div>
        </form>
    )
}

export default UpdateSongForm
