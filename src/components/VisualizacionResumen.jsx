import React, { useState, useEffect } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { rutas } from "../path";
import axios from "axios";
import TextField from "@mui/material/TextField";
import DateRangePicker from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "./css/VisualizacionResumen.css";

import SendIcon from "@mui/icons-material/Send";
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
  const [value, setValue] = React.useState(["2021/11/20", "2021/12/01"]);
  const [data, setData] = useState();
  const [data1, setData1] = useState();
  const [data2, setData2] = useState();
  const [data3, setData3] = useState();

  const getStats = async () => {
    try {
      const res = await axios.get(rutas.DB_URL + "casos/info");

      setData1({
        labels: ["Casos positivos", "Casos negativos"],
        datasets: [
          {
            label: "# of Votes",
            data: [res.data.cantidad_positivos, res.data.cantidad_negativos],
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
      });
      setData2({
        labels: [
          "Tratamiento en casa",
          "Tratamiento en hospital",
          "En UCI",
          "Muertos",
        ],
        datasets: [
          {
            label: "# of Votes",
            data: [
              res.data.cantidad_casa,
              res.data.cantidad_hospital,
              res.data.cantidad_uci,
              res.data.cantidad_muertes,
            ],
            backgroundColor: [
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
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
      });
      setData3({
        labels: ["Infectados", "Muertos", "Curados"],
        datasets: [
          {
            label: "# of Votes",
            data: [
              res.data.cantidad_infectados,
              res.data.cantidad_muertos,
              res.data.cantidad_curados,
            ],
            backgroundColor: [
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
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
      });
    } catch (error) {
      console.log("Ha ocurrido un error");
    }

    try {
      const res = await axios.get(
        rutas.DB_URL + `casos&${value[0]}&${value[1]}`
      );
      setData({
        labels: res.data.fechas,
        datasets: [
          {
            label: "# Registros",
            data: res.data.totales,
            backgroundColor: ["rgba(255, 99, 132, 0.2)"],
            borderColor: ["rgba(255, 99, 132, 1)"],
            borderWidth: 1,
          },
          {
            label: "# Muertes",
            data: res.data.totales_muertes,
            backgroundColor: ["red"],
            borderColor: ["rgba(255, 99, 132, 1)"],
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.log("Ha ocurrido un error");
    }
  };
  useEffect(() => {
    getStats();
  }, [value]);

  return (
    <div className="MapaResumen">
      <div className="Bar margin-bottom">
        <h2 className="padding">Casos registrados y muertes registradas </h2>
        <div className="d-flex align-items-center ">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker
              startText="Fecha inical diagrama de barras"
              endText="Fecha final diagrama de barras"
              value={value}
              openTo="year"
              views={["year", "month", "day"]}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              inputFormat="yyyy/MM/dd"
              disableFuture
              renderInput={(startProps, endProps) => {
                return (
                  <React.Fragment>
                    <TextField {...startProps} />
                    <Box sx={{ mx: 2 }}> to </Box>
                    <TextField {...endProps} />
                  </React.Fragment>
                );
              }}
            />
          </LocalizationProvider>

          <div className="margin-left ">
            <Button
              variant="contained"
              className="margin-left"
              size="small"
              endIcon={<SendIcon />}
              onClick={() => {
                console.log(value);

                if (value[0] !== "2021/11/20") {
                  let dia = value[0].getDate();
                  let mes = value[0].getMonth() + 1;
                  let año = value[0].getFullYear();
                  dia = ("0" + dia).slice(-2);
                  mes = ("0" + mes).slice(-2);
                  let formato = `${año}/${mes}/${dia}`;
                  let dia1 = value[1].getDate();
                  let mes1 = value[1].getMonth() + 1;
                  let año1 = value[1].getFullYear();
                  dia1 = ("0" + dia1).slice(-2);
                  mes1 = ("0" + mes1).slice(-2);
                  let formato1 = `${año1}/${mes1}/${dia1}`;
                  console.log("formato");
                  console.log(formato);
                  console.log("formato1");
                  console.log(formato1);
                  setValue([formato, formato1]);
                } else {
                  console.log(value);
                }
              }}
            >
              seleccionar
            </Button>
          </div>
        </div>
        {data && (
          <Bar
            data={data}
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
        )}
      </div>
      <div className="Container-pie margin-top">
        <div className="Pie">
          <h3 className="paddings text-center">Resultados examenes</h3>
          {data1 && (
            <Doughnut
              data={data1}
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
          )}
        </div>

        <div className="Pie">
          <h3 className="paddings text-center">Estado infectados</h3>
          {data2 && <Doughnut data={data2} height={400} width={600} />}
        </div>
        <div className="Pie">
          <h3 className="paddings text-center">Casos totales</h3>
          {data3 && <Doughnut data={data3} height={400} width={600} />}
        </div>
      </div>
    </div>
  );
};

export default MapaResumen;
