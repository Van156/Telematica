import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { rutas } from '../../path';

const ListarUsuarios = () => {

    const [usuarios, setUsuarios] = useState([]);

    // Funciones que se ejecutan al cargar la página.
    useEffect(() => {
        getUsuarios(); // Obtener usuarios de la db.
    }, []);    

    const history = useHistory(); // Historial del navegador.

    // Obtener dptos de la db.
    const getUsuarios = async () => {
        try {
            const res = await axios.get(rutas.DB_URL + 'admin');
            setUsuarios(res.data);    
        } catch (error) {
            console.log("Ha ocurrido un error");
        }        
    }

    const deleteUsuario = (id) => {
        let url = rutas.DB_URL + `admin/${id}`;
        
        axios.delete(url, {}).then(() => {
            setUsuarios(usuarios.filter(usuario => usuario.id !== id));
            alert("Usuario eliminado exitosamente.");            
        })
    }

    return (
        <div class="col-sm-10 offset-sm-1 p-4 rounded navbar-top">                
                <h2 class="mg-l text-left mb-2">Usuarios:</h2> 
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                    <th scope="col">Identificación</th>
                    <th scope="col">Usuario</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">Cédula</th>
                    <th scope="col">Rol</th>
                    <th scope="col">Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    { 
                        usuarios.map((usuario) => (                                
                            <tr>
                                <td>{usuario.id}</td>
                                <td>{usuario.usuario}</td>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.apellido}</td>
                                <td>{usuario.cedula}</td>
                                <td>{usuario.rol}</td>
                                <td>
                                    <button className="btn btn-warning btn-form " data-bs-toggle="modal" data-bs-target="#editarProducto" onClick={() => { history.push(rutas.ADMIN_U) }}><FontAwesomeIcon icon={faEdit} /></button>
                                    {"   "}
                                    <button className="btn btn-danger" onClick={() => { deleteUsuario(usuario.id) }}><FontAwesomeIcon icon={faTrashAlt} /></button>
                                </td>
                            </tr>
                        )) 
                    }
                </tbody>
            </table>
        </div>
    );
}

export default ListarUsuarios;