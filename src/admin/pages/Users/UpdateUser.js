import {
  Button,
  TextField,
  Chip,
  LinearProgress,
  FormControlLabel,
  Switch,
  Autocomplete,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

function UpdateUser() {
  let schema = yup.object().shape({
    id: yup.string().required(),
    username: yup.string().required("Username is a required field"),

    password: yup.string(),
    conPassword: yup
      .string()
      .oneOf(
        [yup.ref("password"), null],
        "Password and confirm password not match"
      ),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
    setValue,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const location = useLocation();
  const rowData = location.state;

  const [progressValue, setProgressValue] = useState(0);
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [coverImagePath, setCoverImagePath] = useState("");

  const roleList = ["Admin", "User"];

  useEffect(() => {
    setValue("role", rowData.groupName);
    setValue("emailVerified", rowData.status == "inactive" ? "No" : "Yes");
  }, [rowData]);

  const songImgChange = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePath(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    } //
    else {
      setCoverImagePath("");
    }
  };

  const formSubmit = async (data, e) => {
    e.preventDefault();

    setIsFormDisabled(true);

    var form_data = new FormData();

    form_data.append("id", data.id);
    form_data.append("username", data.username);
    form_data.append("fname", data.fname);
    form_data.append("lname", data.lname);
    form_data.append("password", data.password);
    form_data.append("coverImg", data.coverImg[0] ? data.coverImg[0] : "");
    form_data.append("role", data.role);
    form_data.append("emailVerified", data.emailVerified);

    const uploadProgress = (progressEvent) => {
      const { loaded, total } = progressEvent;
      let percent = Math.floor((loaded * 100) / total);
      setProgressValue(percent);
    };

    console.log("data", ...form_data);

    axios({
      url: `${process.env.REACT_APP_API}admin/users/updateUser`,
      method: "post",
      data: form_data,
      onUploadProgress: uploadProgress,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        setIsFormDisabled(false);
        if (res.data === 1) {
          toast.success("User updated successfully..", {
            toastId: "success",
          });
        } else if (res.data.error) {
          toast.error(res.data.error, {
            toastId: "error",
          });
        } else {
          alert(res.data);
        }
      })
      .catch((err) => {
        setIsFormDisabled(false);
        console.log(err);
      });
  };

  console.log(errors);

  return (
    <div className="add-track-container">
      <Box
        sx={{ width: "100%", marginBottom: "30px" }}
        display={isFormDisabled ? "block" : "none"}
      >
        <h5 className="song-label">Uploading...</h5>
        <LinearProgress variant="determinate" value={progressValue} />
      </Box>
      <form method="post" id="form" onSubmit={handleSubmit(formSubmit)}>
        <div className="left-side-box">
          <div className="img-box">
            {coverImagePath != "" ? (
              <img src={coverImagePath} />
            ) : rowData.profileImage ? (
              <img
                src={`${process.env.REACT_APP_API}getImg/${rowData.profileImage}`}
              />
            ) : (
              <img src={require("../../assets/album.jpg")} />
            )}
          </div>

          <Button
            className="upload-track-btn"
            variant="contained"
            component="label"
            disabled={isFormDisabled}
          >
            Upload image
            <input
              hidden
              accept="image/*"
              type="file"
              onChangeCapture={(e) => {
                songImgChange(e);
              }}
              disabled={isFormDisabled}
              {...register("coverImg")}
              name="coverImg"
            />
          </Button>
        </div>
        <div className="right-side-box">
          <input
            type="hidden"
            value={rowData._id}
            name="id"
            {...register("id")}
          />
          <TextField
            className="input"
            label="User Name"
            variant="outlined"
            {...register("username")}
            name="username"
            defaultValue={rowData.username}
            error={errors.username ? true : false}
            helperText={errors.username ? errors.username.message : ""}
            disabled={isFormDisabled}
          />

          <div style={{ display: "flex", gridGap: "20px" }}>
            <TextField
              className="input"
              label="First Name"
              variant="outlined"
              defaultValue={rowData.firstName}
              {...register("fname")}
              name="fname"
            />
            <TextField
              className="input"
              label="Last Name"
              defaultValue={rowData.lastName}
              variant="outlined"
              {...register("lname")}
              name="lname"
            />
          </div>

          <TextField
            className="input"
            type="password"
            label="New Password"
            variant="outlined"
            {...register("password")}
            name="password"
            disabled={isFormDisabled}
          />

          <TextField
            className="input"
            type="password"
            label="Confirm New Password"
            variant="outlined"
            {...register("conPassword")}
            name="conPassword"
            error={errors.conPassword ? true : false}
            helperText={errors.conPassword ? errors.conPassword.message : ""}
            disabled={isFormDisabled}
          />

          <Autocomplete
            options={roleList}
            className="input"
            {...register("role")}
            autoHighlight
            defaultValue={
              rowData.groupName.charAt(0).toUpperCase() +
              rowData.groupName.slice(1)
            }
            isOptionEqualToValue={(option, value) => option === value}
            getOptionLabel={(option) => option}
            disabled={isFormDisabled}
            name="role"
            onChange={(e, value) => {
              setValue("role", value, { shouldValidate: true });
            }}
            renderInput={(params) => <TextField {...params} label="Role" />}
          />

          <Autocomplete
            options={["Yes", "No"]}
            className="input"
            {...register("emailVerified")}
            autoHighlight
            defaultValue={rowData.status == "inactive" ? "No" : "Yes"}
            isOptionEqualToValue={(option, value) => option === value}
            getOptionLabel={(option) => option}
            disabled={isFormDisabled}
            name="emailVerified"
            onChange={(e, value) => {
              setValue("emailVerified", value, { shouldValidate: true });
            }}
            renderInput={(params) => (
              <TextField {...params} label="Email Confirmed" />
            )}
          />

          <div className="button-group">
            <Button variant="contained" type="submit" disabled={isFormDisabled}>
              Update
            </Button>
            <Button
              className="reset-btn"
              type="reset"
              disabled={isFormDisabled}
            >
              Reset
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateUser;
