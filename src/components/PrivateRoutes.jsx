// First version
import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./contexts/AuthContext"

const PrivateRoutes = () => {
    const { user } = useAuth()
    user?console.log("User is not null"):console.log("User is null and will be rerouted")
    return user?<Outlet />: <Navigate to="/mypsr/login" />
}

export default PrivateRoutes