import "chart.js/auto";
import { Container, Row, Col } from "react-bootstrap";
import { Charts } from "../component/Charts.jsx";
import { DatePicker } from "../component/DatePicker.jsx";
import { Device } from "../component/Device.jsx";

const dailyData = [
  { date: "01-23", people: 5 },
  { date: "01-24", people: 8 },
  { date: "01-25", people: 1 },
  { date: "01-26", people: 0 },
  { date: "01-27", people: 10 },
  { date: "01-28", people: 25 },
];

export const Home = () => {
  return (
    <Container>
      <h3>Exhibition visitor tracker</h3>
      <Row>
        <Col lg={9}>
          <DatePicker />
          <Charts data={dailyData} />
        </Col>
        <Col>
          <Device />
        </Col>
      </Row>
    </Container>
  );
};
