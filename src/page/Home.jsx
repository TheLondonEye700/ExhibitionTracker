import { useCallback, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { useExhibitionDevices } from "../hooks/useExhibitionDevices";
import { useNavigate } from "react-router-dom";

const ViewButton = ({value, onClick, children}) => {
  const handleClick = () => {
    onClick(value);
  }

  return (
    <Button onClick={handleClick}>
      {children}
    </Button>
  );
}

const Home = () => {
  const userToken = useSelector((state) => state.user.userToken);
  const [exhibitions, updateExhibitions] = useExhibitionDevices(userToken, []);

  const navigate = useNavigate();

  const handleView = useCallback((value) => {
    console.log(`Clicked ${value}`);
    navigate(`/device/${value}`)
  }, [navigate]);
  
  useEffect(()=>{
    updateExhibitions()
  }, [updateExhibitions])

  return (
    <>
      <h2>Exhibition Spaces</h2>
      <Accordion>
        {exhibitions.map(exhibition => {
          return (
          <Accordion.Item key={exhibition.name} eventKey={exhibition.name}>
            <Accordion.Header>{exhibition.name} <span className="ms-3 badge bg-secondary">{String(exhibition.devices.length)}</span></Accordion.Header>
            <Accordion.Body>
            <ListGroup>
              {exhibition.devices.length ? exhibition.devices.map(device => {
                return (
                  <ListGroup.Item key={device.id} className="d-flex align-items-center">
                    <div className="me-3">{device.name}</div>
                    <Badge pill bg={device.online ? "success" : "secondary"}>
                          {device.online ? "online" : "offline"}
                    </Badge>
                    <div className="flex-grow-1 d-flex flex-row-reverse align-items-center">
                    <ViewButton onClick={handleView} value={device.id}>View More</ViewButton>
                    </div>
                  </ListGroup.Item>
                )
              }) : "No devices in this space"}
            </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
          )
        })}
      </Accordion>
    </>
  );
}

export {Home};