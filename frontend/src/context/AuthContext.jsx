import React from 'react'
import useAuthService from '../services/AuthService'

const AuthContext = React.createContext(null)

export const AuthContextProvider = ({children}) => {
  const authServices = useAuthService()

    return (
      <AuthContext.Provider value={authServices}>
        {children}
      </AuthContext.Provider>
    )
} 

export const useAuthServiceContext = () => {
  const context = React.useContext(AuthContext)

  if (context === null){
    throw new Error("Error - use AuthContextProvider for auth services")
  }

  return context
}

export default AuthContextProvider