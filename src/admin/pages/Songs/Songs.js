import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { FiSearch } from "react-icons/fi";
import { HiPlusSm } from "react-icons/hi";
import "./song.css";
import { useNavigate } from "react-router-dom";

function Songs() {
  const [anchorEl, setAnchorEl] = useState(null);

  const menuOpen = Boolean(anchorEl);
  const navigate = useNavigate();

  const newTrackBtnClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="song-page-container">
      <h1 className="title">Songs</h1>
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
            aria-controls={menuOpen ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={menuOpen ? "true" : undefined}
            startIcon={<HiPlusSm />}
            onClick={newTrackBtnClick}
          >
            New Track
          </Button>
          <Menu
            className="basic-menu"
            id="basic-menu"
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => navigate("/Admin/Songs/CreateTrack")}>
              Create Track
            </MenuItem>
            <MenuItem>Upload Track</MenuItem>
            <MenuItem>Import Track</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default Songs;
