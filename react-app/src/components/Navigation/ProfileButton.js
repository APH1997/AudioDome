import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { AiOutlineUser } from "react-icons/ai"
import { useHistory } from "react-router-dom";
import "./ProfileButton.css"

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory()

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

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button className="userbuttonnav" onClick={openMenu}>
    <h1>
        <AiOutlineUser style={{backgroundColor: 'transparent'}}/>
    </h1>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <ul>{user.username}</ul>
            <ul>{user.email}</ul>
            <ul>
              <button className="LogOutBtn" onClick={handleLogout}>Log Out</button>
            </ul>
          </>
        ) : (
           null
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
