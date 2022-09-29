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
import { useSelector } from "react-redux";

function Player() {
  console.log("loaded");

  // state
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [source, setSource] = useState(
    "https://pagalworld.com.se/files/download/id/2836"
  );
  const [isLoop, setIsLoop] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const songData = JSON.parse(
    useSelector((state) => state.changeCurrPlayingSong)
  );

  useEffect(() => {
    audioPlayer.current.load();
  }, []);

  //reference
  const audioPlayer = useRef();
  const progressBar = useRef();
  const animationRef = useRef();
  const progressFill = useRef();

  useEffect(() => {
    if (!isLoop) {
      const currentSec = Math.floor(audioPlayer.current.currentTime);
      if (currentSec != 0 && currentTime == duration) {
        cancelAnimationFrame(whilePlaying);
        //   togglePlayPause();
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

  //play pause button toggle
  const togglePlayPause = () => {
    // const preValue = isPlaying;
    console.log("playing :", isPlaying);
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
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

  const changeAudio = (src) => {
    // setIsLoaded(false);

    // setSource(src);

    audioPlayer.current.load();

    // if (!isPlaying) {
    //    togglePlayPause();
    // } else {
    //    audioPlayer.current.play();
    // }

    // console.log(duration);
  };

  const loopAudio = () => {
    setIsLoop(!isLoop);
    if (isLoop) {
      audioPlayer.current.loop = false;
    } else {
      audioPlayer.current.loop = true;
    }
  };

  useEffect(() => {
    changeAudio();
  }, [songData]);

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

      <div className="left-controls">
        <button className="prev-btn">
          <MdSkipPrevious />
        </button>
        <button className="play-btn" onClick={togglePlayPause}>
          {isLoaded ? (
            isPlaying ? (
              <MdPause />
            ) : (
              <MdPlayArrow />
            )
          ) : (
            <BiLoaderAlt className="spin" />
          )}
        </button>
        <button
          className="next-btn"
          onClick={() =>
            changeAudio(
              "https://pwdown.com/112399/06.%20Mujhko%20Yaad%20Sataye%20Teri.mp3"
            )
          }
        >
          <MdSkipNext />
        </button>
      </div>

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
        <button className="active" title="Queue">
          <MdQueueMusic />
        </button>
        <button title="Shuffle">
          <MdShuffle />
        </button>
        <button
          title="Repeat"
          className={isLoop ? "active" : ""}
          onClick={loopAudio}
        >
          <MdRepeat />
        </button>
      </div>

      <Volume audioPlayer={audioPlayer} />
    </div>
  );
}

export default Player;
