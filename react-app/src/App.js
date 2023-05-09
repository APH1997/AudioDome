import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import GetAllSongs from "./components/GetAllSongs";
import CreateSongForm from "./components/CreateSongForm";
import UpdateSongForm from "./components/SongUpdate";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import GetAllPlaylist from "./components/GetPlaylist";
import PlaylistShow from "./components/PlaylistShow";
import PlaylistPage from "./components/PlaylistPage";
import PlaylistForm from "./components/CreatePlaylistForm";
import SearchBar from "./components/SearchBar";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/playlist/new'>
            <PlaylistForm />
          </Route>
          <Route exact path="/login">
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/">
            <GetAllPlaylist />
            <GetAllSongs />
          </Route>
          <Route exact path='/playlist/:playlistId'>
            <PlaylistPage />
          </Route>
          <Route exact path='/song/:songId/edit'>
            <UpdateSongForm />
          </Route>
          <Route exact path='/songs/new'>
            <CreateSongForm />
          </Route>
          <Route exact path='/search'>
            <SearchBar />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
