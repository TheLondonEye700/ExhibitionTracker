import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSendDate } from "../hooks/useSendDate";
import { changeData } from "../redux/data";
import TimePicker from 'react-bootstrap-time-picker';

// const MILLISEC_IN_HOUR = 60 * 60 * 1000;

const convertMsToString = (ms) => {
  const d = new Date(ms);
  const hour = d.getHours().toString();
  const min = d.getMinutes().toString();
  return `${hour.padStart(2, "0")}:${min.padStart(2, "0")}`;
};

export const DatePicker = ({deviceId}) => {
  const userToken = useSelector((state) => state.user.userToken);
  const [date, setDate] = useState(0);
  const [start, setStart] = useState(21600);
  const [end, setEnd] = useState(23400);
  const [interval, setInterval] = useState(60000);
  const dispatch = useDispatch();

  const [data, fetchData] = useSendDate(userToken.token, deviceId, date, start, end, interval);

  useEffect(() => {  
    dispatch(changeData(data));
  }, [data, dispatch]);

  const handleSubmit = useCallback(()=>{
    fetchData()
  }, [fetchData])

  const handleDate = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleStartTime = useCallback((time)=>{
    setStart(time);
    if (time >= end){
      setEnd(time+1800)
    }
  }, [end])

  const handleEndTime = useCallback((time)=>{
    setEnd(time);
  }, [])

  const handleInterval = useCallback((e)=>{
    setInterval(e.target.value);
  }, [])

  const handleStartTimeChange = useCallback(()=>{
    return convertMsToString((start+1800)*1000)
  }, [start])

  return (
    <div className="pt-2 pb-2">
      <h5>Time Frame</h5>
      <div>
        <Form className="d-flex" onSubmit={handleDate}>
          <div>
            <label htmlFor="date">Tracking Date</label>
            <Form.Control
            id="date"
            type="date"
            onChange={(e) => {
              setDate(Date.parse(e.target.value));
            }}
          />
          </div>
          
          <div className="ms-3" style={{width: "7rem"}}>
          <label htmlFor="start-time">Start Time</label>
            <TimePicker 
              onChange={handleStartTime}
              id="start-time"
              format={24}
              start="6:00" 
              end="21:00" 
              step={30}
              value={start}
            />
          </div>

          <div className="ms-3" style={{width: "7rem"}}>
          <label htmlFor="end-time">End Time</label>
            <TimePicker
              onChange={handleEndTime}
              id="end-time"
              format={24}
              initialValue="6:30"
              start={handleStartTimeChange()} 
              end="21:00" 
              step={30}
              value={end}
            />
          </div>

          <div className="ms-5">
          <label htmlFor="interval">Averaging Interval</label>
            <Form.Select name="interval" id="interval" value={interval} onChange={handleInterval}>
              <option value="60000">1 minute</option>
              <option value="600000">10 minutes</option>
              <option value="3600000">1 hour</option>
            </Form.Select>
          </div>
          
          <div className="ms-auto d-flex align-items-end">
            <Button onClick={handleSubmit}>View data</Button>
          </div>
          
        </Form>
      </div>
    </div>
  );
};
