import React from 'react'
import "./songcards.css"
import { BsThreeDots } from 'react-icons/bs'
import SongMenu from "../SongMenuModal"
import OpenModalButton from "../OpenModalButton";
import  {useState, useEffect, useRef } from "react"
import { useDispatch } from "react-redux";
import LikeForm from './likeform';


function SongCard({song, number, playlistId}){

    return(
        <>
            <td>{number}</td>
            <td>{song?.title}</td>
            <td>{song?.artist}</td>
            <td>{song?.uploader}</td>
            <td><LikeForm song={song} /></td>
            <td>
                <OpenModalButton
                buttonText= {< BsThreeDots />}
                modalComponent={<SongMenu song={song} playlistId={playlistId} />}/>
            </td>

        </>
    )
}

export default SongCard
