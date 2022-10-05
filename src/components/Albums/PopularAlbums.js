import axios from "axios";
import React, { useEffect, useState } from "react";
import AlbumContainer from "./AlbumContainer";

export default function PopularAlbums() {
  const [albumData, setAlbumData] = useState([]);

  useEffect(() => {
    axios({
      url: "http://localhost:4000/albums/getPopularAlbums",
      method: "get",
    })
      .then((res) => {
        console.log("res", res.data);
        setAlbumData(res.data);
      })
      .catch((e) => {
        console.log(e);
        alert(e);
      });
  }, []);

  return (
    <div className="popular-albums-page">
      <h1 className="heading">Popular Albums</h1>
      <AlbumContainer albumData={albumData} />
    </div>
  );
}
