import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSendDate } from "../hooks/useSendDate";
import { changeData } from "../redux/data";

const MILLISEC_IN_HOUR = 60 * 60 * 1000;

export const DatePicker = () => {
  const userToken = useSelector((state) => state.user.userToken);
  const [date, setDate] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const dispatch = useDispatch();

  const [data] = useSendDate(userToken.token, start, end);

  useEffect(() => {
    dispatch(changeData(data));
  }, [data, dispatch]);

  const handleDate = (e) => {
    e.preventDefault();

    const start_time = date + 6 * MILLISEC_IN_HOUR; // original date start at 3 am => + 6 hour
    const end_time = start_time + 9 * MILLISEC_IN_HOUR;

    // console.log(new Date(start_time), new Date(end_time));
    setStart(start_time);
    setEnd(end_time);
  };

  return (
    <div className="p-2">
      <h5>Tracking date</h5>
      <Form className="d-flex justify-content-between" onSubmit={handleDate}>
        <Form.Control
          type="date"
          className="w-auto"
          onChange={(e) => {
            setDate(Date.parse(e.target.value));
          }}
        />

        {/* <Form.Select className="w-auto">
          <option>Choose starting time</option>
          <option value="1">9 AM</option>
          <option value="2">10 AM</option>
          <option value="3">11 AM</option>
        </Form.Select>

        <Form.Control
          type="text"
          placeholder="Tracking hour length"
          className="w-auto"
        /> */}

        <Button type="submit">View data</Button>
      </Form>
    </div>
  );
};
