import User from "./User";
import { Route, Routes } from "react-router-dom";
import Admin from "./admin/admin";

function App() {
   return (
      <div className="bodyContainer">
         <Routes>
            <Route path="/*" element={<User />} />
            <Route path="/admin/*" element={<Admin />} />
         </Routes>
      </div>
   );
}
export default App;
