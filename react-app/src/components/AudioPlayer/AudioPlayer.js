import { getAllSongsThunk } from "../../store/currentSong";
import Controls from "./Controls";
import DisplayTrack from "./DisplayTrack";
import ProgressBar from "./ProgressBar";
import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'


const AudioPlayer = () => {
    const dispatch = useDispatch()
    const [currentSong, setCurrentSong] = useState(3)
    const audioRef = useRef()
    const songs = useSelector(state => state.currentSong)
    useEffect(() => {
      dispatch(getAllSongsThunk())
    }, [dispatch])

    const songId = 3

    return (
      <div>
        <div>
            <DisplayTrack audioRef={audioRef} track={songs[currentSong]?.awsUrl}/>
            <Controls audioRef={audioRef}/>
            <ProgressBar />
        </div>
      </div>
    );
  };
  export default AudioPlayer;
