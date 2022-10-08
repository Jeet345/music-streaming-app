import { TextField } from "@mui/material";
import React from "react";
import "../../styles/your_music/library.css";

function Artists() {
  return (
    <div className="library-artists-container">
      <div className="header">
        <div className="title">
          <h1>3 Artists</h1>
        </div>
        <div className="input-filed">
          <TextField
            id="search"
            className="search-input"
            variant="outlined"
            placeholder="Search artists.."
          />
        </div>
      </div>
    </div>
  );
}

export default Artists;
