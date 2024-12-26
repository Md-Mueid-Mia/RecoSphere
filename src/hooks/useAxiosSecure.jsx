import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import AuthContext from "../provider/AuthContext";
import toast from "react-hot-toast";

export const axiosSecure = axios.create({
//   baseURL: 'https://assignment-11-server-gules-three.vercel.app',
baseURL: 'http://localhost:5000',
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
                // console.log('error from useAxiosSecure', error);
                if(error.response.status === 401 || error.response.status === 403){
                    // logout
                    signOutUser()
                    .then(res=>{
                        // be careful you are not authorized to access this page
                        toast.error('You are not authorized to access this page. Please login first.')
                    navigate('/login')
                    })
                    .catch(err=>{
                        // console.log('error', err)
                    })
                    
                }
                return Promise.reject(error);
            });
    },[signOutUser, navigate])
    return axiosSecure;
}

export default useAxiosSecure;