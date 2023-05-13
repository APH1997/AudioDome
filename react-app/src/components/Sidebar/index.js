import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "./sidebar.css"
import { BsLinkedin, BsGithub } from "react-icons/bs";
import { GrHomeRounded,GrSearch } from "react-icons/gr"

const Sidebar = () => {
  const userObj = useSelector(state => state.session)
  const user = Object.values(userObj)
  // console.log(user, 'user');
  if (!user[0]) {
    return ''
  }
  const userId = user[0].id
  return (
    <div className="sidebar">
      <div className='sidebarContainer'>
        <ul>
          <ul>
            <div>
              <Link className="white-icon hover-teal" to="/">Home <GrHomeRounded /></Link>
            </div>
          </ul>
          <ul>
            <div>
              <Link className="white-icon1 hover-teal1" to="/songs/all">Browse Songs <GrSearch /></Link>
            </div>
          </ul>
          <ul>
            <div>
              <Link to={`/users/${userId}`}>Your Library</Link>
            </div>
          </ul>
          <ul>
            <div>
              <Link to="/playlist/new">Create Playlist</Link>
            </div>
          </ul>
          <ul>
            <div>
              <Link to="/songs/new">Create Song</Link>
            </div>
          </ul>
          <ul>
            <div>
              <Link to="/users/:userId/liked">Liked Songs</Link>
            </div>
          </ul>
        </ul>
      </div>
      <div>
        <div className='icons-bottom'>
          <h1>
            <BsGithub />
          </h1>
          <a href='https://github.com/APH1997' target="_blank">Andre</a>
          <a href="https://github.com/bzhang50167" target="_blank">Bao</a>
          <a href="https://github.com/DomenikMoody" target="_blank">Dom</a>
          <a href="https://github.com/FrancisHuynh95" target="_blank">Francis</a>
          <h1>
            <BsLinkedin />
          </h1>
          <a href='https://www.linkedin.com/in/andre-hristu-012842164/' target="_blank">Andre</a>
          <a href="https://www.linkedin.com/in/bao-heng-zhang-b43731256/" target="_blank">Bao</a>
          <a href="https://www.linkedin.com/in/domenik-moody-90370521b/" target="_blank">Dom</a>
          <a href="https://www.linkedin.com/in/francis-huynh-153246161/" target="_blank">Francis</a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
