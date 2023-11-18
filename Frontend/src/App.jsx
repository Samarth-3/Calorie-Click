import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import NutrientsLog from "./Pages/NutrientsLog";
import UserManual from "./Pages/UserManual";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


function App() {
  const user= useSelector(state=>state.user.currentUser);
  return (
    <Router>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route exact path="/NutrientsLog" element={<NutrientsLog />} />
      <Route exact path="/nutrientlog/:userId" element={<NutrientsLog />} />
      <Route exact path="/UserManual" element={<UserManual />} />
    </Routes>
  </Router>
  );
}

export default App;
