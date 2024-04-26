import React from 'react'
import { Box, List, ListItem, ListItemButton, ListItemText, Typography} from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import { useMemberContext } from '../../context/MemberContext'

const ServerChannels = (props) => {

    const theme = useTheme()
    const { serverId, channelId } = useParams()
    const { isMember } = useMemberContext()

    return (
        <>
            <Box sx={{
                height: "50px",
                display: "flex",
                alignItems: "center",
                paddingInline: 2,
                borderBottom: `1px solid ${theme.palette.divider}`,
                position: "sticky",
                top: 0,
                zIndex: 1,
                backgroundColor: "inherit"
            }}>
                Channels
            </Box>
            <List sx={{
                display: "block",
            }}>
                {(props.dataCrud || []).flatMap((obj) => 
                    obj.channel_server?.map((item) => (
                            <ListItem
                                key={item.id}
                                disablePadding
                                dense={true}
                                sx={{
                                    display: "block",
                                    bgcolor: item.id == channelId && theme.palette.action.selected
                                }}
                            >
                                <Link 
                                    to={isMember ? `/server/${serverId}/${item.id}`: `/server/${serverId}`}
                                    style={{
                                        textDecoration: "none",
                                        color: "inherit",
                                    }}    
                                >
                                    <ListItemButton 
                                        sx={{
                                            minHeight: "48px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}
                                    >
                                        <ListItemText 
                                            primary={
                                                <Typography
                                                    variant='body1'
                                                    textAlign='start'
                                                    sx={{
                                                        paddingLeft: 2,
                                                        fontWeight: 450,
                                                        textOverflow: "ellipsis",
                                                        whiteSpace: "nowrap",
                                                        letterSpacing: "-0.5px",
                                                        textTransform: "capitalize"
                                                    }}
                                                >
                                                    {item.name}
                                                </Typography>
                                            }
                                        />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        ))
                )}
            </List>
        </>

    )
}

export default ServerChannels