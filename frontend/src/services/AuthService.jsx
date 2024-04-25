import axios from "axios"
import React from "react"
import { BASE_URL } from "../config"
import { useNavigate } from "react-router-dom"

const userAuthService = () => {

    const [ isLoggedIn, setIsLoggedIn ] = React.useState(localStorage.getItem("isLoggedIn") === "true")
    const navigate = useNavigate()

    const getUserDetails = async() => {
        try {
            const userId = localStorage.getItem("user_id")
            const response = await axios.get(`http://127.0.0.1:8000/api/account/?user_id=${userId}`, {withCredentials:true})
            const username = response.data.username
            localStorage.setItem('username', username)
        }
        catch (e) {
            localStorage.setItem("isLoggedIn", "false")
            localStorage.removeItem("username")
            localStorage.removeItem("user_id")
            setIsLoggedIn(false)
            return e
        }
    }

    const login = async (username, password) => {
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/token/',
                {
                    username,
                    password,
                },
                {withCredentials:true}
            )
            localStorage.setItem('isLoggedIn', "true")
            localStorage.setItem("user_id", response.data.user_id)
            setIsLoggedIn(true)
            getUserDetails()
            return response.status
        }
        catch (e) {
            return e.response.status
        }
    }

    const refreshAccessToken = async () => {
        try {
            await axios.post(`${BASE_URL}/token/refresh/`, {}, {withCredentials:true})
        }
        catch (refreshError){
            return Promise.reject(refreshError)
        }
    }

    const logout = async () => {
        localStorage.setItem("isLoggedIn", "false")
        localStorage.removeItem("username")
        localStorage.removeItem("user_id")
        setIsLoggedIn(false)
        try {
            const response = await axios.get(`${BASE_URL}/logout/`, {withCredentials:true})
            console.log(response.data)
        }
        catch (e) {
            throw e
        }
        navigate("/login")
    }

    const register = async (username, password) => {
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/register/',
                {
                    username,
                    password,
                },
                {withCredentials:true}
            )
            return response.status
        }
        catch (e) {
            return e.response.status
        }
    }

    return { login, isLoggedIn, logout, setIsLoggedIn, refreshAccessToken, register }
}

export default userAuthService