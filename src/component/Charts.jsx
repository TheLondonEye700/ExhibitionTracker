import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";

const convertMsToString = (ms) => {
  const d = new Date(ms);
  const hour = d.getHours().toString();
  const min = d.getMinutes().toString();
  return `${hour.padStart(2, "0")}:${min.padStart(2, "0")}`;
};

export const Charts = () => {
  const dataObj = useSelector((state) => state.data.dataObj);
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    let finalData = [];
    if (Object.keys(dataObj).length > 0) {
      for (const peopleObj of dataObj["numberOfPeople"]) {
        let dataPoint = {
          date: convertMsToString(peopleObj["ts"]),
          people: Math.ceil(parseFloat(peopleObj["value"])),
        };
        finalData.push(dataPoint);
      }
    }
    setDailyData(finalData);
  }, [dataObj]);

  return dailyData.length > 0 && Object.keys(dataObj).length > 0 ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            label: "Number of people",
            data: dailyData.map(({ people }) => people),
            borderColor: "#3333ff",
          },
        ],
      }}
    />
  ) : (
    <div>Device was not online at chosen time</div>
  );
};
