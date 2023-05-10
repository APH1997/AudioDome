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
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            e.stopPropagation()
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);


    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
    const closeMenu = () => setShowMenu(false);

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
                onItemClick={closeMenu}
                modalComponent={<SongMenu song={song} playlistId={playlistId} />}
            />
            </div>

        </div>
    )
}

export default SongCard
