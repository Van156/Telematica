import React, { useEffect, useState } from "react";
import { rutas } from "../../path";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import Geocode from "react-geocode";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

var muertos = [];

const CasoCreate = () => {
    Geocode.setLanguage("es");
    Geocode.setApiKey("AIzaSyCajUA3mYzE7u9JhvqDXDUHJTG304p7R3I");
    Geocode.setRegion("co");
    Geocode.setLocationType("ROOFTOP");
    Geocode.enableDebug();

    useEffect(() => {
        getPacientesMuertos();
    }, []);

    const dir2latlng = (direccion) => {
        return new Promise(function (resolve, reject) {
            Geocode.fromAddress(direccion).then((response, error) => {
                if (error) {
                    console.error(error);
                }
                const { lat, lng } = response.results[0].geometry.location;
                resolve({
                    lat: lat,
                    lng: lng,
                });
            });
        });
    };

    const getPacientesMuertos = async () => {
        const response = await axios.get(rutas.DB_URL + "pacientes/muertos");
        muertos = response.data;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData(event.target);
        const post_url = rutas.DB_URL + "ayudante";
        const dir_residencia = `${data.get(
            "dir_residencia"
        )}, Barranquilla, Colombia.`;
        const dir_trabajo = `${data.get("dir_trabajo")}, Barranquilla, Colombia.`;

        let response = await dir2latlng(dir_residencia);
        const res_lat = response.lat;
        const res_lng = response.lng;

        response = await dir2latlng(dir_trabajo);
        const tra_lat = response.lat;
        const tra_lng = response.lng;

        console.log(muertos, parseInt(data.get("cedula")));

        if (!muertos.includes(parseInt(data.get("cedula")))) {
            axios
                .post(post_url, {
                    nombre: data.get("nombre"),
                    apellido: data.get("apellido"),
                    cedula: data.get("cedula"),
                    sexo: data.get("sexo"),
                    fecha_nacimiento: String(data.get("fecha_nacimiento")).replaceAll("-", "/"),
                    dir_residencia: dir_residencia,
                    res_lat: res_lat,
                    res_lng: res_lng,
                    dir_trabajo: dir_trabajo,
                    tra_lat: tra_lat,
                    tra_lng: tra_lng,
                    resultado: data.get("resultado"),
                    fecha_examen: String(data.get("fecha_examen")).replaceAll("-", "/"),
                    estado: data.get("estado"),
                })
                .then((res) => {
                    const info = res.data.message;
                    console.log(info);
                    if (info === "1") {
                        alert("Datos insertados exitosamente.");
                    } else {
                        alert("Ha ocurrido un error, intente nuevamente.");
                    }                    
                });
        } else {
            alert("El estado del paciente no puede ser actualizado porque falleció.");
        }
        getPacientesMuertos();
    };

    const [isPositivo, setIsPositivo] = useState(false);

    const handleChange = (e) => {
        if (e.target.value === "Positivo") {
            setIsPositivo(true);
        } else {
            setIsPositivo(false);
        }
    };

    const manejarFecha = (e) => {
        console.log(String(e.target.value).replaceAll("-", "/"));
    };

    const manejarFechaResultado = (e) => {
        console.log(String(e.target.value).replaceAll("-", "/"));
    };

    return (
        <>
            <div class="modal-dialog text-center mt-0 d-flex align-items-center">
                <div class="col-sm-12 main-section">
                    <div class="modal-content">
                        <div class="center-img">
                            <div class="user-img">
                                <img
                                    src="https://electronicssoftware.net/wp-content/uploads/user.png"
                                    class="img-icon"
                                    alt="icon"
                                />
                            </div>
                        </div>
                        <h3 class="mt-2 mb-4">Registro de casos: </h3>
                        <form class="row g-3 " onSubmit={handleSubmit}>
                            <div class="col-6 mt-2">
                                <label for="nombre" class="form-label align-left">
                                    Nombre:
                                </label>
                                <input
                                    class="form-control"
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    placeholder="Ingrese un nombre..."
                                    required="true"
                                />
                            </div>
                            <div class="col-6 mt-2">
                                <label for="apellido" class="form-label align-left">
                                    Apellido:
                                </label>
                                <input
                                    class="form-control"
                                    type="text"
                                    id="apellido"
                                    name="apellido"
                                    placeholder="Ingrese un apellido..."
                                />
                            </div>
                            <div class="col-6 mt-2">
                                <label for="cedula" class="form-label align-left">
                                    Cédula:
                                </label>
                                <input
                                    class="form-control"
                                    type="number"
                                    id="cedula"
                                    name="cedula"
                                    placeholder="Cédula de identificación..."
                                    required="true"
                                />
                            </div>
                            <div class="col-6 mt-2">
                                <label for="sexo" class="form-label align-left">
                                    Sexo:
                                </label>
                                <select class="form-select" name="sexo">
                                    <option value="Masculino">Masculino</option>
                                    <option value="Femenino">Femenino</option>
                                    <option value="Otro">Otro</option>
                                </select>
                            </div>
                            <div class="col-6 mt-4">
                                <TextField
                                    id="date"
                                    name="fecha_nacimiento"
                                    label="Fecha de nacimiento"
                                    type="date"
                                    defaultValue="2021-11-30"
                                    disableFuture
                                    mask="____/__/__"
                                    sx={{ width: 220 }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>
                            <div class="col-12 mt-2">
                                <label for="dir_residencia" class="form-label align-left">
                                    Dirección de residencia:
                                </label>
                                <input
                                    class="form-control"
                                    type="address"
                                    id="dir_residencia"
                                    name="dir_residencia"
                                    required="true"
                                />
                            </div>
                            <div class="col-12 mt-2">
                                <label for="dir_trabajo" class="form-label align-left">
                                    Dirección de trabajo:
                                </label>
                                <input
                                    class="form-control"
                                    type="address"
                                    id="dir_trabajo"
                                    name="dir_trabajo"
                                    required="true"
                                />
                            </div>
                            <div class="col-6 mt-2">
                                <label for="resultado" class="form-label align-left">
                                    Resultado
                                </label>
                                <select
                                    class="form-select"
                                    name="resultado"
                                    onChange={handleChange}
                                >
                                    <option value="Negativo">Negativo</option>
                                    <option value="Positivo">Positivo</option>
                                </select>
                            </div>
                            <div class="col-6 mt-4">
                                <TextField
                                    id="fecha_examen"
                                    name="fecha_examen"
                                    label="Fecha del examen"
                                    type="date"
                                    defaultValue="2021-11-30"
                                    disableFuture
                                    mask="____/__/__"
                                    onChange={manejarFechaResultado}
                                    sx={{ width: 220 }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>
                            {isPositivo ? (
                                <div class="col-12 mt-2">
                                    <label for="estado" class="form-label align-left">
                                        Estado del usuario:
                                    </label>
                                    <select class="form-select" name="estado">
                                        <option value="En tratamiento hospital">
                                            En tratamiento hospital
                                        </option>
                                        <option value="En UCI">En UCI</option>
                                        <option value="Curado">Curado</option>
                                        <option value="Muerte">Muerte</option>
                                    </select>
                                </div>
                            ) : (
                                <></>
                            )}
                            <button class="btn btn-success justify-self-between mt-3 mb-2">
                                Registrar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CasoCreate;
