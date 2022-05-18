import "chart.js/auto";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Charts } from "../component/Charts.jsx";
import { DatePicker } from "../component/DatePicker.jsx";
import { Device } from "../component/Device.jsx";

export const DeviceView = () => {
  const { id } = useParams();
  return (
    <>
    <h2>Exhibition visitor tracker</h2>
    <Row>
      <Col lg={9}>
        <DatePicker />
        <Charts />
      </Col>
      <Col>
        <Device id={id}/>
      </Col>
    </Row>
    </>
  );
};
