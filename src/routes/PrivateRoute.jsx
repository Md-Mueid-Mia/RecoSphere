import React from 'react';
import AuthContext from '../context/AuthContext/Authcontext';
import { Navigate,  useLocation } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpiner';

const PrivateRoute = () => {
    const {user, loading}= useContext(AuthContext)
    const location = useLocation();
    console.log(location);
    
    if(loading){
        // return <span className="loading loading-bars loading-lg"></span>
        return <LoadingSpinner/>
            
    }

    if(user){
        return children;
    }
    return <Navigate to='/signin' state={location.pathname}></Navigate>
};

export default PrivateRoute;