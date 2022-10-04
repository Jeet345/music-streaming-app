import React, { useEffect, useState } from "react";
import PopularTracks from "../PopularTracks/PopularTracks";
import PopularAlbums from "../PopularAlbums/PopularAlbums";
import "../../styles/Home/Home.css";
import "../../styles/App/App.css";
import axios from "axios";
import { useSelector } from "react-redux";
import GenresCard from "../../common/GenresCard";
import Genres from "../Genres/Genres";
import SongDataTable from "../../common/SongDataTable";
import { Link } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";

function Home() {
  const [tracksData, setTracksData] = useState([]);
  const [genresData, setGenresData] = useState([]);

  const currPlayingSongData = useSelector(
    (state) => state.changeCurrPlayingSong
  );

  useEffect(() => {
    axios({
      url: "http://localhost:4000/songs/get10PopularTracks",
      method: "get",
    })
      .then((res) => {
        setTracksData(res);
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });

    axios({
      url: "http://localhost:4000/genres/get10ActiveGenres",
      method: "get",
    })
      .then((res) => {
        setGenresData(res.data);
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  }, []);

  return (
    <div className="home-page">
      <pre style={{ color: "red" }}>{currPlayingSongData}</pre>

      <PopularAlbums />

      <div className="popular-tracks-container">
        <Link className="heading" to="/popularTracks">
          Popular Tracks <BiChevronRight />
        </Link>
        <SongDataTable {...tracksData} />
      </div>

      <div className="genres-container">
        <Link className="heading" to="/genres">
          Genres <BiChevronRight />
        </Link>
        <GenresCard genresList={genresData} />
      </div>
    </div>
  );
}

export default Home;
