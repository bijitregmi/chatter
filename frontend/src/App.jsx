import {createBrowserRouter, Route, RouterProvider, createRoutesFromElements} from "react-router-dom"
import React from "react";
import Home from "./pages/Home";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Theme from "./theme/Theme";
import Main from "./pages/templates/Main";
import Server from "./pages/Server";
import Login from "./pages/Login";
import { AuthContextProvider } from "./context/AuthContext";
import TestLogin from "./pages/TestLogin";
import ProtectedRoute from "./services/ProtectedRoute";

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
      <Route
        path="/login"
        element={<Login/>}
      />
      <Route
        path="/test"
        element={
          <ProtectedRoute>
            <TestLogin/>
          </ProtectedRoute>
        }
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
      <AuthContextProvider>
      <ThemeContext.Provider value={{toggleMode}}>
        <ThemeProvider theme={modifiedTheme}>
        <CssBaseline enableColorScheme />
          <RouterProvider router={router}/>
        </ThemeProvider>
      </ThemeContext.Provider>
      </AuthContextProvider>
    )
}

export default App;