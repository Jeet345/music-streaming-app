import { Button } from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { AiOutlineShareAlt } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { BsFillPauseFill, BsFillPlayFill, BsThreeDots } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { setCurrPlayingSong, setIsPlaying, setQueue } from "../../actions";
import SongDataTable from "../../common/SongDataTable";
import { toast } from "react-toastify";

function TracksByAlbum() {
  const [songData, setSongData] = useState([]);
  const [albumData, setAlbumData] = useState([]);
  const [isFavourite, setIsFavourite] = useState(false);

  const location = useLocation();
  const dispatch = useDispatch();

  const { albumId } = useParams();

  const isPlaying = useSelector((state) => state.changeIsPlaying);
  const queueData = useSelector((state) => state.changeTheQueue);
  const userCookie = useSelector((state) => state.changeUserCookie);

  const created_at = moment(albumData.created_at).format("ll"); // or any other format
  let totalDuration = 0;

  songData?.map((song, elem) => {
    totalDuration = totalDuration + song.duration;
  });

  const getAlbumData = () => {
    axios({
      url: "http://localhost:4000/albums/getAlbumById",
      method: "post",
      data: {
        id: albumId,
      },
    })
      .then((res) => {
        setAlbumData(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  useEffect(() => {
    getAlbumData();
  }, [albumId]);

  useEffect(() => {
    axios({
      url: "http://localhost:4000/songs/getTracksByAlbumId",
      method: "post",
      data: {
        id: albumId,
      },
    })
      .then((res) => {
        setSongData(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  }, [albumId]);

  const checkIsFavorite = () => {
    if (userCookie) {
      axios({
        url: "http://localhost:4000/library/getFavoriteAlbumByUserId",
        method: "post",
        data: {
          userId: userCookie,
          albumId,
        },
      })
        .then((res) => {
          if (res.data.favorite_albums.includes(albumId)) {
            setIsFavourite(true);
          } else {
            setIsFavourite(false);
          }
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    }
  };

  useEffect(() => {
    checkIsFavorite();
  }, [albumId]);

  // formate seconds in form of (00:00)
  const calculateTime = (sesc) => {
    const minutes = Math.floor(sesc / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(sesc % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const handlePlayBtnClick = () => {
    dispatch(setIsPlaying(true));
    if (queueData != JSON.stringify(songData)) {
      dispatch(setQueue(JSON.stringify(songData)));
      dispatch(setCurrPlayingSong(JSON.stringify(songData[0])));

      // incress plays in db
      axios({
        url: "http://localhost:4000/albums/updatePlays",
        method: "post",
        data: {
          id: albumData._id,
        },
      })
        .then((res) => {
          console.log("album plays incress");
        })
        .catch((err) => {
          console.log("Something wan't wrong !!");
        });
    }
  };

  const handlePauseBtnClick = () => {
    dispatch(setIsPlaying(false));
  };

  const handleAddFavBtnClick = () => {
    if (userCookie) {
      axios({
        url: "http://localhost:4000/library/addFavoriteAlbum",
        method: "post",
        data: {
          userId: userCookie,
          albumId,
        },
      })
        .then((res) => {
          console.log("add res", res.data);
          checkIsFavorite();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.warn("Please login to access this feature !!", {
        toastId: "login toast",
      });
    }
  };

  const handleRemoveFavBtnClick = () => {
    if (userCookie) {
      axios({
        url: "http://localhost:4000/library/removeFavoriteAlbum",
        method: "delete",
        data: {
          userId: userCookie,
          albumId,
        },
      })
        .then((res) => {
          console.log("remove res", res.data);
          checkIsFavorite();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.warn("Please login to access this feature !!", {
        toastId: "login toast",
      });
    }
  };

  return (
    <div className="tracks-by-album-page">
      <div className="header">
        <div className="left-head">
          <img
            src={
              albumData.coverImg
                ? `http://localhost:4000/getImg/${albumData.coverImg}`
                : null
            }
            alt=""
          />
        </div>
        <div className="right-head">
          <h1 className="title">{albumData.name}</h1>
          <div className="artist-box">
            {albumData.artist_names?.map((artist, elem) => {
              return (
                <Link to={`/tracksByArtist/${artist._id}`} key={elem}>
                  <img
                    src={`http://localhost:4000/getImg/${artist.coverImg}`}
                    alt=""
                  />
                  {artist.name}
                </Link>
              );
            })}
          </div>
          <ul className="desc-box">
            <li>{songData.length} tracks</li>
            <li>{calculateTime(totalDuration)} mins</li>
            <li>{created_at}</li>
          </ul>
          <div className="action-btn">
            {isPlaying && queueData == JSON.stringify(songData) ? (
              <Button
                className="play-btn btn"
                onClick={handlePauseBtnClick}
                variant="contained"
                startIcon={<BsFillPauseFill />}
              >
                Pause
              </Button>
            ) : (
              <Button
                className="play-btn btn"
                onClick={handlePlayBtnClick}
                variant="contained"
                disabled={songData.length ? false : true}
                startIcon={<BsFillPlayFill />}
              >
                Play
              </Button>
            )}

            {isFavourite ? (
              <Button
                className={`like-btn btn active`}
                variant="outlined"
                onClick={handleRemoveFavBtnClick}
                startIcon={isFavourite ? <FaHeart color="red" /> : <FiHeart />}
              >
                Like
              </Button>
            ) : (
              <Button
                className={`like-btn btn`}
                variant="outlined"
                onClick={handleAddFavBtnClick}
                startIcon={isFavourite ? <FaHeart color="red" /> : <FiHeart />}
              >
                Like
              </Button>
            )}

            <Button
              className="share-btn btn"
              variant="outlined"
              startIcon={<AiOutlineShareAlt />}
            >
              Share
            </Button>
            <Button
              className="more-btn btn"
              variant="outlined"
              startIcon={<BsThreeDots />}
            >
              More
            </Button>
          </div>
        </div>
      </div>

      <SongDataTable data={songData} albumVisible={false} />
    </div>
  );
}

export default TracksByAlbum;
