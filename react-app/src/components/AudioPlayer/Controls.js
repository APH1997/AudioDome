import { useEffect, useState } from 'react'
import {IoPlay, IoPlaySkipBack, IoPlaySkipForward, IoPause} from 'react-icons/io5'
const Controls = ({audioRef}) => {
    const [isPlaying, setisPlaying] = useState(false)
    useEffect(()=>{
        if (isPlaying){
            audioRef.current.play()
        }else {
            audioRef.current.pause()
        }
    },[isPlaying, audioRef])
    return (
        <div>
            <button>
                <IoPlaySkipBack />
            </button>
            <button>
                <IoPlay />
            </button>
            <button>
                <IoPause />
            </button>
            <button>
                <IoPlaySkipForward />
            </button>

        </div>
    )
}
export default Controls
