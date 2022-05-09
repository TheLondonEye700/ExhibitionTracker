import { Line } from "react-chartjs-2";

export const Charts = ({ data }) => {
  return data.length > 0 ? (
    <Line
      data={{
        labels: data.map(({ date }) => date),
        datasets: [
          {
            label: "Number of people",
            data: data.map(({ people }) => people),
            borderColor: "#3333ff",
          },
        ],
      }}
    />
  ) : (
    "No data"
  );
};
