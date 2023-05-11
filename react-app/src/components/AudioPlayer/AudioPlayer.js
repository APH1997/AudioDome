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
  const progressBar = useRef()
  const animationRef = useRef()
  const songs = useSelector(state => state.currentSong)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [volume1, setVolume] = useState(20)
  const [duration, setDuration] = useState(0)
  const [currTime, setCurrTime] = useState(0)
  const songIds = Object.keys(songs)

  useEffect(() => {
    dispatch(getAllSongsThunk())
  }, [dispatch])

  useEffect(() => {
    audioRef.current.volume = volume1 / 100
  }, [volume1])

  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener('loadedmetadata', () => {
      const seconds = Math.floor(audio.duration);
      setDuration(seconds);
      progressBar.current.max = seconds;
    });
    audio.addEventListener('ended', () => {
      setCurrentSongIndex((currentSongIndex + 1) % songIds.length)
      audio.currentTime = 0
      audio.play()
    })
    audio.addEventListener('timeupdate', () => {
      if (audio.currentTime === 0) {
        audio.play();
      }
    });
    return () => {
      audio.removeEventListener('loadedmetadata', () => {
      });
    };
  }, [audioRef, currentSongIndex, songIds]);

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  }

  const handleNextSong = () => {
    setCurrentSongIndex((currentSongIndex + 1) % songIds.length)
    audioRef.current.currentTime = 0
  }
  function skipForward() {
    setCurrentSongIndex((currentSongIndex + 1) % songIds.length)
    if (currentSongIndex === songIds.length - 1) {
      setCurrentSongIndex(0)
    }
  }

  const changeRange = () => {
    audioRef.current.currentTime = progressBar.current.value
    progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
    setCurrTime(progressBar.current.value)
  }

  function skipBack() {
    setCurrentSongIndex((currentSongIndex - 1 + songIds.length) % songIds.length)
  }

  const whilePlaying = () => {
    progressBar.current.value = audioRef.current.currentTime;
    progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
    setCurrTime(progressBar.current.value)
    animationRef.current = requestAnimationFrame(whilePlaying)
  }


  return (
    <div>
      <div className="AudioPlayerContainer">
        <div>
        <img className="coverArtSong" src={`${songs[songIds[currentSongIndex]]?.songImage}`} />
        </div>
        <div className="skipBackBtn">
          <button onClick={skipBack}>
            <IoPlaySkipBack />
          </button>
        </div>
        <div className="PlayPauseBtn">
          <DisplayTrack audioRef={audioRef} track={songs[songIds[currentSongIndex]]?.awsUrl} />
          <Controls whilePlaying={whilePlaying} audioRef={audioRef} handleNextSong={handleNextSong} animationRef={animationRef} />
        </div>
        <div className="skipForwardBtn">
          <button onClick={skipForward} className="skipForward">
            <IoPlaySkipForward />
          </button>
        </div>
        <div className="artistSongContainer">
          <div className="scroll-container">
            <div className="songTitleandArtist">
              {songs[songIds[currentSongIndex]]?.title}
            </div>
            <div className="songArtist">
              {songs[songIds[currentSongIndex]]?.artist}
            </div>
          </div>
        </div>
        <div className="ProgressBar">
          <span className="timeInBar">
            {calculateTime(currTime)}
          </span>
          <div>
            <input type="range" className='progressBar' defaultValue="0" ref={progressBar} onChange={changeRange} />
          </div>
          <span className="timeInBar">
            {(duration && !isNaN(duration)) && calculateTime(duration)}
          </span>
        </div>
        <input type="range" value={volume1} onChange={e => setVolume(e.target.value)}></input>
        {`${volume1}`}
      </div>
    </div>
  );
};

export default AudioPlayer
