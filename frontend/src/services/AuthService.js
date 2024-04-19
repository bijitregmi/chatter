import axios from "axios"
import React from "react"

const userAuthService = () => {

    const [ isLoggedIn, setIsLoggedIn ] = React.useState(localStorage.getItem("isLoggedIn") === "true")

    // const getUserDetails = async() => {
    //     try {
    //         const userId = localStorage.getItem("user_id")
    //         const accessToken = localStorage.getItem("access_token")
    //         const response = await axios.get(`http://127.0.0.1:8000/api/account/?user_id=${userId}`, {
    //             headers: {
    //                 Authorization: `Bearer ${accessToken}`
    //             }
    //         })
    //         const username = response.data.username
    //         localStorage.setItem('username', username)
    //         localStorage.setItem("isLoggedIn", "true")
    //     }
    //     catch (e) {
    //         setIsLoggedIn(false)
    //         localStorage.setItem("isLoggedIn", "false")
    //         return e
    //     }
    // }

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
            setIsLoggedIn(true)
            // getUserDetails()
        }
        catch (e) {
            return e.response.status
        }
    }

    const logout = () => {
        localStorage.setItem("isLoggedIn", "false")
        setIsLoggedIn(false)
    }

    return { login, isLoggedIn, logout }
}

export default userAuthService