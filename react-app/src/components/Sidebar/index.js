import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "./sidebar.css"
import { BsLinkedin, BsGithub } from "react-icons/bs";

const Sidebar = () => {
  const userObj = useSelector(state => state.session)
  const user = Object.values(userObj)
  console.log(user, 'user');
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
              <Link to="/">Home</Link>
            </div>
          </ul>
          <ul>
            <div>
              <Link to="/songs/all">Browse Songs</Link>
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
        <p>
          <h1>
            <BsLinkedin />
          </h1>
          <h1>
            <BsGithub />
          </h1>
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
