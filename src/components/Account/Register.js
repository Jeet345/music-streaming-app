import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import "../../styles/Account/account.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import moment from "moment";
import { Button, InputLabel, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { toast } from "react-toastify";

function Register() {
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

  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const checkIfEmailExist = async (email) => {
    const res = await axios({
      url: "http://localhost:4000/users/findUserByEmail",
      method: "post",
      data: {
        email,
      },
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        alert("Something Wan't Wrong");
        console.log(err);
      });
    return res;
  };

  const registerClick = async (data) => {
    let created_at = moment().format("yyyy-MM-DD");
    data = { ...data, groupName: "user", created_at };

    await checkIfEmailExist(data.email).then((res) => {
      if (res.data == "") {
        axios({
          url: "http://localhost:4000/register",
          method: "post",
          data,
        })
          .then((res) => {
            if (res.data === 1) {
              toast.success("Account Register Successfully...");
              navigate("/login");
            } else {
              console.log(res);
            }
          })
          .catch((err) => {
            alert("Something Wan't Wrong");
            console.log(err);
          });
      } else {
        alert("Account already Exists...");
      }
    });
  };

  return (
    <div className="register-page">
      <form method="post" onSubmit={handleSubmit(registerClick)}>
        <h1 className="logo">BEMUSIC</h1>
        <div className="register-box">
          <h3 className="title">Create New Account</h3>

          <div className="input-filed">
            <label className="label">username</label>
            <TextField
              id="username"
              className="input"
              style={{ width: "100%" }}
              variant="outlined"
              name="username"
              {...register("username")}
              error={errors.username ? true : false}
              helperText={errors.username ? errors.username.message : ""}
            />
          </div>

          <div className="input-filed">
            <label className="label">email</label>
            <TextField
              id="email"
              className="input"
              style={{ width: "100%" }}
              variant="outlined"
              name="email"
              {...register("email")}
              error={errors.email ? true : false}
              helperText={errors.email ? errors.email.message : ""}
            />
          </div>

          <div className="input-filed">
            <label className="label">Password</label>
            <TextField
              hintText="Password"
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

          <Button
            className="submit-btn"
            type="submit"
            variant="contained"
            onClick={() => {}}
          >
            Create Account
          </Button>
        </div>
        <h5 className="bottom-link">
          Already have an account?
          <Link to="/Login">Sign in.</Link>
        </h5>
      </form>
    </div>
  );
}

export default Register;
