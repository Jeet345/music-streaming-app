import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setCurrPlayingSong, setIsPlaying, setQueue } from "../../actions";

export default function AlbumContainer(prop) {
  const albumData = prop.albumData;

  const [songData, setSongData] = useState([]);
  const toastId = "no track";

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isPlaying = useSelector((state) => state.changeIsPlaying);
  const queueData = useSelector((state) => state.changeTheQueue);

  const handleAlbumClick = (row) => {
    navigate(`/tracksByAlbum/${row._id}`);
  };

  const handlePlayBtnClick = (album) => {
    console.log("q", JSON.parse(queueData));

    axios({
      url: "http://localhost:4000/songs/getTracksByAlbumId",
      method: "post",
      data: {
        id: album._id,
      },
    })
      .then((res) => {
        const newSongData = res.data;
        if (newSongData.length) {
          dispatch(setIsPlaying(true));
          if (queueData != JSON.stringify(newSongData)) {
            dispatch(setQueue(JSON.stringify(newSongData)));
            dispatch(setCurrPlayingSong(JSON.stringify(newSongData[0])));
          }
        } else {
          toast.info("This album has not tracks !!", { toastId });
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  return (
    <div className="album-container">
      <div className="album-body">
        {albumData.map((album, elem) => {
          return (
            <div className="album-card" key={elem}>
              <div className="img">
                <img
                  src={`http://localhost:4000/getImg/${album.coverImg}`}
                  alt=""
                />
                <div
                  className="hover-box"
                  onClick={() => {
                    handleAlbumClick(album);
                  }}
                >
                  <div
                    className="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayBtnClick(album);
                    }}
                  >
                    <BsFillPlayFill />
                  </div>
                </div>
              </div>
              <div className="desc">
                <h5
                  className="album-name"
                  onClick={() => {
                    handleAlbumClick(album);
                  }}
                >
                  {album.name}
                </h5>
                <h5 className="artist-name">
                  {album.artist_names.map((artist, elem) => {
                    return (
                      <Link key={elem} to={`/tracksByArtist/${artist._id}`}>
                        {artist.name}
                      </Link>
                    );
                  })}
                </h5>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
