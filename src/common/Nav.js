import React from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { MdPlaylistAdd } from "react-icons/md";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

function Nav() {
  return (
    <div className="left-side-nav">
      <div className="logo">
        <h1>MUSICK</h1>
      </div>

      <FormControl
        sx={{ width: "100%" }}
        className="search-filled"
        variant="outlined"
      >
        <OutlinedInput
          id="outlined-adornment-password"
          type="text"
          placeholder="Search.."
          onChange={() => {}}
          endAdornment={
            <InputAdornment position="end">
              <IconButton edge="end" size="small">
                <FiSearch />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <div className="link-box">
        <ul>
          <li>
            <Link className="link" to="/">
              <span className="icon">
                <FiSearch />
              </span>
              Home
            </Link>
          </li>
          <li>
            <Link className="link" to="/about">
              <span className="icon">
                <FiSearch />
              </span>
              About
            </Link>
          </li>
        </ul>
      </div>

      <div className="divider"></div>

      {/* login container */}
      <div className="login-box">
        <Link className="login-btn btn" to="/Login">
          Login
        </Link>
        <Link className="register-btn btn" to="/Register">
          Register
        </Link>
      </div>

      {/* your music container */}
      <div className="link-box">
        <h3 className="title">your music</h3>
        <ul>
          <li>
            <Link className="link" to="/">
              <span className="icon">
                <FiSearch />
              </span>
              Home
            </Link>
          </li>
          <li>
            <Link className="link" to="/about">
              <span className="icon">
                <FiSearch />
              </span>
              About
            </Link>
          </li>
        </ul>
      </div>

      <div className="divider"></div>

      {/* playlist container */}
      <div className="link-box">
        <h3 className="title">
          playlists
          <span className="icon">
            <MdPlaylistAdd />
          </span>
        </h3>
      </div>
    </div>
  );
}

export default Nav;
