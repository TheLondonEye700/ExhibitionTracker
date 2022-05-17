import "chart.js/auto";
import { Container, Row, Col } from "react-bootstrap";
import { Charts } from "../component/Charts.jsx";
import { DatePicker } from "../component/DatePicker.jsx";
import { Device } from "../component/Device.jsx";

export const Home = () => {
  return (
    <Container>
      <h3>Exhibition visitor tracker</h3>
      <Row>
        <Col lg={9}>
          <DatePicker />
          <Charts />
        </Col>
        <Col>
          <Device />
        </Col>
      </Row>
    </Container>
  );
};
