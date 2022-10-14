const initialState = "";

const changeSearchQuery = (state = initialState, action) => {
  if (action.type == "SET_SEARCH_QUERY") {
    return action.payload;
  } else {
    return state;
  }
};

export default changeSearchQuery;
