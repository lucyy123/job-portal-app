import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#6A38C2",
    },
    secondary: {
      main: "rgb(243, 16, 16)",
    },
    text:{
      secondary:"rgb(73, 73, 73)"
    }
  },
});

/**import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#6A38C2',
      light: '#9b6de2',
      dark: '#4a257f',
      contrastText: '#ffffff',
    },
    secondary: {
      main: 'rgb(243, 16, 16)',
      light: '#ff6161',
      dark: '#b20000',
      contrastText: '#ffffff',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ff9800',
    },
    info: {
      main: '#2196f3',
    },
    success: {
      main: '#4caf50',
    },
    background: {
      default: '#f4f6f8',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#555555',
      disabled: '#aaaaaa',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    fontSize: 14,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 400,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 400,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  spacing: 8, // Default spacing unit
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '25px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '1rem',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#333333',
        },
      },
    },
  },
});
 */
