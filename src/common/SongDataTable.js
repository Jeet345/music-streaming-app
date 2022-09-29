import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsThreeDots, BsFillPlayFill, BsPauseFill } from "react-icons/bs";
import { MdOutlineVolumeUp } from "react-icons/md";
import { BiTimeFive } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setQueue } from "../actions/index";
const img = require("../assets/download.jpg");

export default function SongDataTable(props) {
  const dispatch = useDispatch();

  if (props.data) {
    console.log("data :", props.data);
  }

  const handlePlayBtnClick = (val) => {
    console.log(val);
    dispatch(setQueue(JSON.stringify(props.data)));
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
      <h1 className="title">Popular Tracks</h1>

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
                <tr key={elem}>
                  <td style={{ color: "#bababa" }}>
                    <span className="number">{elem + 1}</span>

                    <div
                      onClick={() => {
                        handlePlayBtnClick(row);
                      }}
                      className="play-icon audio-icon"
                    >
                      <BsFillPlayFill />
                    </div>

                    <div className="pause-icon audio-icon">
                      <BsPauseFill />
                    </div>

                    <div className="sound-icon audio-icon">
                      <MdOutlineVolumeUp />
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
                  <td style={{ paddingLeft: "15px" }}>{row.title}</td>
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

          <tr className="playing">
            <td style={{ color: "#bababa" }}>
              <span className="number">1</span>

              <div className="play-icon audio-icon">
                <BsFillPlayFill />
              </div>
              <div className="pause-icon audio-icon">
                <BsPauseFill />
              </div>
              <div className="sound-icon audio-icon">
                <MdOutlineVolumeUp />
              </div>
            </td>
            {/* two classes empty and fill */}
            <td className="icon empty">
              <AiOutlineHeart />
              {/* <AiFillHeart /> */}
            </td>

            <td className="song-image">
              <img src={img} width="35px" />
            </td>
            <td style={{ paddingLeft: "15px" }}>STAY (with Justin Bieber)</td>
            <td className="icon menu-icon" style={{ paddingRight: "25px" }}>
              <BsThreeDots />
            </td>
            <td>The Kid LAROI, Justin Bieber</td>
            <td>F*CK LOVE 3: OVER YOU</td>
            <td>2:21</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
