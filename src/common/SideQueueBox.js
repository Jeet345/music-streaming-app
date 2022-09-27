import React from "react";
import { BsFillPlayFill, BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function SideQueueBox() {
  const queueData = JSON.parse(useSelector((state) => state.changeTheQueue));

  console.log("Queue : ", queueData);

  return (
    <div className="right-side-queue">
      {queueData.length > 1
        ? queueData.map((data, elem) => (
            <div className="song-card" key={elem}>
              <div className="img-box">
                <div className="hover-box">
                  <BsFillPlayFill size={22} />
                </div>
                <img
                  src={`http://localhost:4000/getImg/${data.imageFileName}`}
                />
              </div>
              <div className="desc-box">
                <h4 className="title">{data.title.slice(0, 19) + "..."}</h4>
                <div className="link-box">
                  {data.artist_names.map((artist, elem) => (
                    <Link to="/about">{artist.name},&nbsp;</Link>
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
