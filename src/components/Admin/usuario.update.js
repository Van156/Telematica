import React, { useState, useEffect } from 'react';
import { rutas } from '../../path';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

const UsuarioUpdate = () => {

    useEffect(() => {
        getUsuarios();
    }, []);

    const [usuarios, setUsuarios] = useState([]);    

    const getUsuarios = async () => {
        try {
            const res = await axios.get(rutas.DB_URL + 'admin');
            setUsuarios(res.data);    
        } catch (error) {
            console.log("Ha ocurrido un error");
        }        
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);

        let post_url = rutas.DB_URL + `admin/${cedula}`;

        axios.put(post_url, { 
            rol: data.get('rol'), 
            password: data.get('password') 
        }).then((res) => {
            console.log(res);
            alert("Usuario actualizado exitosamente.");                       
        })
    }

    const [cedula, setCedula] = useState(0);
    const [rol, setRol] = useState(0);
    const [contraseña, setContraseña] = useState("");

    const selectUsuario = (e) => {
        const value = e.target.value;
        const user = JSON.parse(value);
        setCedula(user.cedula);
        setRol(user.rol);
        setContraseña(user.contraseña);
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
                        <h3 class="mb35">Modificar usuarios: </h3>
                        <form class="g-0" onSubmit={handleSubmit}>
                            <label for="rol" class="form-label align-left mt-2">Cédula de usuario:</label>
                            <select class="form-select" name="cedula" onChange={selectUsuario}> 
                                <option value={null}></option>                 
                                {
                                    usuarios.map((usario) => (
                                        <option value={JSON.stringify(usario)}>{usario.cedula}</option>
                                    ))                    
                                }
                            </select>
                            <div class="col-12">
                                <label for="rol" class="form-label align-left mt-2">Rol de usuario:</label>
                                <select class="form-select" value={rol} name="rol" onChange={(e) => {setRol(e.target.value)}}>         
                                    <option value={1}>Ayudante</option>
                                    <option value={2}>Médico</option>
                                    <option value={3}>Administrador</option>
                                </select>              
                            </div>
                            <div class="col-12 mt-2">
                                <label for="contraseña" class="form-label align-left">Contraseña:</label>
                                <input class="form-control" type="password" id="password" name="password" placeholder="Ingrese una contraseña..." required="true" value={contraseña} onChange={(e) => {setContraseña(e.target.value)}}/>
                            </div>
                            <button class="btn btn-success justify-self-between mt-3 mb-2">Modificar</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UsuarioUpdate;