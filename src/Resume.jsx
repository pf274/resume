import { Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { InfoPage } from "./pages/InfoPage";
import { EducationPage } from "./pages/EducationPage";
import { ExperiencePage } from "./pages/ExperiencePage";
import { ProjectsPage } from "./pages/ProjectsPage";

export function Resume({ resume, style }) {
  const [page, setPage] = useState("info");
  if (Object.keys(resume).length == 0) {
    return <div />;
  }
  return (
    <div style={{ flex: 1, padding: "1em", margin: "1em" }}>
      <Typography style={{ textAlign: "center" }} variant="h2">
        Peter Fullmer
      </Typography>
      {resume?.basics?.label && (
        <Typography
          style={{ textAlign: "center", margin: "0.5em" }}
          variant="h4"
        >
          {resume.basics.label}
        </Typography>
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
      </Tabs>
      {page == "info" && <InfoPage resume={resume} />}
      {page == "education" && <EducationPage resume={resume} />}
      {page == "experience" && <ExperiencePage resume={resume} />}
      {page == "projects" && <ProjectsPage resume={resume} />}
    </div>
  );
}
