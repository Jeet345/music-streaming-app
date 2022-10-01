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

export const setSongQueueIsVisible = (isVisible) => {
  return {
    type: "SET_SONG_QUEUE_IS_VISIBLE",
    payload: isVisible,
  };
};

export const setSongIsRepeat = (isRepeat) => {
  return {
    type: "SET_SONG_IS_REPEAT",
    payload: isRepeat,
  };
};
