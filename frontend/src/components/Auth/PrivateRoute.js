import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

//simple security component

const PrivateRoute = ({ element: Component}) => {
    const { user } = useUser();
    //checks if user is logged in, if not navigate to login in page
    return user ? <Component /> : <Navigate to="/" />;
};

export default PrivateRoute;