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
import { toast } from "react-toastify";

function Users() {
  // useStates
  const [userData, setUserData] = useState([]);
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [selectedRowsId, setSelectedRowsId] = useState([]);
  useState(false);

  const navigate = useNavigate();

  const newUserBtnClick = (e) => {
    navigate("/admin/users/addUser");
  };

  const getDataRequest = () => {
    axios({
      url: `${process.env.REACT_APP_API}admin/users/getAllUsers`,
      method: "get",
    })
      .then((res) => {
        setIsLoaderVisible(false);
        console.log(res.data);
        setUserData(res.data);
      })
      .catch((err) => {
        setIsLoaderVisible(false);
        console.log(err);
      });
  };

  const handleDeleteClick = () => {
    axios({
      url: `${process.env.REACT_APP_API}admin/users/deleteUsers`,
      method: "delete",
      data: selectedRowsId,
    })
      .then((res) => {
        if (res.data == 1) {
          getDataRequest();
          toast.success("User(s) deleted successfully..", {
            toastId: "delete success",
          });
        } else {
          alert("Something Wan't Wrong !!");
        }
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

    navigate("/admin/users/updateUser", { state: rowData });
  };

  const columns = [
    {
      field: "profileImage",
      sortable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true,
      headerName: "",
      width: 50,
      // headerClassName: "hideRightSeparator",
      renderCell: (param) => {
        let src;

        if (param.value) {
          src = `${process.env.REACT_APP_API}getImg/${param.value}`;
        } else {
          src = require("../../assets/profileIcon.png");
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
      field: "username",
      width: 120,
      headerName: "User Name",
    },
    {
      field: "email",
      flex: 1,
      headerName: "Email",
      renderCell: (param) => {
        if (param.value) {
          return <span>{param.value}</span>;
        } else {
          return "-";
        }
      },
    },
    {
      field: "firstName",
      width: 120,
      headerName: "First Name",
      renderCell: (param) => {
        if (param.value) {
          return <span>{param.value}</span>;
        } else {
          return "-";
        }
      },
    },

    {
      field: "lastName",
      width: 120,
      headerName: "Last Name",
      renderCell: (param) => {
        if (param.value) {
          return <span>{param.value}</span>;
        } else {
          return "-";
        }
      },
    },
    {
      field: "groupName",
      width: 80,
      headerName: "Role",
      renderCell: (param) => {
        return (
          <span style={{ textTransform: "capitalize" }}>{param.value}</span>
        );
      },
    },
    {
      field: "created_at",
      headerName: "Created At",
      width: 100,
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
        } else if (param.value == "inactive") {
          return (
            <Button size="small" variant="contained" color="warning">
              InActive
            </Button>
          );
        } else {
          return (
            <Button size="small" variant="contained" color="error">
              Deleted
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
              onClick={newUserBtnClick}
            >
              New User
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
              onClick={newUserBtnClick}
            >
              New User
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
              rows={userData}
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
    </>
  );
}

export default Users;
