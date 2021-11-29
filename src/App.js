import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ModuloAdministracion from "./components/ModuloAdministracion";
import ModuloGestionarCaso from "./components/ModuloGestionarCaso";
import ModuloVisualizacion from "./components/ModuloVisualizacion";
import ModuloRegistroCaso from "./components/ModuloRegistroCaso";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar";
import MapaGeneral from "./components/MapaGeneral";
import MapaResumen from "./components/MapaResumen";
import PruebaApi from "./components/PruebaApi";
import { rutas } from "./path";

import UsuarioCreate from "./components/Admin/registrar";
import ListarUsuarios from "./components/Admin/list";

import ProtectedRoute from "./components/Login/routes/ProtectedRoute";
import PublicRoute from "./components/Login/routes/PublicRoute";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <PublicRoute exact path="/" component={MapaResumen} />
          <PublicRoute exact path={rutas.LOGIN} component={Login} />
          <ProtectedRoute exact path={rutas.AYUDANTE} component={MapaGeneral} />
          <ProtectedRoute exact path={rutas.MEDICO} component={MapaGeneral} />
          <ProtectedRoute exact path={rutas.ADMIN} component={ListarUsuarios} />
          <ProtectedRoute exact path={rutas.ADMIN_R} component={UsuarioCreate} />
          <PublicRoute exact path={rutas.UNAUTHORIZED} component={ModuloVisualizacion} />
          <PublicRoute exact path="/ModuloGestionarCaso" component={ModuloVisualizacion} />
          <Route exact path="/ModuloVisualizacion" component={ModuloVisualizacion} />
          <Route exact path="/ModuloVisualizacion/MapaGeneral" component={MapaGeneral} />
          <Route exact path="/mapa" component={PruebaApi} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
