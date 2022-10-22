import React, { useEffect, useState } from "react";
import PopularTracks from "../Tracks/PopularTracks";
import PopularAlbums from "../Albums/PopularAlbums";
import "../../styles/Home/Home.css";
import "../../styles/App/App.css";
import axios from "axios";
import { useSelector } from "react-redux";
import GenresCard from "../../common/GenresCard";
import Genres from "../Genres/Genres";
import SongDataTable from "../../common/SongDataTable";
import { Link } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";
import AlbumContainer from "../Albums/AlbumContainer";

function Home() {
  const [tracksData, setTracksData] = useState([]);
  const [genresData, setGenresData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);

  const currPlayingSongData = useSelector(
    (state) => state.changeCurrPlayingSong
  );

  useEffect(() => {
    axios({
      url: `${process.env.REACT_APP_API}songs/get10PopularTracks`,
      method: "get",
    })
      .then((res) => {
        setTracksData(res.data);
        console.log("res", res.data);
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });

    axios({
      url: `${process.env.REACT_APP_API}genres/get10ActiveGenres`,
      method: "get",
    })
      .then((res) => {
        setGenresData(res.data);
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });

    axios({
      url: `${process.env.REACT_APP_API}albums/get10PopularAlbums`,
      method: "get",
    })
      .then((res) => {
        setAlbumsData(res.data);
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  }, []);

  return (
    <div className="home-page">
      <div className="popular-albums-container">
        <Link className="heading" to="/popularAlbums">
          Popular Albums <BiChevronRight />
        </Link>
        <AlbumContainer albumData={albumsData} />
      </div>

      <div className="popular-tracks-container">
        <Link className="heading" to="/popularTracks">
          Popular Tracks <BiChevronRight />
        </Link>
        <SongDataTable data={tracksData} />
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
