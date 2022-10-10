import { prefix } from "@fortawesome/free-regular-svg-icons";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { BsFillPauseFill, BsPlayFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setCurrPlayingSong, setIsPlaying, setQueue } from "../../actions";
import SongDataTable from "../../common/SongDataTable";
import "../../styles/your_music/library.css";

function Songs() {
  const dispatch = useDispatch();

  const [favSongData, setFavSongData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const userCookie = useSelector((state) => state.changeUserCookie);

  const isPlaying = useSelector((state) => state.changeIsPlaying);
  const queueData = useSelector((state) => state.changeTheQueue);

  const handlePlayBtnClick = () => {
    dispatch(setIsPlaying(true));
    if (queueData != JSON.stringify(favSongData)) {
      dispatch(setQueue(JSON.stringify(favSongData)));
      dispatch(setCurrPlayingSong(JSON.stringify(favSongData[0])));
    }
  };

  const handlePauseBtnClick = () => {
    dispatch(setIsPlaying(false));
  };

  const getDetailFavoriteSongByUserId = async () => {
    axios({
      url: "http://localhost:4000/library/getDetailFavoriteSongByUserId",
      method: "post",
      data: {
        userId: userCookie,
      },
    })
      .then((res) => {
        console.log("fav son", res.data);
        setFavSongData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearchBoxChange = (e) => {
    setSearchValue(e.target.value);
    //   let preFavSongData = favSongData;
    //   let newPreFavSongData = preFavSongData;
    //   const newFavSongData = favSongData.filter((song) => {
    //     if (searchVal.length)
    //       return song.title.toLowerCase().startsWith(searchVal.toLowerCase());
    //   });
    //   if (newFavSongData.length) {
    //     setFavSongData(newFavSongData);
    //   } else {
    //     console.log("s", searchVal.length);
    //     console.log("pre", preFavSongData);
    //     if (searchVal.length == 0) {
    //       setFavSongData(newPreFavSongData);
    //     } else {
    //       setFavSongData([]);
    //     }
    //   }
  };

  useEffect(() => {
    getDetailFavoriteSongByUserId();
  }, []);

  return (
    <div className="library-songs-container">
      <div className="header">
        <div className="title">
          <h1>{favSongData.length} Liked tracks</h1>

          {isPlaying && queueData == JSON.stringify(favSongData) ? (
            <Button
              className="pause-btn btn"
              variant="contained"
              onClick={handlePauseBtnClick}
              startIcon={<BsFillPauseFill />}
            >
              Pause
            </Button>
          ) : (
            <Button
              className="play-btn btn"
              variant="contained"
              disabled={!favSongData.length}
              onClick={handlePlayBtnClick}
              startIcon={<BsPlayFill />}
            >
              Play
            </Button>
          )}
        </div>
        <div className="input-filed">
          <TextField
            id="search"
            className="search-input"
            variant="outlined"
            onChange={handleSearchBoxChange}
            placeholder="Search within tracks..."
          />
        </div>
      </div>

      <SongDataTable
        data={favSongData}
        getFavoriteSongByUserId={getDetailFavoriteSongByUserId}
        searchValue={searchValue}
      />
    </div>
  );
}

export default Songs;
