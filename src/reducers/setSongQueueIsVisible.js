const initialState = true;

const changeSongQueueIsVisible = (
  state = JSON.stringify(initialState),
  action
) => {
  if (action.type == "SET_SONG_QUEUE_IS_VISIBLE") {
    return action.payload;
  } else {
    return state;
  }
};

export default changeSongQueueIsVisible;
