import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Registration from "./Registration";
import Donate from "./Donate";
import Home from "./Home";
import Vote from "./Vote";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/vote" element={<Vote />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
