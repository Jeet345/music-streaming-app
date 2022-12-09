import React from "react";
import { Route, Routes } from "react-router-dom";
import TopNav from "./common/TopNav.js";
import SideNav from "./common/SideNav.js";
import Dashboard from "./pages/Dashboard/Dashboard.js";
import Songs from "./pages/Songs/Songs";
import "./admin.css";
import AddTrack from "./pages/Songs/AddTrack.js";
import Albums from "./pages/Albums/albums";
import AddAlbum from "./pages/Albums/AddAlbum";
import Artists from "./pages/Artists/Artists";
import AddArtist from "./pages/Artists/AddArtist";
import UpdateArtist from "./pages/Artists/UpdateArtist";
import Genres from "./pages/Genres/Genres.js";
import AddGenres from "./pages/Genres/AddGenres.js";
import UpdateGenres from "./pages/Genres/UpdateGenres.js";
import UpdateAlbum from "./pages/Albums/UpdateAlbum.js";
import UpdateTrack from "./pages/Songs/UpdateTrack.js";
import Playlists from "./pages/Playlists/Playlists.js";
import Users from "./pages/Users/Users.js";
import AddUser from "./pages/Users/AddUser.js";
import UpdateUser from "./pages/Users/UpdateUser.js";

function admin() {
  return (
    <>
      <TopNav />
      <div className="admin-container">
        <SideNav />
        <div className="admin-pages">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* path : /admin */}
            <Route path="/songs" element={<Songs />} />
            <Route path="/songs/createTrack" element={<AddTrack />} />
            <Route path="/songs/updateTrack" element={<UpdateTrack />} />
            <Route path="/albums" element={<Albums />} />
            <Route path="/albums/addAlbum" element={<AddAlbum />} />
            <Route path="/albums/updateAlbum" element={<UpdateAlbum />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/artists/addArtist" element={<AddArtist />} />
            <Route path="/artists/updateArtist" element={<UpdateArtist />} />
            <Route path="/genres" element={<Genres />} />
            <Route path="/genres/addGenres" element={<AddGenres />} />
            <Route path="/genres/updateGenres" element={<UpdateGenres />} />

            <Route path="/playlists" element={<Playlists />} />

            <Route path="/users" element={<Users />} />
            <Route path="/users/addUser" element={<AddUser />} />
            <Route path="/users/updateUser" element={<UpdateUser />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default admin;
