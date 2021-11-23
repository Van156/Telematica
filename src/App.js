import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';

import ModuloAdministracion from './components/ModuloAdministracion';
import ModuloGestionarCaso from './components/ModuloGestionarCaso';
import ModuloVisualizacion from './components/ModuloVisualizacion';
import ModuloRegistroCaso from './components/ModuloRegistroCaso';
import Login from './components/Login';
import Navbar from './components/Navbar';

function App() {
  return (
    <div >
      <Router >
        <Navbar/>
        <Routes>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/ModuloAdministracion'  element={<ModuloAdministracion/>}/>
          <Route path='/ModuloGestionarCaso' element={<ModuloGestionarCaso/>} />
          <Route path='/ModuloRegistroCaso' element={<ModuloRegistroCaso/>} />
          <Route path='/ModuloVisualizacion' element={<ModuloVisualizacion/>} />
        </Routes>

      </Router>
    </div>
  );
}

export default App;
