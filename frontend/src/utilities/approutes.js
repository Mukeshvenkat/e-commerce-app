import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "../pages/login/LoginScreen";
import ProtectedRoute from "./ProtectedRoutes";
import Home from "../pages/home/Home";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  </Router>
);

export default AppRoutes;
