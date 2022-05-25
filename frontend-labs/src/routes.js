import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";

export default function AppRouter() {
  return (
    <Router>
        <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lottery" element={<Home />} />
      </Routes>
    </Router>
  );
}
