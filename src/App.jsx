import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import { getData } from "./gistHelper";
import { Resume } from "./Resume";
import { ThemeContextProvider } from "./contexts/ThemeContext";

function App() {
  const [data, setData] = useState({});
  useEffect(() => {
    getData().then((newData) => setData(newData));
  }, []);
  return (
    <ThemeContextProvider>
      <Resume resume={data} />
    </ThemeContextProvider>
  );
}

export default App;
