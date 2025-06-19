import { Button } from "@mui/material";
import { useThemeContext } from "../../contexts/ThemeContext";

export function ThemeToggle() {
  const { currentTheme, setTheme } = useThemeContext();
  const isLight = currentTheme.palette.mode === "light";

  function handleToggleTheme() {
    if (isLight) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }
  return (
    <Button value={isLight} onClick={handleToggleTheme} color="inherit">
      Toggle Theme
    </Button>
  );
}
