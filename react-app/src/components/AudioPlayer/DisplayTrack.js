const DisplayTrack = ({track, audioRef}) => {

    function endFunc(){
        console.log('song ended')
    }

    return (
    <div>
        <audio src={track} ref={audioRef} onEnded={endFunc}></audio>
    </div>
    )
  };
  export default DisplayTrack;
