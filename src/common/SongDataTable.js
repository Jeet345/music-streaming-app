import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";
const img = require("../assets/download.jpg");

export default function SongDataTable() {
   return (
      <div className="data-table-container">
         <h1 className="title">Popular Tracks</h1>
         <table className="data-table">
            <thead>
               <th style={{ paddingRight: "35px" }}>#</th>
               <th></th>
               <th></th>
               <th>Title</th>
               <th></th>
               <th>Artist</th>
               <th>Albums</th>
               <th className="head-icon">
                  <BiTimeFive />
               </th>
            </thead>
            <tbody>
               <tr>
                  <td style={{ color: "#bababa" }}>1</td>
                  {/* two classes empty and fill */}
                  <td className="icon empty">
                     <AiOutlineHeart />
                     {/* <AiFillHeart /> */}
                  </td>

                  <td className="song-image">
                     <img src={img} width="35px" />
                  </td>
                  <td style={{ paddingLeft: "15px" }}>
                     STAY (with Justin Bieber)
                  </td>
                  <td
                     className="icon menu-icon"
                     style={{ paddingRight: "25px" }}
                  >
                     <BsThreeDots />
                  </td>
                  <td>The Kid LAROI, Justin Bieber</td>
                  <td>F*CK LOVE 3: OVER YOU</td>
                  <td>2:21</td>
               </tr>
               <tr>
                  <td style={{ color: "#bababa" }}>1</td>
                  {/* two classes empty and fill */}
                  <td className="icon empty">
                     <AiOutlineHeart />
                     {/* <AiFillHeart /> */}
                  </td>

                  <td className="song-image">
                     <img src={img} width="35px" />
                  </td>
                  <td style={{ paddingLeft: "15px" }}>
                     STAY (with Justin Bieber)
                  </td>
                  <td
                     className="icon menu-icon"
                     style={{ paddingRight: "25px" }}
                  >
                     <BsThreeDots />
                  </td>
                  <td>The Kid LAROI, Justin Bieber</td>
                  <td>F*CK LOVE 3: OVER YOU</td>
                  <td>2:21</td>
               </tr>
               <tr>
                  <td style={{ color: "#bababa" }}>1</td>
                  {/* two classes empty and fill */}
                  <td className="icon empty">
                     <AiOutlineHeart />
                     {/* <AiFillHeart /> */}
                  </td>

                  <td className="song-image">
                     <img src={img} width="35px" />
                  </td>
                  <td style={{ paddingLeft: "15px" }}>
                     STAY (with Justin Bieber)
                  </td>
                  <td
                     className="icon menu-icon"
                     style={{ paddingRight: "25px" }}
                  >
                     <BsThreeDots />
                  </td>
                  <td>The Kid LAROI, Justin Bieber</td>
                  <td>F*CK LOVE 3: OVER YOU</td>
                  <td>2:21</td>
               </tr>
               <tr>
                  <td style={{ color: "#bababa" }}>1</td>
                  {/* two classes empty and fill */}
                  <td className="icon empty">
                     <AiOutlineHeart />
                     {/* <AiFillHeart /> */}
                  </td>

                  <td className="song-image">
                     <img src={img} width="35px" />
                  </td>
                  <td style={{ paddingLeft: "15px" }}>
                     STAY (with Justin Bieber)
                  </td>
                  <td
                     className="icon menu-icon"
                     style={{ paddingRight: "25px" }}
                  >
                     <BsThreeDots />
                  </td>
                  <td>The Kid LAROI, Justin Bieber</td>
                  <td>F*CK LOVE 3: OVER YOU</td>
                  <td>2:21</td>
               </tr>
               <tr>
                  <td style={{ color: "#bababa" }}>1</td>
                  {/* two classes empty and fill */}
                  <td className="icon empty">
                     <AiOutlineHeart />
                     {/* <AiFillHeart /> */}
                  </td>

                  <td className="song-image">
                     <img src={img} width="35px" />
                  </td>
                  <td style={{ paddingLeft: "15px" }}>
                     STAY (with Justin Bieber)
                  </td>
                  <td
                     className="icon menu-icon"
                     style={{ paddingRight: "25px" }}
                  >
                     <BsThreeDots />
                  </td>
                  <td>The Kid LAROI, Justin Bieber</td>
                  <td>F*CK LOVE 3: OVER YOU</td>
                  <td>2:21</td>
               </tr>
               <tr>
                  <td style={{ color: "#bababa" }}>1</td>
                  {/* two classes empty and fill */}
                  <td className="icon empty">
                     <AiOutlineHeart />
                     {/* <AiFillHeart /> */}
                  </td>

                  <td className="song-image">
                     <img src={img} width="35px" />
                  </td>
                  <td style={{ paddingLeft: "15px" }}>
                     STAY (with Justin Bieber)
                  </td>
                  <td
                     className="icon menu-icon"
                     style={{ paddingRight: "25px" }}
                  >
                     <BsThreeDots />
                  </td>
                  <td>The Kid LAROI, Justin Bieber</td>
                  <td>F*CK LOVE 3: OVER YOU</td>
                  <td>2:21</td>
               </tr>
            </tbody>
         </table>
      </div>
   );
}
