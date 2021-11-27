import { createContext, useState, useCallback, useMemo } from "react";
import PropTypes from 'prop-types';
const CLIENT_ID = '819657394751-i8a1qcf8tede4ipuddop6jvtuogs94vh.apps.googleusercontent.com';

// Cookies for login authentication.
const LOGIN_ADMIN = 'LOGIN_ADMIN';
const LOGIN_AYUDANTE = 'LOGIN_AYUDANTE';
const LOGIN_MEDICO = 'LOGIN_MEDICO';

export const AuthContext = createContext();

export default function AuthContextProvider({children}) {    

    const [isAyudanteAuthenticated, setIsAyudanteAuthenticated] = useState(window.localStorage.getItem(LOGIN_AYUDANTE));
    const [isMedicoAuthenticated, setIsMedicoAuthenticated] = useState(window.localStorage.getItem(LOGIN_MEDICO));
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(window.localStorage.getItem(LOGIN_ADMIN));

    const loginAyudante = useCallback(() => {        
        setIsAyudanteAuthenticated(true);
        setIsMedicoAuthenticated(false);
        setIsAdminAuthenticated(false);
        window.localStorage.setItem(LOGIN_AYUDANTE, true);
        window.localStorage.setItem(LOGIN_MEDICO, false);
        window.localStorage.setItem(LOGIN_ADMIN, false);      
    }, []);

    const leginMedico = useCallback(() => {        
        setIsAyudanteAuthenticated(false);
        setIsMedicoAuthenticated(true);
        setIsAdminAuthenticated(false);
        window.localStorage.setItem(LOGIN_AYUDANTE, true);
        window.localStorage.setItem(LOGIN_MEDICO, true);
        window.localStorage.setItem(LOGIN_ADMIN, false);      
    }, []);

    const loginAdmin = useCallback(() => {        
        setIsAyudanteAuthenticated(false);
        setIsMedicoAuthenticated(false);
        setIsAdminAuthenticated(true);
        window.localStorage.setItem(LOGIN_AYUDANTE, true);
        window.localStorage.setItem(LOGIN_MEDICO, false);
        window.localStorage.setItem(LOGIN_ADMIN, true);      
    }, []);

    const logout = useCallback(() => {
        window.localStorage.setItem(LOGIN_AYUDANTE, false);
        window.localStorage.setItem(LOGIN_MEDICO, false);
        window.localStorage.setItem(LOGIN_ADMIN, false);
        setIsAyudanteAuthenticated(false);
        setIsMedicoAuthenticated(false);
        setIsAdminAuthenticated(false);
    }, []);

    const value = useMemo(() => ({
        isAyudanteAuthenticated,
        isMedicoAuthenticated,
        isAdminAuthenticated,
        loginAyudante,
        leginMedico,
        loginAdmin,
        logout
    }), [isAyudanteAuthenticated, isMedicoAuthenticated, isAdminAuthenticated, loginAyudante, leginMedico, loginAdmin, logout]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

AuthContextProvider.propTypes = {
    children: PropTypes.object
};