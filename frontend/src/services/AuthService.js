import axios from "axios"
import React from "react"

const userAuthService = () => {

    const [ isLoggedIn, setIsLoggedIn ] = React.useState(localStorage.getItem("isLoggedIn") === "true")

    const getUserDetails = async() => {
        try {
            const userId = localStorage.getItem("user_id")
            const accessToken = localStorage.getItem("access_token")
            const response = await axios.get(`http://127.0.0.1:8000/api/account/?user_id=${userId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            const username = response.data.username
            localStorage.setItem('username', username)
            localStorage.setItem("isLoggedIn", "true")
        }
        catch (e) {
            setIsLoggedIn(false)
            localStorage.setItem("isLoggedIn", "false")
            return e
        }
    }

    const getUserIdFromToken = (token) => {
        const tokenParts = token.split('.')
        const encodedPayload = tokenParts[1]
        const decodedPayload = atob(encodedPayload)
        const payLoad = JSON.parse(decodedPayload)
        const userId = payLoad.user_id

        return userId
    }

    const login = async (username, password) => {
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/token/',
                {
                    username,
                    password,
                }
            )
            console.log(response.data)
            const { access, refresh } = response.data
            localStorage.setItem('access_token', access)
            localStorage.setItem('refresh_token', refresh)
            localStorage.setItem('user_id', getUserIdFromToken(access))
            localStorage.setItem('isLoggedIn', "true")
            setIsLoggedIn(true)
            getUserDetails()
        }
        catch (e) {
            return e
        }
    }

    const logout = () => {
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        localStorage.removeItem("user_id")
        localStorage.removeItem("username")
        localStorage.setItem("isLoggedIn", "false")
        setIsLoggedIn(false)
    }

    return { login, isLoggedIn, logout }
}

export default userAuthService