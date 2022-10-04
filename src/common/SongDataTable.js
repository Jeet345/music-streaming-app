import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsThreeDots, BsFillPlayFill, BsPauseFill } from "react-icons/bs";
import { MdOutlineVolumeUp } from "react-icons/md";
import { BiTimeFive } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setCurrPlayingSong, setQueue, setIsPlaying } from "../actions/index";

const img = require("../assets/download.jpg");

export default function SongDataTable(props) {
  const dispatch = useDispatch();

  if (props.data) {
    console.log("data :", props.data);
  }

  const currSongData = JSON.parse(
    useSelector((state) => state.changeCurrPlayingSong)
  );

  const isPlaying = useSelector((state) => state.changeIsPlaying);

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

  return (
    <div className="data-table-container">
      <table className="data-table">
        <tbody>
          <tr>
            <th>#</th>
            <th></th>
            <th></th>
            <th>Title</th>
            <th></th>
            <th>Artist</th>
            <th>Albums</th>
            <th className="head-icon">
              <BiTimeFive />
            </th>
          </tr>

          {props.data
            ? props.data.map((row, elem) => (
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

                  {/* two classes empty and fill */}
                  <td className="icon empty">
                    <AiOutlineHeart />
                    {/* <AiFillHeart /> */}
                  </td>

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
                  <td
                    className="icon menu-icon"
                    style={{ paddingRight: "25px" }}
                  >
                    <BsThreeDots />
                  </td>
                  <td>
                    {row.artist_names.map((artist, elem) => {
                      return artist.name + ", ";
                    })}
                  </td>
                  <td>
                    {row.album_name.map((album, elem) => {
                      return album.name;
                    })}
                  </td>
                  <td>{calculateTime(row.duration)}</td>
                </tr>
              ))
            : ""}
        </tbody>
      </table>
    </div>
  );
}
