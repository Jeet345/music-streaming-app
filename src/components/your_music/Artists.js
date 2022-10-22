import { TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import "../../styles/your_music/library.css";
import ArtistContainer from "../Artists/ArtistContainer";

function Artists() {
  const [followingArtistData, setFollowingArtistData] = useState([]);
  const userCookie = useSelector((state) => state.changeUserCookie);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchBoxChange = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    axios({
      url: `${process.env.REACT_APP_API}library/getDetailFollowingArtistsUserId`,
      method: "post",
      data: {
        userId: userCookie,
      },
    })
      .then((res) => {
        setFollowingArtistData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="library-artists-container">
      <div className="header">
        <div className="title">
          <h1>{followingArtistData.length} Artists</h1>
        </div>
        <div className="input-filed">
          <TextField
            id="search"
            className="search-input"
            variant="outlined"
            onChange={handleSearchBoxChange}
            placeholder="Search artists.."
          />
        </div>
      </div>

      <br />
      <br />

      <ArtistContainer
        artistData={followingArtistData}
        searchValue={searchValue}
      />
    </div>
  );
}

export default Artists;
