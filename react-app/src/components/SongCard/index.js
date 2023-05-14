import React from 'react'
import "./songcards.css"
import { BsThreeDots } from 'react-icons/bs'
import SongMenu from "../SongMenuModal"
import OpenModalButton from "../OpenModalButton";
import LikeForm from './likeform';



function SongCard({song, number, playlistId, fromPlaylist}){

    return(
        <>
            <td>{number}</td>
            <td><img className='song-img' src={song.songImage}/></td>
            <td>{song?.title}</td>
            <td>{song?.artist}</td>
            <td>{song?.uploader}</td>
            <td className='like-song-svg'onClick={(e) => e.stopPropagation()}><LikeForm song={song} /></td>
            <td className='song-menu-svg' onClick={(e) => e.stopPropagation()}>
                <OpenModalButton
                buttonText= {< BsThreeDots />}
                modalComponent={<SongMenu fromPlaylist={fromPlaylist} song={song} playlistId={playlistId} />}/>
            </td>
        </>

    )
}

export default SongCard
