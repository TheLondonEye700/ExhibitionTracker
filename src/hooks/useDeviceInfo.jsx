import { useEffect, useRef, useState } from "react";
import deviceService from "../service/device.js";
export const useDeviceInfo = (userToken, deviceId, det=false, onl=false, isDetecting=false) => {
  const deviceIdRef = useRef(deviceId)
  const [detectionEnabled, setDetectionEnabled] = useState(det);
  const [detecting, setDetecting] = useState(isDetecting);
  const [online, setOnl] = useState(onl);
  const [name, setName] = useState("");
  const [exhibition, setExhibition] = useState("");

  useEffect(() => {
    const fetchDetectionEnabled = async () => {
      const d = await deviceService.getDeviceDetectionEnabled(userToken.token, deviceIdRef.current);
      setDetectionEnabled(d);
    };

    const fetchOnline = async () => {
      const o = await deviceService.getDeviceOnline(userToken.token, deviceIdRef.current);
      setOnl(o);
    };

    const fetchDetecting = async () => {
      const d = await deviceService.getDeviceDetecting(userToken.token, deviceIdRef.current);
      setDetecting(d);
    };

    const fetchName = async () => {
      const n = await deviceService.getDeviceName(userToken.token, deviceIdRef.current);
      setName(n);
    };

    const fetchExhibion = async () => {
      const e = await deviceService.getDeviceExhibitionSpace(userToken.token, deviceIdRef.current);
      setExhibition(e.name);
    };

    fetchDetecting();
    fetchDetectionEnabled();
    fetchOnline();
    fetchName();
    fetchExhibion();
  }, [userToken.token]);
  return [online, detectionEnabled, detecting, name, exhibition];
};
