import { Box , Typography } from '@mui/material'
import React from 'react'
import { useTheme } from '@mui/material/styles'

const Main = ({children}) => {
    const theme = useTheme()

    return (
        <Box sx={{
            flexGrow: 1,
            mt: `${theme.primaryAppBar.minHeight}px`,
            height: `calc(100dvh - ${theme.primaryAppBar.height}px)`,
            overflow: "auto",
            transition: '0.2s'
        }}>
            {children}
        </Box>
    )
}

export default Main