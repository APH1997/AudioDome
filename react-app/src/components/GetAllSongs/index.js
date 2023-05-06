import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getSongsThunk } from '../../store/songs';
import allsongs from "./allsongs.css"
function GetAllSongs() {
    const dispatch = useDispatch()
    const allSongs = useSelector(state => state.songs)

    useEffect(() => {
        dispatch(getSongsThunk())
    }, [dispatch])
    return (
        <div>
            {Object.values(allSongs).length > 0 && Object.values(allSongs).map(song =>
                <>
                    {`${song?.name}`}
                </>
            )}
        </div>
    )
}

export default GetAllSongs
