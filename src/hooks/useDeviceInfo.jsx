import { useEffect, useState } from "react";
import deviceService from "../service/device.js";
export const useDeviceInfo = (userToken, det, onl) => {
  const [detecting, setDetect] = useState(det);
  const [online, setOnl] = useState(onl);
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchDetecting = async () => {
      const d = await deviceService.getDeviceDetecting(userToken.token);
      setDetect(d);
    };

    const fetchOnline = async () => {
      const o = await deviceService.getDeviceOnline(userToken.token);
      setOnl(o);
    };

    const fetchName = async () => {
      const n = await deviceService.getDeviceName(userToken.token);
      setName(n);
    };
    fetchDetecting();
    fetchOnline();
    fetchName();
  }, [userToken.token]);
  return [online, detecting, name];
};
