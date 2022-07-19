import Home from "./components/Home/Home.js";
import About from "./components/About/About.js";
import "./styles/App.css";
import Nav from "./common/Nav.js";
import { Route, Routes } from "react-router-dom";

function App() {
   return (
      <div className="appContainer">
         <Nav />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
         </Routes>
      </div>
   );
}

export default App;
