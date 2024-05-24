import { Button, Tab, Tabs, Typography } from "@mui/material";
import { InfoPage } from "./pages/InfoPage";
import { EducationPage } from "./pages/EducationPage";
import { ExperiencePage } from "./pages/ExperiencePage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ReferencesPage } from "./pages/ReferencesPage";
import { useThemeContext } from "./contexts/ThemeContext";
import { LoginPage } from "./pages/LoginPage";
import { useResumeContext } from "./contexts/ResumeContext";

export function Resume() {
  const {resume, page, setPage, authToken, finishEditing} = useResumeContext();
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
      <Typography style={{ textAlign: "center" }} variant="h2">
        Peter Fullmer
      </Typography>
      {resume?.basics?.label && (
        <Typography style={{ textAlign: "center", margin: "0.5em" }} variant="h4">
          {resume.basics.label}
        </Typography>
      )}
      <div style={{ alignSelf: "center" }}>
        <Button value={isLight} onClick={handleToggleTheme} color="inherit">
          Toggle Theme
        </Button>
      </div>
      {authToken ? <Button style={{position: 'absolute', right: '1em', top: '1em'}} variant="outlined" onClick={finishEditing}>Finish Editing</Button> : <div className="showOnHover" onClick={() => setPage('login')} />}
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
      {page == "info" && <InfoPage resume={resume} />}
      {page == "education" && <EducationPage resume={resume} />}
      {page == "experience" && <ExperiencePage resume={resume} />}
      {page == "projects" && <ProjectsPage resume={resume} />}
      {page == "references" && <ReferencesPage resume={resume} />}
      {page == 'login' && <LoginPage />}
    </div>
  );
}
