import React from 'react'
import { Box, Typography, Container, Grid, Card, CardMedia, CardContent, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Avatar} from '@mui/material'
import useCrud from '../../hooks/useCrud'
import { Link } from 'react-router-dom'
import { MEDIA_URL } from '../../config'
import { useParams } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'

const ExploreServers = () => {
    const { categoryName } = useParams()
    const url = categoryName ? `/server/select/?category=${categoryName}`: "/server/select"
    const { dataCrud, fetchData } = useCrud([], `${url}`)
    const theme = useTheme()

    React.useEffect(() => {
        fetchData()
    }, [categoryName])

    return (
        <Container maxWidth="1000px" disableGutters sx={{
            px: {md: 8, sm: 4, xs: 2}
        }}>
            <Box sx={{
                pt: 3,
            }}>
                <Typography variant='h3' noWrap component="h1" 
                sx={{
                    display: {sm: "block",
                    fontWeight: 700,
                    letterSpacing: '-2px',
                    },
                    textAlign: {xs: 'center', sm:'left'}
                }}
                >
                    {categoryName ? `Rooms talking about ${categoryName}` : "Popular Rooms"}
                </Typography>
                <Typography variant='h6' noWrap component="h2" color={theme.palette.text.secondary}
                sx={{
                    display: {
                    sm: "block",
                    fontWeight: 700,
                    letterSpacing: '-1px',
                    },
                    textAlign: {xs: 'center', sm:'left'}
                    }}
                >
                    {categoryName ? `Checkout rooms talking about ${categoryName}` : "Checkout some popular rooms"}
                </Typography>
            </Box>
            <Box
            sx={{
                pt: 4,
            }}
            >
                <Typography
                variant='h6' 
                noWrap 
                component="h2" 
                color={theme.palette.text.primary}
                sx={{
                    display: {
                    sm: "block",
                    fontWeight: 700,
                    letterSpacing: '-1px',
                    },
                    textAlign: 'left'
                    }}
                >
                    Recommended Rooms
                </Typography>
            </Box>
            <Grid container spacing={{xs: 0, sm: 1, md: 3,}} sx={{
                pt: '2vh',
            }}>
                    {dataCrud.map(item => (
                        <Grid item key={item.id} xs={12} sm={6} md={6} lg={4} xl={3} sx={{display: "flex"}}>
                            <Link to={`/server/${item.id}`}
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                    width: "100%",
                                    height: "100%"
                                }}
                                >
                                <Card sx={{
                                    height: "100%",
                                    width: "100%",
                                    boxShadow: "none",
                                    backgroundImage: "none",
                                    display: "flex",
                                    flexDirection: "column",
                                    borderRadius: 1,
                                    '&:hover': {
                                        cursor: "pointer",
                                        bgcolor: theme.palette.action.hover
                                    }
                                }}>
                                    <CardMedia 
                                    component="img" 
                                    alt="Server image"
                                    image={item.banner ? `${MEDIA_URL}${item.banner}` :
                                        'https://images.pexels.com/photos/1111369/pexels-photo-1111369.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                                    }
                                    sx={{
                                        display: {xs: "none", sm: "block"},
                                        height: "70%",
                                        width: "100%",
                                        borderRadius: 2,
                                    }}
                                    />
                                    <CardContent sx={{
                                        "&:last-child": {paddingBottom: 0},
                                        p: '0.5dvw',
                                        flexGrow: 1,
                                        display: "flex",
                                        alignItems: "center",
                                    }}>
                                        <List>
                                            <ListItem disablePadding>
                                                <ListItemIcon sx={{minWidth: 0}}>
                                                    <ListItemAvatar sx={{
                                                        minWidth: '50px'
                                                    }}>
                                                        <Avatar alt={item.name} src={`${MEDIA_URL}${item.icon}`}>
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                </ListItemIcon>
                                                
                                                <ListItemText
                                                    primary={
                                                    <Typography 
                                                        variant='body2'
                                                        textAlign="start"
                                                        sx={{
                                                            fontWeight: 700,
                                                            textOverflow: "ellipsis",
                                                            whiteSpace: "nowrap",
                                                            overflow: "hidden"
                                                        }} 
                                                        >
                                                            {item.name}
                                                    </Typography>
                                                    }

                                                    secondary={
                                                        <Typography
                                                            variant='body2'
                                                            sx={{
                                                                textOverflow: "ellipsis",
                                                                whiteSpace: "nowrap",
                                                                overflow: "hidden",
                                                                color: theme.palette.text.secondary,
                                                                textTransform: "capitalize"
                                                            }}
                                                        >
                                                            {item.category?.name}
                                                        </Typography>
                                                    }
                                                />
                                            </ListItem>
                                        </List>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
            </Grid>
        </Container>
    )
}

export default ExploreServers