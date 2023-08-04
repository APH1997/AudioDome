import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import GetAllSongs from "./components/GetAllSongs";
import CreateSongForm from "./components/CreateSongForm";
import UpdateSongForm from "./components/SongUpdate";
import Navigation from "./components/Navigation";
import GetPlaylist from "./components/GetPlaylist";
import PlaylistPage from "./components/PlaylistPage";
import PlaylistForm from "./components/CreatePlaylistForm";
import EditPlaylistForm from "./components/EditPlaylistForm";
import UserPage from "./components/UserPage";
import LikedSongs from "./components/LikedSongs";
import SplashPage from "./components/SplashPage";
import UhOh from "./components/UhOhPage";
import ReactParticles from "./components/ReactParticles";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector(state => state.session.user)
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <div className="main-content">
        {isLoaded && user && (
          <Switch>
            <Route exact path='/playlist/new'>
              <PlaylistForm />
            </Route>
            <Route exact path='/playlist/:playlistId/edit'>
              <EditPlaylistForm />
            </Route>
            <Route exact path="/login">
              <LoginFormPage />
            </Route>
            <Route exact path="/signup">
              <SignupFormPage />
            </Route>
            <Route exact path="/">
              <GetPlaylist />
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
            <Route exact path='/songs/all'>
              <GetAllSongs />
            </Route>
            <Route exact path='/users/:userId'>
              <UserPage />
            </Route>
            <Route exact path='/users/:userId/liked'>
              <h1>Here are your liked songs</h1>
              <LikedSongs />
            </Route>
            <UhOh />
          </Switch>
        )}
        {isLoaded && !user && (
          <Switch>
            <Route>
              <SplashPage />
            </Route>
          </Switch>
        )}
      </div>
    </>
  );
}

export default App;
