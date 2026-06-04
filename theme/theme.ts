"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-ibm)",
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "var(--font-ibm)",
          textTransform: "none",
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "var(--font-ibm)",
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          fontFamily: "var(--font-ibm)",
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          fontFamily: "var(--font-ibm)",
        },
      },
    },
  },
});

export default theme;