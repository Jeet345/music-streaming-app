const initialState = false;

const changeSongIsRepeat = (state = initialState, action) => {
  if (action.type == "SET_SONG_IS_REPEAT") {
    return action.payload;
  } else {
    return state;
  }
};

export default changeSongIsRepeat;
