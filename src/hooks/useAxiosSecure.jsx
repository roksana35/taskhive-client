import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL:'http://localhost:5000'
})

const useAxiosSecure = () => {
    const {logOut}=useAuth();
    const navigate=useNavigate();
    axiosSecure.interceptors.request.use(
        function (config) {
            const token = localStorage.getItem('access-token');
            // console.log('Token in request:', token);  // Debug statement
            if (token) {
                config.headers.authorization = `Bearer ${token}`;
            } else {
                // console.log('No token found');  // Debug statement
            }
            return config;
        },
        function (error) {
            return Promise.reject(error);
        }
    );

      axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
        // console.log('status error in the interceptor', status);
        // for 401 or 403 logout the user and move the user to the login
        if (status === 401 || status === 403) {
            await logOut();
            navigate('/login');
        }
        return Promise.reject(error);
    })
    return axiosSecure
};

export default useAxiosSecure;