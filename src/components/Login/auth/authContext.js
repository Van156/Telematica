import { createContext, useState, useCallback, useMemo } from "react";
import PropTypes from 'prop-types';

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

    const loginMedico = useCallback(() => {        
        setIsAyudanteAuthenticated(false);
        setIsMedicoAuthenticated(true);
        setIsAdminAuthenticated(false);
        window.localStorage.setItem(LOGIN_AYUDANTE, false);
        window.localStorage.setItem(LOGIN_MEDICO, true);
        window.localStorage.setItem(LOGIN_ADMIN, false);      
    }, []);

    const loginAdmin = useCallback(() => {        
        setIsAyudanteAuthenticated(false);
        setIsMedicoAuthenticated(false);
        setIsAdminAuthenticated(true);
        window.localStorage.setItem(LOGIN_AYUDANTE, false);
        window.localStorage.setItem(LOGIN_MEDICO, false);
        window.localStorage.setItem(LOGIN_ADMIN, true);      
    }, []);

    const logout = useCallback(() => {
        setIsAyudanteAuthenticated(false);
        setIsMedicoAuthenticated(false);
        setIsAdminAuthenticated(false);
        window.localStorage.setItem(LOGIN_AYUDANTE, false);
        window.localStorage.setItem(LOGIN_MEDICO, false);
        window.localStorage.setItem(LOGIN_ADMIN, false);
    }, []);

    const value = useMemo(() => ({
        isAyudanteAuthenticated,
        isMedicoAuthenticated,
        isAdminAuthenticated,
        loginAyudante,
        loginMedico,
        loginAdmin,
        logout
    }), [isAyudanteAuthenticated, isMedicoAuthenticated, isAdminAuthenticated, loginAyudante, loginMedico, loginAdmin, logout]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

AuthContextProvider.propTypes = {
    children: PropTypes.object
};