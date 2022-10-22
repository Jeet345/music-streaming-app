import { Menu, MenuItem } from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import ConfirmDialogBox from "./ConfirmDialogBox";
import EditPlaylistDialog from "./EditPlaylistDialog";

function PlaylistContextMenu(prop) {
  const playlistMenuAnchorEl = prop.playlistMenuAnchorEl;
  const playlistMenuRowData = prop.playlistMenuRowData;
  const playlistMenuOpen = Boolean(playlistMenuAnchorEl);
  const [confirmDialogIsOpen, setconfirmDialogIsOpen] = useState(false);
  const [playlistDialogClicked, setPlaylistDialogClicked] = useState(false);

  const confirmDialogMsg = `Are you sure you want to delete "${playlistMenuRowData.name}"  playlist?`;

  const handleDeleteMenuClick = () => {
    prop.setPlaylistMenuAnchorEl(null);
    console.log(playlistMenuRowData);
    setconfirmDialogIsOpen(true);
  };

  const handleConfirmDialogClose = () => {
    setconfirmDialogIsOpen(false);
  };

  const handleDialogApprove = () => {
    handleConfirmDialogClose();
    axios({
      url: `${process.env.REACT_APP_API}playlists/deletePlaylistsById`,
      method: "delete",
      data: {
        id: playlistMenuRowData._id,
      },
    })
      .then((res) => {
        if (res) {
          toast.info(`${res.data.name} Playlist Deleted !!`);
          prop.getPlaylistData();
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const getPlaylistData = () => {
    prop.getPlaylistData();
  };

  const handlePlaylistStatusChange = (status) => {
    prop.setPlaylistMenuAnchorEl(null);
    axios({
      url: `${process.env.REACT_APP_API}playlists/updatePlaylistsStatusById`,
      method: "post",
      data: {
        id: playlistMenuRowData._id,
        status: status,
      },
    })
      .then((res) => {
        if (res) {
          toast.info(
            `${playlistMenuRowData.name} playlist status changed to ${status} !!`
          );
          prop.getPlaylistData();
        } else {
          toast.error("Something Wan't Wrong !!");
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handlePlaylistDialogClose = () => {
    setPlaylistDialogClicked(false);
  };

  const handleEditOptionClick = () => {
    prop.setPlaylistMenuAnchorEl(null);
    setPlaylistDialogClicked(true);
  };

  return (
    <>
      <Menu
        className="playlist-menu-container"
        anchorEl={playlistMenuAnchorEl}
        open={playlistMenuOpen}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={() => {
          prop.setPlaylistMenuAnchorEl(null);
        }}
      >
        <MenuItem
          onClick={() => {
            handleEditOptionClick();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem onClick={handleDeleteMenuClick}>Delete</MenuItem>
        {playlistMenuRowData.status == "public" ? (
          <MenuItem
            onClick={() => {
              handlePlaylistStatusChange("private");
            }}
          >
            Make Private
          </MenuItem>
        ) : (
          <MenuItem
            onClick={() => {
              handlePlaylistStatusChange("public");
            }}
          >
            Make Public
          </MenuItem>
        )}

        <MenuItem
          onClick={() => {
            prop.setPlaylistMenuAnchorEl(null);
          }}
        >
          Copy Link
        </MenuItem>
      </Menu>

      <ConfirmDialogBox
        isOpen={confirmDialogIsOpen}
        msg={confirmDialogMsg}
        handleDialogApprove={handleDialogApprove}
        handleClose={handleConfirmDialogClose}
      />

      <EditPlaylistDialog
        isClicked={playlistDialogClicked}
        closePlaylist={handlePlaylistDialogClose}
        getPlaylistData={getPlaylistData}
        editingData={prop.playlistMenuRowData}
      />
    </>
  );
}

export default PlaylistContextMenu;
