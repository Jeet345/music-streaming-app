import User from "./User";
import { Route, Routes } from "react-router-dom";
import Admin from "./admin/admin";
import { createTheme, ThemeProvider } from "@mui/material";
import { Slide, ToastContainer, Zoom } from "react-toastify";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { setUserCookie } from "./actions";

function App() {
  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#689f38" },
      secondary: {
        main: "#fff",
      },
    },
  });

  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);
  const dispatch = useDispatch();

  dispatch(setUserCookie(cookies.userCookie));

  return (
    <ThemeProvider theme={theme}>
      <div className="bodyContainer">
        <ToastContainer
          position="bottom-center"
          transition={Zoom}
          autoClose={3000}
          hideProgressBar
          closeOnClick
          pauseOnHover
          draggable
          closeButton={false}
        />
        <Routes>
          <Route path="/*" element={<User />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}
export default App;
