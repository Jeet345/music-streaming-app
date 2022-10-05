import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { BsTag } from "react-icons/bs";
import { MdOutlineAlbum, MdPlaylistAdd } from "react-icons/md";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { BiTrendingUp } from "react-icons/bi";

function Nav() {
  return (
    <div className="left-side-nav">
      <div className="logo">
        <Link className="link" to="/">
          MUSICK
        </Link>
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
            <NavLink className="link" to="/popularAlbums">
              <span className="icon">
                <MdOutlineAlbum />
              </span>
              Popular Albums
            </NavLink>
          </li>
          <li>
            <NavLink className="link" to="genres">
              <span className="icon">
                <BsTag />
              </span>
              Genres
            </NavLink>
          </li>
          <li>
            <NavLink className="link" to="popularTracks">
              <span className="icon">
                <BiTrendingUp />
              </span>
              Popular Tracks
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="divider"></div>

      {/* login container */}
      <div className="login-box">
        <NavLink className="login-btn btn" to="/Login">
          Login
        </NavLink>
        <NavLink className="register-btn btn" to="/Register">
          Register
        </NavLink>
      </div>

      {/* your music container */}
      <div className="link-box">
        <h3 className="title">your music</h3>
        <ul>
          <li>
            <NavLink className="link" to="/">
              <span className="icon">
                <FiSearch />
              </span>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="link" to="/about">
              <span className="icon">
                <FiSearch />
              </span>
              About
            </NavLink>
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
