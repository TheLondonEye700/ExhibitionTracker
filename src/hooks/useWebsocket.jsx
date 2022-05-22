import { useEffect, useMemo, useState } from "react";

export const useWebsocket = (token, deviceId) => {
  const [msg, setMsg] = useState("");
  const ws = useMemo(() => { 
    return new WebSocket(`wss://tb.yerzham.com/api/ws/plugins/telemetry?token=${token}`);
  }, [token]);
  useEffect(() => {
    ws.onopen = () => {
      console.log("ws opened");
      // ws.send(JSON.stringify({
      //   tsSubCmds: [
      //       {
      //           entityType: "DEVICE",
      //           entityId: deviceId,
      //           scope: "LATEST_TELEMETRY",
      //           cmdId: 10
      //       }
      //   ],
      //   historyCmds: [],
      //   attrSubCmds: []
      // }));
      ws.send(JSON.stringify({
        tsSubCmds: [
          {
            entityType: "DEVICE",
            entityId: deviceId,
            scope: "LATEST_TELEMETRY",
            cmdId: 9
          }
        ],
        historyCmds: [],
        attrSubCmds: [
          {
            entityType: "DEVICE",
            entityId: deviceId,
            keys:"active",
            scope: "SERVER_SCOPE",
            cmdId: 10
          },
          {
            entityType: "DEVICE",
            entityId: deviceId,
            keys:"detecting",
            scope: "CLIENT_SCOPE",
            cmdId: 11
          }
        ]
      }));
    };
    ws.onmessage = (message) => {
      setMsg(JSON.parse(message.data).data);
    };
    ws.onerror = function () {
      console.log("Connection Error");
    };
  }, [token, deviceId, ws]);
  return [msg];
};
