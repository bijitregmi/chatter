import React from 'react'
import { List, ListItem, ListItemButton, ListItemAvatar, Avatar, ListItemText, Typography} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Link, useParams } from 'react-router-dom'
import { MEDIA_URL } from '../../config'

const UserServers = (props) => {

    const { serverId } = useParams()
    const theme = useTheme()

    return (
            <List>
                {props.dataCrud.map(item => {
                    return (
                        <ListItem 
                            key={item.id}
                            disablePadding
                            sx={{
                                display: "block",
                                borderLeft: item.id == serverId && `4px solid ${theme.palette.text.primary}`
                            }}
                        >
                            <Link 
                            to={`/server/${item.id}`}
                            style={{
                                textDecoration: "none",
                                color: "inherit"
                            }}
                            >
                                <ListItemButton
                                sx={{
                                    minHeight: 0,
                                    display: "flex", 
                                    justifyContent: "space-between",
                                    paddingInline: props.isOpen ? 2 : 1,
                                    gap: 1,
                                }}
                                >
                                   
                                    <ListItemAvatar sx={{
                                        minHeight: 0,
                                    }}>
                                        <Avatar alt={item.name} src={`${MEDIA_URL}${item.icon}`}>
                                        </Avatar>
                                    </ListItemAvatar>

                                    <ListItemText 
                                        primary={
                                        <Typography 
                                            variant='body2' 
                                            sx={{
                                                fontWeight: 700,
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                                textTransform: "capitalize"
                                            }} 
                                            >
                                                {item.name}
                                        </Typography>
                                        }

                                        secondary={
                                            <Typography
                                                variant='body2'
                                                sx={{
                                                    fontSize: '0.8rem',
                                                    fontWeight: 500,
                                                    lineHeight: 0.8,
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap",
                                                    color: "grey",
                                                    pt: 0.5,
                                                    textTransform: "capitalize"
                                                }}
                                            >
                                                {item.category?.name}
                                            </Typography>
                                        }

                                        sx={{
                                            display: props.isOpen ? "block" : "none",
                                        }}
                                    />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    )
                })}
            </List>
    )
}

export default UserServers