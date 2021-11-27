
import { useContext } from "react";
import { AuthContext } from "../../auth/authContext";

export default function useAuthContext() {
    return useContext(AuthContext);
};