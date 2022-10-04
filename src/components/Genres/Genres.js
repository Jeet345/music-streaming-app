import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import GenresCard from "../../common/GenresCard";
import "../../styles/App/App.css";

function Genres() {
  const [genresList, setGenresList] = useState([]);

  useEffect(() => {
    axios({
      url: "http://localhost:4000/genres/getActiveGenres",
      method: "get",
    })
      .then((genres) => {
        setGenresList(genres.data);
      })
      .catch((e) => {
        alert(e);
      });
  }, []);

  return (
    <div className="genres-page">
      <h1 className="heading">Genres</h1>
      <GenresCard genresList={genresList} />
    </div>
  );
}

export default Genres;
