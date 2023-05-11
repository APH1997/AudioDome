import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const userObj = useSelector(state => state.session)
  const user = Object.values(userObj)
  console.log(user, 'user');
  if(!user[0]){
    return ''
  }
  const userId = user[0].id
  return (
    <div className="sidebar">
      <ul>
        <ul>
          <Link to="/">Home</Link>
        </ul>
        <ul>
          <Link to="/songs/all">Browse Songs</Link>
        </ul>
        <ul>
          <Link to={`/users/${userId}`}>Your Library</Link>
        </ul>
        <ul>
          <Link to="/playlist/new">Create Playlist</Link>
        </ul>
        <ul>
          <Link to="/songs/new">Create Song</Link>
        </ul>
        <ul>
          <Link to="/likedsong">Liked Songs</Link>
        </ul>
      </ul>
    </div>
  );
};

export default Sidebar;
