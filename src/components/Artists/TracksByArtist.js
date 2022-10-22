import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
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
import AlbumContainer from "../Albums/AlbumContainer";
import { toast } from "react-toastify";

function TracksByArtist() {
  const [songData, setSongData] = useState([]);
  const [artistData, setArtistData] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [albumData, setAlbumData] = useState([]);

  const location = useLocation();
  const dispatch = useDispatch();

  const { artistId } = useParams();

  const isPlaying = useSelector((state) => state.changeIsPlaying);
  const queueData = useSelector((state) => state.changeTheQueue);
  const userCookie = useSelector((state) => state.changeUserCookie);

  const [tabIndex, setTabIndex] = useState(0);

  const created_at = moment(artistData.created_at).format("ll");
  let totalDuration = 0;

  songData?.map((song, elem) => {
    totalDuration = totalDuration + song.duration;
  });

  const getArtistData = () => {
    axios({
      url: `${process.env.REACT_APP_API}artists/getArtistById`,
      method: "post",
      data: {
        id: artistId,
      },
    })
      .then((res) => {
        setArtistData(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  useEffect(() => {
    getArtistData();
  }, [artistId]);

  useEffect(() => {
    axios({
      url: `${process.env.REACT_APP_API}songs/getTracksByArtistId`,
      method: "post",
      data: {
        id: artistId,
      },
    })
      .then((res) => {
        setSongData(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  }, [artistId]);

  useEffect(() => {
    axios({
      url: `${process.env.REACT_APP_API}albums/getAlbumByArtistId`,
      method: "post",
      data: {
        id: artistId,
      },
    })
      .then((res) => {
        setAlbumData(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  }, [artistId]);

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
    }
  };

  const handlePauseBtnClick = () => {
    dispatch(setIsPlaying(false));
  };

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  const checkIsFollowing = () => {
    if (userCookie) {
      axios({
        url: `${process.env.REACT_APP_API}library/getFollowingArtistsByUserId`,
        method: "post",
        data: {
          userId: userCookie,
          artistId,
        },
      })
        .then((res) => {
          if (res.data.following_artists.includes(artistId)) {
            setIsFollowing(true);
          } else {
            setIsFollowing(false);
          }
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    }
  };

  useEffect(() => {
    checkIsFollowing();
  }, []);

  const handleFollowBtnClick = () => {
    if (userCookie) {
      axios({
        url: `${process.env.REACT_APP_API}library/addFollowingArtists`,
        method: "post",
        data: {
          userId: userCookie,
          artistId,
        },
      })
        .then((res) => {
          checkIsFollowing();
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

  const handleFollowingBtnClick = () => {
    axios({
      url: `${process.env.REACT_APP_API}library/removeFollowingArtists`,
      method: "delete",
      data: {
        userId: userCookie,
        artistId,
      },
    })
      .then((res) => {
        checkIsFollowing();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="tracks-by-artist-page">
      <div className="header">
        <div className="left-head">
          <img
            src={
              artistData.coverImg
                ? `${process.env.REACT_APP_API}getImg/${artistData.coverImg}`
                : null
            }
            alt=""
          />
        </div>
        <div className="right-head">
          <h1 className="title">{artistData.name}</h1>

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

            {isFollowing ? (
              <Button
                className={`like-btn btn active`}
                variant="outlined"
                onClick={handleFollowingBtnClick}
                startIcon={isFollowing ? <FaHeart color="red" /> : <FiHeart />}
              >
                Following
              </Button>
            ) : (
              <Button
                className={`like-btn btn`}
                variant="outlined"
                onClick={handleFollowBtnClick}
                startIcon={isFollowing ? <FaHeart color="red" /> : <FiHeart />}
              >
                Follow
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

      <Box className="tab-container" sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "#3b3b3b" }}>
          <Tabs value={tabIndex} onChange={handleTabChange}>
            <Tab label="Discography" />
            <Tab label="Similar Artists" />
            <Tab label="About" />
          </Tabs>
        </Box>
        <Box>
          {tabIndex === 0 && (
            <Box>
              <h3 className="title">Popular Songs</h3>
              <SongDataTable
                data={songData}
                artistVisible={false}
                albumVisible={false}
              />

              {albumData.length ? (
                <>
                  <h3 style={{ marginBottom: "30px" }} className="title">
                    Albums
                  </h3>
                  <AlbumContainer albumData={albumData} />
                </>
              ) : null}
            </Box>
          )}
          {tabIndex === 1 && <Box></Box>}
          {tabIndex === 2 && (
            <Box>
              <p
                style={{
                  color: "white",
                  padding: "20px",
                }}
              >
                {artistData.description}
              </p>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
}

export default TracksByArtist;
