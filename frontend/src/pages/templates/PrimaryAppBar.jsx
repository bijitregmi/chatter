import { AppBar, Box, Drawer, IconButton, Toolbar, Typography, useMediaQuery, Switch} from '@mui/material'
import React from 'react'
import { useTheme } from '@mui/material'
import { Link } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import { ThemeContext } from '../../App'


const PrimaryAppBar = () => {
  const theme = useTheme()
  const { toggleMode } = React.useContext(ThemeContext)
  const [sideMenuOpen, setSideMenuOpen] = React.useState(false)
  const isScreenSizeSmall = useMediaQuery(theme.breakpoints.down("sm"))
  const toggleSideMenu = () => {
    return setSideMenuOpen(prevSideMenuOpen => !prevSideMenuOpen)
  }


  React.useEffect(() => {
    if (sideMenuOpen && !isScreenSizeSmall) {
      toggleSideMenu();
    }
  }, [isScreenSizeSmall])

  return (
    <AppBar color='inherit' position='fixed' sx={{
      height: theme.primaryAppBar.height,
      zIndex: theme.zIndex.drawer + 2,
      transition: '0.2s'
      }}>
        <Toolbar variant='dense'
          sx={{
            display: "flex",
            justifyContent: "space-between",
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
            <Drawer anchor='left' open={sideMenuOpen}>
            {[...Array(100)].map((_, i) => (
              <Typography key={i} paragraph>
                {i + 1}
              </Typography>
            ))}
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
          <IconButton onClick={() => toggleMode()}>
              {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
    </AppBar>
  )
}

export default PrimaryAppBar