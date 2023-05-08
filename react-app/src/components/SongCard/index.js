import React from 'react'
import "./songcards.css"
import { BsThreeDots } from 'react-icons/bs'
import SongMenu from "../SongMenu"

function SongCard({song, number}){

    return(
        <div className='song-card-container'>
            <div className='song-card-song-number'>
                {number}
            </div>
            <div className='song-card-title'>
                <div>{song?.title}</div>
            </div>
            <div className='song-card-artist'>
                <div>{song?.artist}</div>
            </div>
            <div className='song-card-uploader'>
                <div>{song?.uploader}</div>
            </div>
            <div className='song-card-menu-dots'>
                {/* <BsThreeDots /> */}
                <SongMenu />
            </div>

        </div>
    )
}

export default SongCard
