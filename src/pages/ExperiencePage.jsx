import { Add } from "@mui/icons-material";
import { Page } from "../components/Page";
import { Job } from "../components/experiencePage/Job";
import { useResumeContext } from "../contexts/ResumeContext";
import { Fab } from "@mui/material";
import { useState } from "react";

export function ExperiencePage() {
  const { getResume, add, remove, moveUp, moveDown } = useResumeContext();
  const resume = getResume();
  const [work, setWork] = useState(resume.work || []);
  function handleAddWork() {
    const newJob = { name: "New Job", position: "New Position", startDate: "2022-01-01", endDate: "2022-12-31", summary: "New Summary", url: "", highlights: [] };
    setWork([...work, newJob]);
    add(newJob, "work");
  }
  if (work.length === 0) {
    return <div>No work experience found</div>;
  }
  function handleDelete(index) {
    remove(`work.${index}`)
    const newWork = work.filter((job, i) => i !== index);
    setWork(newWork);
  }
  function handleMoveUp(index) {
    if (index === 0) {
      return;
    }
    moveUp(`work.${index}`);
    const newWork = [...work];
    const temp = newWork[index - 1];
    newWork[index - 1] = newWork[index];
    newWork[index] = temp;
    setWork(newWork);
  }
  function handleMoveDown(index) {
    if (index === work.length - 1) {
      return;
    }
    moveDown(`work.${index}`);
    const newWork = [...work];
    const temp = newWork[index + 1];
    newWork[index + 1] = newWork[index];
    newWork[index] = temp;
    setWork(newWork);
  }
  return (
    <Page>
        {work.map((job, index) => (
          <Job key={`${index}/${work.length}/${job.name}`} job={job} path={`work.${index}`} handleDelete={handleDelete} index={index} handleMoveUp={handleMoveUp} handleMoveDown={handleMoveDown} numJobs={work.length} />
          ))}
        <Fab sx={{alignSelf: 'center'}} onClick={handleAddWork}>
        <Add />
        </Fab>
    </Page>
  );
}
