import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { rutas } from "./path";

import Login from "./components/Login/Login";
import Navbar from "./components/Navbar";
import Unauthorized from "./components/views/unauthorized";

import UsuarioCreate from "./components/Admin/usuario.create";
import ListarUsuarios from "./components/Admin/usuario.lista";
import UsuarioUpdate from "./components/Admin/usuario.update";

import CasoCreate from "./components/Ayudante/caso.create";

import ProtectedRoute from "./components/Login/routes/ProtectedRoute";
import PublicRoute from "./components/Login/routes/PublicRoute";

import MapaResumen from "./components/VisualizacionResumen";
import MapaGeneral from "./components/VisualizacionGeneral";
import ModuloVisualizacion from "./components/VisualizacionBusqueda";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <PublicRoute exact path="/" component={MapaResumen} />
          <PublicRoute exact path={rutas.LOGIN} component={Login} />
          
          <ProtectedRoute exact path={rutas.AYUDANTE} component={CasoCreate} />

          <ProtectedRoute exact path={rutas.MEDICO} component={MapaGeneral} />
          <ProtectedRoute exact path={rutas.MEDICO_B} component={ModuloVisualizacion} />

          <ProtectedRoute exact path={rutas.ADMIN} component={ListarUsuarios} />
          <ProtectedRoute exact path={rutas.ADMIN_U} component={UsuarioUpdate} />
          <ProtectedRoute exact path={rutas.ADMIN_R} component={UsuarioCreate} />

          <PublicRoute exact path={rutas.UNAUTHORIZED} component={Unauthorized} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
