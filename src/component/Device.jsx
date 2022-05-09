import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
import deviceService from "../service/device.js";
import { useEffect } from "react";

const name = "A4B72CCDFF33";

export const Device = () => {
  const userToken = useSelector((state) => state.user.userToken);
  const isOnline = useSelector((state) => state.device.isOnline);
  const isDetecting = useSelector((state) => state.device.isDetecting);
  useEffect(() => {
    deviceService.getDeviceDetecting(userToken.token);
    deviceService.getDeviceOnline(userToken.token);
  }, [userToken.token]);

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
              <div>{isOnline ? "Online" : "Not online"}</div>
              <div>{isDetecting ? "Detecting visitor" : "Not active"}</div>
            </div>
          </ListGroup.Item>
          <ListGroup.Item className="fw-bold">Other information</ListGroup.Item>
        </ListGroup>
      </div>
      <div className="mt-3">
        <h5>Device control</h5>
        <Form.Label>Scheduler tracker</Form.Label>
        <Form.Control type="date" />
        <div className="my-2">Toggle tracker</div>
        <Button
          variant="info"
          size="sm"
          onClick={() => {
            deviceService.toggleDetection(userToken.token, isDetecting);
          }}
        >
          {isDetecting ? "Turn off" : "Turn on"}
        </Button>
      </div>
    </>
  );
};
