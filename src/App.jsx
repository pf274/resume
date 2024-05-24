import "./App.css";
import { Resume } from "./Resume";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import { ResumeContextProvider } from "./contexts/ResumeContext";

function App() {
  return (
    <ThemeContextProvider>
      <ResumeContextProvider>
        <Resume />
      </ResumeContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
