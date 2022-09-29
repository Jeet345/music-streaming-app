import React, { useEffect, useRef, useState } from "react";
import {
  MdSkipNext,
  MdPlayArrow,
  MdPause,
  MdSkipPrevious,
} from "react-icons/md";
import { BiLoaderAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setIsPlaying } from "../../actions";

function Control(prop) {
  const dispatch = useDispatch();
  const isPlaying = useSelector((state) => state.changeIsPlaying);

  const audioPlayer = prop.audioPlayer;

  const togglePlayPause = () => {
    dispatch(setIsPlaying(!isPlaying));
    if (!isPlaying) {
      audioPlayer.current.play();
    } else {
      audioPlayer.current.pause();
    }
  };

  const changeAudio = () => {
    audioPlayer.current.load();

    if (!isPlaying) {
      dispatch(setIsPlaying(false));
    } else {
      audioPlayer.current.play();
    }
  };

  useEffect(() => {
    changeAudio();
  }, [prop.songData]);

  return (
    <>
      <div className="left-controls">
        <button className="prev-btn">
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
          )}{" "}
        </button>
        <button className="next-btn" onClick={() => {}}>
          <MdSkipNext />
        </button>
      </div>
    </>
  );
}

export default Control;
