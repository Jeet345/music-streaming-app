import React, { useEffect, useState } from "react";
import {
  TextField,
  InputAdornment,
  Button,
  LinearProgress,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { DataGrid, GridFooter, GridFooterContainer } from "@mui/x-data-grid";
import { FiSearch } from "react-icons/fi";
import { HiPlusSm } from "react-icons/hi";
import "../../admin.css";
import axios from "axios";
import { Box, padding } from "@mui/system";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";

function Songs() {
  const [tracksData, setTracksData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [selectedRowsId, setSelectedRowsId] = useState([]);

  const menuOpen = Boolean(anchorEl);
  const navigate = useNavigate();

  const newTrackBtnClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const getDataRequest = () => {
    axios({
      url: `${process.env.REACT_APP_API}admin/songs/getAllTracks`,
      method: "get",
    })
      .then((res) => {
        setIsLoaderVisible(false);
        console.log(res);
        setTracksData(res.data);
      })
      .catch((err) => {
        setIsLoaderVisible(false);
        console.log(err);
      });
  };

  // formate seconds in form of (00:00)
  const calculateTime = (sesc) => {
    const minutes = Math.floor(sesc / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(sesc % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const handleDeleteClick = () => {
    axios({
      url: `${process.env.REACT_APP_API}admin/songs/deleteTracks`,
      method: "delete",
      data: selectedRowsId,
    })
      .then((data) => {
        getDataRequest();
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleEditBtnClick = (params) => {
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

    navigate("/Admin/Songs/UpdateTrack", { state: rowData });
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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
            border: "none",
          }}
        />
      </GridFooterContainer>
    );
  };

  const columns = [
    {
      field: "imageFileName",
      sortable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true,
      headerName: "",
      width: 60,
      renderCell: (param) => {
        return (
          <img
            style={{ borderRadius: "3px" }}
            width="35px"
            loading="lazy"
            height="35px"
            src={`${process.env.REACT_APP_API}getImg/${param.value}`}
          />
        );
      },
    },
    {
      field: "title",
      width: 100,
      headerName: "Title",
    },
    // {
    //   field: "trackFileName",
    //   width: 300,
    //   headerName: "Track",
    //   renderCell: (param) => {
    //     return (
    //       <audio controls style={{ height: "40px" }}>
    //         <source
    //           src={`${process.env.REACT_APP_API}getAudio/${param.value}`}
    //           type="audio/mp3"
    //         />
    //       </audio>
    //     );
    //   },
    // },
    {
      field: "album_name",
      width: 130,
      headerName: "Album",
      renderCell: (param) => {
        let result = "";
        param.value.map((val, index) => {
          result += (index ? " , " : "") + val.name;
        });
        return result ? result : "-";
      },
    },
    {
      field: "lyrics",
      width: 100,
      headerName: "Lyrics",
      renderCell: (param) => {
        return param.value != "" ? param.value : "-";
      },
    },
    {
      field: "artist_names",
      width: 130,
      headerName: "Artist(s)",
      renderCell: (param) => {
        let result = "";
        param.value.map((val, index) => {
          result += (index ? " , " : "") + val.name;
        });
        return result;
      },
    },
    {
      field: "tags",
      width: 130,
      headerName: "Tags",
    },
    {
      field: "duration",
      headerName: "Duration",
      width: 70,
      renderCell: (param) => {
        return calculateTime(param.value);
      },
    },
    {
      field: "created_at",
      headerName: "Created At",
      width: 130,
      renderCell: (param) => {
        return moment(param.value).format("MMM DD YYYY");
      },
    },
    {
      field: "status",
      width: 100,
      headerName: "Status",
      renderCell: (param) => {
        if (param.value == "active") {
          return (
            <Button
              size="small"
              variant="contained"
              style={{ color: "white" }}
              color="primary"
            >
              Active
            </Button>
          );
        } else {
          return (
            <Button variant="contained" color="error">
              Disabled
            </Button>
          );
        }
      },
    },
    {
      field: "genres",
      width: 100,
      headerName: "Genres",
      renderCell: (param) => {
        let result = "";
        param.value.map((val, index) => {
          result += (index ? " , " : "") + val.name;
        });
        return result;
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

  return (
    <div className="song-page-container">
      <div className="page-header">
        <h1 className="title">Songs</h1>
        <div>
          <Button
            variant="contained"
            size="small"
            className="button-input"
            aria-controls={menuOpen ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={menuOpen ? "true" : undefined}
            startIcon={<HiPlusSm />}
            onClick={newTrackBtnClick}
          >
            New Track
          </Button>
          <Menu
            className="basic-menu"
            id="basic-menu"
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => navigate("/Admin/Songs/CreateTrack")}>
              Create Track
            </MenuItem>
            <MenuItem>Upload Track</MenuItem>
            <MenuItem>Import Track</MenuItem>
          </Menu>
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
            aria-controls={menuOpen ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={menuOpen ? "true" : undefined}
            startIcon={<HiPlusSm />}
            onClick={newTrackBtnClick}
          >
            New Track
          </Button>
          <Menu
            className="basic-menu"
            id="basic-menu"
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => navigate("/Admin/Songs/CreateTrack")}>
              Create Track
            </MenuItem>
            <MenuItem>Upload Track</MenuItem>
            <MenuItem>Import Track</MenuItem>
          </Menu>
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
            rows={tracksData}
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
  );
}

export default Songs;
