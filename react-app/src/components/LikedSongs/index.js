import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getSongsThunk } from '../../store/songs';
import SongCard from '../SongCard';
import { getPlaylistSongsThunk } from '../../store/currentSong';
import { getUserByIdThunk } from '../../store/session';


function LikedSongs() {
    const allSongs = useSelector(state => state.songs)
    const user = useSelector(state => state.session.user)
    const [wasThereAClick, setWasThereAClick] = useState(false)
    const allSongsLength = Object.values(allSongs).length
    const likedSongs = Object.values(allSongs).filter(song => user.likes.includes(song?.id))
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSongsThunk())
        dispatch(getPlaylistSongsThunk())
        dispatch(getUserByIdThunk(user.id))
    }, [dispatch, allSongsLength, wasThereAClick])

    function toggleWasThereAClick() {
        setWasThereAClick(!wasThereAClick)
    }

    if (allSongs.songs === null) return null
    return (
        <div className='all-songs-container'>
            <table className='all-songs-container-headers'>

                <thead>
                    <tr>
                        <th>#</th>
                        <th>Cover</th>
                        <th>Title</th>
                        <th>Artist</th>
                        <th colSpan={3}>Uploaded By</th>
                    </tr>
                </thead>
                <tbody onClick={toggleWasThereAClick}>
                    {likedSongs.map((song, index) =>
                        <tr key={song.id}>
                            <SongCard song={song} number={index + 1} />
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default LikedSongs
