import React from 'react'
import { useAuthServiceContext } from '../context/AuthContext'
import useAxiosInterceptor from '../helpers/useAxiosInterceptor'

const TestLogin = () => {

    const jwtAxios = useAxiosInterceptor()
    const { isLoggedIn, logout } = useAuthServiceContext()
    const [ username, setUsername ] = React.useState(localStorage.getItem("username") || "")

    
    const getUserDetails = async () => {
        try {
            const response = await jwtAxios.get(
            `http://127.0.0.1:8000/api/account/?user_id=${localStorage.getItem("user_id")}`,
            { withCredentials: true }
            );
            console.log(response.data.username)
            localStorage.setItem("username", response.data.username)
            setUsername(response.data.username);  
        } catch (err) {
            localStorage.removeItem("username")
            localStorage.removeItem("user_id")
            return err;
        }
    };
    

    return (
        <div>
            {isLoggedIn.toString()}
            <button onClick={() => logout()}>
                Logout
            </button>
            <button onClick={getUserDetails}>
                Get username
            </button>
            <div>
                {username}
            </div>
        </div>
    )
}

export default TestLogin