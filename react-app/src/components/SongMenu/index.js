import { BsThreeDots } from 'react-icons/bs'
import React, { useState, useEffect, useRef } from "react"
import { useDispatch } from "react-redux";

function SongMenu() {
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
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);


    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
    const closeMenu = () => setShowMenu(false);

    return (
        <>
            <button onClick={openMenu}>
                <BsThreeDots />
            </button>
            <ul className={ulClassName} ref={ulRef}>
                <li>Add To Playlist</li>
                <li>Remove from Playlist</li>
                <li>Update Song</li>
                <li>Delete Song</li>
            </ul>
        </>
    )
}


export default SongMenu
