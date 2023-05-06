import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getSongsThunk } from '../../store/songs';
import allsongs from "./allsongs.css"
function GetAllSongs() {
    const dispatch = useDispatch()
    const allSongs = useSelector(state => state.songs)
    console.log("HERE IS YOUR ALLSONGS", Object.values(allSongs))
    useEffect(() => {
        dispatch(getSongsThunk())
    }, [dispatch])
    return (
        <div>
            {Object.values(allSongs).length > 0 && Object.values(allSongs).map(song =>
                <>
                <div>
                    {`${song?.title}`}
                </div>

                </>
            )}
        </div>
    )
}

export default GetAllSongs
