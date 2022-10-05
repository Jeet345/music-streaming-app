import React from "react";
import { BsFillPauseFill, BsFillPlayFill, BsThreeDots } from "react-icons/bs";
import { MdOutlineVolumeUp } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrPlayingSong, setIsPlaying } from "../actions";

function SideQueueBox() {
  const dispatch = useDispatch();

  const queueData = JSON.parse(useSelector((state) => state.changeTheQueue));
  const queueIsVisible = useSelector((state) => state.changeSongQueueIsVisible);

  const currPlayingSongData = JSON.parse(
    useSelector((state) => state.changeCurrPlayingSong)
  );

  const isPlaying = useSelector((state) => state.changeIsPlaying);

  const handlePlayBtnClick = (data) => {
    dispatch(setCurrPlayingSong(JSON.stringify(data)));
    dispatch(setIsPlaying(true));
  };

  const handlePauseBtnClick = () => {
    dispatch(setIsPlaying(false));
  };

  // console.log("Queue : ", queueData);

  return (
    <div
      className="right-side-queue"
      style={queueIsVisible ? { display: "block" } : { display: "none" }}
    >
      {queueData.length >= 1
        ? queueData.map((data, elem) => (
            <div
              className={`song-card ${
                data._id == currPlayingSongData._id ? "playing" : ""
              }`}
              key={elem}
            >
              <div className="img-box">
                <div className="hover-box">
                  {data._id == currPlayingSongData._id ? (
                    isPlaying ? (
                      <div className="playing-box">
                        <div className="volume-icon">
                          <MdOutlineVolumeUp size={22} />
                        </div>
                        <div
                          className="pause-icon"
                          onClick={handlePauseBtnClick}
                        >
                          <BsFillPauseFill size={22} />
                        </div>
                      </div>
                    ) : (
                      <div
                        className="play-box"
                        style={{ display: "grid" }}
                        onClick={() => {
                          handlePlayBtnClick(data);
                        }}
                      >
                        <BsFillPlayFill size={22} />
                      </div>
                    )
                  ) : (
                    <div
                      className="play-box"
                      onClick={() => {
                        handlePlayBtnClick(data);
                      }}
                    >
                      <BsFillPlayFill size={22} />
                    </div>
                  )}
                </div>

                <img
                  src={`http://localhost:4000/getImg/${data.imageFileName}`}
                />
              </div>
              <div className="desc-box">
                <h4 className="title">{data.title.slice(0, 19) + "..."}</h4>
                <div className="link-box">
                  {data.artist_names.map((artist, elem) => (
                    <Link to="/about" key={elem}>
                      {artist.name},&nbsp;
                    </Link>
                  ))}
                </div>
              </div>
              <div className="menu-icon">
                <BsThreeDots />
              </div>
            </div>
          ))
        : ""}
    </div>
  );
}

export default SideQueueBox;
