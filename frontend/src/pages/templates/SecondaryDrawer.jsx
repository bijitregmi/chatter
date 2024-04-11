import { Box, Typography } from '@mui/material'
import React from 'react'
import { useTheme } from '@mui/material/styles'
import ExploreCategories from '../../components/SecondaryDrawer/ExploreCategories'

const SecondaryDrawer = () => {
    const theme = useTheme()

    return (
            <Box sx={{
                minWidth: `${theme.secondaryDrawer.width}px`,
                mt:`${theme.primaryAppBar.minHeight}px`,
                height:`calc(100dvh - ${theme.primaryAppBar.height}px)`,
                borderRight: `1px solid ${theme.palette.divider}`,
                display: {xs: "none", sm: "block"},
                overflow: "auto",
                bgcolor: theme.palette.mode == "dark" ? '#242424' : "#F7F7F7",
                transition: '0.2s'
            }}>
                <ExploreCategories />
            </Box>
    )
}

export default SecondaryDrawer