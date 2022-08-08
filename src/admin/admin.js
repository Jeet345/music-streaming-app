import React from "react";
import { Route, Routes } from "react-router-dom";
import TopNav from "./common/TopNav.js";
import SideNav from "./common/SideNav.js";
import Dashboard from "./pages/Dashboard/Dashboard.js";
import Songs from "./pages/Songs/Songs";
import "./admin.css";
import { createTheme, ThemeProvider } from "@mui/material";
import AddTrack from "./components/AddTrack.js";

function admin() {
   const theme = createTheme({
      palette: {
         mode: "dark",
         primary: { main: "#689f38" },
         secondary: {
            main: "#fff",
         },
      },
   });

   return (
      <ThemeProvider theme={theme}>
         <TopNav />
         <div className="admin-container">
            <SideNav />
            <div className="admin-pages">
               <Routes>
                  <Route path="/" element={<Dashboard />} />
                  {/* path : /admin */}
                  <Route path="/songs" element={<Songs />} />
                  <Route path="/songs/createTrack" element={<AddTrack />} />
               </Routes>
            </div>
         </div>
      </ThemeProvider>
   );
}

export default admin;
