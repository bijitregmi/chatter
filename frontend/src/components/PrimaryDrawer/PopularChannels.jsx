import React from 'react'
import { List, ListItem, ListItemButton, ListItemAvatar, Avatar, ListItemText, Typography} from '@mui/material'
import useCrud from '../../hooks/useCrud'
import { Link } from 'react-router-dom'
import { MEDIA_URL } from '../../config'

const PopularChannels = (props) => {

    const { dataCrud, fetchData } = useCrud([], "/server/select/")

    React.useEffect(() => {
        fetchData();
    }, [])

    React.useEffect(() => {
        console.log(dataCrud)
    }, [dataCrud])

    return (
        <>
            <List>
                {dataCrud.map(item => {
                    return (
                        <ListItem 
                            key={item.id}
                            disablePadding
                            sx={{
                                display: "block",
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
        </>
    )
}

export default PopularChannels