import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import AuthContext from "../provider/AuthContext";

export const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

const useAxiosSecure=()=>{
    const {signOutUser}= useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(()=>{
        axiosSecure.interceptors.response.use(
            res=>{
                return res
            },
            async error=>{
                console.log('error from useAxiosSecure', error);
                if(error.response.status === 401 || error.response.status === 403){
                    // logout
                    signOutUser()
                    // navigate to login page
                    navigate('/login')
                }
            });
    },[logOut, navigate])
    return axiosSecure;
}

export default useAxiosSecure;