import React from "react"
import Box from "@mui/material/Box"
import { CssBaseline } from '@mui/material'
import PrimaryAppBar from './templates/PrimaryAppBar'
import PrimaryDrawer from './templates/PrimaryDrawer'
import SecondaryDrawer from './templates/SecondaryDrawer'
import Main from "./templates/Main"
import MessageInterface from "../components/Main/MessageInterface"
import ServerChannels from "../components/SecondaryDrawer/ServerChannels"
import UserServers from "../components/PrimaryDrawer/UserServers"
import { useNavigate, useParams } from "react-router-dom"
import useCrud from "../hooks/useCrud"
 
const Server = () => {
    const navigate = useNavigate()
    const { serverId, channelId } = useParams()

    const { dataCrud, error, isLoading, fetchData } = useCrud([], `/server/select/?server_id=${serverId}`)

    React.useEffect(() => {
        if (error != null && error.message === "400") {
            navigate('/');
        }
    }, [error])

    React.useEffect(() => {
        fetchData()
    }, [])


    const isChannel = () => {
        if (!channelId) {
            return true;
        }

        return dataCrud.some((server) => 
            server.channel_server.some((channel) => channel.id === parseInt(channelId))
        )
    }

    React.useEffect(() => {
        if(!isChannel()) {
            navigate(`/server/${serverId}`)
        }
    }, [isChannel, channelId]);

    return (
        <Box sx={{
        display: "flex"
        }}>
        <PrimaryAppBar>
            <ServerChannels dataCrud={dataCrud}/>
        </PrimaryAppBar>
        <PrimaryDrawer>
            <UserServers isOpen={false} dataCrud={dataCrud}/>
        </PrimaryDrawer>
        <SecondaryDrawer>
            <ServerChannels dataCrud={dataCrud}/>
        </SecondaryDrawer>
        <Main>
            <MessageInterface dataCrud={dataCrud}/>
        </Main>
        </Box>
    )
}

export default Server