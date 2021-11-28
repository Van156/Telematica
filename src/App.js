import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ModuloAdministracion from "./components/ModuloAdministracion";
import ModuloGestionarCaso from "./components/ModuloGestionarCaso";
import ModuloVisualizacion from "./components/ModuloVisualizacion";
import ModuloRegistroCaso from "./components/ModuloRegistroCaso";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar";
import MapView from "./components/Map/Map";
import MapaGeneral from "./components/MapaGeneral";
import MapaResumen from "./components/MapaResumen";
import PruebaApi from "./components/PruebaApi";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route
            path="/ModuloAdministracion"
            element={<ModuloAdministracion />}
          />
          <Route
            path="/ModuloGestionarCaso"
            element={<ModuloGestionarCaso />}
          />
          <Route path="/ModuloRegistroCaso" element={<ModuloRegistroCaso />} />
          <Route
            path="/ModuloVisualizacion"
            element={<ModuloVisualizacion />}
          />
          <Route
            path="/ModuloVisualizacion/MapaGeneral"
            element={<MapaGeneral />}
          />
          <Route
            path="/ModuloVisualizacion/MapaResumen"
            element={<MapaResumen />}
          />
          <Route path="/mapa" element={<PruebaApi />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
