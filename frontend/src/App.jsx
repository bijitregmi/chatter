import { Route, BrowserRouter, Routes } from "react-router-dom"
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
import Register from "./pages/Register";
import MemberContextProvider from "./context/MemberContext";
import MembershipCheck from "./components/Membership/MembershipCheck";


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
      <BrowserRouter>
      <AuthContextProvider>
      <ThemeContext.Provider value={{toggleMode}}>
        <ThemeProvider theme={modifiedTheme}>
        <CssBaseline enableColorScheme />
        <Routes>
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
            element={
              <ProtectedRoute>
              <MemberContextProvider>
                <MembershipCheck>
                <Server/>
                </MembershipCheck>
              </MemberContextProvider>
              </ProtectedRoute>
            }
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
          <Route
            path="/register"
            element={<Register/>}
          />
        </Routes>
        </ThemeProvider>
      </ThemeContext.Provider>
      </AuthContextProvider>
      </BrowserRouter>
    )
}

export default App;