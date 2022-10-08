import { TextField } from "@mui/material";
import React from "react";
import "../../styles/your_music/library.css";

function Albums() {
  return (
    <div className="library-albums-container">
      <div className="header">
        <div className="title">
          <h1>1 Albums</h1>
        </div>
        <div className="input-filed">
          <TextField
            id="search"
            className="search-input"
            variant="outlined"
            placeholder="Search albums.."
          />
        </div>
      </div>
    </div>
  );
}

export default Albums;
