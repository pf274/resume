import { Typography } from "@mui/material";
import { Page } from "../components/Page";
import { Project } from "../components/projectsPage/Project";

export function ProjectsPage({ resume }) {
  if (!resume.projects || resume.projects.length == 0) {
    return (
      <Page>
        <Typography sx={{textAlign: 'center'}} variant="h5">
          No projects found.
        </Typography>
      </Page>
    )
  }
  return (
    <Page>
      {resume.projects.map((info, index) => <Project info={info} key={index} />)}
    </Page>
  );
}
