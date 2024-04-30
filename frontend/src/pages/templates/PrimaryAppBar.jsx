import { AppBar, Box, Drawer, IconButton, Toolbar, Typography, useMediaQuery} from '@mui/material'
import React from 'react'
import { useTheme } from '@mui/material'
import { Link } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import AccountButton from '../../components/PrimaryAppBar/AccountButton'
import { useAuthServiceContext } from '../../context/AuthContext'


const PrimaryAppBar = ({children}) => {
  const theme = useTheme()
  const [sideMenuOpen, setSideMenuOpen] = React.useState(false)
  const isScreenSizeSmall = useMediaQuery(theme.breakpoints.down("sm"))
  const toggleSideMenu = React.useCallback(() => {
    return setSideMenuOpen(prevSideMenuOpen => !prevSideMenuOpen)
  }, [])
  const { isLoggedIn, logout } = useAuthServiceContext()

  React.useEffect(() => {
    if (sideMenuOpen && !isScreenSizeSmall) {
      toggleSideMenu();
    }
  }, [isScreenSizeSmall, sideMenuOpen, toggleSideMenu])

  return (
    <AppBar color='inherit' position='fixed' sx={{
      height: theme.primaryAppBar.height,
      zIndex: theme.zIndex.drawer + 2,
      boxShadow: "none",
      borderBottom: `1px solid ${theme.palette.divider}`,
      bgcolor: theme.palette.mode == "dark" ? '#242424' : "#F7F7F7",
      }}>
        <Toolbar variant='dense'
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            pl: {xs: 1.5, sm: 2, md: 3}
          }}
        >
          <Box sx={{
            display: "flex",
            alignItems: "center"
          }}>
          <Box sx={{ display: {xs: 'block', sm:'none'} }}>
            <IconButton color='inherit' aria-label='open drawer button' edge="start" sx={{ mr: 1}} onClick={toggleSideMenu}>
              <MenuIcon/>
            </IconButton>
            <Drawer anchor='left' open={sideMenuOpen} onClose={() => setSideMenuOpen(false)}>
              <Box 
                sx={{ width: `${theme.secondaryDrawer.width}px` , mt: `${theme.primaryAppBar.height}px`}}
                role="presentation" 
                onClick={() => setSideMenuOpen(false)}>
                {children}
              </Box>
            </Drawer>
          </Box>
          <Link href="/" underline="none" color="inherit">
            <Typography 
              variant='h5' 
              noWrap 
              sx= {{
                fontWeight: 700,
                letterSpacing: "-0.5px",
              }}
              > 
              Chatter
            </Typography>
          </Link>
          </Box>
          <Box sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}>
          
          {isLoggedIn ? 
          <Typography noWrap color="inherit" onClick={() => logout()} sx={{
            ":hover": {
              cursor: "pointer"
            }
          }}>
            Logout
          </Typography>
          :
          <Link href="/login" underline="none" color="inherit">
              <Typography noWrap>
                Login
              </Typography>
          </Link> 
          }
          <AccountButton/>
          </Box>
        </Toolbar>
    </AppBar>
  )
}

export default PrimaryAppBar