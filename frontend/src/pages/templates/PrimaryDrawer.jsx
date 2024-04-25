import { Box, Drawer, useMediaQuery } from '@mui/material'
import React from 'react'
import { useTheme } from '@mui/material/styles'
import ToggleDrawer from '../../components/PrimaryDrawer/ToggleDrawer'

const PrimaryDrawer = ({children}) => {

    const theme = useTheme()
    const [isOpen, setIsOpen] = React.useState(false)
    const smallScreen = useMediaQuery(theme.breakpoints.down("sm"))

    const toggleDrawer = React.useCallback(() => {
        setIsOpen(!isOpen)
    }, [isOpen])

    React.useEffect(() => {
        if(smallScreen){
            setIsOpen(false)
        }
    }, [smallScreen])

    return (
        <Drawer
        open={isOpen} 
        onClose={() => setIsOpen(false)}
        variant='permanent'
        sx={{
            width: isOpen ? `${theme.primaryDrawer.width}px` : `${theme.primaryDrawer.closedWidth}px`,
            mt:`${theme.primaryAppBar.minHeight}px`,
            transition: '0.05s',
        }}
        PaperProps={{
            sx:{
                mt:`${theme.primaryAppBar.minHeight}px`,
                height:`calc(100dvh - ${theme.primaryAppBar.height}px)`,
                width: isOpen ? `${theme.primaryDrawer.width}px` : `${theme.primaryDrawer.closedWidth}px`,
                transition: '0.05s',
            }
        }}
        >
                <Box>
                    <ToggleDrawer
                    toggleDrawer={toggleDrawer}
                    isOpen={isOpen}
                    />
                    {React.isValidElement(children) ? React.cloneElement(children, {isOpen}) : children}
                </Box>
        </Drawer>
    )
}

export default PrimaryDrawer