import React, { useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsThreeDots, BsFillPlayFill, BsPauseFill } from "react-icons/bs";
import { MdOutlineAudiotrack, MdOutlineVolumeUp } from "react-icons/md";
import { BiTimeFive } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setCurrPlayingSong, setQueue, setIsPlaying } from "../actions/index";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";

const img = require("../assets/download.jpg");

export default function SongDataTable(props) {
  const dispatch = useDispatch();
  const currSongData = JSON.parse(
    useSelector((state) => state.changeCurrPlayingSong)
  );
  const isPlaying = useSelector((state) => state.changeIsPlaying);
  const userCookie = useSelector((state) => state.changeUserCookie);

  const [favSongData, setFavSongData] = useState([]);
  const isAlbumVisible = props.albumVisible == false ? false : true;
  const isArtistVisible = props.artistVisible == false ? false : true;

  const handlePlayBtnClick = (currSong) => {
    console.log(currSong);
    dispatch(setIsPlaying(true));
    dispatch(setQueue(JSON.stringify(props.data)));
    dispatch(setCurrPlayingSong(JSON.stringify(currSong)));
  };

  const calculateTime = (sesc) => {
    const minutes = Math.floor(sesc / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(sesc % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const getFavoriteSongData = () => {
    axios({
      url: "http://localhost:4000/library/getFavoriteSongByUserId",
      method: "post",
      data: {
        userId: userCookie,
      },
    })
      .then((res) => {
        // retrive songId and make arry of it`
        console.log("fav arr", res.data[0].favorite_songs);
        setFavSongData(res.data[0].favorite_songs);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getFavoriteSongData();
  }, []);

  const handleAddFavBtnClick = (row) => {
    if (userCookie) {
      let userId = userCookie;
      let songId = row._id;
      axios({
        url: "http://localhost:4000/library/addFavoriteSong",
        method: "post",
        data: {
          userId,
          songId,
        },
      })
        .then((res) => {
          if (res.data == "1") {
            getFavoriteSongData();
            props.getFavoriteSongByUserId();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.warn("Please login to access this feature !!", {
        toastId: "login toast",
      });
    }
  };

  const handleRemoveFavBtnClick = (row) => {
    if (userCookie) {
      let userId = userCookie;
      let songId = row._id;
      axios({
        url: "http://localhost:4000/library/removeFavoriteSong",
        method: "post",
        data: {
          userId,
          songId,
        },
      })
        .then((res) => {
          if (res.data == "1") {
            getFavoriteSongData();
            props.getFavoriteSongByUserId();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.warn("Please login to access this feature !!", {
        toastId: "login toast",
      });
    }
  };

  return (
    <div className="data-table-container">
      {props.data.length >= 1 ? (
        <table className="data-table">
          <tbody>
            <tr>
              <th>#</th>
              <th></th>
              <th></th>
              <th style={{ width: "100%" }}>Title</th>
              <th></th>
              {isArtistVisible ? (
                <th style={{ minWidth: "160px" }}>Artist</th>
              ) : (
                ""
              )}
              {isAlbumVisible ? (
                <th style={{ minWidth: "160px" }}>Albums</th>
              ) : (
                ""
              )}
              <th className="head-icon">
                <BiTimeFive />
              </th>
            </tr>
            {props.data.map((row, elem) => (
              <tr
                key={elem}
                className={row._id == currSongData._id ? "playing" : ""}
              >
                <td style={{ color: "#bababa" }}>
                  <span className="number">{elem + 1}</span>

                  <div className="audio-icon">
                    <div
                      onClick={() => {
                        handlePlayBtnClick(row);
                      }}
                      className="play-icon icon"
                    >
                      <BsFillPlayFill />
                    </div>

                    <div
                      className="pause-icon icon"
                      onClick={() => {
                        dispatch(setIsPlaying(!isPlaying));
                      }}
                    >
                      <BsPauseFill />
                    </div>
                    {row._id == currSongData._id ? (
                      isPlaying ? (
                        <div className="sound-icon icon">
                          <MdOutlineVolumeUp />
                        </div>
                      ) : (
                        <div className="playing-play-icon icon">
                          <BsFillPlayFill />
                        </div>
                      )
                    ) : (
                      ""
                    )}
                  </div>
                </td>

                {favSongData.indexOf(row._id) != -1 ? (
                  <Tooltip title="Remove to library">
                    <td
                      className="icon fill"
                      onClick={() => handleRemoveFavBtnClick(row)}
                    >
                      <AiFillHeart />
                    </td>
                  </Tooltip>
                ) : (
                  <Tooltip title="Add to library">
                    <td
                      className="icon empty"
                      onClick={() => handleAddFavBtnClick(row)}
                    >
                      <AiOutlineHeart />
                    </td>
                  </Tooltip>
                )}

                <td className="song-image">
                  <img
                    src={"http://localhost:4000/getImg/" + row.imageFileName}
                    width="35px"
                  />
                </td>
                <td style={{ paddingLeft: "15px" }}>
                  {row.title.slice(0, 20) +
                    (row.title.length > 20 ? "..." : "")}
                </td>
                <td className="icon menu-icon" style={{ paddingRight: "25px" }}>
                  <BsThreeDots />
                </td>

                {isArtistVisible ? (
                  <td>
                    {row.artist_names.map((artist, elem) => {
                      return (
                        <>
                          <Link key={elem} to={`/tracksByArtist/${artist._id}`}>
                            {artist.name}
                          </Link>
                          &nbsp;
                        </>
                      );
                    })}
                  </td>
                ) : null}
                {isAlbumVisible ? (
                  <td>
                    {row.album_name.map((album, elem) => {
                      return (
                        <Link key={elem} to={`/tracksByAlbum/${album._id}`}>
                          {album.name}
                        </Link>
                      );
                    })}
                  </td>
                ) : (
                  ""
                )}
                <td>{calculateTime(row.duration)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="nothing-box">
          <MdOutlineAudiotrack color="#bababa" size={90} />
          <h3>Nothing To Display.</h3>
          <p>You have not added any songs to your library yet.</p>
        </div>
      )}
    </div>
  );
}
