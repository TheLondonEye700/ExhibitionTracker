import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import 'chartjs-adapter-moment';

export const Charts = () => {
  const dataObj = useSelector((state) => state.data.dataObj);
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    if (typeof dataObj !== 'string'){
      let finalData = [];
      if (Object.keys(dataObj.data).length > 0) {
        for (const peopleObj of dataObj.data["numberOfPeople"]) {
          let dataPoint = {
            time: peopleObj["ts"],
            people: Math.ceil(parseFloat(peopleObj["value"])),
          };
          finalData.push(dataPoint);
        }
      }
      setDailyData(finalData);
    }
  }, [dataObj]);

  return (
    <div className="pt-4 pb-4">
      {dailyData.length > 0 ? <>
        <h5>Average number of people in the camera view</h5>
        <Bar
          data={{
            datasets: [
              {
                data: dailyData.map(({ people, time }) => {return {x: time, y: people}}),
                backgroundColor: "#8888ff",
                barPercentage: 1
              },
            ],
          }}
          options={{
            scales: {
              y: {
                ticks: {
                  precision: 0
                }
              },
              x: {
                min: dataObj.minTs,
                max: dataObj.maxTs,
                type: 'time',
                time:{
                  parser:(time)=>{
                    return time + 2*60*60*1000;
                  },
                  stepSize: dataObj.interval
                }
              }
            },
            plugins:{
              legend: {
                display: false
              }
            }
          }}
        />
      </> : (
        <div>Device was not detecting in the given time frame</div>
      )}
    </div>
  )
};
