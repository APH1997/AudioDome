import React from 'react'
import "./songcards.css"
import { BsThreeDots } from 'react-icons/bs'
import SongMenu from "../SongMenuModal"
import OpenModalButton from "../OpenModalButton";
import  {useState, useEffect, useRef } from "react"
import { useDispatch } from "react-redux";
import LikeForm from './likeform';


function SongCard({song, number, playlistId}){

    const dispatch = useDispatch();
    const ulRef = useRef();


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
            <div className='song-card-like-form'>
                <LikeForm song={song}/>
            </div>
            <div className='song-card-menu-dots'>
                {/* <BsThreeDots /> */}
                {/* <SongMenu /> */}
                <OpenModalButton
                buttonText= {< BsThreeDots />}
                modalComponent={<SongMenu song={song} playlistId={playlistId} />}
            />
            </div>

        </div>
    )
}

export default SongCard
