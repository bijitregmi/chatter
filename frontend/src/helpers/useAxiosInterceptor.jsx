import axios from "axios";
import { BASE_URL } from "../config";
import { useAuthServiceContext } from "../context/AuthContext";

const API_BASE_URL = BASE_URL

const useAxiosInterceptor = () => {
    const jwtAxios = axios.create({ baseURL: API_BASE_URL })
    const { logout } = useAuthServiceContext()

    jwtAxios.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            const originalRequest = error.config;
            if (error.response?.status === 403 || 401) {
                axios.defaults.withCredentials = true
                try {
                    const refreshResponse = await axios.post("http://127.0.0.1:8000/api/token/refresh/")
                    if (refreshResponse["status"] === 200) {
                        return jwtAxios(originalRequest)
                    }
                }
                catch (e) {
                    logout()
                    throw e
                }
            }
            return error
        }
    )

    return jwtAxios
}

export default useAxiosInterceptor