import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
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
          <Link to="/playlists/:userId">Your Playlist</Link>
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
