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
            <table className='all-songs-container-headers'>

                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>Uploaded By</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(allSongs).length > 0 && Object.values(allSongs).map((song, index) =>
                        <tr><SongCard song={song} number={index + 1} /></tr>,
                        )}
                </tbody>
            </table>
        </div>
    )
}

export default GetAllSongs
