import React from 'react'
import { useMemberContext } from '../../context/MemberContext'
import { useParams } from 'react-router-dom'
import { Button } from '@mui/material'

const JoinServerButton = () => {

    const { serverId } = useParams()
    const { joinServer, leaveServer, isMember } = useMemberContext()

    const handleJoinServer = async () => {
        try{
            await joinServer(serverId)
            console.log("User joined server")
        }
        catch (e) {
            console.log("Error joining")
        }
    }

    const handleLeaveServer = async () => {
        try{
            await leaveServer(serverId)
            console.log("User left server")
        }
        catch(e) {
            console.log("Error leaving server")
        }
    }

    return (
        <>
        {isMember ? (
            <Button onClick={handleLeaveServer} variant='contained'>
                Leave
            </Button>
        ) :
        (
            <Button onClick={handleJoinServer} variant='contained'>
                Join
            </Button>
        )
        }
        </>
    )
}

export default JoinServerButton