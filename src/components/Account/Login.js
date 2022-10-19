import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Account/account.css";
import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { setUserCookie } from "../../actions";
import { toast } from "react-toastify";

function Login() {
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let schema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email is a required field"),
    password: yup.string().required("Password is a required field"),
  });

  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [isForgotDisabled, setIsForgotDisabled] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const formSubmit = async (data) => {
    setIsFormDisabled(true);
    axios({
      url: "http://localhost:4000/login",
      method: "post",
      data,
    })
      .then((res) => {
        setIsFormDisabled(false);
        setCookie("userCookie", res.data._id, {
          maxAge: 2592000,
          path: "/",
        });
        dispatch(setUserCookie(res.data._id));
        navigate("/");
        console.log("res", res.data._id);
      })
      .catch((err) => {
        setIsFormDisabled(false);
        if (err.response.data.error) {
          toast.error(err.response.data.error, {
            toastId: "toast error",
          });
        } else {
          console.log(err);
        }
      });
  };

  const handleForgotLinkClick = (e) => {
    let email = watch("email");

    if (!email || errors.email) {
      toast.error("Please enter valid email", {
        toastId: "email valid",
      });
    } else {
      setIsForgotDisabled(true);
      axios({
        url: "http://localhost:4000/forgotPasswordMailSend",
        method: "post",
        data: { email: email },
      })
        .then((res) => {
          setIsForgotDisabled(false);
          if (res.data == 1) {
            toast.success(`We have send password reset link on ${email}.`, {
              toastId: "success link",
            });
          } else if (res.data.error) {
            toast.error(res.data.error, {
              toastId: "not found",
            });
          } else {
            console.log("Something wan't wrong !!");
          }
        })
        .catch((err) => {
          console.log("Something Wan't Wrong!!");
        });
    }
  };

  return (
    <div className="login-page">
      <form method="post" onSubmit={handleSubmit(formSubmit)}>
        <h1 className="logo">BEMUSIC</h1>
        <div className="login-box">
          <h3 className="title">Sign In To Your Account</h3>
          <div className="input-filed">
            <label className="label" htmlFor="Email">
              email
            </label>
            <TextField
              id="email"
              className="input"
              style={{ width: "100%" }}
              variant="outlined"
              name="email"
              inputProps={{ tabIndex: 1 }}
              {...register("email")}
              error={errors.email ? true : false}
              helperText={errors.email ? errors.email.message : ""}
            />
          </div>
          <div className="input-filed">
            <label className="label" htmlFor="password">
              Password
              <Button
                variant="text"
                disabled={isForgotDisabled}
                className="forgot-link"
                onClick={handleForgotLinkClick}
                to="/"
              >
                Forgot your password?
              </Button>
            </label>
            <TextField
              hinttext="Password"
              type="password"
              id="password"
              {...register("password")}
              className="input"
              inputProps={{ tabIndex: 2 }}
              style={{ width: "100%" }}
              variant="outlined"
              name="password"
              error={errors.password ? true : false}
              helperText={errors.password ? errors.password.message : ""}
            />
          </div>
          <Button
            disabled={isFormDisabled}
            className="submit-btn"
            type="submit"
            tabIndex={3}
            variant="contained"
          >
            {isFormDisabled ? "Loading..." : "Continue"}
          </Button>
        </div>
        <h5 className="bottom-link">
          Don't have an account?
          <Link to="/Register">Sign up.</Link>
        </h5>
      </form>
    </div>
  );
}

export default Login;
