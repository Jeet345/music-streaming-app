import React from "react";
import { FiUsers } from "react-icons/fi";
import { TbPlaylist } from "react-icons/tb";
import { BsTags } from "react-icons/bs";
import { MdAlbum, MdMicNone, MdOutlineMusicNote } from "react-icons/md";
import "../../admin.css";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function Dashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAlbums, setTotalAlbums] = useState(0);
  const [totalArtists, setTotalArtists] = useState(0);
  const [totalPlaylist, setTotalPlaylist] = useState(0);
  const [totalGenres, setTotalGenres] = useState(0);
  const [totalSongs, setTotalSongs] = useState(0);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}admin/users/totalUsersCount`)
      .then((res) => {
        setTotalUsers(res.data.count);
      });

    axios
      .get(`${process.env.REACT_APP_API}admin/playlists/totalPlaylistsCount`)
      .then((res) => {
        setTotalPlaylist(res.data.count);
      });

    axios
      .get(`${process.env.REACT_APP_API}admin/albums/totalAlbumsCount`)
      .then((res) => {
        setTotalAlbums(res.data.count);
      });

    axios
      .get(`${process.env.REACT_APP_API}admin/artists/totalArtistsCount`)
      .then((res) => {
        setTotalArtists(res.data.count);
      });

    axios
      .get(`${process.env.REACT_APP_API}admin/songs/totalSongsCount`)
      .then((res) => {
        setTotalSongs(res.data.count);
      });

    axios
      .get(`${process.env.REACT_APP_API}admin/genres/totalGenresCount`)
      .then((res) => {
        setTotalGenres(res.data.count);
      });
  }, []);

  return (
    <div className="dashboard-container">
      <div className="box">
        <div className="icon">
          <FiUsers size={50} color="#689f38" />
        </div>
        <div className="desc">
          <div className="title">Total Users</div>
          <div className="count">{totalUsers}</div>
        </div>
      </div>
      <div className="box">
        <div className="icon">
          <MdOutlineMusicNote size={50} color="#689f38" />
        </div>
        <div className="desc">
          <div className="title">Total Tracks</div>
          <div className="count">{totalSongs}</div>
        </div>
      </div>
      <div className="box">
        <div className="icon">
          <MdAlbum size={50} color="#689f38" />
        </div>
        <div className="desc">
          <div className="title">Total Albums</div>
          <div className="count">{totalAlbums}</div>
        </div>
      </div>
      <div className="box">
        <div className="icon">
          <MdMicNone size={50} color="#689f38" />
        </div>
        <div className="desc">
          <div className="title">Total Artists</div>
          <div className="count">{totalArtists}</div>
        </div>
      </div>
      <div className="box">
        <div className="icon">
          <TbPlaylist size={50} color="#689f38" />
        </div>
        <div className="desc">
          <div className="title">Total Playlists</div>
          <div className="count">{totalPlaylist}</div>
        </div>
      </div>
      <div className="box">
        <div className="icon">
          <BsTags size={50} color="#689f38" />
        </div>
        <div className="desc">
          <div className="title">Total Genres</div>
          <div className="count">{totalGenres}</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
