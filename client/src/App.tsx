import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Main from "./pages/main/Main";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import { useAuth } from "./contexts/AuthContext";
function App() {
  const { isAuthenticated } = useAuth();
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={!isAuthenticated ? <Register /> : <Navigate to="/main" />}
          />
          <Route
            path="/login"
            element={!isAuthenticated ? <Login /> : <Navigate to="/main" />}
          />
          <Route
            path="/main"
            element={isAuthenticated ? <Main /> : <Login />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
