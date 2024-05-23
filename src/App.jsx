import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import { getData } from "./getData";
import { Resume } from "./Resume";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";

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

function App() {
  const [data, setData] = useState({});
  useEffect(() => {
    getData().then((newData) => setData(newData));
  }, []);
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Resume resume={data} />
    </ThemeProvider>
  );
}

export default App;
