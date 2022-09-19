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
import "./genres.css";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridFooter, GridFooterContainer } from "@mui/x-data-grid";
import { MdOutlineModeEditOutline } from "react-icons/md";
import axios from "axios";
import { Box, padding } from "@mui/system";
import moment from "moment";

function Genres() {
  const [genresData, setGenresData] = useState([]);
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [selectedRowsId, setSelectedRowsId] = useState([]);

  const navigate = useNavigate();

  const newTrackBtnClick = (e) => {
    navigate("/Admin/Genres/AddGenres");
  };

  const getDataRequest = () => {
    axios({
      url: "http://localhost:4000/admin/genres/getAllGenres",
      method: "get",
    })
      .then((res) => {
        setIsLoaderVisible(false);
        console.log(res);
        setGenresData(res.data);
      })
      .catch((err) => {
        setIsLoaderVisible(false);
        console.log(err);
      });
  };

  const handleDeleteClick = () => {
    axios({
      url: "http://localhost:4000/admin/genres/deleteGenres",
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
      field: "name",
      flex: 1,
      headerName: "Name",
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
      <h1 className="title">Genres</h1>
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
            New Genres
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
            rows={genresData}
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

export default Genres;
