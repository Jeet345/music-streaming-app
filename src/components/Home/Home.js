import React from "react";
import SongDataTable from "../../common/SongDataTable";
import "../../styles/Home/Home.css";

function Home() {
   console.log("Home loaded");
   return (
      <div className="home-page">
         <h1>Home Page</h1>
         <SongDataTable />
      </div>
   );
}

export default Home;
