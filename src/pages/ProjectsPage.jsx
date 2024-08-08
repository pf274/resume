import { Button, Typography } from "@mui/material";
import { Page } from "../components/Page";
import { Project } from "../components/projectsPage/Project";
import { useResumeContext } from "../contexts/ResumeContext";
import { useState } from "react";

export function ProjectsPage() {
  const { getResume, moveUp, moveDown, add, remove, authToken } = useResumeContext();
  const resume = getResume();
  const [projects, setProjects] = useState(resume.projects || []);
  if (projects.length == 0) {
    return (
      <Page>
        <Typography sx={{ textAlign: "center" }} variant="h5">
          No projects found.
        </Typography>
      </Page>
    );
  }
  function moveProjectDown(index) {
    if (index == projects.length - 1) {
      return;
    }
    const newProjects = [...projects];
    const temp = newProjects[index];
    newProjects[index] = newProjects[index + 1];
    newProjects[index + 1] = temp;
    setProjects(newProjects);
    moveDown(`projects.${index}`);
  }
  function moveProjectUp(index) {
    if (index == 0) {
      return;
    }
    const newProjects = [...projects];
    const temp = newProjects[index];
    newProjects[index] = newProjects[index - 1];
    newProjects[index - 1] = temp;
    setProjects(newProjects);
    moveUp(`projects.${index}`);
  }
  function addProject() {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    const newProject = {
      name: `Project ${Math.floor(Math.random() * 10000000).toLocaleString()}`,
      startDate: `${year}-${month < 10 ? "0" : ""}${month}-${day < 10 ? "0" : ""}${day}`,
      endDate: `${year}-${month < 10 ? "0" : ""}${month}-${day < 10 ? "0" : ""}${day}`,
      description: "This is a new project",
      highlights: [],
      showcase: [],
    };
    const newProjects = [...projects, newProject];
    setProjects(newProjects);
    add(newProject, `projects`);
  }
  function deleteProject(index) {
    const newProjects = projects.filter((_, i) => i != index);
    setProjects(newProjects);
    remove(`projects.${index}`);
  }
  return (
    <Page>
      {resume.projects.map((info, index) => (
        <Project
          info={info}
          key={`${index}/${projects.length}/${info.name}`}
          projectIndex={index}
          numProjects={projects.length}
          path={`projects.${index}`}
          moveProjectDown={moveProjectDown}
          moveProjectUp={moveProjectUp}
          deleteProject={deleteProject}
        />
      ))}
      {authToken && <Button onClick={addProject}>Add Project</Button>}
    </Page>
  );
}
