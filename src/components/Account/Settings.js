import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import * as yup from "yup";
import { React, useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

function Settings() {
  const userCookie = useSelector((state) => state.changeUserCookie);
  const profileImgInput = useRef();

  const [userData, setUserData] = useState([]);
  const [uploadedProfileImg, setUploadedProfileImg] = useState("");
  const [coverImagePath, setCoverImagePath] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  let schema = yup.object().shape({
    currPassword: yup.string().required("Current Passowrd is a required field"),
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
    reset,
    setValue,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    axios({
      url: "http://localhost:4000/users/findUserById",
      method: "post",
      data: {
        id: userCookie,
      },
    })
      .then((res) => {
        setUserData(res.data);
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        if (res.data.profileImage) {
          setCoverImagePath(
            `http://localhost:4000/getImg/${res.data.profileImage}`
          );
        }
      })
      .catch((err) => {
        console.log("Something Wan't Wrong");
      });
  }, [userCookie]);

  const profileImgChange = (e) => {
    if (e.target.files[0]) {
      setUploadedProfileImg(e.target.files[0]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePath(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    } //
    else {
      setCoverImagePath("");
      setUploadedProfileImg("");
    }
  };

  const handleRemoveImageClick = () => {
    setCoverImagePath("");
    setUploadedProfileImg("");
    profileImgInput.current.value = "";
  };

  const handleUserInfoFormSubmit = (e) => {
    e.preventDefault();

    var form_data = new FormData();

    form_data.append("id", userCookie);
    form_data.append("fname", e.target.fname.value);
    form_data.append("lname", e.target.lname.value);
    form_data.append("proImg", uploadedProfileImg);

    console.log("form", ...form_data);

    axios({
      url: "http://localhost:4000/users/updateUserInfo",
      method: "post",
      data: form_data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        if (res.data) {
          toast.success("Changes Saved Successfully...", {
            toastId: "update success",
          });
        } else {
          toast.error("Something Wan't Wrong !!", {
            toastId: "update error",
          });
        }
      })
      .catch((err) => {
        console.log("Something wan't wrong");
      });
  };

  const updatePasswordFormSubmit = (data, e) => {
    console.log(data);

    axios({
      url: "http://localhost:4000/users/updatePassword",
      method: "post",
      data: {
        id: userCookie,
        currPassword: data.currPassword,
        newPassword: data.password,
      },
    })
      .then((res) => {
        console.log("res", res.data);
        if (res.data == 1) {
          toast.success("Password Changed Successfully...");
          reset();
        } else if (res.data.error) {
          toast.error(res.data.error, {
            toastId: "toast error",
          });
        } else {
          toast.error("Something Wan't Wrong !!", {
            toastId: "toast error",
          });
        }
      })
      .catch((err) => {
        console.log("Something wan't wrong !!");
      });
  };

  return (
    <div className="account-setting-page">
      <div className="main-heading">
        <h1>Account Settings</h1>
        <p>View and update your account details, profile and more.</p>
      </div>

      <div className="detail-container user-info-container">
        <div className="title">
          <h3>Update Name or Profile Image</h3>
        </div>
        <form className="input-form" onSubmit={handleUserInfoFormSubmit}>
          <div className="input-filed">
            <h5>First Name</h5>
            <TextField
              id="firstName"
              name="fname"
              value={firstName}
              className="input"
              variant="outlined"
            />
          </div>
          <div className="input-filed">
            <h5>Last Name</h5>
            <TextField
              id="lastName"
              className="input"
              value={lastName}
              name="lname"
              variant="outlined"
            />
          </div>
          <div className="input-filed">
            <h5>Profile Image</h5>
            <div className="input-img">
              <div className="img">
                <img
                  src={
                    coverImagePath
                      ? coverImagePath
                      : `https://www.gravatar.com/avatar/959c7c560318f57945360c2ef5a6fc23?s=220&d=retro`
                  }
                  alt=""
                  name="proImg"
                />
              </div>
              <div className="desc">
                <p>For best results, upload a high resolution image.</p>
                <Button
                  variant="contained"
                  className="button upBtn"
                  component="label"
                >
                  Upload Image
                  <input
                    hidden
                    ref={profileImgInput}
                    onChange={profileImgChange}
                    accept="image/*"
                    type="file"
                  />
                </Button>
                <Button
                  variant="outlined"
                  className="button rmBtn"
                  color="error"
                  onClick={handleRemoveImageClick}
                >
                  Remove Image
                </Button>
              </div>
            </div>
          </div>

          <div className="footer">
            <Button variant="contained" type="submit" className="button upBtn">
              Save Changes
            </Button>
          </div>
        </form>
      </div>

      <div className="detail-container update-password-container">
        <div className="title">
          <h3>Update Password</h3>
        </div>
        <form
          className="input-form"
          onSubmit={handleSubmit(updatePasswordFormSubmit)}
        >
          <div className="input-filed">
            <h5>Current Password</h5>
            <TextField
              id="currPassword"
              name="currPassword"
              type={"password"}
              className="input"
              variant="outlined"
              {...register("currPassword")}
              error={errors.currPassword ? true : false}
              helperText={
                errors.currPassword ? errors.currPassword.message : ""
              }
            />
          </div>
          <div className="input-filed">
            <h5>New Password</h5>
            <TextField
              id="password"
              name="password"
              className="input"
              type={"password"}
              variant="outlined"
              {...register("password")}
              error={errors.password ? true : false}
              helperText={errors.password ? errors.password.message : ""}
            />
          </div>
          <div className="input-filed">
            <h5>Confirm Password</h5>
            <TextField
              name="conPassword"
              id="conPassword"
              type={"password"}
              className="input"
              variant="outlined"
              {...register("conPassword")}
              error={errors.conPassword ? true : false}
              helperText={errors.conPassword ? errors.conPassword.message : ""}
            />
          </div>

          <div className="footer">
            <Button type="submit" variant="contained" className="button">
              Update
            </Button>
          </div>
        </form>
      </div>

      <div className="detail-container">
        <div className="title">
          <h3>Danger Zone</h3>
        </div>
        <Button variant="contained" className="delete-button" color="error">
          Delete Account
        </Button>
      </div>
    </div>
  );
}

export default Settings;
