import { getAllSongsThunk } from "../../store/currentSong";
import Controls from "./Controls";
import DisplayTrack from "./DisplayTrack";
import ProgressBar from "./ProgressBar";
import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { IoPlay, IoPlaySkipBack, IoPlaySkipForward, IoPause } from 'react-icons/io5'


const AudioPlayer = () => {
  const dispatch = useDispatch()
  const [currentSong, setCurrentSong] = useState(3)
  const audioRef = useRef()
  const songs = useSelector(state => state.currentSong)
  useEffect(() => {
    dispatch(getAllSongsThunk())
  }, [dispatch])

  function skipForward() {
    setCurrentSong(currentSong + 1)
    return
  }
  function skipBack() {
    return setCurrentSong(currentSong - 1)
  }
  useEffect(() => {
    audioRef.current.play()
  },[currentSong])


return (
  <div>
    <div>
      <button onClick={skipForward}>
        <IoPlaySkipForward />
      </button>
      <DisplayTrack audioRef={audioRef} track={songs[currentSong]?.awsUrl} />
      <Controls audioRef={audioRef} />
      <button onClick={skipBack}>
        <IoPlaySkipBack />
      </button>
      <ProgressBar />
    </div>
  </div>
);
  };
export default AudioPlayer;
