import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { MdOutlineAlbum } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setCurrPlayingSong, setIsPlaying, setQueue } from "../../actions";

export default function AlbumContainer(prop) {
  let albumData = prop.albumData;
  const searchValue = prop.searchValue;

  const toastId = "no track";

  // if search is avilable then
  if (searchValue) {
    const newAlbumData = albumData.filter((album) => {
      if (searchValue.length)
        return (
          album.name.toLowerCase().startsWith(searchValue.toLowerCase()) ||
          album.artist_names[0].name
            .toLowerCase()
            .startsWith(searchValue.toLowerCase())
        );
    });
    if (newAlbumData.length) {
      albumData = newAlbumData;
    } else {
      if (searchValue.length == 0) {
        albumData = newAlbumData;
      } else {
        albumData = [];
      }
    }
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isPlaying = useSelector((state) => state.changeIsPlaying);
  const queueData = useSelector((state) => state.changeTheQueue);

  const handleAlbumClick = (row) => {
    navigate(`/tracksByAlbum/${row._id}`);
  };

  const handlePlayBtnClick = (album) => {
    axios({
      url: `${process.env.REACT_APP_API}songs/getTracksByAlbumId`,
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
      {albumData.length > 0 ? (
        <div className="album-body">
          {albumData.map((album, elem) => {
            return (
              <div className="album-card" key={elem}>
                <div className="img">
                  <img
                    src={`${process.env.REACT_APP_API}getImg/${album.coverImg}`}
                    alt=""
                  />
                  <div
                    className="hover-box"
                    onClick={() => {
                      handleAlbumClick(album);
                    }}
                  >
                    {isPlaying && false ? (
                      <div
                        className="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          // handlePauseBtnClick(album);
                        }}
                      >
                        <BsFillPauseFill />
                      </div>
                    ) : (
                      <div
                        className="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlayBtnClick(album);
                        }}
                      >
                        <BsFillPlayFill />
                      </div>
                    )}
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
      ) : (
        <div className="nothing-box">
          <MdOutlineAlbum color="#bababa" size={90} />
          <h3>Nothing To Display.</h3>
          <p>You have not added any albums to your library yet.</p>
        </div>
      )}
    </div>
  );
}
