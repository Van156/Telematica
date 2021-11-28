import React, { useState } from "react";
import MapView from "./Map/Map";
import SearchIcon from "@mui/icons-material/Search";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import "./css/ModuloVisualizacion.css";
const ModuloVisualizacion = () => {
  const [location, setLocation] = useState();
  const data = [
    {
      id: "12321321",
      residencia: [11.3764, -72.2455],
      trabajo: [11.3764, -72.2155],
      cedula: "1121526580",
    },
    {
      id: "2213213213",
      residencia: [11.3464, -72.2465],
      trabajo: [11.37564, -72.2165],
      cedula: "1124044935",
    },
    {
      id: "2312321321",
      residencia: [11.3764, -72.2485],
      trabajo: [11.3734, -72.2195],
      cedula: "84070302",
    },
  ];
  const [busqueda, setBusqueda] = useState("");
  const changeHandle = (e) => {
    setBusqueda(e.target.value);
  };
  const [valueSelect, setValueSelect] = useState("");

  const handleSelect = (e) => {
    setValueSelect(e.target.value);
  };
  return (
    <div className="visualizacionContainer">
      <div className="search">
        <input
          type="text"
          value={busqueda}
          aria-label="Search"
          onChange={changeHandle}
          placeholder="Buscar Caso"
        />
        <div className="selectContainer">
          <select
            name="type-search"
            className="type-search"
            id="type-search"
            onChange={handleSelect}
          >
            <option selected disabled>
              Buscar por...
            </option>
            <option value="1">Cedula</option>
            <option value="2">Id de Caso</option>
            <option value="3">Cedula y Id de Caso</option>
          </select>
        </div>
        <SearchIcon className="search-icon" />
      </div>
      <table class="table table-bordered tabla-casos ">
        <thead>
          <tr>
            <th scope="col">Id Caso</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Cedula</th>
            <th scope="col">Sexo</th>
            <th scope="col">Fecha de nacimiento</th>
            <th scope="col">Dirección Residencia</th>
            <th scope="col">Dirección Trabajo</th>
            <th scope="col">Resultado Examen</th>
            <th scope="col">Fecha examen</th>
            <th scope="col">Accion</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data
              .filter((caso) => {
                if (busqueda === "") {
                  return { data };
                } else if (
                  (caso.cedula.toLowerCase().includes(busqueda.toLowerCase()) ||
                    caso.id.toLowerCase().includes(busqueda.toLowerCase())) &&
                  valueSelect === "3"
                ) {
                  return caso;
                } else if (
                  caso.cedula.toLowerCase().includes(busqueda.toLowerCase()) &&
                  valueSelect === "1"
                ) {
                  return caso;
                } else if (
                  caso.id.toLowerCase().includes(busqueda.toLowerCase()) &&
                  valueSelect === "2"
                ) {
                  return caso;
                }
              })
              .map((caso) => {
                return (
                  <tr key={caso.id}>
                    <td>{caso.id}</td>
                    <td>{caso.cedula}</td>
                    <td>
                      {new Intl.NumberFormat("es-ES").format(caso.cedula)}
                    </td>
                    <td>{caso.cedula}</td>
                    <td>r</td>r<td>r</td>
                    <td>r</td>
                    <td>r</td>
                    <td>r</td>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={() => setLocation([caso])}
                      >
                        <PersonSearchIcon />
                      </button>
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>

      <MapView data={location} option={1} />
    </div>
  );
};

export default ModuloVisualizacion;
