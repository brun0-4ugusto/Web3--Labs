import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Lottery from "./Pages/Lottery";

export default function AppRouter() {
  return (
    <Router>
        <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lottery" element={<Lottery />} />
      </Routes>
    </Router>
  );
}
