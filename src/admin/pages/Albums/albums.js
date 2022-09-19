import React, { useEffect, useState } from "react";
import {
  TextField,
  InputAdornment,
  Button,
  IconButton,
  LinearProgress,
} from "@mui/material";
import { FiSearch } from "react-icons/fi";
import { HiPlusSm } from "react-icons/hi";
import "./albums.css";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridFooter, GridFooterContainer } from "@mui/x-data-grid";
import { MdOutlineModeEditOutline } from "react-icons/md";
import axios from "axios";
import { Box, padding } from "@mui/system";
import moment from "moment";

function Albums() {
  const [albumsData, setAlbumsData] = useState([]);
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [selectedRowsId, setSelectedRowsId] = useState([]);

  const navigate = useNavigate();

  const newTrackBtnClick = (e) => {
    navigate("/Admin/Albums/AddAlbum");
  };

  const getDataRequest = () => {
    axios({
      url: "http://localhost:4000/admin/albums/getAllAlbums",
      method: "get",
    })
      .then((res) => {
        setIsLoaderVisible(false);
        console.log(res);
        setAlbumsData(res.data);
      })
      .catch((err) => {
        setIsLoaderVisible(false);
        console.log(err);
      });
  };

  const handleDeleteClick = () => {
    axios({
      url: "http://localhost:4000/admin/albums/deleteAlbums",
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
        return (
          <img
            style={{ borderRadius: "3px" }}
            width="35px"
            loading="lazy"
            height="35px"
            src={`http://localhost:4000/getImg/${param.value}`}
          />
        );
      },
    },
    {
      field: "name",
      flex: 1,
      headerName: "Name",
    },
    {
      field: "tags",
      flex: 1,
      headerName: "Tags",
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
      field: "created_at",
      headerName: "Created At",
      flex: 1,
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
              // handleEditBtnClick(param);
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
    <div className="song-page-container">
      <h1 className="title">Albums</h1>
      <div className="search-filed">
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
            onClick={newTrackBtnClick}
          >
            New Album
          </Button>
        </div>
      </div>
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
            rows={albumsData}
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

export default Albums;
