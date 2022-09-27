import React, { useState, useEffect, useRef } from "react";
import { MdOutlineVolumeOff, MdOutlineVolumeUp } from "react-icons/md";

function Volume(prop) {
  const [isMute, setIsMute] = useState(false);
  const [volume, setVolume] = useState(100);

  // get reference from prop
  const audioPlayer = prop.audioPlayer;
  const volumeBar = useRef();
  const volumeFill = useRef();

  useEffect(() => {
    if (volume == 0) {
      setIsMute(true);
    } else {
      setIsMute(false);
      audioPlayer.current.muted = false;
    }
    audioPlayer.current.volume = volume / 100;
    volumeBar.current.value = volume;
    volumeFill.current.style.setProperty("width", `${volume}%`);
  }, [volume]);

  const changeVolumeRange = () => {
    setVolume(volumeBar.current.value);
  };

  const toggleMuteUnMute = () => {
    const prevVal = isMute;
    setIsMute(!prevVal);

    if (!prevVal) {
      audioPlayer.current.muted = true;
      setVolume(0);
    } else {
      audioPlayer.current.muted = false;
      setVolume(100);
    }
  };

  return (
    <div className="music-controls">
      <button title="mute" className="mute-btn" onClick={toggleMuteUnMute}>
        {isMute ? <MdOutlineVolumeOff /> : <MdOutlineVolumeUp />}
      </button>

      <div className="volume-slider">
        <input
          type="range"
          className="slider"
          ref={volumeBar}
          onChange={changeVolumeRange}
          defaultValue={100}
        />
        <div ref={volumeFill} className="range-fill"></div>
      </div>
    </div>
  );
}

export default Volume;
