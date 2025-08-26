 import React from "react";
 import { Navigate, Outlet} from 'react-router-dom';

    const PrivateRoutes = ({isLoggedIn}: {isLoggedIn: boolean}) => {
   
      return isLoggedIn ? <Outlet /> : <Navigate to="/"/>;
    };

    export default PrivateRoutes;