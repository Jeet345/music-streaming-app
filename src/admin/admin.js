import React from "react";
import { Route, Routes } from "react-router-dom";
import TopNav from "./common/TopNav.js";
import SideNav from "./common/SideNav.js";
import Dashboard from "./pages/Dashboard/Dashboard.js";
import Songs from "./pages/Songs/Songs";
import "./admin.css";

function admin() {
   return (
      <>
         <TopNav />
         <div className="admin-container">
            <SideNav />
            <div className="admin-pages">
               <Routes>
                  <Route path="/" element={<Dashboard />} />{" "}
                  {/* path : /admin */}
                  <Route path="/songs" element={<Songs />} />
               </Routes>
            </div>
         </div>
      </>
   );
}

export default admin;
