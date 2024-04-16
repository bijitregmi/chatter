import React from 'react'
import { Box, List, ListItem, ListItemButton, ListItemAvatar, ListItemIcon, ListItemText, Typography} from '@mui/material'
import useCrud from '../../hooks/useCrud'
import { Link } from 'react-router-dom'
import { MEDIA_URL } from '../../config'
import { SvgLoader, SvgProxy } from 'react-svgmt'
import { useTheme } from '@mui/material/styles'

const ExploreCategories = () => {

    const { dataCrud, fetchData } = useCrud([], "/category/select/")
    const theme = useTheme()

    React.useEffect(() => {
        fetchData();
    }, [])


    return (
        <Box>
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
                Categories
            </Box>
            <List sx={{
                display: "block",
            }}>
                {(dataCrud || []).map(item => {
                    return (
                    <ListItem
                        key={item.id}
                        disablePadding
                        dense={true}
                        sx={{
                            display: "block",
                        }}
                    >
                        <Link 
                            to={`/category/${item.name}`}
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
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                    }}
                                >
                                    <ListItemAvatar sx={{
                                        minHeight: 0,
                                        minWidth: 0,
                                        height: "30px",
                                    }}>
                                        <SvgLoader height='30' width='30' path={`${MEDIA_URL}${item.icon}`}>
                                            <SvgProxy
                                            selector={"path"}
                                            fill={theme.palette.text.primary}
                                            ></SvgProxy>
                                        </SvgLoader>
                                    </ListItemAvatar>
                                </ListItemIcon>
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
                    )
                })}
            </List>
        </Box>
    )
}

export default ExploreCategories