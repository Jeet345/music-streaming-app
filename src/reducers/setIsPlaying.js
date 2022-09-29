const initialState = false;

const changeIsPlaying = (state = initialState, action) => {
  if (action.type == "SET_IS_PLAYING") {
    return action.payload;
  } else {
    return state;
  }
};

export default changeIsPlaying;
