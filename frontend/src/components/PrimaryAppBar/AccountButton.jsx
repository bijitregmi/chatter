import React from 'react'
import { Box, IconButton, Menu, MenuItem, Switch, Typography } from "@mui/material"
import { AccountCircle } from '@mui/icons-material'
import { ThemeContext } from '../../App'
import { useTheme } from '@mui/material/styles'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Brightness4Icon from '@mui/icons-material/Brightness4'

const AccountButton = () => {
    const { toggleMode } = React.useContext(ThemeContext)
    const theme = useTheme()
    const [ anchorEl, setAnchorEl ] = React.useState(null)
    const open = Boolean(anchorEl)

    const handleClick = React.useCallback((event) => {
        setAnchorEl(event.currentTarget)
    }, [open]);

    const handleClose = () => {
        setAnchorEl(null)
    }

    const menu = (
        <Menu open={open} anchorEl={anchorEl} onClose={handleClose} sx={{
            mt: 0.85,
        }}>
            <MenuItem sx={{
                textTransform: "capitalize",
                display: "flex",
                justifyContent: "center" ,
            }}>
                
                    <Brightness7Icon /> 
                        <Switch 
                            checked={theme.palette.mode === "dark" ? true : false }
                            onClick={() => toggleMode()}
                            color = "default"
                        />
                    <Brightness4Icon />
            </MenuItem>
        </Menu>
    )

    return (
        <Box>
            <IconButton color='inherit' onClick={handleClick}>
                <AccountCircle />
            </IconButton>
            {menu}
        </Box>
    )
}

export default AccountButton
