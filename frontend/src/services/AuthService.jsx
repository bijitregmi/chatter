import axios from "axios"
import React from "react"
import { BASE_URL } from "../config"

const userAuthService = () => {

    const [ isLoggedIn, setIsLoggedIn ] = React.useState(localStorage.getItem("isLoggedIn") === "true")

    const getUserDetails = async() => {
        try {
            const userId = localStorage.getItem("user_id")
            const response = await axios.get(`http://127.0.0.1:8000/api/account/?user_id=${userId}`, {withCredentials:true})
            console.log(response.data)
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

    // const getUserIdFromToken = (token) => {
    //     const tokenParts = token.split('.')
    //     const encodedPayload = tokenParts[1]
    //     const decodedPayload = atob(encodedPayload)
    //     const payLoad = JSON.parse(decodedPayload)
    //     const userId = payLoad.user_id

    //     return userId
    // }

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
            console.log(response.data)
            localStorage.setItem('isLoggedIn', "true")
            localStorage.setItem("user_id", response.data.user_id)
            setIsLoggedIn(true)
            getUserDetails()
        }
        catch (e) {
            return e.response
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

    const logout = () => {
        localStorage.setItem("isLoggedIn", "false")
        localStorage.removeItem("username")
        localStorage.removeItem("user_id")
        setIsLoggedIn(false)
    }

    return { login, isLoggedIn, logout, setIsLoggedIn, refreshAccessToken}
}

export default userAuthService