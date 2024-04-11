import {createBrowserRouter, Route, RouterProvider, createRoutesFromElements} from "react-router-dom"
import React from "react";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Theme from "./theme/Theme";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route 
        index
        element={<Home/>}
      />
      <Route
        exact
        path="/category/:categoryName"
        element={<Explore />}
      />
    </Route>
  )
)

export const ThemeContext = React.createContext()

function App() {

  
  const theme = Theme()
  const [mode, setMode] = React.useState(() => localStorage.getItem('colorMode') || theme.palette.mode)
  const modifiedTheme = React.useMemo(() => createTheme({
    ...theme,
    palette: {
      mode: mode
    },
  }), [mode])

  const toggleMode = React.useCallback(() => {
    setMode(prevMode => (prevMode === "light" ? "dark" : "light"))
  }, [mode])

  React.useEffect(() => {
    localStorage.setItem('colorMode', mode)
  }, [mode])

    return (
      <ThemeContext.Provider value={{toggleMode}}>
        <ThemeProvider theme={modifiedTheme}>
          <RouterProvider router={router}/>
        </ThemeProvider>
      </ThemeContext.Provider>
    )
}

export default App;