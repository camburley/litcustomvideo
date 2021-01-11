import React, { useState } from 'react'
import {ReactComponent as Goat} from './images/goat.svg';
import ReactPlayer from 'react-player'
import './App.css';

const App = () => {

  const beLikeMike = `https://superwall.s3.us-east-2.amazonaws.com/content/beLikeMike.mp4`

    const [media, setMedia] = useState({ duration: 0 });
    const [isPlaying, setIsPlaying] = useState(null)
    const [clockTime, setClockTime] = useState(0)
    
    const handlePlayClick = () => {
      return setIsPlaying(true);
    };
  
    const handlePauseClick = () => {
      return setIsPlaying(false);
    };
  
    const handleOnProgress = (value) => {
      const secs = value.playedSeconds
      setClockTime((prevState) => {return { ...prevState, secs}})
    }

    const handleOnDuration = (value) => {
      const duration = value
      setMedia((prevState) => {return {...prevState, duration: duration}})
    }
    
  return (
    <div className="App-header">
       <div className={"videoContainer"}>
          
          <ReactPlayer url={beLikeMike} onDuration={handleOnDuration} onProgress={handleOnProgress} playing={isPlaying} />
            { isPlaying && clockTime.secs < 3 && clockTime.secs < media.duration 
             ? <i className={"watermark"}><Goat width={70}/></i> 
             : clockTime.secs >= media.duration - 3 ? <i className={"_watermark"}><Goat width={70}/></i> 
             : ''
           }
            </div>
           {isPlaying ? (
       <button onClick={handlePauseClick}>Pause</button>
     ) : (
       <button onClick={handlePlayClick}>Play</button>
     )}
     
     {  clockTime.secs ?  Math.floor(clockTime.secs / 1) : '' }
    </div>
  );
}

export default App;
