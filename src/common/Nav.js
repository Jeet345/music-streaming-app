import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiBell, FiSearch } from "react-icons/fi";
import { BsBell, BsTag } from "react-icons/bs";
import {
  MdHistory,
  MdLogout,
  MdMicNone,
  MdOutlineAlbum,
  MdOutlineAudiotrack,
  MdPlaylistAdd,
} from "react-icons/md";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Menu,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import { BiTrendingUp } from "react-icons/bi";
import { useCookies } from "react-cookie";
import { AiOutlineSetting } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function Nav() {
  const userCookie = useSelector((state) => state.changeUserCookie);

  const [userData, setUserData] = useState();
  const [settingMenuAnchorEl, setSettingMenuAnchorEl] = useState(null);

  const settingMenuOpen = Boolean(settingMenuAnchorEl);

  const navigate = useNavigate();

  useEffect(() => {
    if (userCookie) {
      axios({
        url: "http://localhost:4000/users/findUserById",
        method: "post",
        data: {
          id: userCookie,
        },
      })
        .then((res) => {
          setUserData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setUserData("");
    }
  }, [userCookie]);

  const handleSettingBtnClick = (e) => {
    setSettingMenuAnchorEl(e.currentTarget);
  };

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

      {userCookie ? (
        <div className="user-box">
          <img src={require("../../src/assets/profile.png")} alt="" />
          <h5>
            <Link to="/">{userData ? userData.username : null}</Link>
          </h5>
          <IconButton onClick={handleSettingBtnClick}>
            <AiOutlineSetting />
          </IconButton>
          <Menu
            className="setting-menu-container"
            anchorEl={settingMenuAnchorEl}
            open={settingMenuOpen}
            onClose={() => {
              setSettingMenuAnchorEl(null);
            }}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => {
                setSettingMenuAnchorEl(null);
              }}
            >
              <FiBell size={20} />
              Notifications
            </MenuItem>
            <MenuItem
              onClick={() => {
                setSettingMenuAnchorEl(null);
              }}
            >
              <AiOutlineSetting size={20} />
              Account Settings
            </MenuItem>
            <MenuItem
              onClick={() => {
                setSettingMenuAnchorEl(null);
                navigate("/logout");
              }}
            >
              <MdLogout size={20} />
              Log out
            </MenuItem>
          </Menu>
        </div>
      ) : (
        <div className="login-box">
          <NavLink className="login-btn btn" to="/Login">
            Login
          </NavLink>
          <NavLink className="register-btn btn" to="/Register">
            Register
          </NavLink>
        </div>
      )}

      {/* your music container */}
      <div className="link-box">
        <h3 className="title">your music</h3>
        <ul>
          <li>
            <NavLink className="link" to="/library/songs">
              <span className="icon">
                <MdOutlineAudiotrack />
              </span>
              Songs
            </NavLink>
          </li>
          <li>
            <NavLink className="link" to="/library/albums">
              <span className="icon">
                <MdOutlineAlbum />
              </span>
              Albums
            </NavLink>
          </li>
          <li>
            <NavLink className="link" to="/library/artists">
              <span className="icon">
                <MdMicNone />
              </span>
              Artists
            </NavLink>
          </li>
          <li>
            <NavLink className="link" to="/library/history">
              <span className="icon">
                <MdHistory />
              </span>
              History
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="divider"></div>

      {/* playlist container */}
      <div className="link-box">
        <h3 className="title">
          playlists
          <IconButton disabled={!userCookie} edge="end" className="icon">
            <MdPlaylistAdd />
          </IconButton>
        </h3>
      </div>
    </div>
  );
}

export default Nav;
