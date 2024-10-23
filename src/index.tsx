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
    MuiAutocomplete: {
      styleOverrides: {
        option: {
          color: "black", // Set dropdown option text color to black
        },
        inputRoot: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#ccc",
            },
            "&:hover fieldset": {
              borderColor: "#aaa",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#007bff",
            },
          },
          "& .MuiInputBase-input": {
            color: "white", // Set input text color to white
          },
          "& .MuiInputLabel-root": {
            color: "white", // Set label color to white
          },
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
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& fieldset": {
            borderColor: "#ffffff", // Set outline to white
          },
          "&:hover fieldset": {
            borderColor: "#ffffff", // Set outline to white on hover
          },
          "&.Mui-focused fieldset": {
            borderColor: "#ffffff", // Set outline to white when focused
          },
        },
        input: {
          color: "#ffffff", // Set input text color to white
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          "&.MuiListItem-divider": {
            borderColor: "#ffffff", // Set divider color to white
          },
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
