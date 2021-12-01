import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { rutas } from '../../../path';
import useAuthContext from '../auth/hooks/useAuthContext';

const ProtectedRoute = (props) => {

    function getBool(val) {
        return !!JSON.parse(String(val).toLowerCase());
    }

    let { isAyudanteAuthenticated, isMedicoAuthenticated, isAdminAuthenticated } = useAuthContext();

    const { path } = props;
    const admin_routes = [rutas.ADMIN, rutas.ADMIN_R, rutas.ADMIN_U];
    const ayudante_routes = [rutas.AYUDANTE];
    const medico_routes = [rutas.MEDICO, rutas.MEDICO_B];

    isAyudanteAuthenticated = getBool(isAyudanteAuthenticated);
    isMedicoAuthenticated = getBool(isMedicoAuthenticated);
    isAdminAuthenticated = getBool(isAdminAuthenticated);
    console.log(isAyudanteAuthenticated, isMedicoAuthenticated, isAdminAuthenticated);

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
    } else if (!isAyudanteAuthenticated && !isMedicoAuthenticated && isAdminAuthenticated) {
        console.log(3);
        return <Route {...props} />;
    }

    return <Redirect to={rutas.UNAUTHORIZED} />;

}

export default ProtectedRoute;