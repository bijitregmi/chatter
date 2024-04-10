import Box from "@mui/material/Box"
import { CssBaseline } from '@mui/material'
import PrimaryAppBar from './templates/PrimaryAppBar'
import PrimaryDrawer from './templates/PrimaryDrawer'
import SecondaryDrawer from './templates/SecondaryDrawer'
import Main from './templates/Main'
import ExploreServers from "../components/Main/ExplorecServers"
 
const Explore = () => {
  return (
    <Box sx={{
      display: "flex"
    }}>
      <CssBaseline enableColorScheme />
      <PrimaryAppBar />
      <PrimaryDrawer />
      <SecondaryDrawer/>
      <Main>
        <ExploreServers/>
      </Main>
    </Box>
  )
}

export default Explore
