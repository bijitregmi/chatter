import React from 'react'
import { useParams, Link } from 'react-router-dom'
import useWebSocket from 'react-use-websocket'
import useCrud from '../../hooks/useCrud'
import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import MoreVertIcon from '@mui/icons-material/MoreVert'

const MessageInterface = (props) => {

    const theme = useTheme()
    const [ message, setMessage ] = React.useState('')
    const [ newMessage, setNewMessage ] = React.useState([])
    const { serverId, channelId } = useParams()
    const { fetchData } = useCrud([], `/messages/?channel_id=${channelId}`)
    const socketUrl = channelId ? `ws://127.0.0.1:8000/${serverId}/${channelId}` : null
    const channelName = props.dataCrud?.find((server) => server.id === parseInt(serverId))
                        ?.channel_server?.find((channel) => channel.id === parseInt(channelId))?.name || 'Home'
    const [ anchorEl, setAnchorEl ] = React.useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const menu = (
        <Menu
            open={open}
            onClose={handleClose}
            anchorEl={anchorEl}
            sx={{
                mt: 0.5,
                ml: 2,
            }}
            MenuListProps={{
                sx: {
                    py: 0,
                }
            }}
        >
            <MenuItem disabled={true} dense={true} sx={{
                borderBottom: `1px solid ${theme.palette.text.secondary}`,
                py: 1,
                pl: 1,
            }}
            >
                <Typography
                    variant='body1'
                    textAlign='start'
                    sx={{
                        fontWeight: 450,
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        letterSpacing: "-0.5px",
                        textTransform: "capitalize",
                        textAlign: "start"
                    }}
                >
                    Channels
                </Typography>
            </MenuItem>
            {(props.dataCrud || []).flatMap((obj) => 
                    obj.channel_server?.map((item) => (
                            <MenuItem
                                key={item.id}
                                dense={true}
                                sx={{
                                    display: "block",
                                    bgcolor: item.id == channelId && theme.palette.action.selected,
                                    py: 1,
                                }}
                                onClick={handleClose}
                            >
                                <Link 
                                    to={`/server/${serverId}/${item.id}`}
                                    style={{
                                        textDecoration: "none",
                                        color: "inherit",
                                    }}    
                                >
                                    <Typography
                                        variant='body1'
                                        textAlign='start'
                                        sx={{
                                        fontWeight: 450,
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        letterSpacing: "-0.5px",
                                        textTransform: "capitalize",
                                        textAlign: "start"
                                        }}
                                    >
                                        {item.name}
                                    </Typography>
                                </Link>
                            </MenuItem>
                        ))
                )}
        </Menu>
    )


    const { sendJsonMessage } = useWebSocket(socketUrl, {
        onOpen: async () => {
            try {
                console.log("Connected")
                const data = await fetchData()
                console.log(data)
                setNewMessage(Array.isArray(data) ? data : [])
            }
            catch (e) {
                console.log(e)
            }
        },
        onClose: () => {
            console.log("Closed")
        },
        onError: () => {
            console.log("Error")
        },
        onMessage: (msg) => {
            const data = JSON.parse(msg.data)
            setNewMessage((prevMessage) => [...prevMessage, data.new_message]) 
        }
    })


    return (
        <>
            <AppBar
                sx={{
                    bgcolor: theme.palette.background.default,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    height: '50px',
                    minHeight: '50px',
                    justifyContent: 'center'
                }}
                color='default'
                position='sticky'
                elevation={0}
            >
                <Toolbar
                    disableGutters
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        pr: 1,
                        pl: 2,
                    }}
                >
                    <Typography noWrap component="div">
                        {channelName}
                    </Typography>
                    <Box sx={{
                        display: {xs: "block", sm: "none"}
                    }}
                    
                    >
                        <IconButton color='inherit' edge="end" onClick={handleClick}>
                            <MoreVertIcon/>
                        </IconButton>
                        {menu}
                    </Box>
                </Toolbar>
            </AppBar>
        {channelId ?
        <>
            <Box>
                {newMessage?.map((message, index) => {
                    return (
                        <div key={message.id}>
                            <p>{message.sender.username}</p>
                            <p>{message.content}</p>
                            <p></p>
                        </div>
                    )
                })}
                <form onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="message">
                        Enter Message:
                        <input
                            id='message'
                            type='text'
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </label>
                </form>
                <button onClick={() => {
                    channelId && sendJsonMessage({
                        type: "message",
                        message,
                    })
                }}>
                    Send
                </button>
            </Box>
        </> :
        <Box sx={{
            overflow: "hidden",
            p: {xs: 0},
            height: "80dvh",
            display: "grid",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Box
                sx={{
                    display: "grid",
                    gap: "4dvh"
                }}
            >
                <Typography
                    variant='h4'
                    fontWeight={700}
                    letterSpacing={'-0.5px'}
                    sx={{
                        px: 3,
                        maxWidth: "700px",
                        textAlign: "center",
                    }}
                >
                    {props.dataCrud?.[0]?.name ? `Welcome to the ${props.dataCrud[0].name} community` : 'The Homepage'}
                </Typography>
                <Typography
                    
                    sx={{
                        textAlign: 'center'
                    }}
                >
                {props.dataCrud?.[0]?.description || 'Come join us'}
                </Typography>
            </Box>
        </Box>}
        </>
    )
}

export default MessageInterface