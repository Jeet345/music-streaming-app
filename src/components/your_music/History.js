import { Button, TextField } from "@mui/material";
import React from "react";
import { BsPlayFill } from "react-icons/bs";
import "../../styles/your_music/library.css";

function History() {
  return (
    <div className="library-history-container">
      <div className="header">
        <div className="title">
          <h1>Listening History</h1>
          <Button
            className="play-btn btn"
            variant="contained"
            startIcon={<BsPlayFill />}
          >
            Play
          </Button>
        </div>
        <div className="input-filed">
          <TextField
            id="search"
            className="search-input"
            variant="outlined"
            placeholder="Search listing history..."
          />
        </div>
      </div>
    </div>
  );
}

export default History;
