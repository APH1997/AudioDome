import Controls from "./Controls";
import DisplayTrack from "./DisplayTrack";
import ProgressBar from "./ProgressBar";
import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllSongsThunk } from "../../store/currentSong";

const AudioPlayer = () => {
  const audioRef = useRef()
  const dispatch = useDispatch()
  const songs = useSelector(state => state.currentSong)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const songIds = Object.keys(songs)

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

  return (
    <div>
      <div>
        <DisplayTrack audioRef={audioRef} track={songs[songIds[currentSongIndex]]?.awsUrl} />
        <Controls audioRef={audioRef} handleNextSong={handleNextSong} />
        <ProgressBar />
      </div>
    </div>
  );
};
export default AudioPlayer;
