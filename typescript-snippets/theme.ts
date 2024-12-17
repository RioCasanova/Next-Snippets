"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: "light",
    primary: {
      main: "#ffa62b",
    },
    secondary: {
      main: "#fff",
    },
  },
  typography: {
    fontFamily: "Nunito, sans-serif",
    fontWeightBold: 700,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: {
          backgroundColor: "#60a5fa",
        },
      },
      defaultProps: {
        severity: "info",
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 340,
      md: 768,
      lg: 1024,
      xl: 1440,
      xxl: 1920,
    },
  },
});

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
  }
}

export default theme;
