import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';

import ModuloAdministracion from './components/ModuloAdministracion';
import ModuloGestionarCaso from './components/ModuloGestionarCaso';
import ModuloVisualizacion from './components/ModuloVisualizacion';
import ModuloRegistroCaso from './components/ModuloRegistroCaso';


function App() {
  return (
    <div >
      <Router >

        <Routes>
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
