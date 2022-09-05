import React from "react";
import { Route, Routes } from "react-router-dom";
import TopNav from "./common/TopNav.js";
import SideNav from "./common/SideNav.js";
import Dashboard from "./pages/Dashboard/Dashboard.js";
import Songs from "./pages/Songs/Songs";
import "./admin.css";
import { createTheme, ThemeProvider } from "@mui/material";
import AddTrack from "./components/AddTrack.js";
import Albums from "./pages/Albums/albums";
import AddAlbum from "./components/AddAlbum";
import Artists from "./pages/Artists/Artists";
import AddArtist from "./components/AddArtist";
import UpdateArtist from "./components/UpdateArtist";
import Genres from "./pages/Genres/Genres.js";
import AddGenres from "./components/AddGenres.js";

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
            <Route path="/dashboard" element={<Dashboard />} />
            {/* path : /admin */}
            <Route path="/songs" element={<Songs />} />
            <Route path="/songs/createTrack" element={<AddTrack />} />
            <Route path="/albums" element={<Albums />} />
            <Route path="/albums/addAlbum" element={<AddAlbum />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/artists/addArtist" element={<AddArtist />} />
            <Route path="/artists/updateArtist" element={<UpdateArtist />} />
            <Route path="/genres" element={<Genres />} />
            <Route path="/genres/addGenres" element={<AddGenres />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default admin;
