import React, { Fragment, useState } from "react";
import { FormControl, InputLabel, Input, FormHelperText, Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import styled from "styled-components";
import axios from 'axios';
import "../css/Login.css";
import { rutas } from "../../path";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (data, e) => {  
        const response = await axios.get(rutas.DB_URL + 'departamento'); 
    };

    const changePassword = (e) => {
        setPassword(e.target.value);
    }

    const changeUsername = (e) => {
        setUsername(e.target.value);
    }

    return (
        <>
        </>            
    );
};

export default Login;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px;
`;
