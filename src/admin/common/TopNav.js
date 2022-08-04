import React from "react";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FaRegBell } from "react-icons/fa";
import { BsFillCaretDownFill } from "react-icons/bs";
import { Link } from "react-router-dom";

function TopNav() {
   return (
      <>
         <header className="admin-top-nav">
            <div className="logo">
               <h1>MUSICK</h1>
            </div>
            <ul className="right-side">
               <li>
                  <Link className="link" to="/admin">
                     <FaRegBell />
                  </Link>
               </li>
               <li className="profile-btn">
                  <img
                     src={require("../assets/profileIcon.png")}
                     width="40px"
                  />
                  <div className="icon">
                     <BsFillCaretDownFill />
                  </div>
               </li>
            </ul>
         </header>
      </>
   );
}

export default TopNav;
