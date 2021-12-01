import React, { useState, useEffect } from "react";
import MapView from "./Map/Map";
import { rutas } from "../path";
import axios from "axios";
import style from "styled-components";
import "./css/VisualizacionGeneral.css";

const MapaGeneral = () => {

  const [data, setData] = useState("");
  const [dataTotal, setDataTotal] = useState();
  const getData = async () => {
    try {
      const res = await axios.get(rutas.DB_URL + "pacientes");
      setData(res.data);
      console.log(res.data);
      const negativo = res.data.filter((dato) => {
        return dato.color === "green";
      }).length;
      const positivoTratamiento = res.data.filter((dato) => {
        return dato.color === "yellow";
      }).length;
      const positivoUci = res.data.filter((dato) => {
        return dato.color === "orange";
      }).length;

      const positivoCurado = res.data.filter((dato) => {
        return dato.color === "pink";
      }).length;
      const PositivoMuerto = res.data.filter((dato) => {
        return dato.color === "red";
      }).length;
      const aux = [
        {
          total: `${negativo}`,
          tipo: "Negativo",
          color: "Verde",
        },
        {
          total: `${positivoTratamiento}`,
          tipo: "Positivo-En tratamiento",
          color: "Amarillo",
        },
        {
          total: `${positivoUci}`,
          tipo: "Positivo-En Uci",
          color: "Naranja",
        },
        {
          total: `${positivoCurado}`,
          tipo: "Positivo-Curado",
          color: "Rosado",
        },
        {
          total: `${PositivoMuerto}`,
          tipo: "Positivo-Muerto",
          color: "Rojo",
        },
      ];

      setDataTotal(aux);
    } catch (error) {
      console.log("Ha ocurrido un error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // const data = [
  //   {
  //     id: "12321321",
  //     residencia: [11.3764, -72.2455],
  //     trabajo: [11.3764, -72.2155],
  //     cedula: "1121526580",
  //     color: "green",
  //   },
  //   {
  //     id: "2213213213",
  //     residencia: [11.3464, -72.2465],
  //     trabajo: [11.37564, -72.2165],
  //     cedula: "1124044935",
  //     color: "yellow",
  //   },
  //   {
  //     id: "2312321321",
  //     residencia: [11.3764, -72.2485],
  //     trabajo: [11.3734, -72.2195],
  //     cedula: "84070302",
  //     color: "orange",
  //   },
  // ];

  return (
    <div className="visualizacionContainer center">
      <h1 className="text-center ">Mapa General</h1>
      <Container>
        <table class="table margin">
          <thead>
            <tr>
              <th scope="col">Cantidad</th>
              <th scope="col">Tipo</th>
              <th scope="col">Color</th>
            </tr>
          </thead>
          <tbody>
            {dataTotal &&
              dataTotal.map((stat, key) => {
                return (
                  <tr key={key}>
                    <th>{stat.total}</th>
                    <td>{stat.tipo}</td>
                    <td>{stat.color}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <MapView data={data} option={2} center={[10.96854, -74.78132]} />
      </Container>
    </div>
  );
};
const Container = style.div`
  display:flex;
  justify-content:space-evenly;
 
  padding:30px;
`;
export default MapaGeneral;
