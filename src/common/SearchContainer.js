import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function SearchContainer() {
  const searchQuery = useSelector((state) => state.changeSearchQuery);

  const [isVisible, setIsVisible] = useState(true);

  const handleOutsideClick = (e) => {
    if (e.target.className == "search-page-container") {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    console.log("search", searchQuery);

    if (searchQuery) {
      setIsVisible(true);
    }
    else{
      setIsVisible(false);
    }
  }, [searchQuery]);

  return (
    <div
      className={
        isVisible
          ? "search-page-container"
          : "search-page-container hidden-search-page-container"
      }
      onClick={handleOutsideClick}
    >
      <div className="search-box">
        <Link to={"/"} className="title">
          <h4>View All Results...</h4>
          <MdKeyboardArrowRight size={24} color="white" />
        </Link>

        <div className="result-box">
          <h5 className="heading">Artists</h5>
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
        </div>

        <div className="result-box songs-box">
          <h5 className="heading">Songs</h5>
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
        </div>

        <div className="result-box">
          <h5 className="heading">Albums</h5>
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
        </div>

        <div className="result-box">
          <h5 className="heading">Playlists</h5>
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
        </div>

        <div className="result-box">
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
        </div>
      </div>
    </div>
  );
}

export default SearchContainer;
