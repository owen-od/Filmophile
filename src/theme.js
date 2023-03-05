import { createTheme } from "@mui/material/styles";

export const themeDark = createTheme({
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
    },
    text: {
      primary: "#000000",
      secondary: "#FFFFFF"
    }
  },
});