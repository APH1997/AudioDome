import Controls from "./Controls";
import DisplayTrack from "./DisplayTrack";
import ProgressBar from "./ProgressBar";
import { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'


const AudioPlayer = () => {
    const [currentSong, setCurrentSong] = useState([])
    const audioRef = useRef()
   
    return (
      <div>
        <div>
            <DisplayTrack audioRef={audioRef} track={currentSong}/>
            <Controls audioRef={audioRef}/>
            <ProgressBar />
        </div>
      </div>
    );
  };
  export default AudioPlayer;
