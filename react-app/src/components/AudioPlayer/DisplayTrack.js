const DisplayTrack = ({track, audioRef}) => {
    return (
    <div>
        <audio src={track} ref={audioRef}></audio>
    </div>
    )
  };
  export default DisplayTrack;
