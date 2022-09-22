import User from "./User";
import { Route, Routes } from "react-router-dom";
import Admin from "./admin/admin";
import { createTheme, ThemeProvider } from "@mui/material";

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
  return (
    <ThemeProvider theme={theme}>
      <div className="bodyContainer">
        <Routes>
          <Route path="/*" element={<User />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}
export default App;
