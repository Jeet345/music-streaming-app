import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiBell, FiSearch } from "react-icons/fi";
import { BsBell, BsTag } from "react-icons/bs";
import {
  MdClose,
  MdHistory,
  MdLogout,
  MdMicNone,
  MdOutlineAlbum,
  MdOutlineAudiotrack,
  MdOutlineNewReleases,
  MdPlaylistAdd,
} from "react-icons/md";
import {
  FormControl,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import { BiTrendingUp } from "react-icons/bi";
import { useCookies } from "react-cookie";
import { AiOutlineSetting } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import NewPlaylistDialog from "./NewPlaylistDialog";
import PlaylistContextMenu from "./PlaylistContextMenu";
import { setPlaylistData, setSearchQuery } from "../actions/index.js";

function Nav() {
  const userCookie = useSelector((state) => state.changeUserCookie);
  const playlistData = JSON.parse(
    useSelector((state) => state.changePlaylistData)
  );
  const searchQuery = useSelector((state) => state.changeSearchQuery);

  const [userData, setUserData] = useState();
  const [settingMenuAnchorEl, setSettingMenuAnchorEl] = useState(null);
  const [playlistMenuAnchorEl, setPlaylistMenuAnchorEl] = useState(null);
  const [playlistDialogClicked, setPlaylistDialogClicked] = useState(false);

  const settingMenuOpen = Boolean(settingMenuAnchorEl);
  const playlistMenuOpen = Boolean(playlistMenuAnchorEl);

  let [playlistMenuRowData, setPlaylistMenuRowData] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  // getting playlist data

  const getPlaylistData = () => {
    if (userCookie) {
      axios({
        url: "http://localhost:4000/playlists/getPlaylistsByUserId",
        method: "post",
        data: {
          userId: userCookie,
        },
      })
        .then((res) => {
          console.log("res", res.data);
          // setPlaylistData(res.data);
          dispatch(setPlaylistData(JSON.stringify(res.data)));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getPlaylistData();
  }, [userCookie]);

  const handleSettingBtnClick = (e) => {
    setSettingMenuAnchorEl(e.currentTarget);
  };

  const handlePlaylistRightClick = (e, row) => {
    e.preventDefault();
    setPlaylistMenuRowData(row);
    setPlaylistMenuAnchorEl(e.currentTarget);
  };

  const handlePlaylistDialogClose = () => {
    setPlaylistDialogClicked(false);
  };

  const handleSearchBoxChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleClearSearchBox = () => {
    dispatch(setSearchQuery(""));
  };

  return (
    <div className="left-side-nav">
      <div className="logo">
        <Link className="link" to="/">
          MUSICK
        </Link>
      </div>

      <NewPlaylistDialog
        isClicked={playlistDialogClicked}
        closePlaylist={handlePlaylistDialogClose}
        getPlaylistData={getPlaylistData}
      />

      <FormControl
        sx={{ width: "100%" }}
        className="search-filled"
        variant="outlined"
      >
        <OutlinedInput
          type="text"
          placeholder="Search.."
          value={searchQuery}
          onChange={handleSearchBoxChange}
          endAdornment={
            searchQuery ? (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  size="small"
                  onClick={handleClearSearchBox}
                >
                  <MdClose />
                </IconButton>
              </InputAdornment>
            ) : (
              <InputAdornment position="end">
                <IconButton edge="end" size="small">
                  <FiSearch />
                </IconButton>
              </InputAdornment>
            )
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
          <li>
            <NavLink className="link" to="newReleases">
              <span className="icon">
                <MdOutlineNewReleases />
              </span>
              New Releases
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="divider"></div>

      {userCookie ? (
        <div className="user-box">
          <img
            src={
              userData?.profileImage
                ? `http://localhost:4000/getImg/${userData.profileImage}`
                : require("../../src/assets/profile.png")
            }
            alt=""
          />
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
                navigate("/account/settings");
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
          <IconButton
            disabled={!userCookie}
            edge="end"
            className="icon"
            onClick={() => {
              setPlaylistDialogClicked(true);
            }}
          >
            <MdPlaylistAdd />
          </IconButton>
        </h3>
        <ul>
          {userCookie
            ? playlistData?.map((playlist, elem) => {
                return (
                  <li
                    key={elem}
                    onContextMenu={(e) => {
                      handlePlaylistRightClick(e, playlist);
                    }}
                  >
                    <NavLink className="link" to={`/playlist/${playlist._id}`}>
                      {playlist.name}
                    </NavLink>
                  </li>
                );
              })
            : null}
        </ul>

        <PlaylistContextMenu
          playlistMenuAnchorEl={playlistMenuAnchorEl}
          setPlaylistMenuAnchorEl={setPlaylistMenuAnchorEl}
          playlistMenuRowData={playlistMenuRowData}
          getPlaylistData={getPlaylistData}
        />
      </div>
    </div>
  );
}

export default Nav;
