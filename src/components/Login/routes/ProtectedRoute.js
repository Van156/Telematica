import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { rutas } from '../../../path';
import useAuthContext from '../auth/hooks/useAuthContext';

const ProtectedRoute = (props) => {

    function getBool(val) {
        return !!JSON.parse(String(val).toLowerCase());
    }

    let { isAyudanteAuthenticated, isMedicoAuthenticated, isAdminAuthenticated } = useAuthContext();

    isAyudanteAuthenticated = getBool(isAyudanteAuthenticated);
    isMedicoAuthenticated = getBool(isMedicoAuthenticated);
    isAdminAuthenticated = getBool(isAdminAuthenticated);

    const {path} = props;
  
    const admin_routes = [];
    const ayudante_routes = [];
    const medico_routes = [];

    console.log(isAyudanteAuthenticated, isMedicoAuthenticated, isAdminAuthenticated)

    if (!isAyudanteAuthenticated && !isMedicoAuthenticated && !isAdminAuthenticated) {
        console.log(0);
        return <Redirect to={rutas.UNAUTHORIZED} />;
    } else if (isAyudanteAuthenticated && !isMedicoAuthenticated && !isAdminAuthenticated) {
        console.log(1);
        if (admin_routes.includes(path)) {
            return <Redirect to={rutas.UNAUTHORIZED} />;
        } else if (medico_routes.includes(path)) {
            return <Redirect to={rutas.UNAUTHORIZED} />;
        }
        return <Route {...props} />;  
    } else if (!isAyudanteAuthenticated && isMedicoAuthenticated && !isAdminAuthenticated) {
        console.log(2);
        if (admin_routes.includes(path)) {
            return <Redirect to={rutas.UNAUTHORIZED} />;
        } else if (ayudante_routes.includes(path)) {
            return <Redirect to={rutas.UNAUTHORIZED} />;
        }
        return <Route {...props} />;  
    }

    console.log(3);
    return <Route {...props} />;
}

export default ProtectedRoute;