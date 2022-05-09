// import { Routes as Switch, Route } from "react-router-dom"; // updated to latest
import { Routes, Route } from "react-router-dom"; // old
import Login from "./page/Login.jsx";
import { Home } from "./page/Home.jsx";

const RouterC = () => (
  <Routes>
    <Route exact path="/" element={<Login />} />
    <Route path="/login" element={<Login />} />
    <Route path="/home" element={<Home />} />
  </Routes>
);

export default RouterC;
