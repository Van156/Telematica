import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import "../css/VisualizacionBusqueda.css";
import { rutas } from "../../path";
import axios from "axios";
import style from "styled-components";
import { animateScroll as scroll } from "react-scroll";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
const pageSize = 8;

const CasoLista = () => {
  const [data, setData] = useState();
  const [estados, setEstados] = useState();
  const [paginatedData, setPaginatedData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCounts, setPageCounts] = useState();
  const [currentEstado, setCurrentEstado] = useState();

  const getData = async () => {
    try {
      const res = await axios.get(rutas.DB_URL + "casos");

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
  const [isPositivo, setIsPositivo] = useState(false);
  const [cedula, setCedula] = useState("");

  const handleSelect = (e) => {
    setValueSelect(e.target.value);
  };
  const getCasoData = async (cedula) => {
    try {
      const res = await axios.get(
        rutas.DB_URL + `/pacientes/${cedula}/direcciones`
      );
    } catch (error) {
      console.log("Ha ocurrido un error");
    }
  };

  const getEstado = async (cedula) => {
    try {
      const res = await axios.get(rutas.DB_URL + `pacientes/${cedula}/estados`);
      console.log(res.data);
      setEstados(res.data);
      if (res.data.length > 0) {
        setCurrentEstado(res.data[res.data.length - 1].estado);
      }
    } catch (error) {
      console.log("Ha ocurrido un error");
    }
  };

  const usuarioUpdateEstado = async (event) => {
    const data = new FormData(event.target);
    const post_url = rutas.DB_URL + "ayudante";

    axios
      .post(post_url, {
        nombre: estados[0].nombre,
        apellido: estados[0].apellido,
        cedula: estados[0].cedula,
        sexo: estados[0].sexo,
        fecha_nacimiento: estados[0].fecha_nacimiento,
        dir_residencia: estados[0].dir_residencia,
        res_lat: estados[0].res_lat,
        res_lng: estados[0].res_lng,
        dir_trabajo: estados[0].dir_trabajo,
        tra_lat: estados[0].tra_lat,
        tra_lng: estados[0].tra_lng,
        resultado: estados[0].resultado,
        fecha_examen: estados[0].fecha_examen,
        estado: data.get("estado"),
      })
      .then((res) => {
        const info = res.data.message;
        if (info === "1") {
          alert("Usuario actualizado exitosamente.");
        } else {
          alert("Ha ocurrido un error, intente nuevamente.");
        }
      });
  };

  const deleteCaso = (id) => {
    let url = rutas.DB_URL + `ayudante/${id}`;

    axios.delete(url, {}).then(() => {
      setPaginatedData(paginatedData.filter((caso) => caso.id !== id));
      alert("Caso eliminado exitosamente.");
    });
  };

  const setCaso = (cedula) => {
    getCasoData(cedula);
    getEstado(cedula);
    setCedula(cedula);
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
              Buscar por...
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
                <th>Opciones</th>
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
                          className="btn btn-danger"
                          onClick={() => {
                            deleteCaso(caso.cedula);
                          }}
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                        {"   "}
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
        <div>
          {estados && estados[0].resultado === "Positivo" && (
            <div>
              {estados[estados.length - 1].estado === "Muerte" ? (
                <></>
              ) : (
                <div class="col-12 mt-2">
                  <label for="estado" class="form-label align-left">
                    Estado del usuario:
                  </label>
                  <form class="row g-3 " onSubmit={usuarioUpdateEstado}>
                    <select class="form-select" name="estado">
                      <option value="En tratamiento en casa">
                        En tratamiento en casa
                      </option>
                      <option value="En tratamiento hospital">
                        En tratamiento hospital
                      </option>
                      <option value="En UCI">En UCI</option>
                      <option value="Curado">Curado</option>
                      <option value="Muerte">Muerte</option>
                    </select>
                    <button class="btn btn-success justify-self-between mt-3 mb-2">
                      Actualizar estado
                    </button>
                  </form>
                </div>
              )}

              <div>
                <h3>Cedula: {cedula}</h3>
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
                          <th>{key + 1}</th>
                          <td>{estado.fecha_modificacion}</td>
                          <td>{estado.estado}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
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

export default CasoLista;
