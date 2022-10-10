import React from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserCookie } from "../../actions";

function Logout() {
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    removeCookie("userCookie", {
      path: "/",
    });
    dispatch(setUserCookie(""));
    navigate("/Login");
  }, []);

  return (
    <div>
      <h1>{}</h1>
    </div>
  );
}

export default Logout;
