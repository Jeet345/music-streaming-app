import React, { useState } from "react";
import { TextField, InputAdornment, Button } from "@mui/material";
import { FiSearch } from "react-icons/fi";
import { HiPlusSm } from "react-icons/hi";
import "./genres.css";
import { useNavigate } from "react-router-dom";

function Genres() {
  const navigate = useNavigate();

  const newTrackBtnClick = (e) => {
    navigate("/Admin/Genres/AddGenres");
  };

  return (
    <div className="song-page-container">
      <h1 className="title">Genres</h1>
      <div className="search-filed">
        <TextField
          style={{ width: "100%" }}
          id="input-with-icon-textfield"
          className="search-input"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FiSearch fontSize={18} />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
        <div>
          <Button
            variant="contained"
            size="small"
            className="button-input"
            startIcon={<HiPlusSm />}
            onClick={newTrackBtnClick}
          >
            New Genres
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Genres;
