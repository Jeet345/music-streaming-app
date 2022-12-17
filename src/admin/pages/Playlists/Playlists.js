import React, { useEffect, useState } from "react";
import {
  TextField,
  InputAdornment,
  Button,
  FormControlLabel,
  Switch,
  LinearProgress,
  IconButton,
} from "@mui/material";
import { DataGrid, GridFooter, GridFooterContainer } from "@mui/x-data-grid";
import { FiSearch } from "react-icons/fi";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { HiPlusSm } from "react-icons/hi";
import "../../admin.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Box, padding } from "@mui/system";
import moment from "moment";
import PlaylistDialog from "./PlaylistDialog";
import { toast } from "react-toastify";
import UpdatePlaylistDialog from "./UpdatePlaylistDialog";
import ConfirmDialogBox from "../../common/ConfirmDialogBox";

function Playlists() {
  // useStates
  const [playlistsData, setPlaylistsData] = useState([]);
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [selectedRowsId, setSelectedRowsId] = useState([]);
  const [playlistDialogClicked, setPlaylistDialogClicked] = useState(false);
  const [updatePlaylistDialogClicked, setUpdatePlaylistDialogClicked] =
    useState(false);
  const [updatePlaylistRowData, setUpdatePlaylistRowData] = useState([]);
  const [confirmDialogIsOpen, setconfirmDialogIsOpen] = useState(false);

  const navigate = useNavigate();

  const confirmDialogMsg = `Are you sure you want to delete playlist(s)?`;

  const handlePlaylistDialogClose = () => {
    setPlaylistDialogClicked(false);
    setUpdatePlaylistDialogClicked(false);
  };

  const handleConfirmDialogClose = () => {
    setconfirmDialogIsOpen(false);
  };

  const newPlaylistBtnClick = (e) => {
    setPlaylistDialogClicked(true);
  };

  const getDataRequest = () => {
    axios({
      url: `${process.env.REACT_APP_API}admin/playlists/getAllPlaylists`,
      method: "get",
    })
      .then((res) => {
        setIsLoaderVisible(false);
        console.log(res);
        setPlaylistsData(res.data);
      })
      .catch((err) => {
        setIsLoaderVisible(false);
        console.log(err);
      });
  };

  const handleDeleteDialogApprove = () => {
    setconfirmDialogIsOpen(false);
    axios({
      url: `${process.env.REACT_APP_API}admin/playlists/deletePlaylists`,
      method: "delete",
      data: selectedRowsId,
    })
      .then((res) => {
        if (res.data.acknowledged) {
          getDataRequest();
          toast.success("Playlist Deleted Successfully..", {
            toastId: "success",
          });
        } else {
          toast.error("Something Wan't Wrong !!");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
  const handleDeleteClick = () => {
    setconfirmDialogIsOpen(true);
  };

  const handleEditBtnClick = (params) => {
    setUpdatePlaylistDialogClicked(true);

    var api = params.api;
    var rowData = {};
    api
      .getAllColumns()
      .filter(function (c) {
        return c.field !== "__check__" && !!c;
      })
      .forEach(function (c) {
        return (rowData[c.field] = params.getValue(params.id, c.field));
      });

    setUpdatePlaylistRowData(rowData);
  };

  const columns = [
    {
      field: "coverImg",
      headerName: "Tags",
      sortable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true,
      headerName: "",
      width: 60,
      // headerClassName: "hideRightSeparator",
      renderCell: (param) => {
        let src;

        if (param.value) {
          src = `${process.env.REACT_APP_API}getImg/${param.value}`;
        } else {
          src = require("../../assets/album.jpg");
        }

        return (
          <img
            style={{ borderRadius: "3px" }}
            width="35px"
            loading="lazy"
            height="35px"
            src={src}
          />
        );
      },
    },
    {
      field: "name",
      flex: 1,
      headerName: "Playlist Title",
    },
    {
      field: "users",
      flex: 1,
      headerName: "Owner",
      renderCell: (param) => {
        if (param.value) {
          return param.value[0].email;
        } else {
          return <Button>False</Button>;
        }
      },
    },
    {
      field: "status",
      width: 100,
      headerName: "Public",
      renderCell: (param) => {
        if (param.value == "public") {
          return "Yes";
        } else {
          return "No";
        }
      },
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      renderCell: (param) => {
        if (param.value == "") {
          return "-";
        } else {
          return param.value;
        }
      },
    },
    {
      field: "created_at",
      headerName: "Created At",
      flex: 1,
      renderCell: (param) => {
        return moment(param.value).format("MMM DD YYYY");
      },
    },
    {
      field: "_id",
      width: 100,
      headerName: "",
      align: "center",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      hideable: false,
      renderCell: (param) => {
        return (
          <IconButton
            aria-label="Edit"
            onClick={() => {
              handleEditBtnClick(param);
            }}
            className="edit-btn"
          >
            <MdOutlineModeEditOutline />
          </IconButton>
        );
      },
    },
  ];

  useEffect(() => {
    getDataRequest();
  }, []);

  const CustomFooter = () => {
    return (
      <GridFooterContainer>
        {selectedRowsId != "" ? (
          <Button color="error" onClick={handleDeleteClick} variant="contained">
            Delete
          </Button>
        ) : (
          <div></div>
        )}

        <GridFooter
          sx={{
            border: "none", // To delete double border.
          }}
        />
      </GridFooterContainer>
    );
  };

  return (
    <>
      <div className="song-page-container">
        <div className="page-header">
          <h1 className="title">Playlists</h1>
          <div>
            <Button
              variant="contained"
              size="small"
              className="button-input"
              startIcon={<HiPlusSm />}
              onClick={newPlaylistBtnClick}
            >
              New Playlist
            </Button>
          </div>
        </div>

        {/* <div className="search-filed">
          <TextField
            style={{ width: "100%" }}
            id="input-with-icon-textfield"
            className="search-input"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FiSearch fontSize={18} />
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
          <div>
            <Button
              variant="contained"
              size="small"
              className="button-input"
              startIcon={<HiPlusSm />}
              onClick={newPlaylistBtnClick}
            >
              New Playlist
            </Button>
          </div>
        </div> */}

        <div
          className="data-table"
          style={{ marginTop: "40px", height: 600, width: "100%" }}
        >
          <Box
            sx={{
              height: 600,
              width: "100%",
              backgroundColor: "#1E1E26",
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            <LinearProgress
              sx={isLoaderVisible ? { display: "block" } : { display: "none" }}
              variant="indeterminate"
            />
            <DataGrid
              sx={{
                padding: "10px",
              }}
              rows={playlistsData}
              columns={columns}
              pageSize={pageSize}
              checkboxSelection
              pagination
              components={{ Footer: CustomFooter }}
              rowsPerPageOptions={[5, 10, 20]}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              getRowId={(row) => row._id}
              disableSelectionOnClick
              onSelectionModelChange={(ids) => {
                setSelectedRowsId(ids);
              }}
            />
          </Box>
        </div>
      </div>

      <PlaylistDialog
        isClicked={playlistDialogClicked}
        closePlaylist={handlePlaylistDialogClose}
        getPlaylistData={getDataRequest}
      />

      <ConfirmDialogBox
        isOpen={confirmDialogIsOpen}
        msg={confirmDialogMsg}
        handleDialogApprove={handleDeleteDialogApprove}
        handleClose={handleConfirmDialogClose}
      />

      <UpdatePlaylistDialog
        isClicked={updatePlaylistDialogClicked}
        rowData={updatePlaylistRowData}
        closePlaylist={handlePlaylistDialogClose}
        getPlaylistData={getDataRequest}
      />
    </>
  );
}

export default Playlists;
