import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import deviceService from "../service/device.js";
import { useEffect, useCallback } from "react";
import { setDetectionEnabled, setOnline } from "../redux/device.js";
import { useWebsocket } from "../hooks/useWebsocket.jsx";
import { useDeviceInfo } from "../hooks/useDeviceInfo.jsx";

// const name = "A4B72CCDFF33";

export const Device = ({id}) => {
  const userToken = useSelector((state) => state.user.userToken);
  const isOnline = useSelector((state) => state.device.isOnline);
  const isDetecting = useSelector((state) => state.device.isDetecting);
  const dispatch = useDispatch();

  const [online, detectionEnabled, name, exhibition] = useDeviceInfo(
    userToken,
    id,
    isDetecting,
    isOnline
  );
  useEffect(() => {
    // dispatch after render, if not while Device render it is dispatching action that make it update => rerender
    dispatch(setDetectionEnabled(detectionEnabled));
    dispatch(setOnline(online));
  }, [detectionEnabled, dispatch, online]);

  const handleToggle = useCallback(() => {
    deviceService
      .toggleDetection(userToken.token, isDetecting)
      .then((value) => {
        if (value === true) {
          dispatch(setDetectionEnabled(!isDetecting));
        }
      })
      .catch((e) => console.log("error", e));
  }, [dispatch, isDetecting, userToken.token]);

  useWebsocket(userToken.token, id);
  // TODO: disable toggle detection if device is not online

  return (
    <>
      <div className="pt-2">
        <h5>Device information</h5>
        <ListGroup>
          <ListGroup.Item>
            <h6 className="fw-bold">Name</h6>
            <p>{name}</p>
            <h6 className="fw-bold">Location</h6>
            <p>{exhibition}</p>
          </ListGroup.Item>
          <ListGroup.Item>
            <div>
              <div className="fw-bold">State</div>
              <div>{isOnline ? "Online" : "Offline"}</div>
              <div>{isDetecting ? "Detection Enabled" : "Detection Disabled"}</div>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </div>
      <div className="mt-3">
        <h5>Device control</h5>
        <Button size="sm" onClick={handleToggle}>
          {isDetecting ? "Turn off" : "Turn on"}
        </Button>
      </div>
    </>
  );
};
