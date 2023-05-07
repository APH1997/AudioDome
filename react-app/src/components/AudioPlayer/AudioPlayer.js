import Controls from "./Controls";
import DisplayTrack from "./DisplayTrack";
import ProgressBar from "./ProgressBar";
import { useState, useRef } from 'react'


const AudioPlayer = () => {
    const [currentSong, setCurrentSong] = useState("http://audiodome-songs.s3.amazonaws.com/d20c1dfd8246499c92689fa7af778411.mp3")
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
