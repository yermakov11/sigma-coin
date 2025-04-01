import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Registeration from "./pages/Regisration/Registration";
import MainPage from "./pages/MainPage/MainPage";
import Profile from "./pages/Profile/Profile";
import EmailVerify from "./pages/EmailVerify/EmailVerify";
import { useAuth } from "./contexts/userContext";
function App() {

  function PrivateRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth();
    return isAuthenticated() ? <>{children}</> : <Navigate to="/login" />;
  }
  return (
    <Routes>
      <Route path="/main-page" element={<PrivateRoute><MainPage /></PrivateRoute> }/>
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registeration />} />
      <Route path="/verify/:token" element={<EmailVerify />} />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
