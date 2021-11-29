import React from "react";
import { Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import axios from 'axios';
import "../css/Login.css";
import { rutas } from "../../path";
import { useHistory } from 'react-router';
import useAuthContext from './auth/hooks/useAuthContext';

const Login = () => {

    const history = useHistory();
    const { loginAyudante, loginMedico, loginAdmin, logout } = useAuthContext();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);

        const username = data.get('username');

        let URL = rutas.DB_URL + `admin/${username}`;

        console.log(URL);
        // Actualizar cuerpo del post.
        axios.get(URL).then((res) => {
            const info = res.data;
            if (info.length > 0) {
                if (data.get('password') === info[0].contraseña) {
                    switch (info[0].rol) {
                        case 1:
                            loginAyudante();
                            alert("Ayudante conectado.");
                            history.push(rutas.AYUDANTE);
                            break;
                        case 2:
                            loginMedico();
                            alert("Médico conectado.");
                            history.push(rutas.MEDICO);
                            break;
                        case 3:
                            loginAdmin();
                            history.push(rutas.ADMIN);
                            break;
                        default:
                            logout();
                            break;
                    }
                } else {
                    alert("Contraseña incorrecta."); 
                }
            } else {
                alert("No se encuentra registrado.");   
            }                     
        });
    }

    return (
        <>
            <div className="bgimage">
                <div className="container centrar ">
                    <div className="background">
                        <div id="user-image">
                            <img
                                src="https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-3-avatar-2754579_120516.png"
                                alt="F "
                            />
                        </div>

                        <form onSubmit={handleSubmit} className="formularios">
                            <div className="inputWithIcon">
                                <PersonIcon className="icon" />
                                <input
                                    type="text"
                                    placeholder="Nombre de usuario"
                                    name="username"
                                />
                            </div>
                            <div className="inputWithIcon">
                                <LockIcon className="icon" />
                                <input
                                    type="Password"
                                    placeholder="Contraseña"
                                    name="password"
                                />
                            </div>
                            <div className="btcentrar">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    endIcon={<ArrowForwardIcon />}
                                >
                                    Iniciar
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
