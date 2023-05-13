import React from 'react'
import OpenModalButton from "../OpenModalButton";
import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux";
import DeleteSong from '../DeleteSongModal/DeleteSong';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal'
import AddToPlaylist from '../AddToPlaylistModal/addToPlaylist';
import DeleteFromPlaylist from '../DeleteFromPlaylistModal';
import './SongMenu.css'
function SongMenu({ song, playlistId }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const user = useSelector(state => state.session)
    const history = useHistory()
    const { closeModal } = useModal()
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

    function handleUpdate() {
        closeModal()
        history.push(`/song/${song.id}/edit`)
    }

    return (
        <div className='modal'>
            <div>
                <h1>SONG PAGE</h1>
            </div>
            <ul>
                <div>
                    <OpenModalButton
                        buttonText="Add to a playlist"
                        onItemClick={closeMenu}
                        modalComponent={<AddToPlaylist song={song} />}
                    />
                </div>
                <div>
                    <OpenModalButton
                        buttonText="Delete from playlist"
                        onItemClick={closeMenu}
                        modalComponent={<DeleteFromPlaylist song={song} playlistId={playlistId} />}
                    />
                </div>
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
        </div>
    )
}


export default SongMenu
