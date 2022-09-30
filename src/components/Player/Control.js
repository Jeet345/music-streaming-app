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
  const animationRef = prop.animationRef;

  const togglePlayPause = () => {
    dispatch(setIsPlaying(!isPlaying));
    if (!isPlaying) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(prop.whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

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
    }
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
