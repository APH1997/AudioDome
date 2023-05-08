import React from 'react'
import OpenModalButton from "../OpenModalButton";
import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux";
import DeleteSong from '../DeleteSongModal/DeleteSong';
import { useHistory } from 'react-router-dom';
import {useModal} from '../../context/Modal'

function SongMenu({ song }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const user = useSelector(state => state.session)
    const history = useHistory()
    const {closeModal} = useModal()
    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);


    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
    const closeMenu = () => setShowMenu(false);

    function handleUpdate(){
        closeModal()
        history.push('/')
    }

    return (
        <>
            <ul>
                <li>Add to Playlist</li>
                <li>Remove from Playlist</li>
                {user.user.username === song.uploader &&
                    <>
                        <div>
                            <OpenModalButton
                                buttonText="Delete Song"
                                onItemClick={closeMenu}
                                modalComponent={<DeleteSong song={song} />}
                            />
                            <button onClick={() => handleUpdate()}>Update Song</button>
                        </div>
                    </>
                }
            </ul>
        </>
    )
}


export default SongMenu
