import { TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import "../../styles/your_music/library.css";
import AlbumContainer from "../Albums/AlbumContainer";

function Albums() {
  const [favAlbumData, setFavAlbumData] = useState([]);
  const userCookie = useSelector((state) => state.changeUserCookie);
  const [searchValue, setSearchValue] = useState("");

  const getFavAlbumData = () => {
    if (userCookie) {
      axios({
        url: `${process.env.REACT_APP_API}library/getDetailFavoriteAlbumByUserId`,
        method: "post",
        data: {
          userId: userCookie,
        },
      })
        .then((res) => {
          console.log("fav al", res.data);
          setFavAlbumData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleSearchFieldChange = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    getFavAlbumData();
  }, []);

  return (
    <div className="library-albums-container">
      <div className="header">
        <div className="title">
          <h1>{favAlbumData.length} Albums</h1>
        </div>
        <div className="input-filed">
          <TextField
            id="search"
            className="search-input"
            variant="outlined"
            placeholder="Search albums.."
            onChange={handleSearchFieldChange}
          />
        </div>
      </div>
      <br />
      <br />
      <AlbumContainer albumData={favAlbumData} searchValue={searchValue} />
    </div>
  );
}

export default Albums;
