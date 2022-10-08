const initialState = "";

const changeUserCookie = (state = initialState, action) => {
  if (action.type == "SET_USER_COOKIE") {
    return action.payload;
  } else {
    return state;
  }
};

export default changeUserCookie;
