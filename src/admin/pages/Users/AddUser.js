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

function AddUser() {
  let schema = yup.object().shape({
    username: yup.string().required("Username is a required field"),
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email is a required field"),
    password: yup
      .string()
      .required("Password is a required field")
      .min(4, "Password must be at least 4 characters"),
    conPassword: yup
      .string()
      .oneOf(
        [yup.ref("password"), null],
        "Password and confirm password not match"
      )
      .required("Confirm Password is a required field"),
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

  const [progressValue, setProgressValue] = useState(0);
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [coverImagePath, setCoverImagePath] = useState("");

  const roleList = ["Admin", "User"];

  useEffect(() => {
    setValue("role", "User");
    setValue("emailVerified", "Yes");
  }, []);

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

    form_data.append("username", data.username);
    form_data.append("email", data.email);
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

    axios({
      url: `${process.env.REACT_APP_API}admin/users/addUser`,
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
          reset();
          toast.success("User added successfully..", {
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
          <TextField
            className="input"
            label="User Name"
            variant="outlined"
            {...register("username")}
            name="username"
            error={errors.username ? true : false}
            helperText={errors.username ? errors.username.message : ""}
            disabled={isFormDisabled}
          />

          <div style={{ display: "flex", gridGap: "20px" }}>
            <TextField
              className="input"
              label="First Name"
              variant="outlined"
              {...register("fname")}
              name="fname"
            />
            <TextField
              className="input"
              label="Last Name"
              variant="outlined"
              {...register("lname")}
              name="lname"
            />
          </div>

          <TextField
            className="input"
            label="Email"
            variant="outlined"
            {...register("email")}
            name="email"
            error={errors.email ? true : false}
            helperText={errors.email ? errors.email.message : ""}
            disabled={isFormDisabled}
          />

          <TextField
            className="input"
            type="password"
            label="Password"
            variant="outlined"
            {...register("password")}
            name="password"
            error={errors.password ? true : false}
            helperText={errors.password ? errors.password.message : ""}
            disabled={isFormDisabled}
          />

          <TextField
            className="input"
            type="password"
            label="Confirm Password"
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
            defaultValue={roleList[1]}
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
            defaultValue={"Yes"}
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
              Save
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

export default AddUser;
