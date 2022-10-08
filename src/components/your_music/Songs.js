import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { BsPlayFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import SongDataTable from "../../common/SongDataTable";
import "../../styles/your_music/library.css";

function Songs() {
  const [favSongData, setFavSongData] = useState([]);
  const userCookie = useSelector((state) => state.changeUserCookie);

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

  useEffect(() => {
    getDetailFavoriteSongByUserId();
  }, []);

  return (
    <div className="library-songs-container">
      <div className="header">
        <div className="title">
          <h1>{favSongData.length} Liked tracks</h1>
          <Button
            className="play-btn btn"
            variant="contained"
            startIcon={<BsPlayFill />}
          >
            Play
          </Button>
        </div>
        <div className="input-filed">
          <TextField
            id="search"
            className="search-input"
            variant="outlined"
            placeholder="Search within tracks..."
          />
        </div>
      </div>

      <SongDataTable
        data={favSongData}
        getFavoriteSongByUserId={getDetailFavoriteSongByUserId}
      />
    </div>
  );
}

export default Songs;
