import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import GetAllSongs from "./components/GetAllSongs";
import CreateSongForm from "./components/CreateSongForm";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import GetAllPlaylist from "./components/GetPlaylist";

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
          <Route exact path="/login">
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/">
            <GetAllSongs />
            <GetAllPlaylist />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
