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
  const [counter, setCounter] = useState(0); // use useState() to update counter

  useEffect(() => {
    dispatch(getSongsThunk());
    const intervalId = setInterval(() => {
      setCounter((prevCounter) => (prevCounter + 1) % songIds.length); // use setCounter() to update counter
    }, 4750);
    return () => clearInterval(intervalId); // clear interval on component unmount
  }, [dispatch, songIds.length]); // include songIds.length in dependencies array

  const handleOnClick = async () => {
    const email = "demoo@aa.io";
    const password = "password";
    const data = await dispatch(login(email, password));
  };

  return (
    <>
      <div className="TitleStuff">
        <h1 className="TitleSplashpage">AUDIODOME</h1>
        <h2 className="slogan">Amplify your listening experience.</h2>
      </div>

      <div className="RotatingPic">
        <img src={`${allSongs[songIds[counter]]?.songImage}`} alt="Song Cover" className="PicOnSplash" />
      </div>
      <div className="splashScreenButtons">
        <div className="loginBtnSplash">
          <div>
            <h2 className="Logincard">If you have already signed up before Login Here</h2>
          </div>
          <div>
            <OpenModalButton buttonText="Login" modalComponent={<LoginFormModal />} className="button" />
          </div>
        </div>
        <div className="signupBtnSplash">
          <div>
            <h2 className="Logincard">If you do not have a profile Sign Up here</h2>
          </div>
          <div className="signupbuttondiv">
            <div >
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
    </>
  );
}

export default SplashPage;
