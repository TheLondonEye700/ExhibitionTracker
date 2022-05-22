import { useCallback, useState } from "react";
import deviceService from "../service/device.js";

export const useSendDate = (token, deviceId, date, startTime, endTime, interval) => {
  const [data, setData] = useState({data: {}});
  const fetchData = useCallback(() => {
    if (startTime !== 0 && endTime !== 0 && endTime > startTime) {
      const startTs = date + startTime * 1000
      const endTs = date + endTime * 1000
      const getData = async () => {
        const d = await deviceService.getDataFromDate(
          token,
          deviceId,
          startTs,
          endTs,
          interval
        );
        if (typeof d === 'string'){
          alert(d)
        } else {
          setData({
            data: d,
            minTs: startTs,
            maxTs: endTs
          });
        }
      };
      getData();
    }
  }, [date, endTime, startTime, interval, deviceId, token]);

  return [data, fetchData];
};
