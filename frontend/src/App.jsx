import {createBrowserRouter, Route, RouterProvider, createRoutesFromElements} from "react-router-dom"
import React from "react";
import Home from "./pages/Home";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Theme from "./theme/Theme";
import Main from "./pages/templates/Main";
import Server from "./pages/Server";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route 
        path="/"
        element={<Home/>}
      >
        <Route
          exact
          path="/category/:categoryName?"
          element={<Main />}
        />
      </Route>
      <Route 
        path="/server/:serverId/:channelId?"
        element={<Server/>}
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