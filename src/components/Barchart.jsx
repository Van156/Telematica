import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Barchart = () => {
  return (
    <div>
      <h1>No te tocbaa</h1>
      <Bar
        data={{
          labels: [
            "Red",
            "Blue",
            "Yellow",
            "Green",
            "Purple",
            "Orange",
            "m",
            "f",
            "s",
            "Red",
            "Blue",
            "Yellow",
            "Green",
            "Purple",
            "Orange",
            "m",
            "f",
            "s",
          ],
          datasets: [
            {
              label: "# of Votes",
              data: [12, 19, 3, 5, 2, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3, 5, 2, 3],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 32, 10, 0.2)",
                "rgba(60, 12, 215, 0.2)",
                "rgba(5, 26, 86, 0.2)",
                "rgba(15, 92, 92, 0.2)",
                "rgba(13, 102, 255, 0.2)",
                "rgba(35, 6, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(255, 32, 10, 1)",
                "rgba(60, 12, 215, 1)",
                "rgba(5, 26, 86, 1)",
                "rgba(15, 92, 92, 1)",
                "rgba(13, 102, 255, 1)",
                "rgba(35, 6, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        }}
        height={400}
        width={600}
      />
    </div>
  );
};

export default Barchart;
