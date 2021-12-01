import React from "react";
import "./css/Navbar.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import styled from "styled-components";
import useAuthContext from "./Login/auth/hooks/useAuthContext";
import { useHistory } from "react-router";
import { rutas } from "../path";

const Navbar = () => {

  const history = useHistory();

  function getBool(val) {
    return !!JSON.parse(String(val).toLowerCase());
  }

  let {
    isAyudanteAuthenticated,
    isMedicoAuthenticated,
    isAdminAuthenticated,
    logout,
  } = useAuthContext();

  isAyudanteAuthenticated = getBool(isAyudanteAuthenticated);
  isMedicoAuthenticated = getBool(isMedicoAuthenticated);
  isAdminAuthenticated = getBool(isAdminAuthenticated);

  let loginButton = null;
  let logoutButton = null;

  if (!isAyudanteAuthenticated && !isMedicoAuthenticated && !isAdminAuthenticated) {
    logoutButton = null;
    loginButton = (
      <>
        <button
          class="btn btn-outline-success my-2 my-sm-0 text-decoration-none"
          onClick={() => { history.push(rutas.LOGIN) }}
        >
          Login
        </button>
      </>
    );
  } else if (isAyudanteAuthenticated || isMedicoAuthenticated || isAdminAuthenticated) {
    loginButton = null;
    logoutButton = (
      <button
        class="btn btn-outline-danger my-2 my-sm-0 text-decoration-none"
        onClick={logout}
      >
        Logout
      </button>
    );
  }

  let tabs = null;

  if (isAdminAuthenticated) {
    tabs = <>
      <li class="nav-item dropdown list-style-none">
        <a class="nav-link dropdown-toggle" href={rutas.ADMIN} id="navbarDropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
        Administrador
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href={rutas.ADMIN}>Usuarios</a>
          <a class="dropdown-item" href={rutas.ADMIN_R}>Agregar Usuario</a>
          <a class="dropdown-item" href={rutas.ADMIN_U}>Modificar Usuario</a>
        </div>
      </li>  
      <li class="nav-item dropdown list-style-none">
        <a class="nav-link dropdown-toggle" href={rutas.ADMIN} id="navbarDropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
        Ayudante
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href={rutas.AYUDANTE_L}>Casos</a>
          <a class="dropdown-item" href={rutas.AYUDANTE}>Agregar Caso</a>
        </div>
      </li>  
      <li class="nav-item dropdown list-style-none">
        <a class="nav-link dropdown-toggle" href={rutas.ADMIN} id="navbarDropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
        Médico
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href={rutas.MEDICO}>Mapa General</a>
          <a class="dropdown-item" href={rutas.MEDICO_B}>Búsqueda</a>
        </div>
      </li>  
    </>
  } else if (isAyudanteAuthenticated) {
    tabs = <>
      <li class="nav-item dropdown list-style-none">
        <a class="nav-link dropdown-toggle" href={rutas.ADMIN} id="navbarDropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
        Ayudante
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href={rutas.AYUDANTE_L}>Casos</a>
          <a class="dropdown-item" href={rutas.AYUDANTE}>Agregar Caso</a>
        </div>
      </li>  
    </>
  } else if (isMedicoAuthenticated) {
    tabs = <>
      <li class="nav-item dropdown list-style-none">
        <a class="nav-link dropdown-toggle" href={rutas.ADMIN} id="navbarDropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
        Médico
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href={rutas.MEDICO}>Mapa General</a>
          <a class="dropdown-item" href={rutas.MEDICO_B}>Búsqueda</a>
        </div>
      </li>  
    </>
  }

  return (
    <Container>
      <Link className="text-decoration-none" to="/">
        <h1>Covid Tracker</h1>
      </Link>

      <Menu>
        {tabs}

      </Menu>
      <RightMenu>
        {loginButton}
        {logoutButton}
      </RightMenu>
    </Container>
  );
};

export default Navbar;

const Container = styled.div`
  min-height: 60px;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: rgb(0, 0, 0);
  color: white;
`;
const Menu = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: center;
  .link {
    font-weight: 600;
    text-transform: uppercase;
    padding: 0 10px;
    color: white;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;
const RightMenu = styled.div`
  display: flex;
  align-items: center;

  a {
    font-weight: 600;
    text-transform: uppercase;
    margin-right: 10px;
    color: white;
  }
`;
