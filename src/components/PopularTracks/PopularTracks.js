import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import SongDataTable from "../../common/SongDataTable";

export default function PopularTracks() {
  const [songData, setSongData] = useState([]);

  useEffect(() => {
    axios({
      url: "http://localhost:4000/songs/getPopularTracks",
      method: "get",
    })
      .then((res) => {
        console.log("res", res.data);
        setSongData(res.data);
      })
      .catch((e) => {
        alert(e);
        console.log(e);
      });
  }, []);

  return (
    <div className="popular-track-page">
      <h1 className="heading">Popular Tracks</h1>
      <SongDataTable data={songData} />
    </div>
  );
}
