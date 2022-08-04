import React from "react";
import { Link } from "react-router-dom";
import {
   MdOutlineDashboardCustomize,
   MdOutlineMusicNote,
} from "react-icons/md";

function SideNav() {
   return (
      <div className="admin-side-nav">
         <ul>
            <li>
               <Link className="link active" to="/admin">
                  <span className="icon">
                     <MdOutlineDashboardCustomize />
                  </span>
                  Home
               </Link>
            </li>
            <li>
               <Link className="link" to="/admin/songs">
                  <span className="icon">
                     <MdOutlineMusicNote />
                  </span>
                  About
               </Link>
            </li>
            <li>
               <Link className="link" to="/admin/songs">
                  <span className="icon">
                     <MdOutlineMusicNote />
                  </span>
                  About
               </Link>
            </li>
            <li>
               <Link className="link" to="/admin/songs">
                  <span className="icon">
                     <MdOutlineMusicNote />
                  </span>
                  About
               </Link>
            </li>
            <li>
               <Link className="link" to="/admin/songs">
                  <span className="icon">
                     <MdOutlineMusicNote />
                  </span>
                  About
               </Link>
            </li>
            <li>
               <Link className="link" to="/admin/songs">
                  <span className="icon">
                     <MdOutlineMusicNote />
                  </span>
                  About
               </Link>
            </li>
            <li>
               <Link className="link" to="/admin/songs">
                  <span className="icon">
                     <MdOutlineMusicNote />
                  </span>
                  About
               </Link>
            </li>
            <li>
               <Link className="link" to="/admin/songs">
                  <span className="icon">
                     <MdOutlineMusicNote />
                  </span>
                  About
               </Link>
            </li>
            <li>
               <Link className="link" to="/admin/songs">
                  <span className="icon">
                     <MdOutlineMusicNote />
                  </span>
                  About
               </Link>
            </li>
            <li>
               <Link className="link" to="/admin/songs">
                  <span className="icon">
                     <MdOutlineMusicNote />
                  </span>
                  About
               </Link>
            </li>
            <li>
               <Link className="link" to="/admin/songs">
                  <span className="icon">
                     <MdOutlineMusicNote />
                  </span>
                  About
               </Link>
            </li>
            <li>
               <Link className="link" to="/admin/songs">
                  <span className="icon">
                     <MdOutlineMusicNote />
                  </span>
                  About
               </Link>
            </li>
            <li>
               <Link className="link" to="/admin/songs">
                  <span className="icon">
                     <MdOutlineMusicNote />
                  </span>
                  About
               </Link>
            </li>
            <li>
               <Link className="link" to="/admin/songs">
                  <span className="icon">
                     <MdOutlineMusicNote />
                  </span>
                  About
               </Link>
            </li>
         </ul>
      </div>
   );
}

export default SideNav;
