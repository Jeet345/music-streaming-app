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
export const setUserCookie = (userData) => {
  return {
    type: "SET_USER_COOKIE",
    payload: userData ? userData : "",
  };
};

export const setPlaylistData = (playlistData) => {
  return {
    type: "SET_PLAYLIST_DATA",
    payload: playlistData,
  };
};

export const setSearchQuery = (searchQuery) => {
  return {
    type: "SET_SEARCH_QUERY",
    payload: searchQuery,
  };
};
