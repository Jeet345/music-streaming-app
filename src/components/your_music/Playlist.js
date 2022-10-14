import { Button, TextField } from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";
import { BsFillPauseFill, BsFillPlayFill, BsThreeDots } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { setCurrPlayingSong, setIsPlaying, setQueue } from "../../actions";
import PlaylistContextMenu from "../../common/PlaylistContextMenu";
import SongDataTable from "../../common/SongDataTable";

function Playlist() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { playlistId } = useParams();

  let totalDuration = 0;

  const [songData, setSongData] = useState([]);
  const [playlistData, setPlaylistData] = useState([]);
  const [playlistMenuAnchorEl, setPlaylistMenuAnchorEl] = useState(null);

  const isPlaying = useSelector((state) => state.changeIsPlaying);
  const queueData = useSelector((state) => state.changeTheQueue);
  const userCookie = useSelector((state) => state.changeUserCookie);

  const albumImg = require("../../assets/album.jpg");
  const profileImg = require("../../assets/profile.png");

  const created_at = moment(playlistData.created_at).format("ll"); // or any other format

  songData?.map((song, elem) => {
    totalDuration = totalDuration + song.duration;
  });

  const getPlaylistDataById = () => {
    axios({
      url: "http://localhost:4000/playlists/getPlaylistById",
      method: "post",
      data: {
        id: playlistId,
      },
    })
      .then((res) => {
        setSongData(res.data[0].songs);
        setPlaylistData(res.data[0]);
      })
      .catch((err) => {
        if (err.response.data.error) {
          alert("not found");
        } else {
          console.error("Something Wan't Wrong !!");
        }
      });
  };

  const handlePlayBtnClick = () => {
    dispatch(setIsPlaying(true));
    if (queueData != JSON.stringify(songData)) {
      dispatch(setQueue(JSON.stringify(songData)));
      dispatch(setCurrPlayingSong(JSON.stringify(songData[0])));
    }
  };

  const handlePauseBtnClick = () => {
    dispatch(setIsPlaying(false));
  };

  // formate seconds in form of (00:00)
  const calculateTime = (sesc) => {
    const minutes = Math.floor(sesc / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(sesc % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const handleMoreBtnClick = (e) => {
    setPlaylistMenuAnchorEl(e.currentTarget);
  };

  useEffect(() => {
    getPlaylistDataById();
  }, [playlistId]);

  return (
    <div className="playlist-page">
      <div className="header-container">
        <div className="header">
          <div className="left-head">
            <img
              src={
                playlistData.coverImg
                  ? `http://localhost:4000/getImg/${playlistData.coverImg}`
                  : albumImg
              }
              alt=""
            />
          </div>
          <div className="right-head">
            <h1 className="title">{playlistData.name}</h1>
            <div className="artist-box">
              {playlistData.users ? (
                <Link to={`/tracksByArtist/${playlistData.users[0]._id}`}>
                  <img src={profileImg} alt="" style={{ marginRight: "5px" }} />
                  {playlistData.users[0].username}
                </Link>
              ) : null}
            </div>
            <div className="playlist-desc">
              <p>{playlistData.description}</p>
            </div>
            <ul className="desc-box">
              <li>{songData.length} tracks</li>
              <li>{calculateTime(totalDuration)} mins</li>
              <li>{created_at}</li>
            </ul>

            <div className="action-btn">
              {isPlaying && queueData == JSON.stringify(songData) ? (
                <Button
                  className="play-btn btn"
                  onClick={handlePauseBtnClick}
                  variant="contained"
                  startIcon={<BsFillPauseFill />}
                >
                  Pause
                </Button>
              ) : (
                <Button
                  className="play-btn btn"
                  onClick={handlePlayBtnClick}
                  variant="contained"
                  disabled={songData.length ? false : true}
                  startIcon={<BsFillPlayFill />}
                >
                  Play
                </Button>
              )}

              <Button
                className="more-btn btn"
                variant="outlined"
                onClick={handleMoreBtnClick}
                startIcon={<BsThreeDots />}
              >
                More
              </Button>
            </div>
          </div>
        </div>

        <PlaylistContextMenu
          playlistMenuAnchorEl={playlistMenuAnchorEl}
          setPlaylistMenuAnchorEl={setPlaylistMenuAnchorEl}
          playlistMenuRowData={playlistData}
          getPlaylistData={getPlaylistDataById}
        />

        <div className="search-filed">
          <TextField
            id="search"
            className="search-input"
            variant="outlined"
            placeholder="Search with in tracks..."
          />
        </div>
      </div>

      <SongDataTable
        data={songData}
        playlistId={playlistId}
        getPlaylistDataById={getPlaylistDataById}
        removeToPlaylistOption={true}
      />
    </div>
  );
}

export default Playlist;
