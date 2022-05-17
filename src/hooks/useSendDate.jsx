import { useEffect, useState } from "react";
import deviceService from "../service/device.js";

export const useSendDate = (token, startTime, endTime) => {
  const [data, setData] = useState({});
  useEffect(() => {
    if (startTime !== 0 && endTime !== 0) {
      const getData = async () => {
        const d = await deviceService.getDataFromDate(
          token,
          startTime,
          endTime
        );
        setData(d);
      };
      //   setData(getData());
      getData();
    }
  }, [endTime, startTime, token]);

  return [data];
};
