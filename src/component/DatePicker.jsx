import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
export const DatePicker = () => {
  return (
    <div className="p-2">
      <h5>Tracking date</h5>
      <Form className="d-flex justify-content-between">
        <Form.Control type="date" className="w-auto" />

        <Form.Select className="w-auto">
          <option>Choose starting time</option>
          <option value="1">9 AM</option>
          <option value="2">10 AM</option>
          <option value="3">11 AM</option>
        </Form.Select>

        <Form.Control
          type="text"
          placeholder="Tracking hour length"
          className="w-auto"
        />

        <Button type="submit">View data</Button>
      </Form>
    </div>
  );
};
