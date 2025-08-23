 import React, { useEffect } from "react";
 import { Navigate, Outlet} from 'react-router-dom';

    const PrivateRoutes = () => {

    // const navigate = useNavigate();

    let isAuthenticated = true; // Example: check if user is logged in

      return isAuthenticated ? <Outlet /> : <Navigate to="/"/>;
    };

    export default PrivateRoutes;