import axios from "axios";
import React from "react";
import { BiMicrophone } from "react-icons/bi";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setCurrPlayingSong, setIsPlaying, setQueue } from "../../actions";

function ArtistContainer(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let artistData = props.artistData;
  const searchValue = props.searchValue;

  // if search is avilable then
  if (searchValue) {
    const newArtistData = artistData.filter((artist) => {
      if (searchValue.length)
        return artist.name.toLowerCase().startsWith(searchValue.toLowerCase());
    });
    if (newArtistData.length) {
      artistData = newArtistData;
    } else {
      if (searchValue.length == 0) {
        artistData = newArtistData;
      } else {
        artistData = [];
      }
    }
  }

  const isPlaying = useSelector((state) => state.changeIsPlaying);
  const queueData = useSelector((state) => state.changeTheQueue);

  const handleArtistClick = (artist) => {
    navigate(`/tracksByArtist/${artist._id}`);
  };

  const handlePlayBtnClick = (artist) => {
    axios({
      url: "http://localhost:4000/songs/getTracksByArtistId",
      method: "post",
      data: {
        id: artist._id,
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
          toast.info("This artist has not tracks !!", { toastId: "no tracks" });
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  return (
    <div className="artist-container">
      {artistData.length > 0 ? (
        <div className="artist-body">
          {artistData.map((artist, elem) => {
            return (
              <div className="album-card" key={elem}>
                <div className="img">
                  <img
                    src={`http://localhost:4000/getImg/${artist.coverImg}`}
                    alt=""
                  />
                  <div
                    className="hover-box"
                    onClick={() => {
                      handleArtistClick(artist);
                    }}
                  >
                    <div
                      className="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayBtnClick(artist);
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
                      handleArtistClick(artist);
                    }}
                  >
                    {artist.name}
                  </h5>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="nothing-box">
          <BiMicrophone color="#bababa" size={90} />
          <h3>Nothing To Display.</h3>
          <p>You have not following any artists yet.</p>
        </div>
      )}
    </div>
  );
}

export default ArtistContainer;
