import Controls from "./Controls";
import DisplayTrack from "./DisplayTrack";
import ProgressBar from "./ProgressBar";
import { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'


const AudioPlayer = () => {
    const [currentSong, setCurrentSong] = useState([])
    const audioRef = useRef()
    const songs = useSelector(state=> state.currentSong)
    const songArray = Object.values(songs)
    let counter = 0
    setCurrentSong(songArray[counter])
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
