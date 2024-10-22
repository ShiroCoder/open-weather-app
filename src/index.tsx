import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const theme = createTheme({
  palette: {
    text: {
      primary: "#ffffff", // Set text to white
    },
  },
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "#ffffff", // Set all icons to white
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#ffffff", // Button text white
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          primary: "#ffffff", // Set Typography text to white
        },
      },
    },
  },
});
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
