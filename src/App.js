import "./index.css";
import HomePage from "./pages/HomePage";
import RegistrationPage from "./pages/RegistrationPage";
import DonatePage from "./pages/DonatePage";
import VotePage from "./pages/VotePage";
import Layout from "./pages/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="registration" element={<RegistrationPage />} />
          <Route path="donate" element={<DonatePage />} />
          <Route path="vote" element={<VotePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
