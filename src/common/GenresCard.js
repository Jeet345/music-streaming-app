import React from "react";
import { Link } from "react-router-dom";

import "../styles/App/App.css";

function GenresCard(prop) {
  let genresList = prop.genresList;

  let arrColorIndex = 0;
  let arrOfColor = [
    "#27856A",
    "#8D67AB",
    "#E8115B",
    "#7358FF",
    "#F037A5",
    "#D7F27D",
    "#E8115B",
    "#7358FF",
    "#EB1E32",
    "#BA5D07",
    "#F59B23",
    "#FF4632",
    "#8D67AB",
  ];

  const getBackColor = (index) => {
    index = index + 1;
    if (index == arrOfColor.length) {
      arrColorIndex = 0;
    } else {
      arrColorIndex = arrColorIndex + 1;
    }
    return arrOfColor[arrColorIndex];
  };

  return (
    <div className="genres-box">
      {genresList.length >= 1
        ? genresList.map((genres, elem) => {
            return (
              <div
                key={elem}
                className="genres-card"
                style={{ backgroundColor: getBackColor(elem) }}
              >
                <Link to="/about" className="link" key={1}>
                  {genres.name}
                </Link>
              </div>
            );
          })
        : ""}
    </div>
  );
}

export default GenresCard;
