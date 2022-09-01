import React from "react";
import { NavLink } from "react-router-dom";
import {
  MdOutlineDashboardCustomize,
  MdOutlineMusicNote,
} from "react-icons/md";

import { BiMicrophone, BiAlbum } from "react-icons/bi";

function SideNav() {
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
          <NavLink className="link" to="artist">
            <span className="icon">
              <BiMicrophone />
            </span>
            Artists
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default SideNav;
