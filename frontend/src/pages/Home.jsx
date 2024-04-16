import Box from "@mui/material/Box"
import { CssBaseline } from '@mui/material'
import PrimaryAppBar from './templates/PrimaryAppBar'
import PrimaryDrawer from './templates/PrimaryDrawer'
import SecondaryDrawer from './templates/SecondaryDrawer'
import Main from "./templates/Main"
import ExploreServers from "../components/Main/ExploreServers"
import PopularChannels from "../components/PrimaryDrawer/PopularChannels"
import ExploreCategories from "../components/SecondaryDrawer/ExploreCategories"
 
const Home = () => {
  return (
    <Box sx={{
      display: "flex"
    }}>
      <CssBaseline enableColorScheme />
      <PrimaryAppBar>
        <ExploreCategories />
      </PrimaryAppBar>
      <PrimaryDrawer>
        <PopularChannels />
      </PrimaryDrawer>
      <SecondaryDrawer>
        <ExploreCategories/>
      </SecondaryDrawer>
      <Main>
        <ExploreServers/>
      </Main>
    </Box>
  )
}

export default Home
