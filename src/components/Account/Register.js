import React from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import "../../styles/Account/account.css";

function Register() {
   return (
      <div className="register-page">
         <form action="" method="post">
            <h1 className="logo">BEMUSIC</h1>
            <div className="register-box">
               <h3 className="title">Create New Account</h3>
               <div className="input-filed">
                  <h4 className="heading">User Name</h4>
                  <input type="text" name="" id="" className="text-field" />
                  <h4 className="error">
                     <RiErrorWarningFill className="icon" />
                     User Name Field Is Required
                  </h4>
               </div>
               <div className="input-filed">
                  <h4 className="heading">Email</h4>
                  <input type="email" name="" id="" className="text-field" />
                  <h4 className="error">
                     <RiErrorWarningFill className="icon" />
                     Email Field Is Required
                  </h4>
               </div>
               <div className="input-filed">
                  <h4 className="heading">Password</h4>
                  <input type="password" name="" id="" className="text-field" />
                  <h4 className="error">
                     <RiErrorWarningFill className="icon" />
                     Password Field Is Required
                  </h4>
               </div>
               <div className="input-filed">
                  <h4 className="heading">Confirm Password</h4>
                  <input type="password" name="" id="" className="text-field" />
                  <h4 className="error">
                     <RiErrorWarningFill className="icon" />
                     Confirm Password Field Is Required
                  </h4>
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
