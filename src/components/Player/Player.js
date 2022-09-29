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
import Control from "./Control";

function Player() {
  const audioPlayer = useRef();

  const [isLoaded, setIsLoaded] = useState(false);

  const songData = JSON.parse(
    useSelector((state) => state.changeCurrPlayingSong)
  );

  // when load data of audio file
  const onLoadedMetadata = () => {
    // const seconds = Math.floor(audioPlayer.current.duration);
    // progressBar.current.max = seconds;
    // setDuration(seconds);
    setIsLoaded(true);
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
      />

      {/* <Volume /> */}
    </div>
  );
}

export default Player;
