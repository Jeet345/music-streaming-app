import changeTheQueue from "./setSongQueue";
import changeIsPlaying from "./setIsPlaying";
import changeCurrPlayingSong from "./setCurrPlayingSong";
import changeSongIsRepeat from "./setIsSongRepeat";
import changeSongQueueIsVisible from "./setSongQueueIsVisible";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  changeTheQueue,
  changeIsPlaying,
  changeCurrPlayingSong,
  changeSongQueueIsVisible,
  changeSongIsRepeat,
});

export default rootReducer;
