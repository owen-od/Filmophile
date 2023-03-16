import { createTheme } from "@mui/material/styles";
//import "@fontsource/merriweather"
//import "@fontsource/roboto"
import "@fontsource/lato"

export const themeDark = createTheme({
  typography: {
    "fontFamily": `"Lato", sans-serif`
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#35213A',
      paper: '#424242',
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#000000"
    }
  },
});

export const themeLight = createTheme({
  typography: {
    "fontFamily": `"Lato", sans-serif`
  },
  palette: {
    type: 'light',
    primary: {
      main: '#F50A5A',
    },
    secondary: {
      main: '#121212',
    },
    background: {
      default: '#FCFCFC',
      paper: '#FCFCFC',
      accent: '#FFFFFC'
    },
    text: {
      primary: "#000000",
      secondary: "#FFFFFF"
    }
  },
});