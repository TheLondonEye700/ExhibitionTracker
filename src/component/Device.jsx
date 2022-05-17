import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import deviceService from "../service/device.js";
import { useEffect, useCallback } from "react";
import { setDetecting, setOnline } from "../redux/device.js";
import { useWebsocket } from "../hooks/useWebsocket.jsx";
import { useDeviceInfo } from "../hooks/useDeviceInfo.jsx";

// const name = "A4B72CCDFF33";

export const Device = () => {
  const userToken = useSelector((state) => state.user.userToken);
  const isOnline = useSelector((state) => state.device.isOnline);
  const isDetecting = useSelector((state) => state.device.isDetecting);
  const dispatch = useDispatch();

  const [online, detecting, name] = useDeviceInfo(
    userToken,
    isDetecting,
    isOnline
  );
  useEffect(() => {
    // dispatch after render, if not while Device render it is dispatching action that make it update => rerender
    dispatch(setDetecting(detecting));
    dispatch(setOnline(online));
  }, [detecting, dispatch, online]);

  const handleToggle = useCallback(() => {
    deviceService
      .toggleDetection(userToken.token, isDetecting)
      .then((value) => {
        if (value === true) {
          dispatch(setDetecting(!isDetecting));
        }
      })
      .catch((e) => console.log("error", e));
  }, [dispatch, isDetecting, userToken.token]);

  useWebsocket(userToken.token);
  // TODO: disable toggle detection if device is not online

  return (
    <>
      <div className="pt-2">
        <h5>Device information</h5>
        <ListGroup>
          <ListGroup.Item>
            <div>
              <div className="fw-bold">Name</div>
              <div>{name}</div>
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            <div>
              <div className="fw-bold">State</div>
              <div>{isOnline ? "Online" : "Offline"}</div>
              <div>{isDetecting ? "Detecting" : "Not detecting"}</div>
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
