import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import AuthContext from "../provider/AuthContext";

export const axiosSecure = axios.create({
  baseURL: 'https://assignment-11-server-gules-three.vercel.app',
// baseURL: 'http://localhost:5000',
  withCredentials: true,
});

const useAxiosSecure=()=>{
    const {signOutUser}= useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(()=>{
        axiosSecure.interceptors.response.use(
            res=>{
                return res;
            },
           error=>{
                console.log('error from useAxiosSecure', error);
                if(error.response.status === 401 || error.response.status === 403){
                    // logout
                    signOutUser()
                    .then(res=>{
                        console.log('logout', res)
                        // navigate to login page
                    navigate('/login')
                    })
                    .catch(err=>{
                        console.log('error', err)
                    })
                    
                }
                return Promise.reject(error);
            });
    },[signOutUser, navigate])
    return axiosSecure;
}

export default useAxiosSecure;