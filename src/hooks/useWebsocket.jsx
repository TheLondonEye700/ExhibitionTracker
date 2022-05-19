import { useEffect, useState } from "react";

export const useWebsocket = (token, deviceId) => {
  const [msg, setMsg] = useState("");
  useEffect(() => {
    const ws = new WebSocket(
      `wss://tb.yerzham.com/api/ws/plugins/telemetry?token=${token}`
    );
    ws.onopen = () => {
      console.log("ws opened");
      var object = {
        tsSubCmds: [
            {
                entityType: "DEVICE",
                entityId: deviceId,
                scope: "LATEST_TELEMETRY",
                cmdId: 10
            }
        ],
        historyCmds: [],
        attrSubCmds: []
      };
      var data = JSON.stringify(object);
      ws.send(data);
      console.log("Message is sent: " + data);
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
