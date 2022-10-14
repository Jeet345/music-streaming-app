import changeTheQueue from "./setSongQueue";
import changeIsPlaying from "./setIsPlaying";
import changeCurrPlayingSong from "./setCurrPlayingSong";
import changeSongIsRepeat from "./setIsSongRepeat";
import changeSongQueueIsVisible from "./setSongQueueIsVisible";
import changeUserCookie from "./setUserCookie";
import changePlaylistData from "./setPlaylistData";
import changeSearchQuery from "./setSearchQuery";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  changeTheQueue,
  changeIsPlaying,
  changeCurrPlayingSong,
  changeSongQueueIsVisible,
  changeSongIsRepeat,
  changeUserCookie,
  changePlaylistData,
  changeSearchQuery,
});

export default rootReducer;
