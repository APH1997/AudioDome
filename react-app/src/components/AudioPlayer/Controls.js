import { useEffect, useState } from 'react'
import {IoPlay, IoPlaySkipBack, IoPlaySkipForward, IoPause} from 'react-icons/io5'
const Controls = ({audioRef, isDisabled}) => {
    const [isPlaying, setisPlaying] = useState(false)
    useEffect(()=>{
        if (isPlaying){
            audioRef.current.play()
        }else {
            audioRef.current.pause()
        }
    },[isPlaying, audioRef])
    if(isDisabled) setisPlaying(false)
    return (
        <div>
            <button>
                <IoPlaySkipBack />
            </button>
            {!isPlaying ? <button onClick={()=>setisPlaying(true)}><IoPlay /></button> : <button onClick={()=>setisPlaying(false)}><IoPause /></button> }
            <button>
                <IoPlaySkipForward />
            </button>

        </div>
    )
}
export default Controls
