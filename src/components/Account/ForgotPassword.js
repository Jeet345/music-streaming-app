import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

function ForgotPassword() {
  let schema = yup.object().shape({
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

  const navigate = useNavigate();
  const { token } = useParams();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const formSubmit = async (data, e) => {
    axios({
      url: `${process.env.REACT_APP_API}forgotPassword`,
      method: "post",
      data: {
        password: data.password,
        token: token,
      },
    })
      .then((res) => {
        if (res.data == 1) {
          toast.success("Password Reset Successfully", {
            toastId: "reset success",
          });
          navigate("/login");
        } else if (res.data.error) {
          toast.error(res.data.error, {
            toastId: "reset error",
          });
        } else {
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log("Something Wan't Wrong !!");
      });
  };

  return (
    <div className="forgot-password-page">
      <form method="post" onSubmit={handleSubmit(formSubmit)}>
        <h1 className="logo">BEMUSIC</h1>
        <div className="login-box">
          <h3 className="title">Rest Password Of Your Account</h3>

          <div className="input-filed">
            <label className="label">Password</label>
            <TextField
              type="password"
              id="password"
              {...register("password")}
              className="input"
              style={{ width: "100%" }}
              variant="outlined"
              name="password"
              error={errors.password ? true : false}
              helperText={errors.password ? errors.password.message : ""}
            />
          </div>

          <div className="input-filed">
            <label className="label">Confirm Password</label>
            <TextField
              type="password"
              id="conPassword"
              className="input"
              {...register("conPassword")}
              style={{ width: "100%" }}
              variant="outlined"
              name="conPassword"
              error={errors.conPassword ? true : false}
              helperText={errors.conPassword ? errors.conPassword.message : ""}
            />
          </div>

          <Button className="submit-btn" type="submit" variant="contained">
            Reset Password
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
