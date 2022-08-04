import React from "react";
import PopularTracks from "../PopularTracks/PopularTracks";
import PopularAlbums from "../PopularAlbums/PopularAlbums";
import "../../styles/Home/Home.css";

function Home() {
   console.log("Home loaded");
   return (
      <div className="home-page">
         <PopularAlbums />
         <PopularTracks />
      </div>
   );
}

export default Home;
