"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // fontFamily: "var(--font-ibm)",
          fontFamily: "cursive",
          textTransform: "none",
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        root: {
          // fontFamily: "var(--font-ibm)",
          fontFamily: "cursive",
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          // fontFamily: "var(--font-ibm)",
          fontFamily: "cursive",
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          // fontFamily: "var(--font-ibm)",
          fontFamily: "cursive",
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          // fontFamily: "var(--font-ibm)",
          fontFamily: "cursive",
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          fontFamily: "cursive",
        },
      },
    },
  },
});

export default theme;