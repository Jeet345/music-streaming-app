import changeTheQueue from "./setSongQueue";
import changeIsPlaying from "./setIsPlaying";
import changeCurrPlayingSong from "./setCurrPlayingSong";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  changeTheQueue,
  changeIsPlaying,
  changeCurrPlayingSong,
});

export default rootReducer;
