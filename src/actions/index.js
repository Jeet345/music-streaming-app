export const setQueue = (queueData) => {
  return {
    type: "SET_QUEUE",
    payload: queueData,
  };
};

export const setIsPlaying = (isPlaying) => {
  return {
    type: "SET_IS_PLAYING",
    payload: isPlaying,
  };
};

export const setCurrPlayingSong = (isPlaying) => {
  return {
    type: "SET_CURR_PLAYING_SONG",
    payload: isPlaying,
  };
};
