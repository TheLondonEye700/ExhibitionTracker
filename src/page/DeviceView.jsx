import "chart.js/auto";
import { Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { Charts } from "../component/Charts.jsx";
import { DatePicker } from "../component/DatePicker.jsx";
import { Device } from "../component/Device.jsx";

export const DeviceView = () => {
  const { id } = useParams();
  return (
    <>
    Back to <Link to='/home'>Exhibition Spaces</Link>
    <h2 className="mt-2">Device Dashboard</h2>
    <Row>
      <Col lg={9}>
        <DatePicker deviceId={id}/>
        <Charts />
      </Col>
      <Col>
        <Device id={id}/>
      </Col>
    </Row>
    </>
  );
};
