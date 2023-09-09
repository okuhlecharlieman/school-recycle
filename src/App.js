import "./index.css";
import HomePage from "./pages/HomePage";
import RegistrationPage from "./pages/RegistrationPage";
import DonatePage from "./pages/DonatePage";
import VotePage from "./pages/VotePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/registration" element={<RegistrationPage />} />
        <Route exact path="/donate" element={<DonatePage />} />
        <Route exact path="/vote" element={<VotePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
