import React, { useContext } from 'react';
import { Navigate,  useLocation } from 'react-router-dom';
import LoadingSpinner from './../components/LoadingSpiner';
import AuthContext from '../provider/AuthContext';
const PrivateRoute = ({children}) => {
    const {user, loading}= useContext(AuthContext)
    const location = useLocation();
    // console.log(location);
    
    if(loading){
        // return <span className="loading loading-bars loading-lg"></span>
        return <LoadingSpinner/>
            
    }

    if(user?.email){
        return children;
    }
    return <Navigate to='/login' state={location.pathname}></Navigate>
};

export default PrivateRoute;