import "./index.css";
import HomePage from "./pages/HomePage";
import RegistrationPage from "./pages/RegistrationPage";
import DonatePage from "./pages/DonatePage";
import VotePage from "./pages/VotePage";
import { Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/registration" element={<RegistrationPage />} />
        <Route exact path="/donate" element={<DonatePage />} />
        <Route exact path="/vote" element={<VotePage />} />
      </Routes>
    </Router>
  )
}

export default App;
