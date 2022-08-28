import React from "react";
import { FaRegBell } from "react-icons/fa";
import { BsFillCaretDownFill } from "react-icons/bs";
import { IconButton, Tooltip } from "@mui/material";
function TopNav() {
   return (
      <>
         <header className="admin-top-nav">
            <div className="logo">
               <h1>MUSICK</h1>
            </div>
            <ul className="right-side">
               <li>
                  <Tooltip title="Notifications">
                     <IconButton aria-label="notifications" color="secondary">
                        <FaRegBell size={"20px"} />
                     </IconButton>
                  </Tooltip>
               </li>
               <li className="profile-btn">
                  <img
                     alt=""
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
