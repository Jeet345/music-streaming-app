import React, { useEffect, useRef, useState } from "react";
import "../../styles/Player/player.css";
import Volume from "./Volume";

import { useDispatch, useSelector } from "react-redux";
import Control from "./Control";
import {
  setIsPlaying,
  setSongIsRepeat,
  setSongQueueIsVisible,
} from "../../actions";
import { MdQueueMusic, MdRepeat, MdShuffle } from "react-icons/md";

function Player() {
  const audioPlayer = useRef();
  const progressBar = useRef();
  const animationRef = useRef();
  const progressFill = useRef();

  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const songData = JSON.parse(
    useSelector((state) => state.changeCurrPlayingSong)
  );

  const dispatch = useDispatch();
  const isPlaying = useSelector((state) => state.changeIsPlaying);
  const isLoop = useSelector((state) => state.changeSongIsRepeat);
  const queueIsVisible = useSelector((state) => state.changeSongQueueIsVisible);

  // console.log("curr: " + currentTime, "dur : " + duration);

  useEffect(() => {
    const currentSec = Math.floor(audioPlayer.current.currentTime);
    if (currentSec != 0 && currentTime == duration) {
      if (!isLoop) {
        dispatch(setIsPlaying(false));
        cancelAnimationFrame(whilePlaying);
      } else {
        audioPlayer.current.currentTime = 0;
      }
    }
  }, [currentTime]);

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
    if (currentTime != progressBar.current.value) {
      setCurrentTime(progressBar.current.value);
    }
    progressFill.current.style.setProperty(
      "width",
      `${(progressBar.current.value / audioPlayer.current.duration) * 100}%`
    );
  };

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    animationRef.current = requestAnimationFrame(whilePlaying);
    if (currentTime != progressBar.current.value) {
      setCurrentTime(progressBar.current.value);
    }
    progressFill.current.style.setProperty(
      "width",
      `${(progressBar.current.value / audioPlayer.current.duration) * 100}%`
    );
  };

  const handleSongQueueClick = () => {
    dispatch(setSongQueueIsVisible(!queueIsVisible));
  };

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
        setIsLoaded={setIsLoaded}
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

      <div className="right-controls">
        <button
          className={queueIsVisible ? "active" : ""}
          onClick={handleSongQueueClick}
          title="Toggle Queue"
        >
          <MdQueueMusic />
        </button>
        <button title="Toggle Shuffle">
          <MdShuffle />
        </button>
        <button
          title="Repeat"
          className={isLoop ? "active" : ""}
          onClick={() => {
            dispatch(setSongIsRepeat(!isLoop));
          }}
        >
          <MdRepeat />
        </button>
      </div>

      <Volume audioPlayer={audioPlayer} />
    </div>
  );
}

export default Player;
