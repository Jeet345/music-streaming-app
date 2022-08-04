import React, { useEffect, useState } from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import "../../styles/Account/account.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import moment from "moment";

function Register() {
   const navigate = useNavigate();
   const {
      register,
      formState: { errors },
      handleSubmit,
      watch,
   } = useForm();

   const registerClick = async (data) => {
      let created_at = moment().format("yyyy-MM-DD");
      data = { ...data, groupName: "user", created_at };

      try {
         let result = await fetch("http://localhost:4000/register", {
            method: "post",
            body: JSON.stringify(data),
            headers: {
               "Content-Type": "application/json",
            },
         });
         result = await result.json();
         if (result) {
            navigate("/");
         }
      } catch (e) {
         alert(e);
      }
   };

   return (
      <div className="register-page">
         <form action="" method="post" onSubmit={handleSubmit(registerClick)}>
            <h1 className="logo">BEMUSIC</h1>
            <div className="register-box">
               <h3 className="title">Create New Account</h3>
               <div className="input-filed">
                  <h4 className="heading">User Name</h4>
                  <input
                     type="text"
                     name="username"
                     {...register("username", {
                        required: "Username is required",
                     })}
                     className="text-field"
                  />
                  {errors.username && (
                     <h4 className="error">
                        <RiErrorWarningFill className="icon" />
                        {errors.username.message}
                     </h4>
                  )}
               </div>
               <div className="input-filed">
                  <h4 className="heading">Email</h4>
                  <input
                     type="text"
                     {...register("email", {
                        required: "Email Field Is Required",
                        pattern: {
                           value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                           message: "Please Enter Valid Email Address",
                        },
                     })}
                     className="text-field"
                  />
                  {errors.email && (
                     <h4 className="error">
                        <RiErrorWarningFill className="icon" />
                        {errors.email.message}
                     </h4>
                  )}
               </div>
               <div className="input-filed">
                  <h4 className="heading">Password</h4>
                  <input
                     type="password"
                     {...register("password", {
                        required: "Password Field Is Required",
                     })}
                     className="text-field"
                  />
                  {errors.password && (
                     <h4 className="error">
                        <RiErrorWarningFill className="icon" />
                        {errors.password.message}
                     </h4>
                  )}
               </div>
               <div className="input-filed">
                  <h4 className="heading">Confirm Password</h4>
                  <input
                     type="password"
                     {...register("conPassword", {
                        required: "Confirm Password Field Is Required",
                        validate: (val = handleSubmit.password) => {
                           if (watch("password") != val) {
                              return "Password and confirm password not match";
                           }
                        },
                     })}
                     className="text-field"
                  />
                  {errors.conPassword && (
                     <h4 className="error">
                        <RiErrorWarningFill className="icon" />
                        {errors.conPassword.message}
                     </h4>
                  )}
               </div>
               <button className="submit-btn" type="submit">
                  Create Account
               </button>
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
