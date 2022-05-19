// import { Routes as Switch, Route } from "react-router-dom"; // updated to latest
import { Routes, Route } from "react-router-dom"; // old
import Login from "./page/Login.jsx";
import { DeviceView } from "./page/DeviceView";
import { Home } from "./page/Home";

const RouterC = () => (
  <Routes>
    <Route exact path="/" element={<Login />} />
    <Route path="/login" element={<Login />} />
    <Route path="/home" element={<Home />} />
    <Route path="/device" element={<DeviceView />} />
    <Route path="/device/:id" element={<DeviceView />} />
  </Routes>
);

export default RouterC;
