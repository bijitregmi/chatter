import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";


const API_BASE_URL = BASE_URL

const useAxiosInterceptor = () => {
    const jwtAxios = axios.create({ baseURL: API_BASE_URL })
    
    const navigate = useNavigate()

    jwtAxios.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            const originalRequest = error.config;
            if (error.response?.status === 403 || 401) {
                const refreshToken = localStorage.getItem("refresh_token")
                if (refreshToken) {
                    try {
                        const refreshResponse = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
                            refresh: refreshToken
                        })
                        const newAccess = refreshResponse.data.access
                        localStorage.setItem("access_token", newAccess)
                        originalRequest.headers['Authorization'] = `Bearer ${newAccess}`
                        return jwtAxios(originalRequest)
                    }
                    catch (e) {
                        navigate('/login')
                        throw error
                    }
                }
            }
            else {
                navigate('/login')
            }
            throw error
        }
    )

    return jwtAxios
}

export default useAxiosInterceptor