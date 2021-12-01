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


  return (
    <div className="visualizacionContainer center navbar-top">
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
