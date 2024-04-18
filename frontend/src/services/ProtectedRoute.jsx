import React from 'react'
import { useAuthServiceContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {

    const { isLoggedIn } = useAuthServiceContext()
    if (!isLoggedIn) {
        return <Navigate to="/login" replace={true} />
    }
    return <>{children}</>
}

export default ProtectedRoute