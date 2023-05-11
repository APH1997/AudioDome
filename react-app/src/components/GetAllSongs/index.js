import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getSongsThunk } from '../../store/songs';
import allsongs from "./allsongs.css"
import SongCard from '../SongCard';


function GetAllSongs() {
    const dispatch = useDispatch()
    const allSongs = useSelector(state => state.songs)
    console.log("HERE IS YOUR ALLSONGS", Object.values(allSongs))
    useEffect(() => {
        dispatch(getSongsThunk())
    }, [dispatch])
    const songNumber = 1
    return (
        <div>
            {Object.values(allSongs).length > 0 && Object.values(allSongs).map((song, index) =>
                <SongCard song={song} number={index + 1}/>,
            )}
        </div>
    )
}

export default GetAllSongs
