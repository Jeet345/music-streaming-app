const initialState = [];

const changePlaylistData = (state = JSON.stringify(initialState), action) => {
  if (action.type == "SET_PLAYLIST_DATA") {
    return action.payload;
  } else {
    return state;
  }
};

export default changePlaylistData;
