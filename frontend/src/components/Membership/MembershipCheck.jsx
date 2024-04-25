import React from 'react'
import { useMemberContext } from '../../context/MemberContext'
import { useParams } from 'react-router-dom'

const MembershipCheck = ({ children }) => {
    const { serverId } = useParams()
    const { memberCheck } = useMemberContext()

    React.useEffect(() => {
        const checkMembership = async () => {
            try {
                await memberCheck(serverId)
            }
            catch (e) {
                console.log(e)
            }
        }
        checkMembership()
    }, [serverId])

    return (
        <div>{children}</div>
    )
}

export default MembershipCheck