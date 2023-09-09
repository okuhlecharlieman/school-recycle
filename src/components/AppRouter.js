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
        <Route exact path="/" element={<Home />} />
        <Route exact path="/registration" element={<Registration />} />
        <Route exact path="/donate" element={<Donate />} />
        <Route exact path="/vote" element={<Vote />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
