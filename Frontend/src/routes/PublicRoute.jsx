import { Navigate, Outlet, useLocation } from "react-router"
import storeAuth from "../context/storeAuth"


const PublicRoute = () => {

    // Obtengo el token
    const token = storeAuth((state) => state.token)
    const location = useLocation();
    const isResetPassword = location.pathname.includes("restore-password");

    if(token && !isResetPassword){
        return <Navigate to="/dashboard" />
    }
    
    // Verifico el token
    // Si existe el token, continua navengando al dashboard. Si no. al Outlet
    return <Outlet />
}

export default PublicRoute