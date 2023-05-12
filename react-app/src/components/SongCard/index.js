import React from 'react'
import "./songcards.css"
import { BsThreeDots } from 'react-icons/bs'
import SongMenu from "../SongMenuModal"
import OpenModalButton from "../OpenModalButton";
import  {useState, useEffect, useRef } from "react"
import { useDispatch } from "react-redux";
import LikeForm from './likeform';
import { soloSongThunk } from '../../store/songs';
import { playOneSongThunk } from '../../store/currentSong';


function SongCard({song, number, playlistId}){

    const dispatch = useDispatch()

    useEffect(() => {
        console.log('number changed')
    }, [number])

    const handelClick = (song) => {
        // console.log(song,'see what this is');
        dispatch(playOneSongThunk(song.id))
    }


    return(
        <div onClick={e => handelClick(song)} className='number-play'>
            <td >{number}</td>
            <td>{song?.title}</td>
            <td>{song?.artist}</td>
            <td>{song?.uploader}</td>
            <td><LikeForm song={song} /></td>
            <td>
                <OpenModalButton
                buttonText= {< BsThreeDots />}
                modalComponent={<SongMenu song={song} playlistId={playlistId} />}/>
            </td>

        </div>
    )
}

export default SongCard
