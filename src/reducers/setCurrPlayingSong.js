const initialState = { trackFileName: "1662142808497.mp3" };

const changeCurrPlayingSong = (
  state = JSON.stringify(initialState),
  action
) => {
  if (action.type == "SET_CURR_PLAYING_SONG") {
    return action.payload;
  } else {
    return state;
  }
};

export default changeCurrPlayingSong;
