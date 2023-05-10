import Controls from "./Controls";
import DisplayTrack from "./DisplayTrack";
import ProgressBar from "./ProgressBar";
import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllSongsThunk } from "../../store/currentSong";
import { IoPlaySkipBack, IoPlaySkipForward } from 'react-icons/io5'
import './audioplayer.css'

const AudioPlayer = () => {
  const dispatch = useDispatch()
  const audioRef = useRef()
  const songs = useSelector(state => state.currentSong)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const songIds = Object.keys(songs)

  useEffect(() => {
    dispatch(getAllSongsThunk())
  }, [dispatch])

  useEffect(() => {
    audioRef.current.play()
  }, [currentSongIndex])

  useEffect(() => {
    dispatch(getAllSongsThunk())
  }, [dispatch])

  useEffect(() => {
    const audio = audioRef.current
    audio.play()
    audio.addEventListener('ended', () => {
      setCurrentSongIndex((currentSongIndex + 1) % songIds.length)
      audio.currentTime = 0
      audio.play()
    })
    return () => {
      audio.removeEventListener('ended', () => {
        setCurrentSongIndex((currentSongIndex + 1) % songIds.length)
        audio.currentTime = 0
        audio.play()
      })
    }
  }, [audioRef, currentSongIndex, songIds])

  const handleNextSong = () => {
    setCurrentSongIndex((currentSongIndex + 1) % songIds.length)
    audioRef.current.currentTime = 0
    audioRef.current.play()
  }
  function skipForward() {
    setCurrentSongIndex(currentSongIndex + 1)
    return
  }
  function skipBack() {
    return setCurrentSongIndex(currentSongIndex - 1)
  }

  return (
    <div>
      <div className="AudioPlayerContainer">
        <div className="skipBackBtn">
          <button onClick={skipBack}>
            <IoPlaySkipBack />
          </button>
        </div>
        <div className="PlayPauseBtn">
          <DisplayTrack audioRef={audioRef} track={songs[songIds[currentSongIndex]]?.awsUrl} />
          <Controls audioRef={audioRef} handleNextSong={handleNextSong} />
        </div>
        <div className="skipForwardBtn">
          <button onClick={skipForward}>
            <IoPlaySkipForward />
          </button>
        </div>
        <div className="ProgressBar">
          <ProgressBar />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer
