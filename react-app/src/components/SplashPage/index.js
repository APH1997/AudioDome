import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/session";
import { getSongsThunk } from "../../store/songs";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormPage";
import SignupFormModal from "../SignupFormModal";
import "./splashPage.css";

function SplashPage() {
  const dispatch = useDispatch();
  const allSongs = useSelector((state) => state.songs);
  const songIds = Object.keys(allSongs);
  const randomNumber = Math.floor(Math.random() * songIds.length) + 1;
  const [counter, setCounter] = useState(randomNumber);

  useEffect(() => {
    dispatch(getSongsThunk());
    const intervalId = setInterval(() => {
      setCounter((prevCounter) => (prevCounter + randomNumber) % songIds.length);
    }, 4750);
    return () => clearInterval(intervalId);
  }, [dispatch, songIds.length]);

  const handleOnClick = async () => {
    const email = "demoo@aa.io";
    const password = "password";
    const data = await dispatch(login(email, password));
  };

  return (
    <div>

      <div className="splash-page">
        <div className="splashScreenButtons">
          <div className="TitleStuff">
            <h1 className="TitleSplashpage">AUDIODOME</h1>
            <h2 className="slogan">Amplify your listening experience.</h2>
          </div>
          <div className="SplashBottomContainer">
            <div className="loginBtnSplash">
              <div style={{textAlign: "center"}}>
                <h2 className="Logincard">If you have already signed up, Login Here</h2>
              </div>
              <div style={{textAlign: "center"}}>
                <OpenModalButton buttonText="Login" modalComponent={<LoginFormModal />} className="button" />
              </div>
            </div>
            <div className="RotatingPic">
              <div className="TitleStuff">
                <img src={`${allSongs[songIds[counter]]?.songImage}`} alt="Song Cover" className="PicOnSplash" />
              </div>
            </div>
            <div className="signupBtnSplash">
              <div style={{textAlign: "center"}}>
                <h2 className="Logincard">Don't have an account? Signup or select Demo</h2>
              </div>
              <div className="signupbuttondiv">
                <div style={{textAlign: "center"}}>
                  <OpenModalButton buttonText="Signup" modalComponent={<SignupFormModal />} className="button" />
                </div>
                <div>
                  <button onClick={handleOnClick} className="DemoUser">
                    Demo User
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SplashPage;
