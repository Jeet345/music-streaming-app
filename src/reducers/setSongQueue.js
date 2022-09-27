const initialState = { data: [] };

const changeTheQueue = (state = JSON.stringify(initialState), action) => {
  if (action.type == "SET_QUEUE") {
    return action.payload;
  } else {
    return state;
  }
};

export default changeTheQueue;
