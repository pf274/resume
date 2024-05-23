import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import { createContext, useContext, useState } from "react";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#e5e5e5", // replace with your desired color
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});


const ThemeContext = createContext({currentTheme: darkTheme});

export function ThemeContextProvider({children}) {
  const [currentTheme, setCurrentTheme] = useState(darkTheme);
  function setTheme(theme) {
    if (theme === "light") {
      setCurrentTheme(lightTheme);
    } else {
      setCurrentTheme(darkTheme);
    
    }
  }
  return (
    <ThemeContext.Provider value={{currentTheme, setTheme}}>
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}