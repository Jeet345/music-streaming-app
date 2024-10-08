import React, { useEffect, useRef, useState } from "react";
import "../../styles/Player/player.css";
import Volume from "./Volume";

import { useDispatch, useSelector } from "react-redux";
import Control from "./Control";
import {
  setCurrPlayingSong,
  setIsPlaying,
  setSongIsRepeat,
  setSongQueueIsVisible,
} from "../../actions";
import { MdQueueMusic, MdRepeat, MdShuffle } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "@mui/material";
import LyricsDialogBox from "../../common/LyricsDialogBox";

function Player() {
  const audioPlayer = useRef();
  const progressBar = useRef();
  const animationRef = useRef();
  const progressFill = useRef();

  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [lyricsDialogIsOpen, setlyricsDialogIsOpen] = useState(false);

  const songData = JSON.parse(
    useSelector((state) => state.changeCurrPlayingSong)
  );

  const dispatch = useDispatch();
  const isPlaying = useSelector((state) => state.changeIsPlaying);
  const isLoop = useSelector((state) => state.changeSongIsRepeat);
  const queueIsVisible = useSelector((state) => state.changeSongQueueIsVisible);
  const songQueueData = JSON.parse(
    useSelector((state) => state.changeTheQueue)
  );
  const currPlayingSong = JSON.parse(
    useSelector((state) => state.changeCurrPlayingSong)
  );

  useEffect(() => {
    if (
      isLoaded &&
      `${process.env.REACT_APP_API}getAudio/${songData.trackFileName}` !=
        audioPlayer.current.currentSrc
    ) {
      axios({
        url: `${process.env.REACT_APP_API}songs/updatePlays`,
        method: "post",
        data: {
          id: songData._id,
        },
      })
        .then((res) => {
          console.log("plays incress");
        })
        .catch((err) => {
          console.log("Something Wan't Wrong");
        });

      // console.log("song change");
    }
  }, [songData]);

  useEffect(() => {
    const currentSec = audioPlayer.current.currentTime;

    if (currentSec != 0 && currentSec == duration) {
      if (!isLoop) {
        let newIndex = 0;

        if (songQueueData.length > 1) {
          songQueueData.map((data, elem) => {
            if (data._id == currPlayingSong._id) {
              if (elem == songQueueData.length - 1) {
                newIndex = 0;
                toast.info("Queue is playing from first song !!");
              } else {
                newIndex = elem + 1;
              }
            }
          });
          dispatch(setCurrPlayingSong(JSON.stringify(songQueueData[newIndex])));
        } else {
          dispatch(setIsPlaying(false));
          cancelAnimationFrame(whilePlaying);
        }
      } else {
        audioPlayer.current.currentTime = 0;
        audioPlayer.current.play();
      }
    }
  }, [currentTime]);

  const handleLyricsDialogClose = () => {
    setlyricsDialogIsOpen(false);
  };

  // when load data of audio file
  const onLoadedMetadata = () => {
    const seconds = audioPlayer.current.duration;

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
      setCurrentTime(audioPlayer.current.currentTime);
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
      setCurrentTime(audioPlayer.current.currentTime);
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
    <>
      <div className="player-container">
        <audio
          controls
          style={{ display: "none" }}
          ref={audioPlayer}
          onLoadedMetadata={onLoadedMetadata}
        >
          <source
            src={`${process.env.REACT_APP_API}getAudio/${songData.trackFileName}`}
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
          <Button
            className="lyrics-btn"
            onClick={() => {
              if (songData.lyrics) {
                setlyricsDialogIsOpen(true);
              } else {
                toast.info("Could not find lyrics for this song.", {
                  toastId: "not found",
                });
              }
            }}
            // disabled={!songData.lyrics}
            variant="text"
          >
            Lyrics
          </Button>
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

      {songData.lyrics ? (
        <LyricsDialogBox
          currentTime={currentTime}
          isOpen={lyricsDialogIsOpen}
          handleClose={handleLyricsDialogClose}
        />
      ) : null}
    </>
  );
}

export default Player;
