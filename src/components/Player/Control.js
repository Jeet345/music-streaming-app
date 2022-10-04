import React, { useEffect, useRef, useState } from "react";
import {
  MdSkipNext,
  MdPlayArrow,
  MdPause,
  MdSkipPrevious,
} from "react-icons/md";
import { BiLoaderAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setCurrPlayingSong, setIsPlaying } from "../../actions";

import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Control(prop) {
  const dispatch = useDispatch();
  const isPlaying = useSelector((state) => state.changeIsPlaying);
  const songQueueData = JSON.parse(
    useSelector((state) => state.changeTheQueue)
  );
  const currPlayingSong = JSON.parse(
    useSelector((state) => state.changeCurrPlayingSong)
  );

  const audioPlayer = prop.audioPlayer;
  const animationRef = prop.animationRef;

  const togglePlayPause = () => {
    dispatch(setIsPlaying(!isPlaying));
  };

  let queueEmptyToastId = "queue empty";

  useEffect(() => {
    if (isPlaying) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(prop.whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  }, [isPlaying]);

  const changeAudio = () => {
    audioPlayer.current.load();

    if (isPlaying) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(prop.whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  useEffect(() => {
    if (!isPlaying) {
      animationRef.current = requestAnimationFrame(prop.whilePlaying);
    } else {
      cancelAnimationFrame(animationRef.current);
    }
  }, []);

  useEffect(() => {
    if (
      audioPlayer.current.currentSrc !=
      `http://localhost:4000/getAudio/${prop.songData.trackFileName}`
    ) {
      changeAudio();
      prop.setIsLoaded(false);
    }
  }, [prop.songData]);

  const handleNextBtnClick = () => {
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
      toast.info("Next not possible, Queue is empty !!", {
        toastId: queueEmptyToastId,
      });
    }
  };

  const handlePrevBtnDBClick = () => {
    let newIndex = 0;

    if (songQueueData.length > 1) {
      songQueueData.map((data, elem) => {
        if (data._id == currPlayingSong._id) {
          if (elem == 0) {
            newIndex = songQueueData.length - 1;
            toast.info("Queue is playing from last song !!");
          } else {
            newIndex = elem - 1;
          }
        }
      });
      dispatch(setCurrPlayingSong(JSON.stringify(songQueueData[newIndex])));
    } else {
      toast.info("Previous not possible, Queue is empty !!", {
        toastId: queueEmptyToastId,
      });
    }
  };

  const handlePrevBtnClick = () => {
    audioPlayer.current.currentTime = 0;
    // toast.info("Press double click for previous song !!", {
    //   toastId: toastId,
    // });
  };

  return (
    <>
      <div className="left-controls">
        <button
          className="prev-btn"
          onClick={handlePrevBtnClick}
          onDoubleClick={handlePrevBtnDBClick}
        >
          <MdSkipPrevious />
        </button>
        <button className="play-btn" onClick={togglePlayPause}>
          {prop.isLoaded ? (
            isPlaying ? (
              <MdPause />
            ) : (
              <MdPlayArrow />
            )
          ) : (
            <BiLoaderAlt className="spin" />
          )}
        </button>
        <button className="next-btn" onClick={handleNextBtnClick}>
          <MdSkipNext />
        </button>
      </div>
    </>
  );
}

export default Control;
