import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { setCurrPlayingSong, setIsPlaying, setQueue } from "../actions/index";

function SearchContainer() {
  const dispatch = useDispatch();

  const searchQuery = useSelector((state) => state.changeSearchQuery);
  const isPlaying = useSelector((state) => state.changeIsPlaying);
  const queueData = useSelector((state) => state.changeTheQueue);
  const currPlayingSong = JSON.parse(
    useSelector((state) => state.changeCurrPlayingSong)
  );

  const albumImg = require("../assets/album.jpg");

  const [isVisible, setIsVisible] = useState(false);
  const [searchResData, setSearchResData] = useState(null);

  const handleOutsideClick = (e) => {
    if (e.target.className == "search-page-container") {
      setIsVisible(false);
    }
  };

  const handleSongLinkClick = (track) => {
    dispatch(setIsPlaying(true));
    if (queueData != JSON.stringify([track])) {
      dispatch(setQueue(JSON.stringify([track])));
      dispatch(setCurrPlayingSong(JSON.stringify(track)));
    }
  };

  useEffect(() => {
    if (searchQuery) {
      setIsVisible(true);

      axios({
        url: `${process.env.REACT_APP_API}search`,
        method: "post",
        data: {
          query: searchQuery,
        },
      })
        .then((res) => {
          console.log("search res", res.data);
          setSearchResData(res.data);
        })
        .catch((err) => {
          console.log("Something Wan't Wrong !!");
        });
    } else {
      setIsVisible(false);
    }
  }, [searchQuery]);

  const handlePauseBtnClick = () => {
    dispatch(setIsPlaying(false));
  };

  const handlePlayBtnClick = (data) => {
    handleSongLinkClick(data);
  };

  return (
    <div
      className={
        isVisible
          ? "search-page-container"
          : "search-page-container hidden-search-page-container"
      }
      onClick={handleOutsideClick}
    >
      {searchResData != null ? (
        <div className="search-box">
          <Link to={"/"} className="title">
            <h4>View All Results...</h4>
            <MdKeyboardArrowRight size={24} color="white" />
          </Link>

          {searchResData.artists.length ? (
            <div className="result-box">
              <h5 className="heading">Artists</h5>
              <ul>
                {searchResData.artists?.map((artist, elem) => {
                  return (
                    <li key={elem}>
                      <Link
                        to={`/tracksByArtist/${artist._id}`}
                        className="img"
                      >
                        <img
                          alt=""
                          src={`${process.env.REACT_APP_API}getImg/${artist.coverImg}`}
                        />
                      </Link>
                      <div className="desc">
                        <Link
                          to={`/tracksByArtist/${artist._id}`}
                          className="main"
                        >
                          {artist.name}
                        </Link>
                        <Link to={"/"} className="sub">
                          Artist
                        </Link>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}

          {searchResData.tracks.length ? (
            <div className="result-box songs-box">
              <h5 className="heading">Songs</h5>
              <ul>
                {searchResData.tracks?.map((track, elem) => {
                  return (
                    <li key={elem}>
                      <div to={"/"} className="img">
                        <img
                          alt=""
                          src={`${process.env.REACT_APP_API}getImg/${track.imageFileName}`}
                        />
                        {isPlaying && currPlayingSong._id == track._id ? (
                          <div
                            className="hover-box"
                            onClick={handlePauseBtnClick}
                          >
                            <div className="icon">
                              <BsFillPauseFill size={25} />
                            </div>
                          </div>
                        ) : (
                          <div
                            className="hover-box"
                            onClick={() => {
                              handlePlayBtnClick(track);
                            }}
                          >
                            <div className="icon">
                              <BsFillPlayFill size={25} />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="desc">
                        <div
                          className="main"
                          onClick={() => {
                            handleSongLinkClick(track);
                          }}
                        >
                          {track.title.length > 27
                            ? track.title.substring(0, 27) + "..."
                            : track.title}
                        </div>
                        <div className="sub">
                          {track.artist_names.map((artist, elem) => {
                            return (
                              <Link
                                key={elem}
                                to={`/tracksByArtist/${artist._id}`}
                              >
                                {artist.name}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}

          {searchResData.albums.length ? (
            <div className="result-box">
              <h5 className="heading">Albums</h5>
              <ul>
                {searchResData.albums?.map((album, elem) => {
                  return (
                    <li key={elem}>
                      <Link to={`/tracksByAlbum/${album._id}`} className="img">
                        <img
                          alt=""
                          src={`${process.env.REACT_APP_API}getImg/${album.coverImg}`}
                        />
                      </Link>
                      <div className="desc">
                        <Link
                          to={`/tracksByAlbum/${album._id}`}
                          className="main"
                        >
                          {album.name.length > 27
                            ? album.name.substring(0, 27) + "..."
                            : album.name}
                        </Link>
                        <div className="sub">
                          {album.artist_names.map((artist, elem) => {
                            return (
                              <Link
                                key={elem}
                                to={`/tracksByArtist/${artist._id}`}
                              >
                                {artist.name}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}

          {searchResData.playlists.length ? (
            <div className="result-box">
              <h5 className="heading">Playlists</h5>
              <ul>
                {searchResData.playlists?.map((playlist, elem) => {
                  return (
                    <li key={elem}>
                      <Link to={`/playlist/${playlist._id}`} className="img">
                        <img
                          alt=""
                          src={
                            playlist.coverImg
                              ? `${process.env.REACT_APP_API}getImg/${playlist.coverImg}`
                              : albumImg
                          }
                        />
                      </Link>
                      <div className="desc">
                        <Link to={`/playlist/${playlist._id}`} className="main">
                          {playlist.name.length > 27
                            ? playlist.name.substring(0, 27) + "..."
                            : playlist.name}
                        </Link>
                        <div className="sub">
                          {playlist.users.map((user, elem) => {
                            return (
                              <Link key={elem} to={"/"}>
                                by {user.username}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}

          {/* <div className="result-box">
            <h5 className="heading">People</h5>
            <ul>
              <li>
                <Link to={"/"} className="img">
                  <img
                    alt=""
                    src="https://i.scdn.co/image/ab676161000051748ae7f2aaa9817a704a87ea36"
                  />
                </Link>
                <div className="desc">
                  <Link to={"/"} className="main">
                    Justin Bieber
                  </Link>
                  <Link to={"/"} className="sub">
                    Artist
                  </Link>
                </div>
              </li>
              <li>
                <Link to={"/"} className="img">
                  <img
                    alt=""
                    src="https://i.scdn.co/image/ab676161000051748ae7f2aaa9817a704a87ea36"
                  />
                </Link>
                <div className="desc">
                  <Link to={"/"} className="main">
                    Justin Bieber
                  </Link>
                  <Link to={"/"} className="sub">
                    Artist
                  </Link>
                </div>
              </li>
              <li>
                <Link to={"/"} className="img">
                  <img
                    alt=""
                    src="https://i.scdn.co/image/ab676161000051748ae7f2aaa9817a704a87ea36"
                  />
                </Link>
                <div className="desc">
                  <Link to={"/"} className="main">
                    Justin Bieber
                  </Link>
                  <Link to={"/"} className="sub">
                    Artist
                  </Link>
                </div>
              </li>
            </ul>
          </div> */}
        </div>
      ) : null}
    </div>
  );
}

export default SearchContainer;
