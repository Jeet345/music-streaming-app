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

function Artists() {
  // useStates
  const [artistData, setArtistData] = useState([]);
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [selectedRowsId, setSelectedRowsId] = useState([]);

  const navigate = useNavigate();

  const newTrackBtnClick = (e) => {
    navigate("/Admin/Artists/AddArtist");
  };

  const getDataRequest = () => {
    axios({
      url: `${process.env.REACT_APP_API}admin/artists/getAllArtists`,
      method: "get",
    })
      .then((res) => {
        setIsLoaderVisible(false);
        console.log(res);
        setArtistData(res.data);
      })
      .catch((err) => {
        setIsLoaderVisible(false);
        console.log(err);
      });
  };

  const handleDeleteClick = () => {
    axios({
      url: `${process.env.REACT_APP_API}admin/artists/deleteArtists`,
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

    navigate("/Admin/Artists/UpdateArtist", { state: rowData });
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
            src={`${process.env.REACT_APP_API}getImg/${param.value}`}
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
      field: "verified",
      width: 100,
      headerName: "Verified",
      renderCell: (param) => {
        if (param.value) {
          return <Button>true</Button>;
        } else {
          return <Button>False</Button>;
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
    <div className="song-page-container">
      <h1 className="title">Artists</h1>
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
            New Artist
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
            rows={artistData}
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

export default Artists;
