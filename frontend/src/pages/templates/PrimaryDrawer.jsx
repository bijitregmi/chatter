import { Box, Drawer, useMediaQuery, Typography } from '@mui/material'
import React from 'react'
import { useTheme } from '@mui/material/styles'
import ToggleDrawer from '../../components/PrimaryDrawer/ToggleDrawer'
import PopularChannels from '../../components/PrimaryDrawer/PopularChannels'

const PrimaryDrawer = () => {

    const theme = useTheme()
    const isScreenSmall = useMediaQuery("(max-width: 1199px)")
    const [isOpen, setIsOpen] = React.useState(!isScreenSmall)

    const toggleDrawer = () => {
        setIsOpen(!isOpen)
    }

    React.useEffect(() => {
        setIsOpen(!isScreenSmall)
    }, [isScreenSmall])

    return (
        <Drawer
        open={isOpen} 
        variant='permanent'
        sx={{
            width: isOpen ? `${theme.primaryDrawer.width}px` : `${theme.primaryDrawer.closedWidth}px`,
            mt:`${theme.primaryAppBar.minHeight}px`,
            transition: '0.2s',
        }}
        PaperProps={{
            sx:{
                mt:`${theme.primaryAppBar.minHeight}px`,
                height:`calc(100dvh - ${theme.primaryAppBar.height}px)`,
                width: isOpen ? `${theme.primaryDrawer.width}px` : `${theme.primaryDrawer.closedWidth}px`,
                transition: '0.2s',
            }
        }}
        >
                <Box>
                    <ToggleDrawer 
                    toggleDrawer={toggleDrawer}
                    isOpen={isOpen}
                    />
                    <PopularChannels 
                    isOpen={isOpen}
                    />
                </Box>
        </Drawer>
    )
}

export default PrimaryDrawer