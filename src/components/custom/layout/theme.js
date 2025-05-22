// in src/theme.js
import { defaultTheme } from "react-admin";
import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1e1e1e",
      paper: "#1e1e1e",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            backgroundColor: "#1e1e1e",
            color: "#fff",
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            backgroundColor: "#1e1e1e",
            color: "#fff",
          },
        },
      },
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

export const theme = {
  ...defaultTheme,
  dark: darkTheme,
  light: lightTheme,
};
