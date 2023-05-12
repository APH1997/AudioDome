import { useEffect, useState } from 'react'
import {IoPlay, IoPlaySkipBack, IoPlaySkipForward, IoPause} from 'react-icons/io5'

const Controls = ({audioRef, isDisabled, animationRef, whilePlaying}) => {
    const [isPlaying, setisPlaying] = useState(false)

    useEffect(()=>{
        if (isPlaying){
            audioRef.current.play()
            animationRef.current = requestAnimationFrame(whilePlaying)
        }else {
            audioRef.current.pause()
            cancelAnimationFrame(animationRef.current)
        }
    },[isPlaying, audioRef])


    return (
        <div className='PlayPauseBtn'>
            {!isPlaying ? <button className="buttons" onClick={()=>setisPlaying(true)}><IoPlay /></button> : <button className="buttons" onClick={()=>setisPlaying(false)}><IoPause /></button> }
        </div>
    )
}
export default Controls
