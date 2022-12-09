import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  MdLogout,
  MdOutlineDashboardCustomize,
  MdOutlineMusicNote,
} from "react-icons/md";

import { BiMicrophone, BiAlbum } from "react-icons/bi";
import { BsTags } from "react-icons/bs";
import { TbPlaylist } from "react-icons/tb";
import { FiUser } from "react-icons/fi";

function SideNav() {
  const navigate = useNavigate();

  return (
    <div className="admin-side-nav">
      <ul>
        <li>
          <NavLink className="link" to="dashboard">
            <span className="icon">
              <MdOutlineDashboardCustomize />
            </span>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink className="link" to="songs">
            <span className="icon">
              <MdOutlineMusicNote />
            </span>
            Songs
          </NavLink>
        </li>
        <li>
          <NavLink className="link" to="albums">
            <span className="icon">
              <BiAlbum />
            </span>
            Albums
          </NavLink>
        </li>
        <li>
          <NavLink className="link" to="artists">
            <span className="icon">
              <BiMicrophone />
            </span>
            Artists
          </NavLink>
        </li>
        <li>
          <NavLink className="link" to="genres">
            <span className="icon">
              <BsTags />
            </span>
            Genres
          </NavLink>
        </li>
        <li>
          <NavLink className="link" to="playlists">
            <span className="icon">
              <TbPlaylist />
            </span>
            Playlists
          </NavLink>
        </li>
        <li>
          <NavLink className="link" to="users">
            <span className="icon">
              <FiUser />
            </span>
            Users
          </NavLink>
        </li>
        <li>
          <NavLink className="link" to="/logout">
            <span className="icon">
              <MdLogout />
            </span>
            Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default SideNav;
