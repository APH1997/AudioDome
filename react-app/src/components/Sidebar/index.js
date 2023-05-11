import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const user = useSelector(state => state.session)
  console.log(user);
  // const userId = user.user.id
  return (
    <div className="sidebar">
      <ul>
        <ul>
          <Link to="/">Home</Link>
        </ul>
        <ul>
          <Link to="/search">Search</Link>
        </ul>
        <ul>
          {/* <Link to={`/users/${userId}`}>Your Library</Link> */}
        </ul>
        <ul>
          <Link to="/playlist/new">Create Playlist</Link>
        </ul>
        <ul>
          <Link to="/likedsong">Liked Songs</Link>
        </ul>
      </ul>
    </div>
  );
};

export default Sidebar;
