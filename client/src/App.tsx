import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Registeration from "./pages/Regisration/Registration";
import MainPage from "./pages/MainPage/MainPage";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
      <Routes>
        <Route path="/main-page" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registeration />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
  );
}

export default App;
