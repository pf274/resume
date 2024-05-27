import { Typography } from "@mui/material";
import { Page } from "../components/Page";
import { Project } from "../components/projectsPage/Project";
import { useResumeContext } from "../contexts/ResumeContext";

export function ProjectsPage() {
  const { getResume } = useResumeContext();
  const resume = getResume();
  if (!resume.projects || resume.projects.length == 0) {
    return (
      <Page>
        <Typography sx={{ textAlign: "center" }} variant="h5">
          No projects found.
        </Typography>
      </Page>
    );
  }
  return (
    <Page>
      {resume.projects.map((info, index) => (
        <Project info={info} key={index} />
      ))}
    </Page>
  );
}
