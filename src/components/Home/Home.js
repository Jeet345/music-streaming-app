import React, { useEffect, useState } from "react";
import PopularTracks from "../PopularTracks/PopularTracks";
import PopularAlbums from "../PopularAlbums/PopularAlbums";
import "../../styles/Home/Home.css";
import axios from "axios";

function Home() {
  const [tracksData, setTracksData] = useState([]);

  useEffect(() => {
    axios({
      url: "http://localhost:4000/songs/getPopularTracks",
      method: "get",
    })
      .then((res) => {
        setTracksData(res);
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  }, []);

  return (
    <div className="home-page">
      <PopularAlbums />
      <PopularTracks {...tracksData} />
    </div>
  );
}

export default Home;
