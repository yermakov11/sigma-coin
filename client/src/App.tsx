import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Registeration from "./pages/Regisration/Registration";
import MainPage from "./pages/MainPage/MainPage";
import Profile from "./pages/Profile/Profile";
import { ReactNode } from "react";

function App() {

  const isAuthenticated = () => !!localStorage.getItem("token");

  const PrivateRoute = ({ children }: { children: ReactNode }) => {
    return isAuthenticated() ? children : <Navigate to="/login" />;
  };

  return (
    <Routes>
      <Route path="/" element={<PrivateRoute><MainPage /></PrivateRoute>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registeration />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
