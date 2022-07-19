import React from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import "../../styles/Account/account.css";

function Login() {
   return (
      <div className="login-page">
         <form action="" method="post">
            <h1 className="logo">BEMUSIC</h1>
            <div className="login-box">
               <h3 className="title">Sign In To Your Account</h3>

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
                  <Link className="forgot-link" to="/">
                     Forgot your password?
                  </Link>
                  <h4 className="error">
                     <RiErrorWarningFill className="icon" />
                     Password Field Is Required
                  </h4>
               </div>

               <button className="submit-btn" type="submit">
                  Continue
               </button>
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
