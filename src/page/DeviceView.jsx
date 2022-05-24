import "chart.js/auto";
import { Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { BoundaryDraw } from "../component/BoundaryDraw.jsx";
import { Charts } from "../component/Charts.jsx";
import { DatePicker } from "../component/DatePicker.jsx";
import { Device } from "../component/Device.jsx";

export const DeviceView = () => {
  const { id } = useParams();
  return (
    <>
    Back to <Link to='/home'>Exhibition Spaces</Link>
    <h2 className="mt-2">Device Dashboard</h2>
    <Row className="mb-5">
      <Col lg={9}>
        <DatePicker deviceId={id}/>
        <Charts />
        <BoundaryDraw></BoundaryDraw>
      </Col>
      <Col>
        <Device id={id}/>
      </Col>
    </Row>
    </>
  );
};
