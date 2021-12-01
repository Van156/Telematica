import React from "react";
import "./css/Navbar.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import styled from "styled-components";
import useAuthContext from "./Login/auth/hooks/useAuthContext";

const Navbar = () => {

  function getBool(val) {
    return !!JSON.parse(String(val).toLowerCase());
  }

  let { isAyudanteAuthenticated, isMedicoAuthenticated, isAdminAuthenticated, logout } = useAuthContext();

  isAyudanteAuthenticated = getBool(isAyudanteAuthenticated);
  isMedicoAuthenticated = getBool(isMedicoAuthenticated);
  isAdminAuthenticated = getBool(isAdminAuthenticated);

  let loginButton = null;
  let logoutButton = null;

  if (!isAyudanteAuthenticated && !isMedicoAuthenticated && !isAdminAuthenticated) {
    logoutButton = null;
    loginButton = <>
        <Link to="/Login">
          <Button variant="contained" color="primary">
            Login
          </Button>
        </Link>
    </>
  } else if (isAyudanteAuthenticated || isMedicoAuthenticated || isAdminAuthenticated) {
    loginButton = null;
    logoutButton = <button class="btn btn-outline-danger my-2 my-sm-0" onClick={logout}>Logout</button>;
  }

  return (
    <Container>
      <Link to="/">
        <h1>Covid Tracker</h1>
      </Link>

      <Menu>
        <Link className="link" to="/ModuloAdministracion">
          Administracion
        </Link>
        <Link className="link" to="/ModuloRegistroCaso">
          Registro Caso
        </Link>
        <Link className="link" to="/ModuloGestionarCaso">
          Gestionar Caso
        </Link>
        <Link className="link" to="/ModuloVisualizacion">
          Visualizacion
        </Link>
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

