import React, { useState, useEffect } from "react";
import MapView from "./Map/Map";
import SearchIcon from "@mui/icons-material/Search";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import "./css/VisualizacionBusqueda.css";
import { rutas } from "../path";
import axios from "axios";
import style from "styled-components";
import { animateScroll as scroll } from "react-scroll";
import _ from "lodash";
const pageSize = 8;

const ModuloVisualizacion = () => {
  const [location, setLocation] = useState();
  const [data, setData] = useState();
  const [estados, setEstados] = useState();
  const [paginatedData, setPaginatedData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCounts, setPageCounts] = useState();
  const [center, setCenter] = useState();

  const getData = async () => {
    try {
      const res = await axios.get(rutas.DB_URL + "casos");
      console.log("data res");
      console.log(res);
      console.log("data res fin");
      setData(res.data.casos);
      setPaginatedData(_(res.data.casos).slice(0).take(pageSize).value(0));
      setPageCounts(Math.ceil(res.data.casos.length / pageSize));
    } catch (error) {
      console.log("Ha ocurrido un error");
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const [busqueda, setBusqueda] = useState("");
  const changeHandle = (e) => {
    setBusqueda(e.target.value);
  };
  const [valueSelect, setValueSelect] = useState("");

  const handleSelect = (e) => {
    setValueSelect(e.target.value);
  };
  const getCasoData = async (cedula) => {
    try {
      const res = await axios.get(
        rutas.DB_URL + `/pacientes/${cedula}/direcciones`
      );

      setLocation(res.data);
      console.log("Center");
      setCenter([
        (res.data.residencia[0] + res.data.trabajo[0]) / 2,
        (res.data.residencia[1] + res.data.trabajo[1]) / 2,
      ]);
      console.log(center);
      console.log("center");
    } catch (error) {
      console.log("Ha ocurrido un error");
    }
  };

  const getEstado = async (cedula) => {
    try {
      const res = await axios.get(rutas.DB_URL + `pacientes/${cedula}/estados`);
      console.log(res.data);
      setEstados(res.data);
    } catch (error) {
      console.log("Ha ocurrido un error");
    }
  };

  const setCaso = (cedula) => {
    getCasoData(cedula);
    getEstado(cedula);
    scroll.scrollToBottom();
  };

  const pages = _.range(1, pageCounts + 1);

  const pagination = (page) => {
    setCurrentPage(page);
    const startIndex = (page - 1) * pageSize;
    let dataFilter = [];
    if (data !== undefined) {
      dataFilter = data.filter((caso) => {
        if (busqueda === "") {
          return { data };
        } else if (
          (caso.cedula.toString().includes(busqueda.toString()) ||
            caso.id.toString().includes(busqueda.toString())) &&
          valueSelect === "3"
        ) {
          return caso;
        } else if (
          caso.cedula.toString().includes(busqueda.toString()) &&
          valueSelect === "1"
        ) {
          return caso;
        } else if (
          caso.id.toString().includes(busqueda.toString()) &&
          valueSelect === "2"
        ) {
          return caso;
        }
      });
    }
    let paginatedCurrent = _(dataFilter)
      .slice(startIndex)
      .take(pageSize)
      .value(0);
    setPaginatedData(paginatedCurrent);
  };
  return (
    <div className="visualizacionContainer navbar-top">
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
              Buscar por ...
            </option>
            <option value="1">Cedula</option>
            <option value="2">Id de Caso</option>
            <option value="3">Cedula y Id de Caso</option>
          </select>
        </div>
        <SearchIcon className="search-icon" />
      </div>
      <nav className="d-flex justify-content-center">
        <ul className="pagination">
          {pages &&
            pages.map((page) => (
              <li
                className={
                  page === currentPage ? "page-item active" : "page-item"
                }
              >
                <p className="page-link" onClick={() => pagination(page)}>
                  {page}
                </p>
              </li>
            ))}
        </ul>
      </nav>
      <div>
        <div>
          <table class="table table-bordered ">
            <thead>
              <tr>
                <th>Id Caso</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Cedula</th>
                <th>Sexo</th>
                <th>Fecha de nacimiento</th>
                <th>Dirección Residencia</th>
                <th>Dirección Trabajo</th>
                <th>Resultado Examen</th>
                <th>Fecha examen</th>
                <th>Accion</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData &&
                paginatedData
                  .filter((caso) => {
                    if (busqueda === "") {
                      return { data };
                    } else if (
                      (caso.cedula.toString().includes(busqueda.toString()) ||
                        caso.id.toString().includes(busqueda.toString())) &&
                      valueSelect === "3"
                    ) {
                      return caso;
                    } else if (
                      caso.cedula.toString().includes(busqueda.toString()) &&
                      valueSelect === "1"
                    ) {
                      return caso;
                    } else if (
                      caso.id.toString().includes(busqueda.toString()) &&
                      valueSelect === "2"
                    ) {
                      return caso;
                    }
                  })
                  .map((caso, key) => (
                    <tr key={key}>
                      <td>{caso.id}</td>
                      <td>{caso.nombre}</td>
                      <td>{caso.apellido}</td>
                      <td>{caso.cedula}</td>
                      <td>{caso.sexo}</td>
                      <td>{caso.fecha_nacimiento}</td>
                      <td>{caso.dir_residencia}</td>
                      <td>{caso.dir_trabajo}</td>
                      <td>{caso.resultado}</td>
                      <td>{caso.fecha_examen}</td>
                      <td>
                        <button
                          className="btn btn-success"
                          onClick={() => setCaso(caso.cedula)}
                        >
                          <PersonSearchIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
        <nav className="d-flex justify-content-center">
          <ul className="pagination">
            {pages &&
              pages.map((page) => (
                <li
                  className={
                    page === currentPage ? "page-item active" : "page-item"
                  }
                >
                  <p className="page-link" onClick={() => pagination(page)}>
                    {page}
                  </p>
                </li>
              ))}
          </ul>
        </nav>
      </div>

      <Container>
        <MapView data={location} center={center} option={1} />

        <div>
          {estados && estados[0].resultado === "Positivo" && (
            <table class="table margin">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Fecha Actualización</th>
                  <th scope="col">Estado</th>
                </tr>
              </thead>
              <tbody>
                {estados.map((estado, key) => {
                  return (
                    <tr key={key}>
                      <th>{key}</th>
                      <td>{estado.fecha_modificacion}</td>
                      <td>{estado.estado}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </Container>
    </div>
  );
};

const Container = style.div`
  display:flex;
  justify-content:space-evenly;
  padding:30px;
`;

export default ModuloVisualizacion;
