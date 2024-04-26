import React from 'react'
import { useMemberContext } from '../../context/MemberContext'
import { useParams } from 'react-router-dom'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const JoinServerButton = () => {

    const { serverId } = useParams()
    const { joinServer, leaveServer, isMember } = useMemberContext()
    const navigate = useNavigate()

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
            navigate(`/server/${serverId}`)

        }
        catch(e) {
            console.log(e.response.data[0])
        }
    }

    return (
        <>
        {isMember ? (
            <Button onClick={handleLeaveServer} variant='contained' size='small' color='error' sx={{maxHeight: '35px'}}>
                Leave
            </Button>
        ) :
        (
            <Button onClick={handleJoinServer} variant='contained' size='small' color='success' sx={{maxHeight: '35px'}}>
                Join
            </Button>
        )
        }
        </>
    )
}

export default JoinServerButton