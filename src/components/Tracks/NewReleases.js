import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import SongDataTable from "../../common/SongDataTable";

export default function NewReleases() {
  const [songData, setSongData] = useState([]);

  useEffect(() => {
    axios({
      url: `${process.env.REACT_APP_API}songs/getPopularTracks`,
      method: "get",
    })
      .then((res) => {
        setSongData(res.data);
      })
      .catch((e) => {
        alert(e);
        console.log(e);
      });
  }, []);

  return (
    <div className="newReleases-page">
      <h1 className="heading">New Releases</h1>
      <SongDataTable data={songData} />
    </div>
  );
}
