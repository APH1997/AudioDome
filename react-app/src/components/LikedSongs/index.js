import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getSongsThunk } from '../../store/songs';
import SongCard from '../SongCard';
import { getPlaylistSongsThunk } from '../../store/currentSong';


function LikedSongs() {
    const allSongs = useSelector(state => state.songs)
    const user = useSelector(state => state.session.user)
    const allSongsLength = Object.values(allSongs).length
    const likedSongs = Object.values(allSongs).filter(song => user.likes.includes(song?.id))
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSongsThunk())
        dispatch(getPlaylistSongsThunk())
    }, [dispatch, allSongsLength])


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
                    {likedSongs.length > 0 && likedSongs.map((song, index) =>
                        <tr><SongCard song={song} number={index + 1} /></tr>,
                        )}
                </tbody>
            </table>
        </div>
    )
}

export default LikedSongs
