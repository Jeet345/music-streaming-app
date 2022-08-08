import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import { FiSearch } from "react-icons/fi";

function Songs() {
   const styles = {
      textField: {
         fontSize: "200px",
      },
   };

   return (
      <div className="song-page-container">
         <h1 className="title">Songs</h1>
         <TextField
            style={{ width: "100%" }}
            id="input-with-icon-textfield"
            className="search-filed"
            InputProps={{
               classes: styles.textField,
               startAdornment: (
                  <InputAdornment position="start">
                     <FiSearch />
                  </InputAdornment>
               ),
            }}
            variant="outlined"
         />
      </div>
   );
}

export default Songs;
