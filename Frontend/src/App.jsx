import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function App() {
  const user= useSelector(state=>state.user.currentUser);
  return (
    <Router>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={user ? <Navigate to="/" /> : <Login />} />
    </Routes>
  </Router>
  );
}

export default App;
