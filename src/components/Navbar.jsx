import React, { useState, useEffect } from "react";
import "./css/Navbar.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";

const Navbar = () => {
  const [burgerStatus, setBurgerStatus] = useState(false);

  return (
    <Container>
      {/* <img src="/images/logo.svg" alt="No te tocaba mani" />   */}
      <Link to="/">
        <h1>BJT</h1>
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
        <a href="#">Shop</a>
        <Link to="/Login">
          <Button variant="contained" color="primary">
            Login
          </Button>
        </Link>

        <CustomMenu onClick={() => setBurgerStatus(true)} />
      </RightMenu>
      <BurgerNav show={burgerStatus}>
        <CustomWrapper>
          <CustomClose onClick={() => setBurgerStatus(false)} />
        </CustomWrapper>

        <li>
          <a href="#">Existing inventory</a>
        </li>
        <li>
          <a href="#">Tesla S</a>
        </li>
        <li>
          <a href="#">Tesla S</a>
        </li>
        <li>
          <a href="#">Tesla S</a>
        </li>
      </BurgerNav>
    </Container>
  );
};

export default Navbar;

// <Link
//                   to='/sign-up'
//                   className='nav-links-mobile'
//                   onClick={closeMobileMenu}
//                 >
//                   Sign Up
//                 </Link>

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
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.7);
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
const CustomMenu = styled(MenuIcon)`
  cursor: pointer;
`;
const BurgerNav = styled.div`
    position:fixed;
    top:0;
    right:0;
    bottom:0;
    background-color:white;
    width:300px;
    z-index:1
    display:flex;
    flex-direction:column;
    list-style:none;
    padding:20px;
    text-align:start;
    transform:${(props) => (props.show ? "translateX(0)" : "translateX(100%)")};
    li {
        padding: 15px 0;
        border-bottom: 1px solid rgba(0, 0, 0, .2);
           a{
               font-weight:600;
           }
      }
`;

const CustomClose = styled(CloseIcon)`
  cursor: pointer;
  color: black;
`;
const CustomWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
