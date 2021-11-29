import React, { useEffect, useState } from 'react';
import { rutas } from '../../path';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

const UsuarioCreate = () => {

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);

        let post_url = rutas.DB_URL + 'admin';

        axios.post(post_url, {
            nombre: data.get('nombre'),
            apellido: data.get('apellido'), 
            cedula: data.get('cedula'), 
            rol: data.get('rol'), 
            usuario: data.get('usuario'), 
            contraseña: data.get('contraseña') 
        }).then((res) => {
            const info = res;
            console.log(res)
            if (info === "0") {
                alert("El usuario ya existe.");
            } else {
                alert("Datos insertados exitosamente.");
            }                        
        })
    }

    return (
        <>
            <div class="modal-dialog text-center mt-0">
                <div class="col-sm-10 main-section">
                    <div class="modal-content">
                        <div class="center-img">
                            <div class="user-img">
                                <img src="https://electronicssoftware.net/wp-content/uploads/user.png" class="img-icon" alt="icon" />
                            </div>
                        </div>
                        <h3 class="mb35">Registro de usuarios: </h3>
                        <form class="g-0" onSubmit={handleSubmit}>
                            <div class="col-12">
                                <label for="rol" class="form-label align-left">Rol de usuario:</label>
                                <select class="form-select" name="rol">         
                                    <option value={1}>Ayudante</option>
                                    <option value={2}>Médico</option>
                                    <option value={3}>Administrador</option>
                                </select>              
                            </div>
                            <div class="col-12 mt-2">
                                <label for="nombre" class="form-label align-left">Nombre:</label>
                                <input class="form-control" type="text" id="nombre" name="nombre" placeholder="Ingrese un nombre..." />
                            </div>
                            <div class="col-12 mt-2">
                                <label for="apellido" class="form-label align-left">Apellido:</label>
                                <input class="form-control" type="text" id="apellido" name="apellido" placeholder="Ingrese un apellido..." />
                            </div>
                            <div class="col-12 mt-2">
                                <label for="cedula" class="form-label align-left">Cédula:</label>
                                <input class="form-control" type="number" id="cedula" name="cedula" placeholder="Cédula de identificación..." />
                            </div>
                            <div class="col-12 mt-2">
                                <label for="usuario" class="form-label align-left">Nombre de usuario:</label>
                                <input class="form-control" type="text" id="usuario" name="usuario" placeholder="Ingrese un nombre de usuario..." />
                            </div>
                            <div class="col-12 mt-2">
                                <label for="contraseña" class="form-label align-left">Contraseña:</label>
                                <input class="form-control" type="password" id="contraseña" name="contraseña" placeholder="Ingrese una contraseña..." />
                            </div>
                            <button class="btn btn-success justify-self-between mt-3 mb-2">Registrar</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UsuarioCreate;