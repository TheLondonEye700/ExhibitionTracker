import { useEffect, useState } from "react";

export const useWebsocket = (token) => {
  const [msg, setMsg] = useState("");
  useEffect(() => {
    const ws = new WebSocket(
      `wss://tb.yerzham.com/api/ws/plugins/telemetry?token=${token}`
    );
    ws.onopen = () => {
      console.log("ws opened");
    };
    ws.onmessage = (message) => {
      console.log(message);
      setMsg(message);
    };
    ws.onerror = function () {
      console.log("Connection Error");
    };
  }, [token]);
  return [msg];
};
