import { Button, Tab, Tabs, Typography } from "@mui/material";
import { InfoPage } from "./pages/InfoPage";
import { EducationPage } from "./pages/EducationPage";
import { ExperiencePage } from "./pages/ExperiencePage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ReferencesPage } from "./pages/ReferencesPage";
import { useThemeContext } from "./contexts/ThemeContext";
import { LoginPage } from "./pages/LoginPage";
import { useResumeContext } from "./contexts/ResumeContext";
import { ConfirmChangesPage } from "./pages/ConfirmChangesPage";

export function Resume() {
  const { resume, page, setPage, authToken, clearChanges, setAuth, cancelEdit } =
    useResumeContext();
  const { currentTheme, setTheme } = useThemeContext();
  const isLight = currentTheme.palette.mode === "light";

  function handleToggleTheme() {
    if (isLight) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }
  if (Object.keys(resume).length == 0) {
    return <div />;
  }
  return (
    <div style={{ flex: 1, padding: "2em", display: "flex", flexDirection: "column" }}>
      <div style={{ marginTop: authToken ? "0.66em" : 0 }} className="name">
        Peter Fullmer
      </div>
      {resume?.basics?.label && (
        <div style={{ margin: "0.5em" }} className="label">
          {resume.basics.label}
        </div>
      )}
      <div style={{ alignSelf: "center" }}>
        <Button value={isLight} onClick={handleToggleTheme} color="inherit">
          Toggle Theme
        </Button>
      </div>
      {authToken ? (
        <div
          style={{
            position: "absolute",
            right: "1em",
            top: "1em",
            display: "flex",
            flexDirection: "row",
            gap: "1em",
          }}
        >
          <Button variant="outlined" onClick={cancelEdit}>
            Cancel
          </Button>
          <Button variant="outlined" onClick={() => setPage("confirmChanges")}>
            Review Changes
          </Button>
        </div>
      ) : (
        <div className="showOnHover" onClick={() => setPage("login")} />
      )}
      <Tabs
        value={page}
        onChange={(_, newValue) => setPage(newValue)}
        sx={{
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
            justifyContent: "center",
          },
        }}
      >
        <Tab value="info" label="Info" />
        <Tab value="experience" label="Experience" />
        <Tab value="education" label="Education" />
        <Tab value="projects" label="Projects" />
        <Tab value="references" label="References" />
      </Tabs>
      {page == "info" && <InfoPage />}
      {page == "education" && <EducationPage />}
      {page == "experience" && <ExperiencePage />}
      {page == "projects" && <ProjectsPage />}
      {page == "references" && <ReferencesPage />}
      {page == "login" && <LoginPage />}
      {page == "confirmChanges" && <ConfirmChangesPage />}
    </div>
  );
}
