import React from 'react'
import useMembership from '../services/MemberService' 

const MemberContext = React.createContext(null)

export const MemberContextProvider = ({children}) => {
  const membership = useMembership()

    return (
      <MemberContext.Provider value={membership}>
        {children}
      </MemberContext.Provider>
    )
} 

export const useMemberContext = () => {
  const context = React.useContext(MemberContext)

  if (context === null){
    throw new Error("Error - use MemberContextProvider for member services")
  }

  return context
}

export default MemberContextProvider