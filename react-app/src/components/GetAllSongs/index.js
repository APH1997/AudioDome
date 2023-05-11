import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getSongsThunk } from '../../store/songs';
import "./allsongs.css"
import SongCard from '../SongCard';


function GetAllSongs() {
    const dispatch = useDispatch()
    const allSongs = useSelector(state => state.songs)
    console.log("HERE IS YOUR ALLSONGS", allSongs)

    useEffect(() => {
        dispatch(getSongsThunk())
    }, [dispatch])

    if (allSongs.songs === null) return null
    return (
        <div className='all-songs-container'>
            <div className='all-songs-container-headers'>
                <div>#</div>
                <div>Title</div>
                <div>Artist</div>
                <div>Uploaded by</div>
            </div>
            {Object.values(allSongs).length > 0 && Object.values(allSongs).map((song, index) =>
                <SongCard song={song} number={index + 1}/>,
                )}
        </div>
    )
}

export default GetAllSongs
