import { Button } from "@mui/material";
import React from "react";
import "../pages/Songs/song.css";

function AddTrack() {
   return (
      <div className="add-track-container">
         <div className="left-side-box">
            <div className="img-box">
               <img src={require("../assets/album.jpg")} alt="" srcset="" />
               <Button
                  className="upload-btn"
                  variant="contained"
                  component="label"
               >
                  Upload image
                  <input hidden accept="image/*" type="file" />
               </Button>
            </div>
            <Button
               className="upload-track-btn"
               variant="contained"
               component="label"
            >
               Upload Track
               <input hidden accept=".mp3" type="file" />
            </Button>
         </div>
         <div className="right-side-box"></div>
      </div>
   );
}

export default AddTrack;
