import React, { useEffect, useRef, useState } from "react";
import "../../styles/Player/player.css";
import Volume from "./Volume";

import { BiLoaderAlt } from "react-icons/bi";

import {
  MdSkipNext,
  MdPlayArrow,
  MdPause,
  MdShuffle,
  MdRepeat,
  MdQueueMusic,
  MdSkipPrevious,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Control from "./Control";
import { setIsPlaying } from "../../actions";

function Player() {
  const audioPlayer = useRef();
  const progressBar = useRef();
  const animationRef = useRef();
  const progressFill = useRef();

  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoop, setIsLoop] = useState(false);

  const songData = JSON.parse(
    useSelector((state) => state.changeCurrPlayingSong)
  );

  const dispatch = useDispatch();
  const isPlaying = useSelector((state) => state.changeIsPlaying);

  console.log("curr: " + currentTime, "dur : " + duration);

  useEffect(() => {
    if (!isLoop) {
      const currentSec = Math.floor(audioPlayer.current.currentTime);
      if (currentSec != 0 && currentTime == duration) {
        cancelAnimationFrame(whilePlaying);
        togglePlayPause();
      }
    }
  }, [currentTime]);

  //play pause button toggle
  const togglePlayPause = () => {
    // const preValue = isPlaying;
    dispatch(setIsPlaying(!isPlaying));
    if (!isPlaying) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  // when load data of audio file
  const onLoadedMetadata = () => {
    const seconds = Math.floor(audioPlayer.current.duration);
    progressBar.current.max = seconds;
    setDuration(seconds);
    setIsLoaded(true);
  };

  // formate seconds in form of (00:00)
  const calculateTime = (sesc) => {
    const minutes = Math.floor(sesc / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(sesc % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  // when range is chnaged
  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    setCurrentTime(progressBar.current.value);
    progressFill.current.style.setProperty(
      "width",
      `${(progressBar.current.value / audioPlayer.current.duration) * 100}%`
    );
  };

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime; //  here
    animationRef.current = requestAnimationFrame(whilePlaying);
    setCurrentTime(progressBar.current.value);
    progressFill.current.style.setProperty(
      "width",
      `${(progressBar.current.value / audioPlayer.current.duration) * 100}%`
    );
  };

  console.log("loaded");

  return (
    <div className="player-container">
      <audio
        controls
        style={{ display: "" }}
        ref={audioPlayer}
        onLoadedMetadata={onLoadedMetadata}
      >
        <source
          src={`http://localhost:4000/getAudio/${songData.trackFileName}`}
          type="audio/mp3"
        />
      </audio>

      <Control
        audioPlayer={audioPlayer}
        isLoaded={isLoaded}
        songData={songData}
        whilePlaying={whilePlaying}
        animationRef={animationRef}
      />

      <div className="progress-box">
        <h5 className="elapsed-time">{calculateTime(currentTime)}</h5>
        <div className="progress-bar">
          <input
            type="range"
            className="progress-range"
            defaultValue={0}
            ref={progressBar}
            onChange={changeRange}
          />
          <div ref={progressFill} className="range-fill"></div>
        </div>
        <h5 className="track-time">
          {duration && !isNaN(duration) ? calculateTime(duration) : "00:00"}
        </h5>
      </div>

      <Volume audioPlayer={audioPlayer} />
    </div>
  );
}

export default Player;
