import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import useMediaQuery from '@mui/material/useMediaQuery';
import React from "react";

const Theme = () => {
    const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
    
    let theme = createTheme({
        palette: {
            mode: prefersDark ? "dark" : "light"
        },
        primaryAppBar: {
            height: 50,
            minHeight: 50,
        },
        typography: {
            fontFamily: ["IBM Plex Sans", "sans-serif"].join(","),
        },
        primaryDrawer: {
            width: 240,
            closedWidth: 60,
        },
        secondaryDrawer: {
            width: 240,
        },
        components: {
            MuiListItemAvatar: {
                styleOverrides: {
                    root: {
                        minWidth: "40px",
                    }
                }
            }
        }
    })
    theme = responsiveFontSizes(theme)
  return theme;
}

export default Theme
