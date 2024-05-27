import { Page } from "../components/Page";
import { Job } from "../components/experiencePage/Job";
import { useResumeContext } from "../contexts/ResumeContext";

export function ExperiencePage() {
  const { getResume } = useResumeContext();
  const resume = getResume();
  if (!resume.work || resume.work.length === 0) {
    return <div>No work experience found</div>;
  }
  return (
    <Page>
      {resume.work.map((job, index) => (
        <Job key={index} job={job} />
      ))}
    </Page>
  );
}
