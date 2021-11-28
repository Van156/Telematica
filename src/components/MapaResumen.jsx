import React from "react";
import Barchart from "./Barchart";
import { Bar, Doughnut } from "react-chartjs-2";
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
const MapaResumen = () => {
  return (
    <div className="MapaResumen">
      <div className="Bar">
        <Bar
          data={{
            labels: ["Red", "1", "2", "3", "4", "5"],
            datasets: [
              {
                label: "# of Votes",
                data: [
                  12, 19, 3, 5, 2, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3, 5, 2, 3,
                ],
                backgroundColor: ["rgba(255, 99, 132, 0.2)"],
                borderColor: ["rgba(255, 99, 132, 1)"],
                borderWidth: 1,
              },
              {
                label: "# of Votes",
                data: [
                  12, 19, 3, 5, 2, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3, 5, 2, 3,
                ],
                backgroundColor: ["red"],
                borderColor: ["rgba(255, 99, 132, 1)"],
                borderWidth: 1,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
          height={400}
          width={400}
        />
      </div>
      <div className="Container-pie">
        <div className="Pie">
          <Doughnut
            data={{
              labels: ["Red", "Blue"],
              datasets: [
                {
                  label: "# of Votes",
                  data: [12, 19],
                  backgroundColor: [
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
            height={400}
            width={600}
          />
        </div>

        <div className="Pie">
          <Doughnut
            data={{
              labels: ["Red", "Blue", "Yellow"],
              datasets: [
                {
                  label: "# of Votes",
                  data: [12, 19, 3],
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
            height={400}
            width={600}
          />
        </div>
        <div className="Pie">
          <Doughnut
            data={{
              labels: ["Red", "Blue", "Yellow"],
              datasets: [
                {
                  label: "# of Votes",
                  data: [12, 19, 3],
                  backgroundColor: [
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                  ],
                  borderColor: [
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
            height={400}
            width={600}
          />
        </div>
      </div>
    </div>
  );
};

export default MapaResumen;
