import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import deviceService from "../service/device.js";
import { useEffect, useCallback } from "react";
import { setDetectionEnabled, setOnline, setDetecting, setNumberOfPeople } from "../redux/device.js";
import { useWebsocket } from "../hooks/useWebsocket.jsx";
import { useDeviceInfo } from "../hooks/useDeviceInfo.jsx";

export const Device = ({id}) => {
  const userToken = useSelector((state) => state.user.userToken);
  const currentNumberOfPeople = useSelector((state) => state.device.currentNumberOfPeople);
  const isOnline = useSelector((state) => state.device.isOnline);
  const isDetectionEnabled = useSelector((state) => state.device.isDetectionEnabled);
  const isDetecting = useSelector((state) => state.device.isDetecting);
  const dispatch = useDispatch();

  const [online, detectionEnabled, detecting, name, exhibition] = useDeviceInfo(
    userToken,
    id,
    isDetectionEnabled,
    isOnline,
    isDetecting
  );
  useEffect(() => {
    // dispatch after render, if not while Device render it is dispatching action that make it update => rerender
    dispatch(setDetectionEnabled(detectionEnabled));
    dispatch(setOnline(online));
    dispatch(setDetecting(detecting));
  }, [detectionEnabled, dispatch, online, detecting]);

  const handleToggle = useCallback(() => {
    deviceService
      .toggleDetection(userToken.token, isDetectionEnabled)
      .then((value) => {
        if (value === true) {
          dispatch(setDetectionEnabled(!isDetectionEnabled));
        }
      })
      .catch((e) => console.log("error", e));
  }, [dispatch, isDetectionEnabled, userToken.token]);

  const [wsMsg] = useWebsocket(userToken.token, id);

  useEffect(()=>{
    console.log(wsMsg);
    if (wsMsg.active){
      dispatch(setOnline(wsMsg.active[0][1]==="true"))
    }
    if (wsMsg.detecting){
      dispatch(setDetecting(wsMsg.detecting[0][1]==="true"))
    }
    if (wsMsg.numberOfPeople){
      dispatch(setNumberOfPeople(Number(wsMsg.numberOfPeople[0][1])))
    }
  }, [wsMsg, dispatch])

  return (
    <div className="pt-4 pb-4">
    <h5>Device information</h5>
    <div className="pt-2">
      <ListGroup>
        <ListGroup.Item>
          <h6 className="fw-bold">Name</h6>
          <p>{name}</p>
          <h6 className="fw-bold">Location</h6>
          <p>{exhibition}</p>
        </ListGroup.Item>
        <ListGroup.Item>
          <div>
          <h6 className="fw-bold">State</h6>
            <div className="d-flex mb-1">
              {isOnline ? 
                <>
                  <div className="badge bg-success">Online</div>
                  {isDetecting ? 
                    <div className="ms-2 badge bg-success">Detecting</div> 
                  : 
                    <div className="ms-2 badge bg-secondary">Not Detecting</div> 
                  }
                </>
                 : (
                <div className="badge bg-secondary">Offline</div>
              )}
            </div>
            {isOnline && isDetecting ? 
            <p>Currently in view: {currentNumberOfPeople !== null ? <>{currentNumberOfPeople} people</> : "N/A"}</p> : <></>}
            <h6 className="fw-bold">Configuration</h6>
            <div>{isDetectionEnabled ? "Detection Enabled" : "Detection Disabled"}</div>
          </div>
        </ListGroup.Item>
      </ListGroup>
    </div>
    <div className="mt-3">
      <h5>Device control</h5>
      <label>Detection: </label>
      <Button size="sm" className="ms-2" onClick={handleToggle}>
        {isDetectionEnabled ? "Turn off" : "Turn on"}
      </Button>
    </div>
    </div>
  );
};
