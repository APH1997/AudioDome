import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getSongsThunk } from '../../store/songs';
import "./allsongs.css"
import SongCard from '../SongCard';
import { getPlaylistSongsThunk, playOneSongThunk} from '../../store/currentSong';


function GetAllSongs() {
    const allSongs = useSelector(state => state.songs)
    const allSongsLength = Object.values(allSongs).length
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSongsThunk())
        dispatch(getPlaylistSongsThunk())
    }, [dispatch, allSongsLength])

    const handelClick = (song) => {
        dispatch(playOneSongThunk(song.id))
    }

    if (allSongs.songs === null) return null
    return (
        <div className='all-songs-container'>
            <table className='all-songs-container-headers'>

                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Artist</th>
                        <th colSpan={3}>Uploaded By</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(allSongs).length > 0 && Object.values(allSongs).map((song, index) =>
                        <tr onClick={e => handelClick(song)} className='number-play'><SongCard song={song} number={index + 1} /></tr>,
                        )}
                </tbody>
            </table>
        </div>
    )
}

export default GetAllSongs
