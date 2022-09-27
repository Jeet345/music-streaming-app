import Home from "./components/Home/Home.js";
import About from "./components/About/About.js";
import Login from "./components/Account/Login.js";
import Register from "./components/Account/Register.js";
import Player from "./components/Player/Player";
import "./styles/App/App.css";
import Nav from "./common/Nav.js";
import SideQueueBox from "./common/SideQueueBox.js";
import { Route, Routes } from "react-router-dom";

function User() {
  return (
    <>
      <div className="appContainer">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <SideQueueBox />
      </div>
      <Player />
    </>
  );
}

export default User;
