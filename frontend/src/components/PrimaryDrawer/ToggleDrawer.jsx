import { Box, IconButton, Typography } from '@mui/material'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'

const ToggleDrawer = (props) => {

    return (
        <Box
        sx={{
            display: {xs: "none", sm: "flex"},
            height: "50px",
            alignItems: "center",
            justifyContent: props.isOpen ? "space-between" : "center",
        }}
        >
            { props.isOpen && <Typography sx={{ml: 2}}>Rooms</Typography> }
            <IconButton onClick={() => props.toggleDrawer()}>
                {props.isOpen ? <ChevronLeft/> : <ChevronRight/>}
            </IconButton>
        </Box>
    )
}

export default ToggleDrawer