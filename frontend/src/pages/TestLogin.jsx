import React from 'react'
import { useAuthServiceContext } from '../context/AuthContext'
import axios from 'axios'
import useAxiosInterceptor from '../helpers/useAxiosInterceptor'

const TestLogin = () => {

    const jwtAxios = useAxiosInterceptor()
    const { isLoggedIn, logout } = useAuthServiceContext()
    const [ username, setUsername ] = React.useState('')
    const getUserName = async() => {
        try {
            const userId = localStorage.getItem("user_id")
            const accessToken = localStorage.getItem("access_token")
            const response = await jwtAxios.get(`http://127.0.0.1:8000/api/account/?user_id=${userId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            console.log(response.data)
            setUsername(response.data.username)
        }
        catch (e) {
            return e
        }
    }

    return (
        <div>
            {isLoggedIn.toString()}
            <button onClick={() => logout()}>
                Logout
            </button>
            <button onClick={() => getUserName()}>
                Get username
            </button>
            <div>
                {username}
            </div>
        </div>
    )
}

export default TestLogin