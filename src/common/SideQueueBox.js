import React from "react";
import { BsFillPlayFill, BsThreeDots } from "react-icons/bs";
import { MdOutlineVolumeUp } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrPlayingSong } from "../actions";

function SideQueueBox() {
  const dispatch = useDispatch();

  const queueData = JSON.parse(useSelector((state) => state.changeTheQueue));
  const currPlayingSongData = JSON.parse(
    useSelector((state) => state.changeTheQueue)
  );

  const handlePlayBtnClick = (data) => {
    dispatch(setCurrPlayingSong(JSON.stringify(data)));
  };

  // console.log("Queue : ", queueData);

  return (
    <div className="right-side-queue">
      {queueData.length > 1
        ? queueData.map((data, elem) => (
            <div className="song-card" key={elem}>
              <div className="img-box">
                <div className="hover-box">
                  <BsFillPlayFill
                    size={22}
                    onClick={() => {
                      handlePlayBtnClick(data);
                    }}
                  />
                  {/* <MdOutlineVolumeUp size={22} /> */}
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
                  {/* <Link to="/about">bad bunny,</Link>&nbsp;
                  <Link to="/about">Chencho Cor</Link> */}
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
