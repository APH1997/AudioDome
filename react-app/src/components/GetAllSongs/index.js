import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getSongsThunk } from '../../store/songs';
import "./allsongs.css"
import SongCard from '../SongCard';
import { getPlaylistSongsThunk, playOneSongThunk} from '../../store/currentSong';


function GetAllSongs({fromLib, pageUser}) {
    const allSongs = useSelector(state => state.songs)
    const allSongsLength = Object.values(allSongs).length
    const dispatch = useDispatch()
    console.log(pageUser, 'in get all songs');

    useEffect(() => {
        dispatch(getSongsThunk())
        dispatch(getPlaylistSongsThunk())
    }, [dispatch, allSongsLength])

    const handelClick = (song) => {
        dispatch(playOneSongThunk(song.id))
    }

    if (allSongs.songs === null) return null

    const filterUploaded = Object.values(allSongs).filter(song => song.uploader === pageUser)

    return (
        <div className='all-songs-container'>
            <div className='titleforBrowse'>
               {!fromLib && <h1>WELCOME TO THE AUDIO ARCHIVE</h1> }
            </div>
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
                {!fromLib && <tbody>
                    {Object.values(allSongs).length > 0 && Object.values(allSongs).map((song, index) =>
                        <tr onClick={e => handelClick(song)} className='number-play'><SongCard song={song} number={index + 1} /></tr>,
                        )}
                </tbody>}

                {fromLib &&
                    <tbody>
                    {Object.values(allSongs).length > 0 && filterUploaded.map((song, index) =>
                        <tr onClick={e => handelClick(song)} className='number-play'><SongCard song={song} number={index + 1} /></tr>,
                        )}
                </tbody>}
            </table>
        </div>
    )
}

export default GetAllSongs
