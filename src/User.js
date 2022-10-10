import Home from "./components/Home/Home.js";
import About from "./components/About/About.js";
import Login from "./components/Account/Login.js";
import Register from "./components/Account/Register.js";
import Player from "./components/Player/Player";
import "./styles/App/App.css";
import Nav from "./common/Nav.js";
import SideQueueBox from "./common/SideQueueBox.js";
import { Navigate, Route, Routes } from "react-router-dom";
import Genres from "./components/Genres/Genres.js";
import PopularTracks from "./components/Tracks/PopularTracks.js";
import PopularAlbums from "./components/Albums/PopularAlbums.js";
import TracksByAlbum from "./components/Albums/TracksByAlbum.js";
import TracksByArtist from "./components/Artists/TracksByArtist.js";
import Logout from "./components/Account/Logout.js";
import Songs from "./components/your_music/Songs.js";
import Albums from "./components/your_music/Albums.js";
import History from "./components/your_music/History.js";
import Artists from "./components/your_music/Artists.js";
import { useSelector } from "react-redux";
import NewReleases from "./components/Tracks/NewReleases.js";

function User() {
  const userCookie = useSelector((state) => state.changeUserCookie);

  return (
    <>
      <div className="appContainer">
        <Nav />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          {!userCookie ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          ) : null}
          <Route path="/logout" element={<Logout />} />

          <Route path="/genres" element={<Genres />} />
          <Route path="/popularTracks" element={<PopularTracks />} />
          <Route path="/newReleases" element={<NewReleases />} />
          <Route path="/popularAlbums" element={<PopularAlbums />} />
          <Route path="/tracksByAlbum/:albumId" element={<TracksByAlbum />} />
          <Route
            path="/tracksByArtist/:artistId"
            element={<TracksByArtist />}
          />

          {/* Auth Page */}

          <Route
            path="/library/songs"
            element={userCookie ? <Songs /> : <Navigate to="/login" />}
          />
          <Route
            path="/library/albums"
            element={userCookie ? <Albums /> : <Navigate to="/login" />}
          />
          <Route
            path="/library/artists"
            element={userCookie ? <Artists /> : <Navigate to="/login" />}
          />
          <Route
            path="/library/history"
            element={userCookie ? <History /> : <Navigate to="/login" />}
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <SideQueueBox />
      </div>
      <Player />
    </>
  );
}

export default User;
