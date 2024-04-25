import React from 'react'
import { useParams, Link } from 'react-router-dom'
import useWebSocket from 'react-use-websocket'
import useCrud from '../../hooks/useCrud'
import { AppBar, Box, IconButton, ListItem, Menu, MenuItem, Toolbar, Typography, useMediaQuery, List, ListItemAvatar, Avatar, ListItemText, TextField, Button} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SendIcon from '@mui/icons-material/Send'
import { format, parseISO } from 'date-fns'
import userAuthService from '../../services/AuthService'

const MessageInterface = (props) => {

    const theme = useTheme()
    const { refreshAccessToken, logout } = userAuthService()
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
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const messageEndRef = React.useRef(null)
    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behaviour: "smooth"})
    }
    const maxConnectionAttempts = 4
    const [ connectionAttempts, setConnectionAttempts ] = React.useState(0)
    const user_id = localStorage.getItem("user_id")


    React.useEffect(() => {
        if (!isSmall) {
            setAnchorEl(null)
        }
    }, [isSmall])

    React.useEffect(() => {
        scrollToBottom();
    }, [newMessage])

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
                setNewMessage(Array.isArray(data) ? data : [])
            }
            catch (e) {
                console.log(e)
            }
        },
        onClose: (event) => {
            if (event.code == 4001) {
                console.log("Authendtication error")
                refreshAccessToken().catch((error) => {
                    if (error.response && error.response.status === 401) {
                        logout()
                    }
                })
            }
            console.log("Closed")
            setConnectionAttempts(prevAttempt => prevAttempt + 1)
        },
        onError: () => {
            console.log("Error")
        },
        onMessage: (msg) => {
            const data = JSON.parse(msg.data)
            setNewMessage((prevMessage) => [...prevMessage, data.new_message]) 
        },
        shouldReconnect: (closeEvent) => {
            if (closeEvent.code === 4001 && connectionAttempts > maxConnectionAttempts) {
                setConnectionAttempts(0)
                logout()
                return false
            }
            return true
        },
        reconnectInterval: 1000,
    })


    return (
        <Box sx={{
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
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
            <Box sx={{
                overflow: 'hidden',
                flexGrow: 1,
            }}>
                <List sx={{
                    width: '100%',
                    bgcolor: 'background.paper',
                }}>
                {newMessage?.map((message, index) => {
                    return (
                        <ListItem 
                            key={message.id}
                            sx={{
                                gap: 2,
                                flexDirection: message.sender.id === Number(user_id) ? "row-reverse" : "row",
                                textAlign: message.sender.id === Number(user_id) ? "right" : "left",
                                maxWidth: "100%"
                            }}
                        >
                            <ListItemAvatar>
                                <Avatar alt='User image'/>
                            </ListItemAvatar>
                            <ListItemText
                                sx={{
                                    display: 'grid',
                                }}
                                primary={
                                <Typography
                                    component='span'
                                    variant='body1'
                                    color={theme.palette.text.secondary}
                                    noWrap
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        fontWeight: 400,
                                        gap: '1vw',
                                        textOverflow: 'ellipsis',
                                        flexDirection: message.sender.id === Number(user_id) ? "row-reverse" : "row",
                                    }}
                                >
                                    <Typography sx={{
                                        fontSize: '14px',
                                    }}>
                                        {message.sender.username}
                                    </Typography>
                                    <Typography sx={{
                                        fontSize: '11px',
                                    }}>
                                        {format(parseISO(message.created_at), 'dd/MM/yyyy h:mm a')}
                                    </Typography>
                                </Typography>
                                }

                                secondary={
                                    <Typography
                                        variant='body2'
                                        color={theme.palette.text.primary}
                                        style={{
                                            overflow: 'visible',
                                            whiteSpace: 'normal',
                                            textOverflow: 'clip',
                                        }}
                                        sx={{
                                            display: 'inline',
                                            lineHeight: '1.2',
                                            fontWeight: 400,
                                            letterSpacing: '-0.2px',
                                            fontSize: '16px'
                                        }}
                                    >
                                        {message.content}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    )
                })
                }
                </List>
                <Box ref={messageEndRef}/>
            </Box>
            <Box sx={{
                    position: 'sticky',
                    width: '100%',
                    bottom: 0,
                    display: 'flex',
                    justifyContent: 'space-around',
                    bgcolor: theme.palette.background.default,
                    padding: {sm: 1.5, xs: 1},
                    gap: {sm:2 , xs: 1},
                }}>
                    <TextField 
                        label="Message"
                        id='message'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        multiline
                        minRows={1}
                        maxRows={4}
                        sx={{
                            bgcolor: theme.palette.background.default,
                            width: "90%",
                            height: "inherit",
                        }}
                        InputProps={{
                            style:{
                                borderRadius: "30px",
                                
                            }
                        }}
                    />
                    <Button 
                        sx={{
                            height: 'inherit',
                            borderRadius: "30px",
                        }}
                        variant="outlined"
                        color='success'
                        endIcon={!isSmall && <SendIcon/>}
                        onClick={() => {
                            (channelId && message != '') && sendJsonMessage({
                                type: "message",
                                message,
                            })
                            setMessage('')
                        }}
                    >
                        Send
                    </Button>
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
        </Box>
    )
}

export default MessageInterface